interface Feature {
  badge: string;
  icon: string;
  title: string;
  description: string;
}

interface ReportsData {
  subtitle: string;
  mainTitle: string;
  highlightedTitle: string;
  description: string;
  mainFeatures: Feature[];
  bottomFeatures: string[];
}

export default function ReportsSection() {
  // Datos por defecto si no están disponibles en las traducciones
  const defaultData: ReportsData = {
    subtitle: "REPORTERÍA INTELIGENTE",
    mainTitle: "INFORMES AUTOMATIZADOS",
    highlightedTitle: "PROFESIONALES Y PERSONALIZABLES",
    description:
      "Genera y programa informes profesionales con plantillas personalizables y opciones de distribución automática que ahorran tiempo y mejoran la comunicación empresarial.",
    mainFeatures: [
      {
        badge: "AUTOMÁTICO",
        icon: "/icons/automation.svg",
        title: "Generación Automática",
        description:
          "Programa la creación y envío de informes de forma automática según tus necesidades de negocio.",
      },
      {
        badge: "PLANTILLAS",
        icon: "/icons/template.svg",
        title: "Plantillas Profesionales",
        description:
          "Utiliza plantillas prediseñadas o crea las tuyas propias con un editor visual intuitivo.",
      },
      {
        badge: "DISTRIBUCIÓN",
        icon: "/icons/distribution.svg",
        title: "Distribución Inteligente",
        description:
          "Envía informes automáticamente por email, almacena en la nube o integra con otras plataformas.",
      },
      {
        badge: "ANÁLISIS",
        icon: "/icons/insights.svg",
        title: "Insights Avanzados",
        description:
          "Incluye análisis predictivos y recomendaciones basadas en inteligencia artificial.",
      },
    ],
    bottomFeatures: [
      "Programación flexible",
      "Múltiples formatos de exportación",
      "Branding personalizado",
      "Firma digital integrada",
      "Historial de versiones",
    ],
  };

  const data: ReportsData = defaultData;

  return (
    <section
      id="reports"
      className="relative w-full py-16 md:py-20 lg:py-24 bg-background"
    >
      <div className="top-section-bg"></div>
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl"
          style={{
            backgroundColor: `hsl(var(--primary) / 0.05)`
          }}
        />
        <div 
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl"
          style={{
            backgroundColor: `hsl(var(--secondary) / 0.05)`
          }}
        />
      </div>

      {/* Línea separadora superior */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-32 border-t-4"
        style={{ borderColor: `hsl(var(--primary))` }}
      />

      <div className="container relative px-4 md:px-6 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-20">
          <div 
            className="inline-flex items-center px-4 py-2 text-sm font-bold uppercase tracking-wider rounded-full mb-6"
            style={{
              backgroundColor: `hsl(var(--primary) / 0.1)`,
              color: `hsl(var(--primary))`
            }}
          >
            <div 
              className="w-2 h-2 rounded-full mr-2 animate-pulse"
              style={{ backgroundColor: `hsl(var(--primary))` }}
            />
            {data.subtitle}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-foreground">
            {data.mainTitle}{" "}
            <span 
              className="block mt-2"
              style={{ color: `hsl(var(--primary))` }}
            >
              {data.highlightedTitle}
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {data.description}
          </p>
        </div>

        {/* Report Preview Section */}
        <div className="mb-16 md:mb-20">
          <div 
            className="relative rounded-2xl p-8 md:p-12 overflow-hidden shadow-2xl"
            style={{
              backgroundColor: `hsl(var(--secondary))`
            }}
          >
            <div className="absolute inset-0 bg-grid-white/10" />
            <div className="relative z-10">
              <div className="text-center text-white mb-8">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Vista Previa de Informes
                </h3>
                <p className="text-white/80 text-lg">
                  Transforma datos complejos en informes profesionales
                </p>
              </div>

              {/* Simulación de reporte */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-white">
                      Informe Mensual de Ventas
                    </h4>
                    <span className="text-sm text-white/60 bg-white/10 px-2 py-1 rounded">
                      PDF
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Ingresos totales:</span>
                      <span className="font-semibold text-green-300">
                        $248,750
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Nuevos clientes:</span>
                      <span 
                        className="font-semibold"
                        style={{ color: `hsl(var(--primary) / 0.8)` }}
                      >
                        127
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Tasa de conversión:</span>
                      <span className="font-semibold text-orange-300">
                        3.8%
                      </span>
                    </div>
                    <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
                      <div 
                        className="h-full w-3/4 rounded-full"
                        style={{ backgroundColor: `hsl(var(--primary))` }}
                      ></div>
                    </div>
                    <p className="text-xs text-white/50 mt-2">
                      Meta alcanzada: 75%
                    </p>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-white">
                      Análisis de Rendimiento
                    </h4>
                    <span className="text-sm text-white/60 bg-white/10 px-2 py-1 rounded">
                      Excel
                    </span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-green-400 rounded mr-3"></div>
                      <span className="text-sm text-white/70 flex-1">
                        Objetivo cumplido
                      </span>
                      <span className="text-sm font-semibold text-white">85%</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-orange-400 rounded mr-3"></div>
                      <span className="text-sm text-white/70 flex-1">
                        En progreso
                      </span>
                      <span className="text-sm font-semibold text-white">12%</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-red-400 rounded mr-3"></div>
                      <span className="text-sm text-white/70 flex-1">
                        Requiere atención
                      </span>
                      <span className="text-sm font-semibold text-white">3%</span>
                    </div>
                    <div 
                      className="mt-4 p-3 rounded-lg"
                      style={{ backgroundColor: `hsl(var(--primary) / 0.2)` }}
                    >
                      <p 
                        className="text-xs font-medium"
                        style={{ color: `hsl(var(--primary))` }}
                      >
                        Recomendación IA:
                      </p>
                      <p className="text-xs text-white/80">
                        Enfocar recursos en el segmento de clientes premium
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 md:mb-20">
          {data.mainFeatures.map((feature: Feature, index: number) => (
            <div
              key={index}
              className="group bg-card rounded-2xl border shadow-lg p-8 text-center 
                         transition-all duration-500 ease-out hover:shadow-2xl hover:-translate-y-2 
                         cursor-pointer relative overflow-hidden"
              style={{
                borderColor: `hsl(var(--border))`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `hsl(var(--primary) / 0.5)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `hsl(var(--border))`;
              }}
            >
              {/* Efecto de brillo en hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  backgroundColor: `hsl(var(--primary) / 0.02)`
                }}
              />

              <div className="relative z-10">
                {/* Badge superior */}
                <div
                  className="inline-flex items-center px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full mb-6 transition-colors duration-300"
                  style={{
                    backgroundColor: `hsl(var(--primary) / 0.1)`,
                    color: `hsl(var(--primary))`
                  }}
                >
                  {feature.badge}
                </div>

                {/* Icono principal */}
                <div className="mb-6 flex justify-center">
                  <div
                    className="w-20 h-20 flex items-center justify-center rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg"
                    style={{
                      backgroundColor: `hsl(var(--primary) / 0.1)`
                    }}
                  >
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{
                        backgroundColor: `hsl(var(--primary))`
                      }}
                    >
                      <span className="text-white font-bold text-lg">
                        {index + 1}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Título */}
                <h3 className="text-xl font-bold text-card-foreground mb-4 leading-tight min-h-[3rem] flex items-center justify-center">
                  {feature.title}
                </h3>

                {/* Descripción */}
                <p className="text-muted-foreground leading-relaxed mb-6 min-h-[5rem]">
                  {feature.description}
                </p>

                {/* Botón de acción */}
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                  <button
                    className="inline-flex items-center px-6 py-3 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                    style={{
                      backgroundColor: `hsl(var(--primary))`
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = `hsl(var(--primary) / 0.9)`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = `hsl(var(--primary))`;
                    }}
                  >
                    Ver ejemplos
                    <svg
                      className="ml-2 w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Barra inferior animada */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted overflow-hidden">
                <div
                  className="h-full transform -translate-x-full transition-transform duration-700 ease-out group-hover:translate-x-0"
                  style={{
                    backgroundColor: `hsl(var(--primary))`
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Features Banner */}
        <div 
          className="rounded-2xl shadow-2xl p-8 md:p-12 relative overflow-hidden"
          style={{
            backgroundColor: `hsl(var(--primary))`
          }}
        >
          <div className="absolute inset-0 bg-grid-white/10" />
          <div className="relative z-10">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Funcionalidades Premium de Reportería
              </h3>
              <p className="text-white/80 text-lg">
                Todo lo que necesitas para crear informes de nivel empresarial
              </p>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
              {data.bottomFeatures.map((feature: string, index: number) => (
                <div key={index} className="flex items-center text-white group">
                  <div
                    className="w-3 h-3 bg-white/30 rounded-full flex items-center justify-center mr-3 
                                 transition-all duration-300 group-hover:bg-white/50 group-hover:scale-125"
                  >
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>
                  <span
                    className="font-medium text-sm md:text-base transition-all duration-300 
                                 group-hover:text-white/90"
                  >
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}