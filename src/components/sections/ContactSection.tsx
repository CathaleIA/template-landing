"use client";
import { useTranslation } from "@/../hooks/useTranlation";
import { useState, ChangeEvent, FormEvent, useRef } from "react";
import HcaptchaInvisible, { HcaptchaHandle } from "@/components/HcaptchaInvisible";

// Para obtener mensajes seguros desde errores tipados como unknown
const getErrorMessage = (e: unknown): string =>
  e instanceof Error ? e.message : typeof e === "string" ? e : "No se pudo enviar. Intenta nuevamente.";

export default function ContactSection() {
  const t = useTranslation();

  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [hpt, setHpt] = useState(""); // Campo honeypot oculto

  const [captchaReady, setCaptchaReady] = useState(false); // Se usa para habilitar el submit cuando el captcha esté listo
  const hcapRef = useRef<HcaptchaHandle>(null);
  const sitekey = process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY || ""; // Lee el sitekey del .env
 
  // Maneja el cambio en los campos del formulario
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      // 1️⃣ Ejecutar hCaptcha invisible
      if (!hcapRef.current?.isReady()) {
        throw new Error("hCaptcha not ready");
      }
      const token = await hcapRef.current.execute();

      // 2️⃣ Enviar los datos al backend
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, hpt, hcaptchaToken: token }),
      });

      const data = await res.json();
      if (!res.ok || !data?.ok) {
        setStatus("error");
        setErrorMsg(data?.error || "Error al enviar el formulario.");
        return;
      }

      // 3️⃣ Si todo va bien, limpiamos el formulario
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
      setHpt(""); // Reiniciar el campo honeypot
      hcapRef.current?.reset(); // Resetear hCaptcha
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(getErrorMessage(err));
      hcapRef.current?.reset();
    }
  };

  return (
    <section id="contact" className="w-full py-8 md:py-12 lg:py-16 relative overflow-hidden">
      {/* Imagen de fondo con overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(59, 58, 108, 0.95), rgba(59, 58, 108, 0.85)), url('/assets/contact-bg.jpg')`,
          }}
        />
      </div>

      <div className="container px-4 md:px-6 max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px]">
          {/* Lado izquierdo - Contenido */}
          <div className="space-y-8 text-white">
            {/* Encabezado */}
            <div className="flex items-center justify-between">
              <span className="text-sm md:text-base tracking-wide uppercase text-white/80">
                {t.contact.head}
              </span>
            </div>

            {/* Línea decorativa */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-1 bg-primary rounded-full"></div>
              <div className="w-8 h-1 bg-primary/60 rounded-full"></div>
              <div className="w-4 h-1 bg-primary/40 rounded-full"></div>
            </div>

            {/* Título y descripción */}
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {t.contact.title.split(" ").slice(0, 2).join(" ")}{" "}
                <span className="block">
                  {t.contact.title.split(" ").slice(2).join(" ")}
                </span>
              </h2>

              <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-lg">
                {t.contact.description}
              </p>
            </div>

            {/* Lista de beneficios */}
            <div className="space-y-4">
              {t.contact.benefitsTitle && (
                <h3 className="text-xl font-semibold text-white">
                  {t.contact.benefitsTitle}
                </h3>
              )}
              <div className="space-y-3">
                {t.contact.benefits.map((benefit: string, index: number) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                    <span className="text-white/90 text-sm md:text-base">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Lado derecho - Formulario */}
          <div className="lg:ml-8">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 shadow-2xl">
              <div className="mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {t.contact.subtitle}
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot oculto */}
                <input
                  type="text"
                  name="company"
                  value={hpt}
                  onChange={(e) => setHpt(e.target.value)}
                  className="hidden"
                  autoComplete="off"
                  tabIndex={-1}
                />

                {/* hCaptcha invisible */}
                <HcaptchaInvisible sitekey={sitekey} ref={hcapRef} onReady={() => setCaptchaReady(true)} />

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
                    className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder={t.contact.name}
                  />
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
                    className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder={t.contact.email}
                  />
                </div>

                {/* Teléfono */}
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
                    className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder={t.contact.phone}
                  />
                </div>

                {/* Mensaje */}
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
                    className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                    placeholder={t.contact.message}
                  />
                </div>

                {/* Botón */}
                <button
                  type="submit"
                  disabled={status === "loading" || !captchaReady || !sitekey}
                  className="w-full bg-primary hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-transparent"
                >
                  {!sitekey
                    ? "Configurando verificación…"
                    : !captchaReady
                    ? "Cargando verificación…"
                    : status === "loading"
                    ? "Enviando…"
                    : t.contact.button}
                </button>

                {/* Mensajes de éxito/error */}
                {status === "success" && (
                  <p className="text-green-300 text-sm text-center">
                    ¡Mensaje enviado! Te contactaremos pronto.
                  </p>
                )}
                {status === "error" && (
                  <p className="text-red-300 text-sm text-center">
                    {errorMsg || "Ocurrió un error al enviar tu mensaje."}
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
