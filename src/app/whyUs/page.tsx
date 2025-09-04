"use client";

import WhyChooseSection from "@/components/sections/WhyChooseSection";
import FAQSection from "@/components/sections/FAQSection";
import Footer from "@/components/sections/Footer";
import ContactSection from "@/components/sections/ContactSection";
export default function WhyChoosePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <WhyChooseSection />
        <FAQSection />
         <ContactSection />
      </main>
      <Footer />
    </div>
  );
}