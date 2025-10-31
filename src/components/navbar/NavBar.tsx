"use client";
import Image from "next/image";
import MobileMenu from "@/components/mobile-menu/MobileMenu";
import Link from "next/link";
import { useEffect, useState } from "react";
// 1. Importa usePathname
import { usePathname } from "next/navigation";

import LanguageSwitcher from "@/components/ui/LenguageToggle";
import { useTranslation } from "@/../hooks/useTranlation";

export default function NavBar() {
  const t = useTranslation();

  // 2. Obtén la ruta actual
  const pathname = usePathname();

  // 1. Define tu lista de rutas sólidas
  // (Agrega aquí todas las rutas que necesites)
  const solidRoutes = [
    "/analysis",
    "/reports",
    "/inteligent",
    "/flexible",
    "/security_standar/",
    "/aboutus/",
    "/contact/",
    "/servicesShowcase/",
    "/privacy/",
    "/terms/",
    "/cookies/",
    "/integral/",
  ];

  // 2. Comprueba si la ruta actual COMIENZA con alguna de las de la lista
  const isSolidPage = solidRoutes.some((route) => pathname.startsWith(route));

  // Estado de scroll
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 4. Lógica de estilo actualizada
  // El navbar será sólido SI:
  //    a) El usuario ha hecho scroll (scrolled)
  //    b) O, si estamos en la página de análisis (isAnalysisPage)
  const isSolid = scrolled || isSolidPage;

  return (
    <header
      className={`
        fixed top-0 z-40 w-full
        transition-all duration-300
        ${
          // 5. Aplica la nueva lógica 'isSolid'
          isSolid
            ? "bg-background border-b border-border backdrop-blur-none shadow-sm" // Sólido
            : "backdrop-blur-md bg-background/10 border-none" // Transparente
        }
      `}
    >
      <div className="container flex h-16 items-center justify-between py-4 px-4 md:px-6 w-full">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/">
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              <Image
                src="/assets/insignia_degrade.png"
                alt="ctahlkesd"
                width={20}
                height={20}
              />
              <span
                className={`text-xl font-black transition-colors duration-300 ${
                  // 6. Aplica 'isSolid' al texto del logo
                  isSolid ? "text-foreground" : "text-white"
                }`}
              >
                CATHALE
                <span
                  className={`font-bold transition-colors duration-300 ${
                    isSolid ? "text-muted-foreground" : "text-white/70"
                  }`}
                >
                  IA
                </span>
              </span>
            </div>
          </Link>
        </div>

        {/* Mobile Menu */}
        <MobileMenu />

        {/* Navegación */}
        <nav className="hidden md:flex items-center gap-2 lg:gap-6">
          {t.header.nav.map((nav) => (
            <Link
              key={nav.id}
              // (Sigo asumiendo que estos links van a la homepage)
              href={`/#${nav.id}`}
              className={`
                relative px-2 py-1
                text-sm font-bold
                hover:text-primary hover:font-black
                /* ...otras clases... */
                ${
                  // 7. Aplica 'isSolid' al texto de los links
                  isSolid ? "text-foreground" : "text-white"
                }
              `}
            >
              {nav.title}
            </Link>
          ))}
        </nav>

        {/* Acciones */}
        <div className="flex items-center">
          <div
            className={`mr-2 transition-colors duration-300 ${
              // 8. Aplica 'isSolid' al separador
              isSolid ? "text-muted-foreground" : "text-white/50"
            }`}
          >
            |
          </div>

          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
