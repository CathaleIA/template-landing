// components/HydrationGate.tsx
"use client";
// ~L1

import { useEffect, useState } from "react";
import FullPageLoader from "./FullPageLoader";

// Opcional: pasa selectores CSS de imágenes que quieras esperar (hero, banners, etc.)
// ~L7
type HydrationGateProps = {
  children: React.ReactNode;
  waitForImagesSelectors?: string[]; // e.g. ["img[data-critical='true']"]
  message?: string;
};

// ~L13
export default function HydrationGate({
  children,
  waitForImagesSelectors = [],
  message = "Preparando experiencia…",
}: HydrationGateProps) {
  const [hydrated, setHydrated] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(waitForImagesSelectors.length === 0);

  // Marca hidratado cuando el componente monta (cliente listo)
  // ~L22
  useEffect(() => {
    setHydrated(true);
  }, []);

  // Espera a que carguen imágenes críticas si se indicaron selectores
  // ~L27
  useEffect(() => {
    if (waitForImagesSelectors.length === 0) return;

    const imgs = waitForImagesSelectors.flatMap((selector) =>
      Array.from(document.querySelectorAll<HTMLImageElement>(selector))
    );

    if (imgs.length === 0) {
      setImagesLoaded(true);
      return;
    }

    let pending = imgs.length;

    const onOneLoad = () => {
      pending -= 1;
      if (pending <= 0) setImagesLoaded(true);
    };

    imgs.forEach((img) => {
      if (img.complete) {
        onOneLoad();
      } else {
        img.addEventListener("load", onOneLoad, { once: true });
        img.addEventListener("error", onOneLoad, { once: true }); // no bloquear si falla
      }
    });

    // Limpieza por si el componente se desmonta
    // ~L55
    return () => {
      imgs.forEach((img) => {
        img.removeEventListener("load", onOneLoad);
        img.removeEventListener("error", onOneLoad);
      });
    };
  }, [waitForImagesSelectors]);

  const ready = hydrated && imagesLoaded;

  // Overlay mientras no esté listo
  // ~L67
  return (
    <>
      {!ready && <FullPageLoader message={message} />}
      {/* Evita “parpadeo” del contenido debajo del overlay */}
      {/* ~L72 */}
      <div aria-hidden={!ready} className={!ready ? "opacity-0" : "opacity-100 transition-opacity duration-200"}>
        {children}
      </div>
    </>
  );
}
