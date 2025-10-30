import React from "react";
import { useTranslation } from "@/../hooks/useTranlation";
import {
  Lock,
  Users,
  Activity,
  DatabaseBackup,
  Award,
  Shield,
  BadgeCheck,
  FileLock2,
  HelpCircle,
} from "lucide-react";

// --- Icon map ---
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

// --- Card ---
type FeatureCardProps = {
  item: { id: string; icon: string; title: string; description: string };
};
const FeatureCard: React.FC<FeatureCardProps> = ({ item }) => (
  <div
    className="
      group relative flex h-full flex-col rounded-b-2xl border border-border/70 bg-card/80
      shadow-sm transition-all duration-300 hover:-translate-y-1 rounded-t-sm hover:shadow-lg hover:border-primary/40
    "
  >
    <div className="pointer-events-none absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-primary to-secondary" />
    <div className="p-6 flex flex-col">
      <div
        className="
          mb-4 flex h-12 w-12 items-center justify-center rounded-xl
          bg-gradient-to-br from-primary/15 to-secondary/15
          text-primary ring-1 ring-inset ring-primary/20
        "
      >
        <RenderIcon name={item.icon} />
      </div>
      <h4 className="mb-2 text-xl font-semibold text-foreground">
        {item.title}
      </h4>
      <p className="text-muted-foreground flex-1">{item.description}</p>
      <div
        className="
          mt-5 h-1 w-0 rounded-full bg-gradient-to-r from-primary to-secondary
          transition-all duration-300 group-hover:w-24
        "
      />
    </div>
  </div>
);

// --- Trust logo ---
type TrustLogoProps = { logo: { id: string; name: string; icon: string } };
const TrustLogo: React.FC<TrustLogoProps> = ({ logo }) => (
  <div className="flex flex-col items-center gap-3 text-center">
    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/15 text-secondary ring-1 ring-inset ring-secondary/25">
      <RenderIcon name={logo.icon} className="h-8 w-8" />
    </div>
    <span className="text-sm font-medium text-muted-foreground">
      {logo.name}
    </span>
  </div>
);

export default function SecurityStandarSection() {
  const t = useTranslation();

  if (!t.security_standar.intro.title) {
    return (
      <section className="relative w-full py-16 md:py-20 lg:py-24 bg-background">
        <div className="container relative px-4 md:px-6 max-w-7xl mx-auto text-center">
          Cargando...
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Intro + Features con el MISMO wrapper que ReportsSection */}
      <section
        id="security"
        className="relative w-full pt-24 md:pt-28 lg:pt-36 pb-8 md:pb-10 lg:pb-12 bg-background
             scroll-mt-24 md:scroll-mt-28 lg:scroll-mt-36"
      >
        {/* decor suave opcional */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl"
            style={{ backgroundColor: `hsl(var(--primary) / 0.05)` }}
          />
          <div
            className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl"
            style={{ backgroundColor: `hsl(var(--secondary) / 0.05)` }}
          />
        </div>

        <div className="container relative px-4 md:px-6 max-w-7xl mx-auto">
          {/* Intro */}
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 pb-1 bg-gradient-to-r from-primary to-secondary bg-clip-text text-3xl md:text-4xl font-extrabold text-transparent leading-[1.2]">
              {t.security_standar.intro.title}
            </h2>

            <p className="text-lg text-muted-foreground">
              {t.security_standar.intro.description}
            </p>
            <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-primary to-secondary" />
          </div>

          {/* Título de features CENTRADO */}
          <div className="mt-12 md:mt-16">
            <h3 className="text-3xl font-bold text-foreground text-center">
              {t.security_standar.features.title}
            </h3>

            {/* 4 tarjetas en una sola fila, alineadas como ReportsSection */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
              {t.security_standar.features.list.map((item) => (
                <FeatureCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Logos de confianza con el mismo wrapper */}
      <section className="relative w-full -mt-2 md:-mt-4 pt-6 md:pt-8 lg:pt-10 pb-16 md:pb-20 lg:pb-24 bg-card/30">
        <div className="container relative px-4 md:px-6 max-w-7xl mx-auto">
          <h3 className="mb-12 text-center text-2xl font-bold text-foreground">
            {t.security_standar.trustSection.title}
          </h3>
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 md:grid-cols-4">
            {t.security_standar.trustSection.logos.map((logo) => (
              <TrustLogo key={logo.id} logo={logo} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
