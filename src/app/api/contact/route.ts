// src/app/api/contact/route.ts
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import crypto from "crypto";
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";
import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";

// [INFO] ENV requeridas
/*
AWS_REGION=us-east-1
SES_FROM=no-reply@tu-dominio.com
SES_TO=destino@tu-dominio.com
BRAND_NAME=TuMarca
HCAPTCHA_SECRET=0x0000000000000000000000000000000000000000
RATE_MAX_PER_5M=3
DDB_TABLE_CONTACT_RATE=contact_rate
*/

const region = process.env.AWS_REGION!;
const FROM = process.env.SES_FROM!;
const TO = process.env.SES_TO!;
const BRAND = process.env.BRAND_NAME || "Website";
const HCAPTCHA_SECRET = process.env.HCAPTCHA_SECRET!;
const RATE_MAX = Number(process.env.RATE_MAX_PER_5M ?? 3);
const DDB_TABLE = process.env.DDB_TABLE_CONTACT_RATE ?? ""; // vacío = deshabilitado
const DDB_ENABLED = Boolean(DDB_TABLE);

// [INFO] Timeouts conservadores para no colgar la request cuando AWS no responde
const SAFE_AWS_TIMEOUT_MS = 1500; // 1.5s para DynamoDB
const SAFE_SES_TIMEOUT_MS = 4000; // 4s para SES

const ses = new SESv2Client({ region });
const ddb = new DynamoDBClient({ region });

// [INFO] Normalizadores simples para limpiar entrada
const normalize = (s: unknown) =>
  typeof s === "string" ? s.replace(/[\u200B-\u200D\uFEFF]/g, "").replace(/\s+/g, " ").trim() : s;

interface RawContact {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  hpt?: string;
  hcaptchaToken?: string;
}

const normPayload = (p: Partial<RawContact> | unknown) => {
  const obj = p as Partial<RawContact>;
  return {
    name: normalize(obj.name),
    email: typeof obj.email === "string" ? String(normalize(obj.email)).toLowerCase() : obj.email,
    phone: normalize(obj.phone),
    message: normalize(obj.message),
    hpt: normalize(obj.hpt) ?? "",
    hcaptchaToken: normalize(obj.hcaptchaToken),
  };
};

// [INFO] Validación del payload
const ContactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(160),
  phone: z.string().max(40).optional().or(z.literal("")),
  message: z.string().min(10).max(5000),
  hpt: z.string().max(0).optional().or(z.literal("")),
  hcaptchaToken: z.string().min(10),
});

// [INFO] Utilidades de seguridad/anti-spam
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

// [INFO] Timeout genérico
async function withTimeout<T>(p: Promise<T>, ms = 6000): Promise<T> {
  return await Promise.race([p, new Promise<T>((_, r) => setTimeout(() => r(new Error("Timeout")), ms))]);
}

// [INFO] hCaptcha verify con fetch; se envuelve con withTimeout al llamar
async function verifyHCaptcha(token: string, remoteip?: string): Promise<boolean> {
  try {
    const res = await fetch("https://hcaptcha.com/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret: HCAPTCHA_SECRET, response: token, remoteip: remoteip ?? "" }),
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

// [INFO] Wrapper seguro para llamadas a DynamoDB con timeout y fallback
async function safeDdb<T>(task: () => Promise<T>, fallback: T): Promise<T> {
  if (!DDB_ENABLED) return fallback;
  try {
    return await withTimeout(task(), SAFE_AWS_TIMEOUT_MS);
  } catch (e) {
    console.warn("DDB_TIMEOUT_OR_ERROR", e);
    return fallback; // [INFO] Nunca colgamos la request por DDB
  }
}

// [INFO] Rate limit (5 min). Si DDB falla/deshabilitado -> allow=true
async function bumpAndCheckRate(ip: string, email?: string): Promise<{ allowed: boolean; attempts: number }> {
  const id = email && email.includes("@") ? email.toLowerCase() : "";
  const key = id ? `${ip}#${id}` : ip;
  const nowSec = Math.floor(Date.now() / 1000);
  const ttl = nowSec + 5 * 60;

  return await safeDdb(async () => {
    const update = await ddb.send(new UpdateItemCommand({
      TableName: DDB_TABLE,
      Key: { key: { S: key } },
      UpdateExpression: "ADD attempts :one SET expiresAt = if_not_exists(expiresAt, :ttl)",
      ExpressionAttributeValues: { ":one": { N: "1" }, ":ttl": { N: String(ttl) } },
      ReturnValues: "UPDATED_NEW",
    }));
    const attempts = Number(update.Attributes?.attempts?.N ?? "1");
    return { allowed: attempts <= RATE_MAX, attempts };
  }, { allowed: true, attempts: 1 });
}

// [INFO] De-duplicación (5 min). Si DDB falla/deshabilitado -> no dedup (dev-friendly)
async function isDuplicate(ip: string, email: string, message: string) {
  const hash = crypto.createHash("sha256").update([ip, email.toLowerCase(), message].join("|")).digest("hex");
  const nowSec = Math.floor(Date.now() / 1000);
  const ttl = nowSec + 5 * 60;
  const key = `dup#${hash}`;

  return await safeDdb(async () => {
    const res = await ddb.send(new UpdateItemCommand({
      TableName: DDB_TABLE,
      Key: { key: { S: key } },
      UpdateExpression: "SET expiresAt = if_not_exists(expiresAt, :ttl), seen = if_not_exists(seen, :zero) + :one",
      ExpressionAttributeValues: { ":ttl": { N: String(ttl) }, ":zero": { N: "0" }, ":one": { N: "1" } },
      ReturnValues: "ALL_NEW",
    }));
    const seen = Number(res.Attributes?.seen?.N ?? "1");
    return seen > 1;
  }, false);
}

export async function POST(req: NextRequest) {
  try {
    // [INFO] Content-Type estricto
    const ct = req.headers.get("content-type") || "";
    if (!ct.includes("application/json")) {
      return NextResponse.json({ ok: false, error: "Unsupported Media Type" }, { status: 415 });
    }

    const ip = getClientIp(req);
    console.info("CONTACT_ATTEMPT", { ip });

    // [INFO] Parseo + normalización + Zod
    let raw: unknown;
    try {
      raw = await req.json();
    } catch {
      return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
    }
    const payload = normPayload(raw);
    const parsed = ContactSchema.safeParse(payload);
    if (!parsed.success) {
      const isDev = process.env.NODE_ENV !== "production";
      const details = parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`);
      return NextResponse.json(
        { ok: false, error: "Invalid payload", ...(isDev ? { details } : {}) },
        { status: 400 }
      );
    }

    const { name, email, phone, message, hpt, hcaptchaToken } = parsed.data;

    // [INFO] Honeypot silencioso
    if (hpt && hpt.length > 0) return NextResponse.json({ ok: true });

    // [INFO] Rate-limit. Si DDB cae -> allowed=true
    const rate = await bumpAndCheckRate(ip, email);
    if (!rate.allowed) {
      return new NextResponse(
        JSON.stringify({ ok: false, error: "Too many attempts. Try again later." }),
        { status: 429, headers: { "Content-Type": "application/json", "Retry-After": "300" } }
      );
    }

    // [INFO] hCaptcha con timeout
    const captchaOk = await withTimeout(verifyHCaptcha(hcaptchaToken, ip), 6000);
    if (!captchaOk) {
      return NextResponse.json({ ok: false, error: "Captcha failed" }, { status: 400 });
    }

    // [INFO] Anti-spam simple
    if (tooManyLinks(message)) {
      return NextResponse.json({ ok: false, error: "Too many links in message" }, { status: 400 });
    }

    // [INFO] De-duplicación (si DDB falla -> false y seguimos)
    if (await isDuplicate(ip, email, message)) {
      return NextResponse.json({ ok: true, deduped: true });
    }

    // [INFO] Construcción segura del email (versión más profesional)
    const safeName = name.replace(/[\r\n]/g, " ").slice(0, 120);
    const subject = `[${BRAND}] Nuevo mensaje de contacto de ${safeName}`;

    const nowIso = new Date().toISOString();

    const plain = [
      `Has recibido un nuevo mensaje desde el formulario de contacto de ${BRAND}.`,
      "",
      "Resumen del contacto",
      "--------------------",
      `Nombre: ${name}`,
      `Email: ${email}`,
      `Teléfono: ${phone || "-"}`,
      `IP origen: ${ip}`,
      `Fecha (UTC): ${nowIso}`,
      "",
      "Mensaje enviado",
      "----------------",
      message,
      "",
      "Puedes responder directamente a este correo para contactar al remitente.",
    ].join("\n");

    const html = `
      <h2>Nuevo mensaje desde el formulario de contacto de ${escapeHtml(BRAND)}</h2>
      <p>Has recibido un nuevo mensaje desde el formulario de contacto del sitio web de ${escapeHtml(BRAND)}.</p>

      <h3>Resumen del contacto</h3>
      <ul>
        <li><strong>Nombre:</strong> ${escapeHtml(name)}</li>
        <li><strong>Email:</strong> ${escapeHtml(email)}</li>
        <li><strong>Teléfono:</strong> ${escapeHtml(phone || "-")}</li>
        <li><strong>IP origen:</strong> ${escapeHtml(ip)}</li>
        <li><strong>Fecha (UTC):</strong> ${escapeHtml(nowIso)}</li>
      </ul>

      <hr/>

      <h3>Mensaje enviado</h3>
      <p style="white-space:pre-wrap">${escapeHtml(message)}</p>

      <p style="margin-top:16px;font-size:12px;color:#555;">
        Puedes responder directamente a este correo para contactar al remitente.
      </p>
    `;

    // [INFO] Envío SES con timeout para no colgar la request
    await withTimeout(
      ses.send(
        new SendEmailCommand({
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
        })
      ),
      SAFE_SES_TIMEOUT_MS
    );

    console.info("CONTACT_SENT", { ip, email });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("CONTACT_API_ERROR", err);
    return NextResponse.json({ ok: false, error: "Internal error" }, { status: 500 });
  }
}