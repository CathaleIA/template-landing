"use client";

import InteligentSection from "@/components/sections/InteligentSection";
import Footer from "@/components/sections/Footer";
import ContactSection from "@/components/sections/ContactSection";

export default function InteligentPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Sección principal de Análisis y Modelado con IA Avanzada */}
        <InteligentSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}