"use client";

import IntegralSecton from "@/components/sections/IntegralSection";
import Footer from "@/components/sections/Footer";
import ContactSection from "@/components/sections/ContactSection";
export default function integralPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <IntegralSecton />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}