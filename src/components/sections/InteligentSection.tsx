import { useTranslation } from '@/../hooks/useTranlation';
import React from 'react';

export default function InteligentSection() {
  const t = useTranslation();
  const inteligentData = t.inteligent; 

  // Función para renderizar el ícono (Placeholder simple)
  const renderIcon = (iconName: string) => {
    // Aquí puedes mapear tu string 'iconName' a un componente de icono real
    // Por simplicidad, solo mostramos el primer carácter del nombre del icono
    return (
      <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-lg transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
        <span className="text-2xl text-primary font-bold">
          {iconName.charAt(0).toUpperCase() || '✨'} 
        </span>
      </div>
    );
  };

  return (
    <section className="relative w-full py-12 md:py-16 lg:py-20 overflow-hidden bg-white">
      {/* Línea separadora superior (mantenemos el estilo) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 border-t-2 border-primary" />

      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        
        {/* Encabezado Principal y Lista de Habilidades (Diseño en dos columnas) */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Contenido izquierdo (Título y Descripción) */}
          <div>
            <div className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-4">
              {inteligentData?.head || "ANÁLISIS ESTRATÉGICO"}
            </div>
            <div className="text-xl font-semibold text-gray-700 mb-2">
              {inteligentData?.subtitle || "La Próxima Generación"}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
              {inteligentData?.mainTitle || "Transforma Datos en"}{' '}
              <span className="text-primary block mt-2">
                {inteligentData?.highlightedTitle || "Insights Accionables"}
              </span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              {inteligentData?.description || "Nuestra plataforma aplica algoritmos de aprendizaje profundo para desvelar patrones ocultos y automatizar la optimización en todas las áreas de tu negocio."}
            </p>
            {/* NO hay botón CTA en esta sección, según tu solicitud. */}
          </div>

          {/* Contenido derecho (Lista de Items/Características) */}
          <div className="grid grid-cols-1 gap-8">
            {inteligentData?.items?.map((item, index) => (
              <div
                key={index}
                className="group bg-white rounded-xl border border-gray-200 shadow-sm p-6 
                           transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 
                           hover:border-primary/20 cursor-default relative overflow-hidden"
              >
                {/* Icono */}
                <div className="mb-4">
                  {renderIcon(item.icon)} 
                </div>

                {/* Título */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>

                {/* Descripción */}
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>

                {/* Barra inferior animada (mantenemos el detalle visual) */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-primary/80 transform -translate-x-full 
                                  transition-transform duration-500 ease-out group-hover:translate-x-0"></div>
                </div>
              </div>
            )) || (
              // Mensaje de fallback si no hay ítems
              <div className="text-gray-400 p-8 border border-dashed rounded-lg text-center">
                Aún no se han cargado las habilidades clave de IA.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}