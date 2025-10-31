"use client";

import { useTranslation } from "@/../hooks/useTranlation";

type CookieSectionItem = {
  id: string;
  title: string;
  text: string;
};

type CookieCategory = {
  id: string;
  name: string;
  description: string;
};

export default function CookiesSection() {
  const t = useTranslation();

  const sections: CookieSectionItem[] = t.cookies?.sections || [];
  const categories: CookieCategory[] = t.cookies?.categories || [];

  return (
    <section
      id="cookies"
      className="relative w-full py-16 md:py-20 lg:py-24 bg-white text-gray-800"
    >
      {/* Línea decorativa superior */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 border-t-2 border-secondary" />

      {/* 🔹 Contenedor alineado con el resto del sitio */}
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {t.cookies?.title}
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            {t.cookies?.lastUpdatedLabel}
          </p>
          <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto mb-6">
            {t.cookies?.intro}
          </p>
          <p className="text-gray-600 text-base italic max-w-2xl mx-auto">
            {t.cookies?.consentNote}
          </p>
        </div>

        {/* Categorías de cookies */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-gray-50 border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <h3 className="text-lg font-semibold text-secondary mb-2">
                {cat.name}
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                {cat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Secciones de texto */}
        <div className="space-y-10 md:space-y-12">
          {sections.map((item) => (
            <div key={item.id} id={item.id} className="group">
              <h2 className="text-xl md:text-2xl font-semibold text-secondary mb-3 relative inline-block">
                {item.title}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-secondary to-secondary/60 transition-all duration-300 group-hover:w-full" />
              </h2>
              <p className="text-gray-700 leading-relaxed text-justify">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* Línea inferior */}
        <div className="mt-16 w-full h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
      </div>
    </section>
  );
}
