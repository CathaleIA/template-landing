import { useTranslation } from '@/../hooks/useTranlation';
import SectionHeader from "../atoms/SectionHeader";
import Button from "../atoms/Button";
import BenefitsList from "../molecules/BenefitsList";

export default function AboutSection() {
  const t = useTranslation();

  const benefits = [
    "Líder en I+D de tecnología de carga",
    "Proveedor #1 de EVCC en China",
    "Tecnología de núcleo maestro",
    "Soluciones de carga profesionales",
  ];

  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container px-4 md:px-6 max-w-full overflow-hidden">
        <SectionHeader
          badge={t.about.head}
          title={t.about.title}
          description={t.about.description}
        />
        <div className="mx-auto max-w-6xl mt-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="text-muted-foreground">{t.about.content}</p>
              <BenefitsList benefits={benefits} />
            </div>
            <div className="flex items-center justify-center">
              <img
                src="/assets/cathaleia-about.png"
                alt="About cathaleia"
                className="rounded-lg border shadow-sm max-w-full h-auto"
              />
            </div>
          </div>
          <div className="mt-8 text-center">
            <Button text="Aprende más" />
          </div>
        </div>
      </div>
    </section>
  );
}