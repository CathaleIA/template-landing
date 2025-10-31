"use client";

import DataExperienceSection from "@/components/sections/DataExperienceSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/sections/Footer";

export default function DataExperiencePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <DataExperienceSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
