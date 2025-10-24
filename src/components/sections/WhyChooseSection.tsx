import { useTranslation } from '@/../hooks/useTranlation';

export default function WhyChooseSection() {
  const t = useTranslation();

  return (
<section className="relative w-full py-12 md:py-16 lg:py-20 overflow-hidden">
  <div className="top-section-bg"></div>
      {/* Línea separadora superior */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 border-t-2 border-primary" />

      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16 md:mb-20">
          {/* Contenido izquierdo */}
          <div>
            <div className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-4">
              {t.whyChoose?.subtitle || "FÁCIL."}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
              {t.whyChoose?.mainTitle || "CONECTADO."}{' '}
              <span className="text-primary block mt-2">
                {t.whyChoose?.highlightedTitle || "CONFIABLE."}
              </span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              {t.whyChoose?.description || "Las empresas líderes confían en Cathaleia para potenciar el ciclo completo de datos, desde la ingesta hasta el intercambio, para que puedan innovar más rápido y hacer más con sus datos."}
            </p>
            <button className="inline-flex items-center px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl">
              {t.whyChoose?.ctaButton || "COMENZAR GRATIS"}
            </button>
          </div>

          {/* Estadísticas lado derecho */}
          <div className="bg-gray-50 rounded-2xl p-8 lg:p-12">
            <div className="grid grid-cols-1 gap-8">
              {t.whyChoose?.stats?.map((stat, index) => (
                <div key={index} className="border-l-4 border-primary pl-6">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 text-sm leading-relaxed">
                    {stat.description}
                  </div>
                </div>
              )) || []}
            </div>
          </div>
        </div>

        {/* Separador visual */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent mb-16 md:mb-20"></div>

        {/* Características principales */}
        <div className="mb-16 md:mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t.whyChoose?.featuresTitle || "¿Por qué las empresas eligen Cathaleia?"}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t.whyChoose?.featuresDescription || "Descubre las ventajas competitivas que hacen de Cathaleia la plataforma preferida para la gestión inteligente de datos."}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.whyChoose?.features?.map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-xl border border-gray-200 shadow-sm p-6 
                           transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 
                           hover:border-primary/20 cursor-pointer relative overflow-hidden"
              >
                {/* Icono */}
                <div className="mb-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-lg 
                                 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                    <span className="text-2xl">{feature.icon}</span>
                  </div>
                </div>

                {/* Título */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>

                {/* Descripción */}
                <p className="text-gray-600 leading-relaxed mb-4">
                  {feature.description}
                </p>

                {/* Beneficio cuantificable */}
                <div className="text-primary font-semibold text-sm">
                  {feature.benefit}
                </div>

                {/* Barra inferior animada */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-primary/80 transform -translate-x-full 
                                 transition-transform duration-500 ease-out group-hover:translate-x-0"></div>
                </div>
              </div>
            )) || []}
          </div>
        </div>

        {/* Sección de tecnología */}
        <div className="bg-secondary rounded-2xl p-8 lg:p-12 mb-16 md:mb-20">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {t.whyChoose?.techTitle || "Tecnología empresarial de primer nivel"}
            </h2>
            <p className="text-white/90 text-lg max-w-3xl mx-auto">
              {t.whyChoose?.techDescription || "Construido sobre la infraestructura más confiable del mundo"}
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 text-center">
            {t.whyChoose?.techFeatures?.map((tech, index) => (
              <div key={index} className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-white font-semibold mb-2">{tech.name}</div>
                <div className="text-white/80 text-sm">{tech.description}</div>
              </div>
            )) || []}
          </div>
        </div>

        {/* CTA Final */}

      </div>
    </section>
  );
}