import { useTranslation } from '@/../hooks/useTranlation';
import Image from "next/image";
import Link from 'next/link'; // <--- 1. IMPORTAR LINK

export default function SecuritySection() {
  const t = useTranslation();

  return (
    <section id="security" className="relative w-full pt-12 md:pt-16 lg:pt-20 pb-4 bg-gray-50">
      {/* Línea separadora superior */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 border-t-2 border-primary" />

      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        {/* Header Section (sin cambios) */}
        <div className="text-center mb-12 md:mb-16">
          <div className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-4">
            {t.security?.subtitle || "LA SEGURIDAD ES LO PRIMERO"}
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
            {t.security?.mainTitle || "OPTIMIZA TU ARQUITECTURA."}{' '}
            <span className="text-primary block mt-2">
              {t.security?.highlightedTitle || "ELIMINA LOS SILOS DE DATOS."}
            </span>
          </h2>
        </div>

        {/* Main Features Grid - 4 tarjetas principales */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 md:mb-16">
          {t.security?.mainFeatures?.map((feature, index) => (
            // <--- 2. ENVOLVER LA TARJETA CON LINK
            <Link 
              href={feature.link || '#'} // Usamos la URL del JSON (o '#' como fallback)
              key={index}                 // <--- 3. MOVER LA 'key' AQUÍ
              className="block h-full"    // Añadimos 'block' y 'h-full' para que el enlace ocupe el espacio del grid
            >
              <div
                className="group bg-white rounded-xl border border-gray-200 shadow-sm p-6 text-center 
                           transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 
                           hover:border-primary/20 cursor-pointer relative overflow-hidden h-full" // 'h-full' para tarjetas de altura uniforme
              >
                {/* Badge superior */}
                <div className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary text-xs 
                                  font-bold uppercase tracking-wider rounded-full mb-4">
                  {feature.badge}
                </div>

                {/* Icono principal (sin cambios) */}
                <div className="mb-4 flex justify-center">
                  <div className="w-16 h-16 flex items-center justify-center bg-primary/10 rounded-full 
                                  transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                    <Image 
                      src={feature.icon} 
                      alt={feature.title}
                      width={32} 
                      height={32}
                      className="transition-all duration-300"
                      style={{ 
                        filter: 'brightness(0) saturate(100%) invert(47%) sepia(80%) saturate(1969%) hue-rotate(213deg) brightness(97%) contrast(96%)'
                      }}
                    />
                  </div>
                </div>

                {/* Título (sin cambios) */}
                <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight min-h-[3rem] flex items-center justify-center">
                  {feature.title}
                </h3>

                {/* Descripción (sin cambios) */}
                <p className="text-sm text-gray-600 leading-relaxed mb-4 min-h-[4rem]">
                  {feature.description}
                </p>

                {/* <--- 4. CAMBIAR <button> POR <div>
                    Esto es crucial para HTML válido, ya que un <a> no debe contener un <button>
                */}
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="inline-flex items-center text-primary font-medium text-sm"> {/* Quitamos 'hover:text-primary/80' ya que toda la tarjeta tiene hover */}
                    Explorar más
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {/* Barra inferior animada (sin cambios) */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-primary/80 transform -translate-x-full 
                                  transition-transform duration-500 ease-out group-hover:translate-x-0"></div>
                </div>
              </div>
            </Link> // <--- CIERRE DE LINK
          )) || []}
        </div>

        {/* Barra inferior con características de seguridad (sin cambios) */}
        <div className="bg-secondary rounded-xl shadow-sm p-6">
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
            {t.security?.bottomFeatures?.map((feature, index) => (
              <div key={index} className="flex items-center text-white">
                <div className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center mr-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span className="font-medium text-sm md:text-base">{feature}</span>
              </div>
            )) || []}
          </div>
        </div>
      </div>
    </section>
  );
}