"use client";

import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import DashboardSection from "@/components/sections/DashboardSection";
import SecuritySection from "@/components/sections/SecuritySection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <SecuritySection />
        <DashboardSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}