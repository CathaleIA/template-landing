import { useTranslation } from '@/../hooks/useTranlation';
import SectionHeader from "../atoms/SectionHeader";
import Image from "next/image";
import { useState } from 'react';

export default function DashboardSection() {
  const t = useTranslation();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section id="dashboard" className="w-full py-8 md:py-12 lg:py-16 bg-gray-50">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <SectionHeader
          badge={t.dashboard.head}
          title={t.dashboard.title}
          description={t.dashboard.description}
        />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 mt-8 md:mt-12">
          {t.dashboard.features.map((feature, index) => (
            <div
              key={feature.value}
              className={`relative bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer ${
                index === 0 || index === 1 ? 'lg:col-span-1' : 'lg:col-span-1'
              }`}
              onMouseEnter={() => setHoveredCard(feature.value)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Imagen de fondo */}
              <div className="relative h-64 md:h-80 overflow-hidden">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Contenido siempre visible */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-3">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium uppercase tracking-wider opacity-90">
                      {feature.badge}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm md:text-base opacity-90 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Contenido en hover */}
                <div className={`absolute inset-0 bg-primary/95 backdrop-blur-sm transition-all duration-300 flex items-center justify-center p-6 ${
                  hoveredCard === feature.value ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}>
                  <div className="text-center text-white">
                    <h4 className="text-xl md:text-2xl font-bold mb-4">{feature.hoverTitle}</h4>
                    <div className="space-y-3">
                      {feature.capabilities.map((capability, capIndex) => (
                        <div key={capIndex} className="flex items-center justify-center text-sm md:text-base">
                          <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                          <span className="font-medium">{capability}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 inline-flex items-center px-4 py-2 bg-white text-primary rounded-full text-sm font-medium">
                      {feature.catchPhrase}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Llamada a la acción inferior */}
        <div className="text-center mt-8 md:mt-12">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
              ¿Listo para transformar tus datos?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Descubre cómo nuestras herramientas pueden potenciar tu negocio con análisis inteligentes y automatización.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                Explorar Funcionalidades
              </button>
              <button className="px-6 py-3 text-primary font-medium hover:text-primary/80 transition-colors">
                Ver Demostración →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}