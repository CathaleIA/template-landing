"use client";

import Footer from "@/components/sections/Footer";
import ContactSection from "@/components/sections/ContactSection";
import ReportsSection from "@/components/sections/ReportsSection";
export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <ReportsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}