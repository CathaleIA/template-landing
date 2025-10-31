"use client";

import { useTranslation } from "@/../hooks/useTranlation";
import { motion } from "framer-motion";
import {
  DownloadCloud,
  Wand2,
  LineChart,
  Zap,
  Cloud,
  ShieldCheck,
  Layers,
  Workflow,
  type LucideIcon,
} from "lucide-react";

/* ---------- Tipos ---------- */
type Highlight = { id: string; label: string; value: string };
type Pillar = { id: string; title: string; text: string; icon: string };
type ProcessStep = { id: string; title: string; text: string };
type Visual = { id: string; caption: string };

/* ---------- Icon map y type-guard ---------- */
const iconMap = {
  DownloadCloud,
  Wand2,
  LineChart,
  Zap,
};
type IconName = keyof typeof iconMap;
function isIconName(n: string): n is IconName {
  return n in iconMap;
}
function getIcon(name: string): LucideIcon {
  return isIconName(name) ? iconMap[name] : LineChart;
}

export default function DataExperienceSection() {
  const t = useTranslation();

  const highlights: Highlight[] = t.dataExperience?.highlights || [];
  const pillars: Pillar[] = t.dataExperience?.pillars || [];
  const process: ProcessStep[] = t.dataExperience?.process || [];
  const visuals: Visual[] = t.dataExperience?.visuals || [];

  return (
    <section
      id="data-experience"
      className="relative w-full overflow-hidden bg-white py-16 md:py-20 lg:py-24 text-gray-800"
    >
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center md:mb-16"
        >
          <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            {t.dataExperience?.hero?.badge}
          </span>
          <h1 className="mt-4 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
            {t.dataExperience?.hero?.title}
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-gray-700">
            {t.dataExperience?.hero?.subtitle}
          </p>
        </motion.div>

        {/* Highlights */}
        {highlights.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mb-12 grid grid-cols-2 gap-4 md:mb-16 md:grid-cols-4"
          >
            {highlights.map((h) => (
              <div
                key={h.id}
                className="rounded-2xl border-2 border-secondary bg-white/80 p-5 text-center shadow-sm backdrop-blur-sm"
              >
                <div className="text-2xl font-extrabold text-gray-900">
                  {h.value}
                </div>
                <div className="mt-1 text-sm text-gray-600">{h.label}</div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Pillars */}
        {pillars.length > 0 && (
          <div className="mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, idx) => {
              const Icon = getIcon(p.icon);
              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.5, delay: 0.05 * idx }}
                  className="group relative overflow-hidden rounded-2xl border-2 border-secundary bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-700">
                    {p.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Process timeline */}
        {process.length > 0 && (
          <div className="mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="mb-6 text-center text-2xl font-bold text-gray-900 md:text-3xl"
            >
              Flujo visual del ciclo de datos
            </motion.h2>

            <div className="relative">
              {/* Línea central */}
              <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-primary/30 via-primary/20 to-transparent md:block" />
              <div className="space-y-8">
                {process.map((step, i) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.45, delay: 0.04 * i }}
                    className={`grid items-start gap-4 md:grid-cols-2 ${
                      i % 2 === 0 ? "" : "md:[&>*:first-child]:order-2"
                    }`}
                  >
                    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                      <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-primary">
                        Paso {i + 1}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-gray-700">{step.text}</p>
                    </div>

                    {/* Punto/onda decorativa → CAMBIO: Badge con ícono y borde reactivo */}
                    {/* LÍNEAS ~150–170 */}
                    <div className="relative hidden md:block">
                      {(() => {
                        // Array con variedad de íconos para cada paso
                        const icons = [
                          Cloud,
                          ShieldCheck,
                          Layers,
                          LineChart,
                          Workflow,
                        ];
                        const TimelineIcon = icons[i % icons.length];

                        return (
                          <div
                            className="
                              group absolute left-1/2 top-11 -translate-x-1/2 
                              inline-flex h-14 w-14 items-center justify-center
                              rounded-xl border-4 border-primary bg-white text-secondary
                              shadow-sm transition-all duration-300

                              /* Ring base y hover */
                              ring-2 ring-transparent ring-offset-2 ring-offset-white
                              group-hover:ring-secondary/60 group-hover:ring-offset-[3px]

                              /* Glow radial verde */
                              before:pointer-events-none before:absolute before:inset-0 before:rounded-xl
                              before:opacity-0 before:blur before:transition before:duration-300
                              group-hover:before:opacity-100
                              before:bg-[radial-gradient(closest-side,theme(colors.secondary/40),transparent_70%)]

                              /* Focus accesible (sin azul) */
                              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white
                            "
                            aria-hidden="true"
                          >
                            {/* Ícono centrado y grande */}
                            <TimelineIcon className="h-8 w-8 transition-transform duration-300 group-hover:scale-110" />
                          </div>
                        );
                      })()}
                    </div>
                    {/* FIN CAMBIO */}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Visual captions (opcional informativo) */}
        {visuals.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid gap-4 rounded-2xl border border-gray-100 bg-white/70 p-6 shadow-sm backdrop-blur md:grid-cols-3"
          >
            {visuals.map((v) => (
              <div key={v.id} className="text-center">
                <div className="mx-auto mb-2 h-2 w-12 rounded-full bg-gradient-to-r from-primary to-cyan-400" />
                <p className="text-sm text-gray-700">{v.caption}</p>
              </div>
            ))}
          </motion.div>
        )}

        {/* Nota final */}
        {t.dataExperience?.note && (
          <p className="mx-auto mt-10 max-w-3xl text-center text-base leading-relaxed text-gray-700">
            {t.dataExperience.note}
          </p>
        )}

        {/* Línea inferior */}
        <div className="mt-16 h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>
    </section>
  );
}
