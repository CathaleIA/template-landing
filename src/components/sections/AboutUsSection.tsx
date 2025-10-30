"use client";
import React, { useState } from "react";
import { useTranslation } from "@/../hooks/useTranlation";
import {
  Target,
  Eye,
  HeartHandshake,
  Boxes,
  Timer,
  Activity,
  ShieldCheck,
  HelpCircle,
  ChevronDown,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Target,
  Eye,
  HeartHandshake,
  Boxes,
  Timer,
  Activity,
  ShieldCheck,
};

function RenderIcon({ name, className }: { name: string; className?: string }) {
  const Icon = iconMap[name] || HelpCircle;
  return <Icon className={className || "w-6 h-6"} />;
}

export default function AboutUsSection() {
  const t = useTranslation();
  const data = t.aboutUs;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!data?.hero?.title) {
    return (
      <section className="relative w-full py-16 bg-background">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto text-center">
          Cargando...
        </div>
      </section>
    );
  }

  return (
    <>
      {/* HERO */}
      <section className="relative w-full pt-28 md:pt-32 lg:pt-36 pb-8 bg-background">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
              {data.hero.title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              {data.hero.subtitle}
            </p>

            {/* KPIs */}
            {data.hero.kpis?.length ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
                {data.hero.kpis.map((kpi, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-primary/10 bg-primary/5 px-6 py-5"
                  >
                    <div className="text-2xl font-bold text-primary">
                      {kpi.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {kpi.label}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* MISIÓN / VISIÓN / VALORES */}
      <section
        id="about-mission"
        className="relative w-full pt-8 md:pt-10 lg:pt-12 pb-16 md:pb-20 bg-background"
      >
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
            {data.missionVision.title}
          </h2>

          <div className="divide-y divide-border rounded-2xl bg-card/60 ring-1 ring-border">
            {data.missionVision.items?.map((it, index) => (
              <div
                key={it.id ?? index}
                onClick={() => toggle(index)}
                className="p-6 md:p-7 flex flex-col gap-3 cursor-pointer transition-all duration-300 hover:bg-card/80"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <RenderIcon name={it.icon} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {it.heading}
                      </h3>
                      <p className="mt-1 text-muted-foreground">
                        {it.shortDescription}
                      </p>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-primary transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </div>

                <div
                  className={`transition-all duration-500 ease-in-out ${
                    openIndex === index
                      ? "max-h-96 opacity-100 mt-2"
                      : "max-h-0 opacity-0"
                  } overflow-hidden`}
                >
                  <p className="text-sm text-muted-foreground leading-relaxed border-t border-border pt-3">
                    {it.longDescription}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="relative w-full py-12 md:py-16 lg:py-0 bg-background">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          {/* Separador doble línea */}
          <div className="w-full border-t-2 border-border relative mb-12 mt-10">
            <div className="absolute top-[4px] left-0 w-full border-t-2 border-primary/60"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
            {data.timeline.title}
          </h2>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border" />
            <div className="space-y-10">
              {data.timeline.items?.map((it, idx) => {
                const left = idx % 2 === 0;
                return (
                  <div
                    key={`${it.year}-${idx}`}
                    className="relative md:grid md:grid-cols-2 md:gap-8 items-start"
                  >
                    <span className="absolute left-3 md:left-1/2 -translate-x-1/2 -translate-y-1/2 top-3 h-3.5 w-3.5 rounded-full bg-primary ring-4 ring-primary/20" />
                    <div
                      className={`${
                        left ? "md:pr-10" : "md:col-start-2 md:pl-10"
                      }`}
                    >
                      <div className="rounded-2xl border border-border bg-card p-6">
                        <div className="text-primary font-semibold">
                          {it.year}
                        </div>
                        <h3 className="text-xl font-semibold text-card-foreground mt-1">
                          {it.title}
                        </h3>
                        <p className="text-muted-foreground mt-2">
                          {it.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* DIFERENCIALES */}
      <section className="relative w-full py-12 md:py-16 lg:py-20 bg-background">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
            {data.differentiators.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.differentiators.items?.map((it) => (
              <div
                key={it.id}
                className="flex gap-4 rounded-xl bg-white/70 ring-1 ring-primary/10 p-5"
              >
                <div className="shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-secondary">
                  <RenderIcon name={it.icon} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <h3 className="text-base font-semibold text-foreground">
                      {it.heading}
                    </h3>
                    {it.metric && (
                      <span className="text-xs font-medium text-secundary/80 bg-primary/10 px-2 py-0.5 rounded">
                        {it.metric}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {it.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
