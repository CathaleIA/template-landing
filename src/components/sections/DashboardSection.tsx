import { useTranslation } from '@/../hooks/useTranlation';
import SectionHeader from "../atoms/SectionHeader";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from 'react';

export default function DashboardSection() {
  const t = useTranslation();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement | null>(null);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Mouse tracking for subtle parallax effects
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setMousePosition({ x, y });
  };

  return (
    <section 
      ref={sectionRef}
      id="dashboard" 
      className="w-full py-8 md:py-12 lg:py-16 bg-gray-50 overflow-hidden"
    >
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        {/* Header with entry animation */}
        <div className={`transition-all duration-1000 ease-out transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <SectionHeader
            badge={t.dashboard.head}
            title={t.dashboard.title}
            description={t.dashboard.description}
          />
        </div>
        
        {/* Grid of features with staggered animations */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 mt-8 md:mt-12">
          {t.dashboard.features.map((feature, index) => (
            <div
              key={feature.value}
              className={`relative bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden group cursor-pointer transition-all duration-700 ease-out transform ${
                isVisible 
                  ? 'translate-y-0 opacity-100 scale-100' 
                  : 'translate-y-12 opacity-0 scale-95'
              } hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2`}
              style={{
                transitionDelay: `${index * 200}ms`,
                transform: hoveredCard === feature.value 
                  ? `translateY(-8px) rotateX(2deg) rotateY(${mousePosition.x * 0.3}deg)` 
                  : undefined
              }}
              onMouseEnter={() => setHoveredCard(feature.value)}
              onMouseLeave={() => setHoveredCard(null)}
              onMouseMove={handleMouseMove}
            >
              {/* Glow effect border */}
              <div className={`absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-xl opacity-0 transition-opacity duration-500 ${
                hoveredCard === feature.value ? 'opacity-100' : ''
              }`} style={{ padding: '1px' }}>
                <div className="w-full h-full bg-white rounded-xl"></div>
              </div>

              {/* Background image with enhanced effects */}
              <div className="relative h-64 md:h-80 overflow-hidden">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className={`object-cover transition-all duration-700 ease-out ${
                    hoveredCard === feature.value 
                      ? 'scale-110 blur-[1px]' 
                      : 'scale-100'
                  }`}
                />
                
                {/* Gradient overlay with animation */}
                <div className={`absolute inset-0 transition-all duration-500 ${
                  hoveredCard === feature.value
                    ? 'bg-gradient-to-t from-black/80 via-black/40 to-black/20'
                    : 'bg-gradient-to-t from-black/70 via-black/20 to-transparent'
                }`} />
                
                {/* Decorative floating particles */}
                <div className="absolute inset-0 opacity-30">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className={`absolute w-1 h-1 bg-white rounded-full transition-all duration-1000 ${
                        hoveredCard === feature.value ? 'animate-pulse' : ''
                      }`}
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${10 + i * 12}%`,
                        animationDelay: `${i * 200}ms`,
                        transform: hoveredCard === feature.value 
                          ? `translateY(-${i * 2}px)` 
                          : 'translateY(0)'
                      }}
                    />
                  ))}
                </div>

                {/* Always visible content with enhanced animations */}
                <div className={`absolute bottom-0 left-0 right-0 p-6 text-white transition-all duration-500 transform ${
                  hoveredCard === feature.value 
                    ? 'translate-y-2 opacity-90' 
                    : 'translate-y-0 opacity-100'
                }`}>
                  <div className="flex items-center mb-2">
                    <div className={`w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-3 transition-all duration-300 ${
                      hoveredCard === feature.value ? 'scale-110 rotate-12' : 'scale-100 rotate-0'
                    }`}>
                      <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
                    </div>
                    <span className="text-sm font-medium uppercase tracking-wider opacity-90">
                      {feature.badge}
                    </span>
                  </div>
                  <h3 className={`text-xl md:text-2xl font-bold mb-2 transition-all duration-300 ${
                    hoveredCard === feature.value ? 'text-primary-light' : 'text-white'
                  }`}>
                    {feature.title}
                  </h3>
                  <p className="text-sm md:text-base opacity-90 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Hover content with smooth animations */}
                <div className={`absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/90 to-primary/95 backdrop-blur-sm transition-all duration-500 ease-out flex items-center justify-center p-6 ${
                  hoveredCard === feature.value 
                    ? 'opacity-100 visible scale-100' 
                    : 'opacity-0 invisible scale-105'
                }`}>
                  <div className={`text-center text-white transition-all duration-700 transform ${
                    hoveredCard === feature.value 
                      ? 'translate-y-0 opacity-100' 
                      : 'translate-y-4 opacity-0'
                  }`}>
                    <h4 className="text-xl md:text-2xl font-bold mb-4 animate-pulse">
                      {feature.hoverTitle}
                    </h4>
                    <div className="space-y-3 mb-6">
                      {feature.capabilities.map((capability, capIndex) => (
                        <div 
                          key={capIndex} 
                          className={`flex items-center justify-center text-sm md:text-base transition-all duration-300 transform ${
                            hoveredCard === feature.value 
                              ? 'translate-x-0 opacity-100' 
                              : 'translate-x-4 opacity-0'
                          }`}
                          style={{ transitionDelay: `${capIndex * 100}ms` }}
                        >
                          <div className="w-2 h-2 bg-white rounded-full mr-3 animate-bounce" 
                               style={{ animationDelay: `${capIndex * 200}ms` }}></div>
                          <span className="font-medium">{capability}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Learn more button */}
                    <div className="space-y-3">
                      <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur text-white rounded-full text-sm font-medium border border-white/30 transition-all duration-300 hover:bg-white/30">
                        {feature.catchPhrase}
                      </div>
                      <div className="mt-4">
                        <Link
                          href={`/${feature.value}`}
                          className="inline-flex items-center px-6 py-3 bg-white text-primary rounded-full text-sm font-bold transition-all duration-300 hover:bg-gray-100 hover:scale-105 hover:shadow-lg transform group"
                        >
                          <span>Conocer más</span>
                          <svg 
                            className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover indicator */}
                <div className={`absolute top-4 right-4 transition-all duration-300 ${
                  hoveredCard === feature.value 
                    ? 'opacity-100 scale-100 rotate-0' 
                    : 'opacity-0 scale-75 rotate-45'
                }`}>
                  <div className="w-8 h-8 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom call to action with enhanced animation */}
        <div className={`text-center mt-8 md:mt-12 transition-all duration-1000 ease-out transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`} style={{ transitionDelay: '800ms' }}>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8 relative overflow-hidden group hover:shadow-xl transition-all duration-500">
            {/* Subtle shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 relative z-10">
              ¿Listo para transformar tus datos?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto relative z-10">
              Descubre cómo nuestras herramientas pueden potenciar tu negocio con análisis inteligentes y automatización.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}