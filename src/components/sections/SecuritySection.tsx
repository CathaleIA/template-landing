import { useTranslation } from '@/../hooks/useTranlation';
import SectionHeader from "../atoms/SectionHeader";
import FeatureCard from "../molecules/FeatureCard";
import BenefitsList from "../molecules/BenefitsList";
import Image from "next/image";

export default function SecuritySection() {
  const t = useTranslation();

  return (
    <section id="security" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 max-w-full overflow-hidden">
        <SectionHeader
          badge={t.security.head}
          title={t.security.title}
          description={t.security.description}
        />
        <div className="mx-auto max-w-6xl mt-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.security.features.map((item, index) => (
              <FeatureCard key={index} title={item.title} description={item.description} />
            ))}
          </div>
          <div className="mt-16 bg-background rounded-lg border shadow-sm overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8 flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-4">{t.security.oursecurity.title}</h3>
                <p className="text-muted-foreground mb-6">{t.security.oursecurity.description}</p>
                <BenefitsList benefits={t.security.oursecurity.listsecurity} />
              </div>
              <div className="bg-muted p-8 flex flex-col justify-center items-center">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {["SOC", "GDPR", "HIPAA", "ISO"].map((cert, index) => (
                    <div key={index} className="bg-background rounded-lg p-4 flex items-center justify-center">
                      <Image
                        src="/assets/withoutimg.jpg"
                        alt={`${cert} Certification`}
                        width={120}
                        height={60}
                        className="h-12 w-auto object-contain"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-center text-muted-foreground">{t.security.finaltext}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}