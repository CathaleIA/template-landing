"use client";

// Importa la nueva sección que creamos
import ServicesShowcaseSection from "@/components/sections/ServicesShowcaseSection"; 

// Importa las secciones compartidas
import Footer from "@/components/sections/Footer";
import ContactSection from "@/components/sections/ContactSection";

export default function ServicesShowcasePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Sección principal de Soluciones Flexibles */}
        <ServicesShowcaseSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}