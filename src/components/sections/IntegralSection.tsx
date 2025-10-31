import { useTranslation } from '@/../hooks/useTranlation';
import Link from 'next/link';
import Button from "../atoms/Button";


export default function IntegralSection() {
  const t = useTranslation();
  
  return (
    <section id="integral" className="w-full py-16 md:py-20 lg:py-24 bg-white">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 space-y-4">
          <div className="text-sm font-semibold text-primary uppercase tracking-wider">
            {t.integral.head}
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            {t.integral.title}
          </h2>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
            {t.integral.description}
          </p>
        </div>

        {/* Grid de Items */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {t.integral.items.map((item, index) => (
            <div
              key={index}
              className="group relative bg-gray-50 rounded-xl p-6 hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              {/* Número decorativo */}
              <div className="absolute -top-3 -left-3 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                {index + 1}
              </div>
              
              {/* Contenido */}
              <div className="space-y-3 mt-4">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                  {item.title.replace(/^\d+\.\s*/, '')}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {item.content}
                </p>
              </div>

              {/* Indicador hover */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg
                  className="w-5 h-5 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-6 pt-8 border-t border-gray-200">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
            ¿Listo para transformar tu gestión de datos?
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/contact">
              <Button text="Agenda una Demo" withArrow />
            </Link>
            <Link
              href="/services"
              className="px-6 py-3 text-secondary font-semibold hover:text-secondary/80 transition-colors"
            >
              Conoce más servicios →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}