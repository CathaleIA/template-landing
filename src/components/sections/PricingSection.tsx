import { useState } from 'react';
import { useTranslation } from '@/../hooks/useTranlation';

export default function PricingSection() {
  const t = useTranslation();
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section className="relative w-full py-12 md:py-16 lg:py-20 overflow-hidden">
      <div className="top-section-bg"></div>

      {/* Línea separadora superior */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 border-t-2 border-primary" />

      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <div className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-4"></div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
            {t.pricing?.title || "Precios simples y transparentes"}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t.pricing?.description || "Elige el plan que mejor se adapte a tu equipo. Todos los planes incluyen una prueba gratuita de 14 días."}
          </p>
        </div>

        {/* Toggle mensual/anual */}
        <div className="flex justify-center mb-12 md:mb-16">
          <div className="inline-flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                !isAnnual
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {t.pricing?.topics?.[0] || "Mensual"}
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                isAnnual
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {t.pricing?.topics?.[1] || "Anual"}
            </button>
            {/* Badge "Ahorra 20%" */}
            <div className="ml-3 inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-full">
              {t.pricing?.add || "Ahorra 20%"}
            </div>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {t.pricing?.plans?.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl border shadow-sm p-8 transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 ${
                plan.popular
                  ? 'border-primary shadow-lg ring-2 ring-primary/20 scale-105'
                  : 'border-gray-200 hover:border-primary/20'
              }`}
            >
              {/* Badge "Popular" */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="inline-flex items-center px-4 py-2 bg-primary text-white text-sm font-bold uppercase tracking-wider rounded-full shadow-lg">
                    Popular
                  </div>
                </div>
              )}

              {/* Plan name */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div className="text-center mb-8">
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl md:text-5xl font-bold text-gray-900">
                    ${isAnnual ? Math.round(plan.monthlyPrice * 0.8) : plan.monthlyPrice}
                  </span>
                  <span className="text-gray-600 ml-2">/mes</span>
                </div>
                {isAnnual && (
                  <div className="text-sm text-gray-500 mt-1">
                    {t.pricing?.texto3} (${Math.round(plan.monthlyPrice * 0.8 * 12)}/{t.pricing?.texto4})
                  </div>
                )}
              </div>

              {/* Features */}
              <div className="mb-8">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center bg-primary/10 rounded-full mt-0.5 mr-3">
                        <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-600 text-sm leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button → ahora es un link a WhatsApp */}
              <a
                href={`https://api.whatsapp.com/send/?phone=573164438383&text=${encodeURIComponent(
                  `¡Hola! Me interesa obtener más información sobre el plan ${plan.name} de Cathaleia.`
                )}&type=phone_number&app_absent=0`}
                target="_blank"
                rel="noopener noreferrer"
                className={`block text-center w-full py-3 px-6 rounded-lg font-semibold text-sm transition-all duration-200 ${
                  plan.popular
                    ? 'bg-primary text-white hover:bg-primary/90 shadow-lg hover:shadow-xl'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
              >
                {t.pricing?.button || "Comenzar"}
              </a>

              {/* Bottom border animation */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100 overflow-hidden rounded-b-2xl">
                <div className={`h-full bg-gradient-to-r transition-all duration-500 ease-out ${
                  plan.popular 
                    ? 'from-primary to-primary/80 translate-x-0'
                    : 'from-primary to-primary/80 transform -translate-x-full group-hover:translate-x-0'
                }`}></div>
              </div>
            </div>
          )) || []}
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center mt-12 md:mt-16">
          <div className="bg-gray-50 rounded-xl p-8 max-w-3xl mx-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {t.pricing?.texto1 || "¿No estás seguro de qué plan elegir?"}
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {t.pricing?.texto2 || "Todos los planes incluyen una prueba gratuita de 14 días. Sin compromiso, sin tarjeta de crédito requerida."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://api.whatsapp.com/send/?phone=573164438383&text=%C2%A1Hola%21+Estoy+interesado+en+recibir+asesor%C3%ADa+sobre+los+planes+de+Cathaleia.&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                {t.pricing?.boton2 || "Contactar ventas"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
