"use client";

// Importa la nueva sección que creamos
import AboutContactSection from "@/components/sections/AboutContactSection"; 

// Importa las secciones compartidas
import Footer from "@/components/sections/Footer";
import ContactSection from "@/components/sections/ContactSection";

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Sección principal de Soluciones Flexibles */}
        <AboutContactSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}