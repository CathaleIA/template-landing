"use client";

import React, { useCallback } from "react";
import { useTranslation } from "@/../hooks/useTranlation";
import useEmblaCarousel from "embla-carousel-react";
import {
  Box,
  BarChart,
  FileText,
  Settings,
  Map,
  Zap,
  Receipt,
  Users,
  KanbanSquare,
  Boxes,
  ShieldCheck,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/* ---------- Tipos ---------- */
type ServiceItem = {
  id: string;
  icon: string;
  title: string;
  description: string;
  tag?: string;
  link?: { text: string; href: string };
};
type FlexibleTranslations = {
  valueProposition: { id: string; title: string; description: string };
  servicesSection: { title: string; list: ServiceItem[] };
};

/* ---------- Iconos ---------- */
const iconMap: Record<string, React.ElementType> = {
  IconoModular: Box,
  IconoMonitoreo: BarChart,
  IconoAnalisis: Zap,
  IconoReportes: FileText,
  IconoInventario: Box,
  IconoBI: BarChart,
  IconoRutas: Map,
  IconoPredictivo: Settings,
  IconoCalidad: ShieldCheck,
  IconoCadena: Boxes,
  IconoProyecto: KanbanSquare,
  IconoHR: Users,
  IconoFactura: Receipt,
};
const RenderIcon: React.FC<{ name: string; className?: string }> = ({
  name,
  className,
}) => {
  const IconComponent = iconMap[name] || HelpCircle;
  return <IconComponent className={className || "w-7 h-7"} />;
};

/* ---------- Tarjeta ---------- */
const ServiceCard: React.FC<{ item: ServiceItem }> = ({ item }) => (
  <div
    className="
      bg-card border border-border rounded-xl shadow-lg p-6 
      flex flex-col transition-all duration-300 
      hover:-translate-y-1 hover:shadow-2xl hover:border-primary/50
      h-96
    "
  >
    <div className="mb-4 flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary ring-1 ring-inset ring-primary/20">
      <RenderIcon name={item.icon} />
    </div>
    <h4 className="text-xl font-semibold text-card-foreground mb-2">
      {item.title}
    </h4>
    <p className="text-muted-foreground mb-4 flex-grow">{item.description}</p>
  </div>
);

/* ---------- Sección principal ---------- */
export default function FlexibleSection() {
  const t = useTranslation();
  const data = t.flexible as FlexibleTranslations;

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (!data?.valueProposition?.id) {
    return (
      <section className="container mx-auto px-4 md:px-6 max-w-7xl py-24 text-center">
        <p>Cargando...</p>
      </section>
    );
  }

  return (
    <section className="w-full pt-24 md:pt-32 pb-16 md:pb-24 bg-background">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-4">
            {data.valueProposition.title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {data.valueProposition.description}
          </p>
        </div>

        <div className="mt-16 md:mt-24">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12 text-foreground">
            {data.servicesSection.title}
            <div className="mx-auto mt-6 h-1 w-full rounded-full bg-primary" />
          </h3>

          {/* Colchón lateral para que las flechas no tapen tarjetas */}
          <div className="relative px-10 md:px-16">
            {/* Flecha izquierda (md+) */}
            <button
              type="button"
              onClick={scrollPrev}
              className="
                hidden md:inline-flex
                absolute left-0 -translate-x-1/2 top-1/2 -translate-y-1/2
                z-20 h-10 w-10 items-center justify-center rounded-full
                border border-border bg-white/90 backdrop-blur
                hover:bg-white transition shadow-lg
              "
              aria-label="Anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Flecha derecha (md+) */}
            <button
              type="button"
              onClick={scrollNext}
              className="
                hidden md:inline-flex
                absolute right-0 translate-x-1/2 top-1/2 -translate-y-1/2
                z-20 h-10 w-10 items-center justify-center rounded-full
                border border-border bg-white/90 backdrop-blur
                hover:bg-white transition shadow-lg
              "
              aria-label="Siguiente"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Carrusel con padding interno (espacio al inicio y fin) */}
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-10 py-2 px-[5%]">
                {data.servicesSection.list.map((item) => (
                  <div
                    key={item.id}
                    className="
                      relative flex-none min-w-0 
                      basis-[70%] sm:basis-[50%] md:basis-[40%] lg:basis-1/4
                    "
                  >
                    <ServiceCard item={item} />
                  </div>
                ))}
              </div>
            </div>

            {/* Controles móviles debajo */}
            <div className="mt-6 flex md:hidden items-center justify-center gap-4">
              <button
                type="button"
                onClick={scrollPrev}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white/90 backdrop-blur hover:bg-white transition shadow"
                aria-label="Anterior"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={scrollNext}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white/90 backdrop-blur hover:bg-white transition shadow"
                aria-label="Siguiente"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
