import { useTranslation } from '@/../hooks/useTranlation';
import Image from "next/image";

export default function SecuritySection() {
  const t = useTranslation();
  
  return (
    <section id="security" className="w-full py-8 md:py-12 lg:py-16 bg-gray-50">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        {/* Sección principal con título grande */}
        <div className="text-center mb-8 md:mb-12">
          <div className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-4">
            {t.security.subtitle}
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-snug mb-2">
            {t.security.mainTitle}{' '}
            <span className="text-primary">{t.security.highlightedTitle}</span>
          </h2>
        </div>

        {/* Sección de características principales */}
        <div className="grid md:grid-cols-3 gap-6 mb-8 md:mb-12">
          {t.security.mainFeatures.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 text-center h-full flex flex-col">
              <div className="mb-4 flex justify-center">
                <div className="w-12 h-12 flex items-center justify-center">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    width={32}
                    height={32}
                    className="text-primary"
                    style={{ filter: 'brightness(0) saturate(100%) invert(11%) sepia(26%) saturate(2048%) hue-rotate(225deg) brightness(97%) contrast(96%)' }}
                  />
                </div>
              </div>
              <h3 className="text-sm font-medium text-primary uppercase tracking-wider mb-2">
                {feature.badge}
              </h3>
              <h4 className="text-xl font-bold text-foreground mb-3 flex-grow">
                {feature.title}
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Grid de servicios */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 md:mb-12">
          {t.security.services.map((service, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 h-full flex flex-col">
              <h3 className="font-bold text-foreground mb-3 flex-grow">
                {service.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Barra inferior con características */}
        <div className="bg-primary rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
            {t.security.bottomFeatures.map((feature, index) => (
              <div key={index} className="flex items-center text-primary-foreground">
                <div className="w-4 h-4 bg-primary-foreground rounded-full flex items-center justify-center mr-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </div>
                <span className="font-medium text-sm md:text-base">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}