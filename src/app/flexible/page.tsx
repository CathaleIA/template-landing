"use client";

// Importa la nueva sección que creamos
import FlexibleSection from "@/components/sections/FlexibleSection"; 

// Importa las secciones compartidas
import Footer from "@/components/sections/Footer";
import ContactSection from "@/components/sections/ContactSection";

export default function FlexiblePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Sección principal de Soluciones Flexibles */}
        <FlexibleSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}