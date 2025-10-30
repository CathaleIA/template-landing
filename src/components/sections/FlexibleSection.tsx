import React from "react";
import { useTranslation } from "@/../hooks/useTranlation";

// --- Iconos de Ejemplo (usando lucide-react) ---
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
  HelpCircle
} from "lucide-react";

// --- 1. Mapa de Iconos ---
const iconMap: { [key: string]: React.ElementType } = {
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
  IconoFactura: Receipt
};

const RenderIcon = ({
  name,
  className,
}: {
  name: string;
  className?: string;
}) => {
  const IconComponent = iconMap[name] || HelpCircle;
  return <IconComponent className={className || "w-7 h-7"} />;
};

// --- 2. Componente de Tarjeta de Servicio ---
type ServiceCardProps = {
  item: {
    id: string;
    icon: string;
    title: string;
    description: string;
    tag?: string;
    link?: {
      text: string;
      href: string;
    };
  };
};

const ServiceCard: React.FC<ServiceCardProps> = ({ item }) => {
  return (
    <div className="bg-card border border-border rounded-xl shadow-lg p-6 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="mb-4 flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary ring-1 ring-inset ring-primary/20">
        <RenderIcon name={item.icon} />
      </div>
      <h4 className="text-xl font-semibold text-card-foreground mb-2">
        {item.title}
      </h4>
      <p className="text-muted-foreground mb-4 flex-grow">{item.description}</p>
    </div>
  );
};

// --- 3. Componente de Sección Principal (Diseño Unificado) ---
export default function FlexibleSection() {
  const t = useTranslation();

  // Manejo de estado de carga inicial
  if (!t.flexible.valueProposition.id) {
    return (
      <section className="container mx-auto px-4 py-24 text-center">
        <p>Cargando...</p>
      </section>
    );
  }

  return (
    // --- Esta es la NUEVA ESTRUCTURA ---
    // Una sola sección con espaciado controlado
    <section className="pt-24 md:pt-32 pb-16 md:pb-24 bg-background">
      <div className="container mx-auto px-4">
        {/* 1. Encabezado (El texto introductorio) */}
        {/* Esto lo centrará horizontalmente en la página */}
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-4">
            {t.flexible.valueProposition.title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t.flexible.valueProposition.description}
          </p>
        </div>

        {/* 2. Cuadrícula de Servicios (Todo el contenido de 'servicesSection') */}
        {/* Este 'mt' (margin-top) controla la distancia con el texto de arriba */}
        <div className="mt-16 md:mt-24">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12 text-foreground">
            {t.flexible.servicesSection.title}
            <div className="mx-auto mt-6 h-1 w-full rounded-full bg-primary" />
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.flexible.servicesSection.list.map((item) => (
              <ServiceCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
