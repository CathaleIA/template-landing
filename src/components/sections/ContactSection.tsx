// src/components/sections/ContactSection.tsx
"use client";
import { useTranslation } from "@/../hooks/useTranlation";
import { useState, ChangeEvent, FormEvent, useRef } from "react";
import HcaptchaInvisible, { HcaptchaHandle } from "@/components/HcaptchaInvisible";

// [INFO] Mensaje seguro desde unknown, usando fallback de traducciones
const getErrorMessage = (e: unknown, fallback: string): string =>
  e instanceof Error && e.message
    ? e.message
    : typeof e === "string" && e
    ? e
    : fallback;

// [INFO] Helpers de limpieza/validación básica
const clean = (s: string) =>
  s.replace(/[\u200B-\u200D\uFEFF]/g, "").replace(/\s+/g, " ").trim();
const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const phoneRx = /^[+\d][\d\s\-()]{6,}$/;

type FieldErrors = { name?: string; email?: string; phone?: string; message?: string };

const validate = (
  fd: { name: string; email: string; phone: string; message: string },
  messages: {
    name: string;
    email: string;
    phone: string;
    messageLink: string;
    messageLength: string;
  }
) => {
  const errors: FieldErrors = {};
  const name = clean(fd.name);
  const email = clean(fd.email);
  const phone = clean(fd.phone);
  const message = clean(fd.message);

  if (name.length < 2 || name.length > 80) errors.name = messages.name;
  if (!emailRx.test(email)) errors.email = messages.email;
  if (phone) {
    const digits = phone.replace(/\D/g, "");
    if (!phoneRx.test(phone) || digits.length < 7 || digits.length > 15) {
      errors.phone = messages.phone;
    }
  }
  if (message) {
    if (/https?:\/\/|www\./i.test(message)) errors.message = messages.messageLink;
    else if (message.length < 10) errors.message = messages.messageLength;
  }

  return { ok: Object.keys(errors).length === 0, errors, cleaned: { name, email, phone, message } };
};

export default function ContactSection() {
  const t = useTranslation();

  // [INFO] Estado de formulario y UI
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [hpt, setHpt] = useState(""); // [INFO] Honeypot oculto
  const [captchaReady, setCaptchaReady] = useState(false); // [INFO] Habilitar submit cuando hCaptcha esté listo

  // [INFO] hCaptcha invisible
  const hcapRef = useRef<HcaptchaHandle>(null);
  const sitekey = process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY || "";

  // [INFO] onChange con limpieza de invisibles y borrado del error del campo
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const soft = value.replace(/[\u200B-\u200D\uFEFF]/g, "");
    setFormData((prev) => ({ ...prev, [name]: soft }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  // [INFO] Submit con validación local, ejecución hCaptcha e invocación de API
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "loading") return; // [INFO] Evita doble submit
    setStatus("loading");
    setErrorMsg("");
    setErrors({});

    const v = validate(formData, t.contact.validation);
    if (!v.ok) {
      setStatus("error");
      setErrors(v.errors);
      setErrorMsg(t.contact.validation.general);
      return;
    }

    try {
      if (!hcapRef.current?.isReady()) throw new Error("hCaptcha not ready");
      const token = await hcapRef.current.execute();

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...v.cleaned, hpt, hcaptchaToken: token }),
      });

      // [INFO] Manejo explícito de 429 (rate-limit)
      if (res.status === 429) {
        setStatus("error");
        setErrorMsg(t.contact.status.tooManyAttempts);
        hcapRef.current?.reset();
        return;
      }

      const data = await res.json();

      if (!res.ok || !data?.ok) {
        setStatus("error");
        setErrorMsg(data?.error || t.contact.status.error);
        hcapRef.current?.reset();
        return;
      }

      // [INFO] `deduped:true` se trata como éxito silencioso
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
      setHpt("");
      hcapRef.current?.reset();
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(getErrorMessage(err, t.contact.status.unknownError));
      hcapRef.current?.reset();
    }
  };

  return (
    <section id="contact" className="w-full py-8 md:py-12 lg:py-16 relative overflow-hidden">
      {/* [INFO] Fondo con overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgba(59,58,108,0.95), rgba(59,58,108,0.85)), url('/assets/contact-bg.jpg')",
          }}
        />
      </div>

      <div className="container px-4 md:px-6 max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px]">
          {/* [INFO] Columna izquierda: contenido */}
          <div className="space-y-8 text-white">
            <div className="flex items-center justify-between">
              <span className="text-sm md:text-base tracking-wide uppercase text-white/80">
                {t.contact.head}
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-1 bg-primary rounded-full" />
              <div className="w-8 h-1 bg-primary/60 rounded-full" />
              <div className="w-4 h-1 bg-primary/40 rounded-full" />
            </div>

            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {t.contact.title.split(" ").slice(0, 2).join(" ")}{" "}
                <span className="block">{t.contact.title.split(" ").slice(2).join(" ")}</span>
              </h2>

              <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-lg">
                {t.contact.description}
              </p>
            </div>

            <div className="space-y-4">
              {t.contact.benefitsTitle && (
                <h3 className="text-xl font-semibold text-white">{t.contact.benefitsTitle}</h3>
              )}
              <div className="space-y-3">
                {t.contact.benefits.map((benefit: string, index: number) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                    <span className="text-white/90 text-sm md:text-base">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* [INFO] Columna derecha: formulario */}
          <div className="lg:ml-8">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 shadow-2xl">
              <div className="mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {t.contact.subtitle}
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* [INFO] Honeypot anti-bot (oculto) */}
                <input
                  type="text"
                  name="company"
                  value={hpt}
                  onChange={(e) => setHpt(e.target.value)}
                  className="hidden"
                  autoComplete="off"
                  tabIndex={-1}
                />

                {/* [INFO] hCaptcha invisible */}
                <HcaptchaInvisible
                  sitekey={sitekey}
                  ref={hcapRef}
                  onReady={() => setCaptchaReady(true)}
                />

                {/* Nombre */}
                <div className="space-y-2">
                  <label htmlFor="name" className="text-white text-sm font-medium">
                    {t.contact.name}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    maxLength={80}
                    autoComplete="name"
                    className={`w-full px-4 py-3 bg-white/5 backdrop-blur-sm border rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all
                      ${errors.name ? "border-red-400 focus:ring-red-400" : "border-white/30"}`}
                    placeholder={t.contact.name}
                  />
                  {errors.name && <p className="text-red-300 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-white text-sm font-medium">
                    {t.contact.email}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    maxLength={120}
                    autoComplete="email"
                    className={`w-full px-4 py-3 bg-white/5 backdrop-blur-sm border rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all
                      ${errors.email ? "border-red-400 focus:ring-red-400" : "border-white/30"}`}
                    placeholder={t.contact.email}
                  />
                  {errors.email && <p className="text-red-300 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Teléfono (opcional) */}
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-white text-sm font-medium">
                    {t.contact.phone}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    maxLength={20}
                    inputMode="tel"
                    autoComplete="tel"
                    className={`w-full px-4 py-3 bg-white/5 backdrop-blur-sm border rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all
                      ${errors.phone ? "border-red-400 focus:ring-red-400" : "border-white/30"}`}
                    placeholder={t.contact.phone}
                  />
                  {errors.phone && <p className="text-red-300 text-xs mt-1">{errors.phone}</p>}
                </div>

                {/* Mensaje (opcional con reglas) */}
                <div className="space-y-2">
                  <label htmlFor="message" className="text-white text-sm font-medium">
                    {t.contact.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    maxLength={1200}
                    className={`w-full px-4 py-3 bg-white/5 backdrop-blur-sm border rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none
                      ${errors.message ? "border-red-400 focus:ring-red-400" : "border-white/30"}`}
                    placeholder={t.contact.message}
                  />
                  {errors.message && (
                    <p className="text-red-300 text-xs mt-1">{errors.message}</p>
                  )}
                </div>

                {/* Botón de envío */}
                <button
                  type="submit"
                  disabled={status === "loading" || !captchaReady || !sitekey}
                  className="w-full bg-primary hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-transparent"
                >
                  {!sitekey
                    ? t.contact.status.configuringCaptcha
                    : !captchaReady
                    ? t.contact.status.loadingCaptcha
                    : status === "loading"
                    ? t.contact.status.sending
                    : t.contact.button}
                </button>

                {/* Mensajes de éxito/error */}
                {status === "success" && (
                  <p className="text-green-300 text-sm text-center">
                    {t.contact.status.success}
                  </p>
                )}
                {status === "error" && (
                  <p className="text-red-300 text-sm text-center">
                    {errorMsg || t.contact.status.error}
                  </p>
                )}

                {/* Nota de privacidad */}
                <p className="text-white/70 text-xs text-center leading-relaxed">
                  {t.contact.text}
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}