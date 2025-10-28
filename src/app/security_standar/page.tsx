"use client";

// 1. Importa la nueva sección que creamos
import SecurityStandarSection from "@/components/sections/Security_StandarSection"; 

// 2. Importa las secciones compartidas
import Footer from "@/components/sections/Footer";
import ContactSection from "@/components/sections/ContactSection";

export default function SecurityStandarPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* 3. Sección principal de Seguridad */}
        <SecurityStandarSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}