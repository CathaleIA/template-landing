"use client";
import { useRouter } from "next/navigation";
import { useTranslation } from '@/../hooks/useTranlation';
import Button from "../atoms/Button";

export default function HeroSection() {
  const router = useRouter();
  const t = useTranslation();

  return (
    <section className="w-full relative h-screen">
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <video className="w-full h-full object-cover" autoPlay muted loop playsInline>
          <source src="/assets/hero_video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="container relative z-20 px-4 md:px-6 max-w-full overflow-hidden h-full flex items-center">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2 w-full">
          <div className="flex flex-col justify-center space-y-8 max-w-4xl">
            {/* Frase gancho principal */}
            <div className="space-y-6 ">
              <div className="space-y-6 lg:space-y-24 xl:space-y-24">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight text-white leading-none">
                  {t.hero.hookPhrase.line1}
                  <span className="block text-[hsl(248,39%,24%)] mt-2">
                    {t.hero.hookPhrase.line2}
                  </span>
                </h1>

                <p className="text-xl md:text-2xl lg:text-3xl text-gray-200 font-light leading-relaxed max-w-3xl">
                  {t.hero.description}
                </p>
              </div>
            </div>


            {/* Botones mejorados */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                text={t.hero.buttons.getStarted}
                withArrow
                onClick={() => router.push("/signup")}
                className="px-8 py-4 text-lg font-semibold bg-[hsl(248,39%,24%)] hover:bg-[hsl(248,39%,20%)] text-white rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
              />
              <Button
                text={t.hero.buttons.demo}
                variant="outline"
                className="px-8 py-4 text-lg font-semibold bg-white/15 text-white border-2 border-white/40 hover:bg-white/25 rounded-full backdrop-blur-sm transform hover:scale-105 transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Elementos decorativos opcionales */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
