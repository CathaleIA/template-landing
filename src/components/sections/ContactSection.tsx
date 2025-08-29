import { useTranslation } from '@/../hooks/useTranlation';
import SectionHeader from "../atoms/SectionHeader";
import ContactForm from "../molecules/ContactForm";
import BenefitsList from "../molecules/BenefitsList";

export default function ContactSection() {
  const t = useTranslation();

  const benefits = [
    "Respuesta en 8 horas",
    "Capacidades completas",
    "Mejor servicio posible",
    "Entrega rápida en 35-40 días",
  ];

  return (
    <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container px-4 md:px-6 max-w-full overflow-hidden">
        <SectionHeader
          badge={t.contact.head}
          title={t.contact.title}
          description={t.contact.description}
        />
        <div className="mx-auto max-w-6xl mt-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-bold">Beneficios de trabajar con nosotros</h3>
              <BenefitsList benefits={benefits} />
            </div>
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}