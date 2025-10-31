"use client";

import TermsSection from "@/components/sections/TermsSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/sections/Footer";

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <TermsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}