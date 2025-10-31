"use client";

import PrivacySection from "@/components/sections/PrivacySection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/sections/Footer";

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <PrivacySection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
