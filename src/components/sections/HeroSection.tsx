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
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <video className="w-full h-full object-cover" autoPlay muted loop playsInline>
          <source src="/assets/hero_video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="container relative z-20 px-4 md:px-6 max-w-full overflow-hidden h-full flex items-center">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white">
                {t.hero.title}
              </h1>
              <p className="max-w-[600px] text-gray-200 md:text-xl">{t.hero.description}</p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button
                text={t.hero.buttons.getStarted}
                withArrow
                onClick={() => router.push("/signup")}
              />
              <Button
                text={t.hero.buttons.demo}
                variant="outline"
                className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}