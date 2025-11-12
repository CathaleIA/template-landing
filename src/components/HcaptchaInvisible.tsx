//src\components\HcaptchaInvisible.tsx
"use client";
import React, { useEffect, useRef, useImperativeHandle, forwardRef } from "react";

declare global {
  interface Window {
    hcaptcha?: {
      render: (el: HTMLElement, opts: {
        sitekey: string;
        size?: "invisible" | "normal" | "compact";
        callback?: (token: string) => void;
        "error-callback"?: () => void;
        "expired-callback"?: () => void;
      }) => string | number;
      execute: (widgetId?: string | number) => void;
      reset: (widgetId?: string | number) => void;
    };
  }
}

type Props = {
  sitekey: string;
  onReady?: () => void;           // << nuevo: notificamos readiness
};

export type HcaptchaHandle = {
  execute: () => Promise<string>;
  reset: () => void;
  isReady: () => boolean;         // << nuevo: consulta de estado
};

const HcaptchaInvisible = forwardRef<HcaptchaHandle, Props>(({ sitekey, onReady }, ref) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | number | null>(null);

  const resolverRef = useRef<((token: string) => void) | null>(null);
  const rejectRef = useRef<((err?: unknown) => void) | null>(null);

  // Cargar script una vez
  useEffect(() => {
    if (window.hcaptcha) return;
    const s = document.createElement("script");
    s.src = "https://js.hcaptcha.com/1/api.js?render=explicit";
    s.async = true;
    s.defer = true;
    document.head.appendChild(s);
  }, []);

  // Renderizar cuando hcaptcha esté listo
  useEffect(() => {
    let timer: number | undefined;

    const tryRender = () => {
      if (!containerRef.current || !sitekey) return;

      if (window.hcaptcha && !widgetIdRef.current) {
        widgetIdRef.current = window.hcaptcha.render(containerRef.current, {
          sitekey,
          size: "invisible",
          callback: (token: string) => resolverRef.current?.(token),
          "error-callback": () => rejectRef.current?.(new Error("hCaptcha error")),
          "expired-callback": () => rejectRef.current?.(new Error("hCaptcha expired")),
        });
        onReady?.(); // << avisamos que ya está listo
      }

      if (!widgetIdRef.current) {
        timer = window.setTimeout(tryRender, 120);
      }
    };

    tryRender();
    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, [sitekey, onReady]);

  useImperativeHandle(ref, () => ({
    execute: () =>
      new Promise<string>((resolve, reject) => {
        if (!window.hcaptcha || widgetIdRef.current == null) {
          reject(new Error("hCaptcha not ready"));
          return;
        }
        resolverRef.current = resolve;
        rejectRef.current = reject;
        window.hcaptcha.execute(widgetIdRef.current);
      }),
    reset: () => {
      if (window.hcaptcha && widgetIdRef.current != null) {
        window.hcaptcha.reset(widgetIdRef.current);
      }
    },
    isReady: () => Boolean(window.hcaptcha && widgetIdRef.current != null),
  }));

  return <div ref={containerRef} className="hidden" aria-hidden="true" />;
});

HcaptchaInvisible.displayName = "HcaptchaInvisible";
export default HcaptchaInvisible;
