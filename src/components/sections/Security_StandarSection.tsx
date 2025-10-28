// --- SecurityStandarSection.tsx (Versión Corregida) ---

import React from 'react';
import { useTranslation } from '@/../hooks/useTranlation';

// --- Iconos de Ejemplo (usando lucide-react) ---
import { 
  Lock,           // IconoCifrado (Corregido)
  Users,          // IconoAcceso
  Activity,       // IconoAuditoria
  DatabaseBackup, // IconoDisponibilidad
  Award,          // IconoISO
  Shield,         // IconoGDPR
  BadgeCheck,     // IconoSOC2
  FileLock2,      // IconoCCPA (Corregido)
  HelpCircle 
} from 'lucide-react';

// --- 1. Mapa de Iconos ---
const iconMap: { [key: string]: React.ElementType } = {
  IconoCifrado: Lock,
  IconoAcceso: Users,
  IconoAuditoria: Activity,
  IconoDisponibilidad: DatabaseBackup,
  IconoISO: Award,
  IconoGDPR: Shield,
  IconoSOC2: BadgeCheck,
  IconoCCPA: FileLock2,
};

const RenderIcon = ({ name, className }: { name: string, className?: string }) => {
  const IconComponent = iconMap[name] || HelpCircle;
  return <IconComponent className={className || 'w-7 h-7'} />;
};

// --- 2. Sub-componente: FeatureCard ---
type FeatureCardProps = {
  item: {
    id: string;
    icon: string;
    title: string;
    description: string;
  };
};

const FeatureCard: React.FC<FeatureCardProps> = ({ item }) => {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="mb-4 flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 text-accent">
        <RenderIcon name={item.icon} />
      </div>
      <h4 className="text-xl font-semibold text-card-foreground mb-2">
        {item.title}
      </h4>
      <p className="text-muted-foreground">
        {item.description}
      </p>
    </div>
  );
};

// --- 3. Sub-componente: TrustLogo ---
type TrustLogoProps = {
  logo: {
    id: string;
    name: string;
    icon: string;
  };
};

const TrustLogo: React.FC<TrustLogoProps> = ({ logo }) => {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div className="flex items-center justify-center w-16 h-16 text-muted-foreground">
        <RenderIcon name={logo.icon} className="w-12 h-12" />
      </div>
      <span className="text-sm font-medium text-muted-foreground">
        {logo.name}
      </span>
    </div>
  );
};


// --- 4. Componente de Sección Principal (Diseño Corregido) ---
export default function SecurityStandarSection() {
  const t = useTranslation();

  if (!t.security_standar.intro.title) {
    return (
      <section className="container mx-auto px-4 py-24 text-center">
        <p>Cargando...</p>
      </section>
    );
  }

  return (
    <>
      {/* --- ESTA ES LA ESTRUCTURA CORREGIDA --- */}
      {/* Sección 1 y 2 (Intro + Features) FUSIONADAS */}
      <section className="pt-24 md:pt-32 pb-16 md:pb-24 bg-background">
        <div className="container mx-auto px-4">
          
          {/* Contenido de la Intro (Sin fondo verde, sin tag, sin link) */}
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t.security_standar.intro.title}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t.security_standar.intro.description}
            </p>
          </div>

          {/* Contenido de las Features */}
          {/* Este 'mt' controla el espacio entre la intro y la cuadrícula */}
          <div className="mt-16 md:mt-24">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h3 className="text-3xl font-bold text-foreground">
                {t.security_standar.features.title}
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {t.security_standar.features.list.map(item => (
                <FeatureCard key={item.id} item={item} />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Sección 3: Logos de Confianza (Esta se queda separada) */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-center text-foreground mb-12">
            {t.security_standar.trustSection.title}
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {t.security_standar.trustSection.logos.map(logo => (
              <TrustLogo key={logo.id} logo={logo} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}