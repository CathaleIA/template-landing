"use client";
import React from "react";
import Image from "next/image";
import { useTranslation } from "@/../hooks/useTranlation";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  HelpCircle,
  Globe2,
  ShieldCheck,
} from "lucide-react";

/* ---------- Tipos locales visibles en tu archivo ---------- */
type ContactItem = {
  id: string;
  icon: string; // "Phone" | "Mail" | "MapPin" | "Clock"
  title: string;
  value: string;
  href?: string;
  description?: string;
};

type PresenceItem = {
  name: string;
  note?: string;
};

/* ---------- Icon map ---------- */
const iconMap: Record<string, React.ElementType> = {
  Phone,
  Mail,
  MapPin,
  Clock,
};

function RenderIcon({ name, className }: { name: string; className?: string }) {
  const Icon = iconMap[name] || HelpCircle;
  return <Icon className={className ?? "w-5 h-5"} />;
}

/* ================================================================== */

export default function AboutContactSection() {
  const t = useTranslation();
  const data = t.aboutContact;

  if (!data?.header?.title) return null;

  // TODO: sin fallback hardcodeado; todo viene del JSON
  const presenceItems: PresenceItem[] = data?.presence?.items ?? [];

  return (
    <>
      {/* =========================
          1) PRE-HERO (con imagen)
         ========================= */}
      <section className="relative w-full pt-20 md:pt-24 lg:pt-28 pb-8 bg-background">
        {/* decor suave */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl"
            style={{ backgroundColor: `hsl(var(--primary)/0.06)` }}
          />
          <div
            className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl"
            style={{ backgroundColor: `hsl(var(--secondary)/0.06)` }}
          />
        </div>

        <div className="container relative px-4 md:px-6 max-w-7xl mx-auto">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14 items-center">
            {/* Lado texto */}
            <div>
              <h2 className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent text-3xl md:text-4xl font-extrabold">
                {data.header.title}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-xl">
                {data.header.subtitle}
              </p>

              {/* línea degradada bajo el título */}
              <div className="mt-6 h-1 w-28 rounded-full bg-gradient-to-r from-primary to-secondary" />

              {/* bullets cortos desde header.items */}
              {Array.isArray(data.header.items) &&
                data.header.items.length > 0 && (
                  <ul className="mt-6 space-y-3 text-foreground/90">
                    {data.header.items.map((it, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <ShieldCheck className="w-5 h-5 text-primary mt-0.5" />
                        <span>{it.text}</span>
                      </li>
                    ))}
                  </ul>
                )}
            </div>

            {/* Lado imagen (Next/Image) */}
            <div className="relative rounded-b-2xl border border-border/20 bg-card/70 overflow-hidden shadow-md">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary to-secondary z-10" />
              <Image
                src="/assets/contact/contact-hero.jpg"
                alt="" /* alt sin literal; si quieres, lo pasamos al JSON luego */
                width={1200}
                height={800}
                priority
                className="h-[320px] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===================================
          2) CONTACT CARDS (bloque central)
         =================================== */}
      <section className="relative w-full pt-10 md:pt-12 lg:pt-14 pb-12 md:pb-16 bg-background">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-foreground">
              {data.header.title}
            </h3>
            <p className="mt-4 text-lg text-muted-foreground">
              {data.header.subtitle}
            </p>
            {/* separador doble */}
            <div className="mt-8 w-full border-t-2 border-border relative">
              <div className="absolute left-0 top-[3px] w-full border-t-2 border-primary/40" />
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {(data.contacts ?? []).map((c: ContactItem) => {
              const Card = (
                <div className="h-full rounded-2xl border border-border/60 bg-card/80 p-6 transition-all hover:border-primary/50 hover:shadow-md">
                  <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary">
                    <RenderIcon name={c.icon} />
                  </div>
                  <h4 className="mt-4 text-base font-semibold text-foreground">
                    {c.title}
                  </h4>
                  {c.href ? (
                    <a
                      href={c.href}
                      className="mt-1 block text-primary font-medium break-words"
                    >
                      {c.value}
                    </a>
                  ) : (
                    <div className="mt-1 text-foreground/80 font-medium break-words">
                      {c.value}
                    </div>
                  )}
                  {c.description && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      {c.description}
                    </p>
                  )}
                </div>
              );

              return c.href ? (
                <a
                  key={c.id}
                  href={c.href}
                  className="group focus:outline-none"
                >
                  {Card}
                </a>
              ) : (
                <div key={c.id}>{Card}</div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======================================
          3) PRESENCIA / ATENCIÓN REGIONAL
         ====================================== */}
      {data.presence?.title && (
        <section className="relative w-full py-14 md:py-18 lg:py-20 bg-card/40">
          <div className="container px-4 md:px-6 max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto">
              <h3 className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent text-2xl md:text-3xl font-extrabold">
                {data.presence.title}
              </h3>
              {data.presence.subtitle && (
                <p className="mt-3 text-muted-foreground">
                  {data.presence.subtitle}
                </p>
              )}
              <div className="mt-6 h-1 w-32 mx-auto rounded-full bg-gradient-to-r from-primary to-secondary" />
            </div>

            <div className="mt-10 grid lg:grid-cols-2 gap-10 items-center">
              {/* Imagen / mapa (Next/Image) */}
              <div className="rounded-2xl border border-border/60 bg-card/80 overflow-hidden shadow-sm">
                <Image
                  src="/assets/contact/map-presence.jpg"
                  alt="" /* alt sin literal */
                  width={1200}
                  height={800}
                  className="h-[320px] w-full object-cover"
                />
              </div>

              {/* Lista en banda (no tarjetas) */}
              <div>
                <div className="flex items-center gap-2 text-primary mb-4">
                  <Globe2 className="w-5 h-5" />
                  <span className="font-semibold">
                    {data.presence.text ?? ""}
                  </span>
                </div>

                <div className="relative">
                  {/* línea base */}
                  <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-border" />
                  {/* badges sobre la línea */}
                  <div className="relative grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {presenceItems.map((r: PresenceItem, i: number) => (
                      <div key={`${r.name}-${i}`} className="relative">
                        <div className="inline-flex flex-col items-start gap-1 bg-background px-4 py-2 rounded-xl border border-border/60 shadow-sm">
                          <span className="text-sm font-semibold text-foreground">
                            {r.name}
                          </span>
                          {r.note && (
                            <span className="text-xs text-muted-foreground">
                              {r.note}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {data.presence.subtext && (
                  <p className="mt-4 text-xs text-muted-foreground">
                    {data.presence.subtext}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================
          4) CIERRE / SLA (barra completa)
         ========================= */}
      {data.closing?.text && (
        <section className="relative w-full py-10 bg-background">
          <div className="container px-4 md:px-6 max-w-7xl mx-auto">
            <div className="rounded-2xl border border-border/60 bg-card/70 p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="text-center md:text-left">
                  <h4 className="text-lg font-semibold text-foreground">
                    {data.closing.text}
                  </h4>
                  {data.closing.subtext && (
                    <p className="text-sm text-muted-foreground">
                      {data.closing.subtext}
                    </p>
                  )}
                </div>

                {/* Barra animada “completa” */}
                <div className="md:w-[360px] w-full">
                  <div className="h-2 rounded-full bg-border overflow-hidden">
                    <div className="h-full w-full overflow-hidden rounded-full bg-border relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary animate-slide" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* keyframes locales */}
          <style jsx>{`
            @keyframes grow {
              to {
                width: 100%;
              }
            }

            @keyframes slide {
              0% {
                transform: translateX(-100%);
              }
              100% {
                transform: translateX(100%);
              }
            }

            .animate-slide {
              animation: slide 1.5s linear infinite;
            }
          `}</style>
        </section>
      )}
    </>
  );
}
