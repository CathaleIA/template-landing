"use client";

import CookiesSection from "@/components/sections/CookiesSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/sections/Footer";

export default function CookiesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <CookiesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}