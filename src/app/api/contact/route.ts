// src/app/api/contact/route.ts
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";
import {
  DynamoDBClient,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";

/* ========== ENV (.env.local) ========== */
/*
AWS_REGION=us-east-1
SES_FROM=no-reply@tu-dominio.com
SES_TO=destino@tu-dominio.com
BRAND_NAME=TuMarca
HCAPTCHA_SECRET=0x0000000000000000000000000000000000000000        // test en dev
RATE_MAX_PER_5M=3
DDB_TABLE_CONTACT_RATE=contact_rate
*/
const region = process.env.AWS_REGION!;
const FROM = process.env.SES_FROM!;
const TO = process.env.SES_TO!;
const BRAND = process.env.BRAND_NAME || "Website";
const HCAPTCHA_SECRET = process.env.HCAPTCHA_SECRET!;
const RATE_MAX = Number(process.env.RATE_MAX_PER_5M ?? 3);             // (≈L28) Nuevo
const DDB_TABLE = process.env.DDB_TABLE_CONTACT_RATE ?? "contact_rate"; // (≈L29) Nuevo

const ses = new SESv2Client({ region });
const ddb = new DynamoDBClient({ region });                             // (≈L33) Nuevo

/* ========== Validación del payload ========== */
const ContactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(160),
  phone: z.string().max(40).optional().or(z.literal("")),
  message: z.string().min(10).max(5000),
  hpt: z.string().max(0).optional().or(z.literal("")), // honeypot
  hcaptchaToken: z.string().min(10),                    // (≈L44) Nuevo: token requerido
});

/* ========== Utilidades ========== */
const tooManyLinks = (s: string) => (s.match(/https?:\/\//gi) || []).length > 3;

function escapeHtml(s: string) {
  return s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function getClientIp(req: NextRequest): string {
  const h = req.headers;
  const xff = h.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  const real = h.get("x-real-ip"); if (real) return real;
  const cf = h.get("cf-connecting-ip"); if (cf) return cf;
  const fastly = h.get("fastly-client-ip"); if (fastly) return fastly;
  const fly = h.get("fly-client-ip"); if (fly) return fly;
  const trueClient = h.get("true-client-ip"); if (trueClient) return trueClient;
  return "0.0.0.0";
}

/* ========== hCaptcha verify ========== */
async function verifyHCaptcha(token: string, remoteip?: string): Promise<boolean> {
  try {
    const res = await fetch("https://hcaptcha.com/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: HCAPTCHA_SECRET,
        response: token,
        remoteip: remoteip ?? "",
      }),
    });
    const data = (await res.json()) as { success?: boolean; "error-codes"?: string[] };
    if (!data?.success) {
      console.warn("HCAPTCHA_FAIL", data?.["error-codes"]);
      return false;
    }
    return true;
  } catch (err) {
    console.error("HCAPTCHA_ERROR", err);
    return false;
  }
}

/* ========== Rate-limit con DynamoDB (5 min ventana) ========== */
/* (≈L95) Nuevo bloque */
async function bumpAndCheckRate(ip: string, email: string): Promise<{ allowed: boolean; attempts: number }> {
  const key = `${ip}#${email.toLowerCase()}`;
  const nowSec = Math.floor(Date.now() / 1000);
  const ttl = nowSec + 5 * 60; // 5 minutos

  const update = await ddb.send(new UpdateItemCommand({
    TableName: DDB_TABLE,
    Key: { key: { S: key } },
    UpdateExpression: "ADD attempts :one SET expiresAt = if_not_exists(expiresAt, :ttl)",
    ExpressionAttributeValues: {
      ":one": { N: "1" },
      ":ttl": { N: String(ttl) },
    },
    ReturnValues: "UPDATED_NEW",
  }));

  const attempts = Number(update.Attributes?.attempts?.N ?? "1");
  return { allowed: attempts <= RATE_MAX, attempts };
}

/* ========== Handler ========== */
export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
    }

    const parsed = ContactSchema.safeParse(body);
    if (!parsed.success) {
      const details = parsed.error.issues.map(i => `${i.path.join(".")}: ${i.message}`);
      return NextResponse.json({ ok: false, error: "Invalid payload", details }, { status: 400 });
    }

    const { name, email, phone, message, hpt, hcaptchaToken } = parsed.data;

    // Honeypot lleno => responder OK silencioso
    if (hpt && hpt.length > 0) return NextResponse.json({ ok: true });

    // (≈L142) NUEVO: rate-limit ANTES de gastar hCaptcha/SES
    const rate = await bumpAndCheckRate(ip, email);
    if (!rate.allowed) {
      return NextResponse.json(
        { ok: false, error: "Too many attempts. Try again later." },
        { status: 429 }
      );
    }

    // Verificar hCaptcha
    const captchaOk = await verifyHCaptcha(hcaptchaToken, ip);
    if (!captchaOk) {
      return NextResponse.json({ ok: false, error: "Captcha failed" }, { status: 400 });
    }

    // Reglas anti-spam simples
    if (tooManyLinks(message)) {
      return NextResponse.json({ ok: false, error: "Too many links in message" }, { status: 400 });
    }

    // Enviar correo con SES
    const subject = `Contacto (${BRAND}) - ${name}`;
    const plain = [
      `Nombre: ${name}`,
      `Email: ${email}`,
      `Teléfono: ${phone || "-"}`,
      `IP: ${ip}`,
      "",
      "Mensaje:",
      message,
    ].join("\n");

    const html = `
      <h2>Nuevo contacto - ${escapeHtml(BRAND)}</h2>
      <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Teléfono:</strong> ${escapeHtml(phone || "-")}</p>
      <p><strong>IP:</strong> ${escapeHtml(ip)}</p>
      <hr/>
      <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
    `;

    await ses.send(new SendEmailCommand({
      FromEmailAddress: FROM,
      Destination: { ToAddresses: [TO] },
      ReplyToAddresses: [email],
      Content: {
        Simple: {
          Subject: { Data: subject, Charset: "UTF-8" },
          Body: {
            Text: { Data: plain, Charset: "UTF-8" },
            Html: { Data: html, Charset: "UTF-8" },
          },
        },
      },
    }));

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("CONTACT_API_ERROR", err);
    return NextResponse.json({ ok: false, error: "Internal error" }, { status: 500 });
  }
}
