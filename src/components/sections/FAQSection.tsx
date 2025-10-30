import { useState } from "react";
import { useTranslation } from "@/../hooks/useTranlation";

export default function FAQSection() {
  const t = useTranslation();
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const toggleFAQ = (index: number) => {
    setOpenIndexes(
      (prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index) // si ya está abierto, lo cierra
          : [...prev, index] // si no, lo agrega
    );
  };

  return (
    <section className="relative w-full py-12 md:py-16 lg:py-20 bg-gray-50">
      <div className="container px-4 md:px-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t.whyChoose?.faqTitle || "PREGUNTAS"}
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            {t.whyChoose?.faqSubtitle || "FRECUENTES"}
          </h3>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {t.whyChoose?.faqs?.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="font-semibold text-gray-900 pr-4">
                  {faq.question}
                </span>
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform duration-200 flex-shrink-0 ${
                    openIndexes.includes(index) ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndexes.includes(index)
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          )) || []}
        </div>
      </div>
    </section>
  );
}
