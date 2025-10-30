"use client";

import AboutUsSection from "@/components/sections/AboutUsSection";
import Footer from "@/components/sections/Footer";
import ContactSection from "@/components/sections/ContactSection";
export default function AboutusPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <AboutUsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}