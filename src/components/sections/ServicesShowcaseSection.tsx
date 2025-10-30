"use client";
import React from "react";
import Image from "next/image";
import { useTranslation } from "@/../hooks/useTranlation";
import {
  Activity,
  FileBarChart2,
  Brain,
  ShieldCheck,
  HelpCircle,
  ArrowRight,
} from "lucide-react";

/* ---------- Icon map (tipado sin any) ---------- */
const iconMap = {
  Activity,
  FileBarChart2,
  Brain,
  ShieldCheck,
};
type IconName = keyof typeof iconMap;
function isIconName(n?: string): n is IconName {
  return !!n && n in iconMap;
}
function RenderIcon({
  name,
  className,
}: {
  name?: string;
  className?: string;
}) {
  const Icon = isIconName(name) ? iconMap[name] : HelpCircle;
  return <Icon className={className ?? "w-5 h-5"} />;
}

/* ================================================================== */

export default function ServicesShowcaseSection() {
  const t = useTranslation();
  const data = t.servicesShowcase;

  if (!data?.head?.title) return null;

  const items = Array.isArray(data.items) ? data.items : [];

  return (
    <>
      {/* =========================
          HEAD (título + intro)
         ========================= */}
      <section className="relative w-full pt-20 md:pt-24 lg:pt-28 pb-10 bg-background">
        {/* decor suave */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute -top-48 -right-48 w-96 h-96 rounded-full blur-3xl"
            style={{ backgroundColor: `hsl(var(--primary)/0.06)` }}
          />
          <div
            className="absolute -bottom-56 -left-56 w-[28rem] h-[28rem] rounded-full blur-3xl"
            style={{ backgroundColor: `hsl(var(--secondary)/0.06)` }}
          />
        </div>

        <div className="container relative px-4 md:px-6 max-w-7xl mx-auto">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent text-3xl md:text-4xl font-extrabold">
              {data.head.title}
            </h2>
            {data.head.subtitle && (
              <p className="mt-3 text-lg text-muted-foreground">
                {data.head.subtitle}
              </p>
            )}
            <div className="mt-6 h-1 w-28 mx-auto rounded-full bg-gradient-to-r from-primary to-secondary" />
            {data.head.intro && (
              <p className="mt-6 text-base md:text-lg text-foreground/90">
                {data.head.intro}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* =========================
          GRID DE SERVICIOS (tarjetas)
         ========================= */}
      <section className="relative w-full pt-4 pb-12 md:pb-16 bg-background">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {items.map((it) => {
              const target = it?.cta?.targetId || it?.id || "";
              const href = it?.cta?.href || (target ? `#${target}` : undefined);
              const Card = (
                <div className="group h-full rounded-2xl border border-border/60 bg-card/80 p-6 transition-all hover:border-primary/50 hover:shadow-md">
                  {/* Rejilla interna con filas: imagen | header | summary | bullets | spacer | CTA */}
                  <div className="grid h-full grid-rows-[auto_auto_auto_auto_1fr_auto] gap-3">
                    {/* HEADER (icono + título) */}
                    <div className="flex items-start gap-3">
                      <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary shrink-0">
                        <RenderIcon name={it?.icon} />
                      </div>
                      <h3 className="text-base font-semibold text-foreground leading-snug min-h-[3.2rem] overflow-hidden">
                        {it?.title ?? ""}
                      </h3>
                    </div>

                    {/* IMAGEN (altura fija para alinear) */}
                    {it?.image ? (
                      <div className="overflow-hidden rounded-xl border border-border/50 h-32">
                        <Image
                          src={it.image}
                          alt={it.title || ""}
                          width={640}
                          height={360}
                          className="h-full w-full object-cover object-center transition-transform group-hover:scale-[1.02]"
                        />
                      </div>
                    ) : (
                      <div className="rounded-xl border border-border/50 h-32 bg-card/60" />
                    )}

                    {/* SUMMARY (reserva para 3 líneas aprox) */}
                    <div className="text-sm text-foreground/80 leading-relaxed min-h-[3.6rem] overflow-hidden">
                      {it?.summary ?? ""}
                    </div>

                    {/* BULLETS (reserva para hasta 3 items) */}
                    <div className="min-h-[5.2rem]">
                      {Array.isArray(it?.bullets) && it.bullets.length > 0 ? (
                        <ul className="space-y-2">
                          {it.bullets.slice(0, 3).map((b, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm"
                            >
                              <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-primary/70" />
                              <span className="text-foreground/80">
                                {b.text}
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>

                    {/* SPACER (empuja el CTA al fondo de la tarjeta) */}
                    <div />

                    {/* CTA (si existe, siempre al fondo y alineado) */}
                    {it?.cta?.label && (it?.cta?.href || it?.cta?.targetId) ? (
                      <div className="pt-1">
                        <div className="inline-flex items-center gap-2 text-primary font-medium">
                          <span className="underline decoration-primary/30 underline-offset-4">
                            {it.cta.label}
                          </span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                        </div>
                      </div>
                    ) : (
                      <div className="h-6" /> /* reserva si no hay CTA */
                    )}
                  </div>
                </div>
              );

              return href ? (
                <a key={it?.id} href={href} className="focus:outline-none">
                  {Card}
                </a>
              ) : (
                <div key={it?.id}>{Card}</div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================
          BLOQUES DETALLADOS (anclas)
         ========================= */}
      <section className="relative w-full pb-16 bg-background">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto space-y-10">
          {items.map((it, idx) => (
            <div
              key={it?.id ?? idx}
              id={it?.id} // [Línea ~6] ID del bloque completo (contenedor)
              className="grid gap-8 lg:grid-cols-2 rounded-2xl border border-border/60 bg-card/70 p-6 md:p-8 scroll-mt-24" // [Línea ~7] agregado scroll-mt-24
            >
              {/* Imagen grande (opcional) */}
              <div className="order-2 lg:order-1">
                {it?.image ? (
                  <div className="rounded-xl border border-border/50 overflow-hidden shadow-sm">
                    <Image
                      src={it.image}
                      alt={it.title || ""}
                      width={1280}
                      height={720}
                      className="h-[260px] md:h-[320px] w-full object-cover "
                    />
                  </div>
                ) : (
                  <div className="rounded-xl border border-border/50 overflow-hidden shadow-sm h-[260px] md:h-[320px] bg-card/60" />
                )}
              </div>

              {/* Contenido */}
              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 text-primary">
                  <RenderIcon name={it?.icon} className="w-5 h-5" />
                  {data?.head?.subtitle && (
                    <span className="text-xs uppercase tracking-wide">
                      {data.head.subtitle}
                    </span>
                  )}
                </div>

                <h3 className="mt-2 text-2xl md:text-3xl font-extrabold text-foreground">
                  {it?.title}
                </h3>

                {it?.body && (
                  <div className="mt-3 space-y-3 text-foreground/90">
                    {String(it.body)
                      .split("\\n")
                      .filter(Boolean)
                      .map((p, i) => (
                        <p key={i} className="text-base leading-relaxed">
                          {p}
                        </p>
                      ))}
                  </div>
                )}

                {Array.isArray(it?.bullets) && it.bullets.length > 0 && (
                  <ul className="mt-5 grid sm:grid-cols-2 gap-2">
                    {it.bullets.map((b, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 rounded-lg border border-border/60 bg-background px-3 py-2"
                      >
                        <ShieldCheck className="w-4 h-4 text-primary mt-1" />
                        <span className="text-sm text-foreground/90">
                          {b.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {Array.isArray(it?.stats) && it.stats.length > 0 && (
                  <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {it.stats.map((s, i) => (
                      <div
                        key={i}
                        className="rounded-xl border border-border/60 bg-card/80 p-3 text-center"
                      >
                        <div className="text-xl font-bold text-foreground">
                          {s.value}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
