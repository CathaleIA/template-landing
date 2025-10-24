import { FC } from "react";

interface Feature {
  badge: string;
  icon: string;
  title: string;
  description: string;
}

interface AnalysisData {
  subtitle: string;
  mainTitle: string;
  highlightedTitle: string;
  description: string;
  mainFeatures: Feature[];
  bottomFeatures: string[];
}

const defaultData: AnalysisData = {
  subtitle: "ANÁLISIS AVANZADO",
  mainTitle: "ANÁLISIS EN TIEMPO REAL",
  highlightedTitle: "DATOS QUE IMPULSAN DECISIONES",
  description:
    "Monitorea métricas clave con dashboards interactivos y visualizaciones dinámicas que se actualizan al instante para mantener tu negocio siempre un paso adelante.",
  mainFeatures: [
    {
      badge: "TIEMPO REAL",
      icon: "/icons/dashboard.svg",
      title: "Dashboards Interactivos",
      description:
        "Visualiza tus datos más importantes con gráficos dinámicos y personalizables que se actualizan automáticamente.",
    },
    {
      badge: "MÉTRICAS",
      icon: "/icons/analytics.svg",
      title: "Métricas Clave",
      description:
        "Identifica KPIs críticos y monitorea el rendimiento de tu negocio con alertas inteligentes.",
    },
    {
      badge: "VISUALIZACIÓN",
      icon: "/icons/chart.svg",
      title: "Gráficos Dinámicos",
      description:
        "Transforma datos complejos en visualizaciones claras y fáciles de interpretar para todos los niveles.",
    },
    {
      badge: "ALERTAS",
      icon: "/icons/notification.svg",
      title: "Alertas Inteligentes",
      description:
        "Recibe notificaciones automáticas cuando tus métricas superen umbrales predefinidos.",
    },
  ],
  bottomFeatures: [
    "Actualizaciones en tiempo real",
    "Dashboards personalizables",
    "Múltiples fuentes de datos",
    "Alertas automáticas",
    "Exportación de reportes",
  ],
};

const AnalysisSection: FC = () => {
  // Si no hay traducción disponible, usamos defaultData
  const data: AnalysisData = defaultData;

  return (
    <section
      id="analysis"
      className="relative w-full py-16 md:py-20 lg:py-24 bg-background"
    >
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

        {/* Hero Image/Demo Section */}
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
                  Panel de Control en Acción
                </h3>
                <p className="text-white/80 text-lg">
                  Visualiza cómo tus datos cobran vida en tiempo real
                </p>
              </div>

              {/* Simulación de dashboard */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="flex items-center mb-4">
                    <div className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse" />
                    <span className="text-white font-semibold">
                      Ventas Activas
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">
                    $127,439
                  </div>
                  <div className="text-green-300 text-sm">↗ +15.3% vs ayer</div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="flex items-center mb-4">
                    <div 
                      className="w-3 h-3 rounded-full mr-2 animate-pulse"
                      style={{ backgroundColor: `hsl(var(--primary))` }}
                    />
                    <span className="text-white font-semibold">
                      Usuarios Online
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">2,847</div>
                  <div 
                    className="text-sm"
                    style={{ color: `hsl(var(--primary) / 0.8)` }}
                  >
                    ↗ +8.1% última hora
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="flex items-center mb-4">
                    <div className="w-3 h-3 bg-orange-400 rounded-full mr-2 animate-pulse" />
                    <span className="text-white font-semibold">Conversión</span>
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">4.2%</div>
                  <div className="text-orange-300 text-sm">
                    ↘ -0.3% esta semana
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 md:mb-20">
          {data.mainFeatures.map((feature, index) => (
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
                    Explorar función
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
                        d="M13 7l5 5-5 5M6 12h12"
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
                Características Principales del Sistema
              </h3>
              <p className="text-white/80 text-lg">
                Todo lo que necesitas para análisis profesional en tiempo real
              </p>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
              {data.bottomFeatures.map((feature, index) => (
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
};

export default AnalysisSection;