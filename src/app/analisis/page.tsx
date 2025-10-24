"use client";

import PricingSection from "@/components/sections/AnalysisSection";
import Footer from "@/components/sections/Footer";
import ContactSection from "@/components/sections/ContactSection";
export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <PricingSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}