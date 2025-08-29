import { useTranslation } from '@/../hooks/useTranlation';
import Button from "../atoms/Button";

export default function AboutSection() {
  const t = useTranslation();
  
  return (
    <section id="about" className="w-full py-8 md:py-12 lg:py-16 bg-gray-50">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Contenido de texto */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="text-sm font-medium text-gray-600 uppercase tracking-wider">
                {t.about.badge}
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-snug">
                {t.about.mainTitle}{' '}
                <span className="text-primary">{t.about.highlightedTitle}</span>
              </h1>
              
              <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl">
                {t.about.description}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button text={t.about.primaryButton} />
              <button className="px-5 py-2.5 text-primary font-medium hover:text-primary/80 transition-colors">
                {t.about.secondaryButton} →
              </button>
            </div>
          </div>
          
          {/* Imagen de demostración */}
          <div className="flex items-center justify-center">
            <img
              src="/assets/cathaleia-about.png"
              alt="CathaleIA Platform Demo"
              className="rounded-md border border-gray-200 shadow-lg max-w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
