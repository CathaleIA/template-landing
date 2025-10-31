// src/app/layout.tsx
// ~L1
import type { Metadata } from "next";
import { Poppins, Open_Sans, Montserrat } from "next/font/google";
import "@/app/styles/globals.css";
import ClientNavBar from "@/components/navbar/ClientNavBar";
import { LanguageProvider } from "@/context/LanguageContext";
import WhatsAppFloat from "@/components/molecules/WhatsAppFloat";
// ⬇️ NUEVO: importa el gate del loader (cliente)
// ~L9
import HydrationGate from "@/components/HydrationGate";

const poppins = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Copower Dashboard",
  description: "App web, managed your analisis data company",
  icons: {
    icon: "@/../favicon.ico",
  },
};

// ~L34
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // ~L41
    <html lang="en">
      <body className={`${poppins.variable} ${openSans.variable} ${montserrat.variable}`}>
        <LanguageProvider>
          <ClientNavBar />

          {/* ⬇️ NUEVO: Pantalla de carga hasta hidratación y (opcional) imágenes críticas */}
          {/* ~L48 */}
          <HydrationGate
            message="Cargando Cathaleia…"
            // Marca tus imágenes clave con data-critical="true" si quieres esperar a que carguen antes de mostrar la página
            waitForImagesSelectors={["img[data-critical='true']"]}
          >
            {/* Mantengo tu estructura: las secciones siguen controlando sus propios contenedores */}
            {/* ~L55 */}
            {children}
          </HydrationGate>

          {/* Botón flotante de WhatsApp (queda fuera; el overlay lo cubrirá mientras carga) */}
          {/* ~L61 */}
          <WhatsAppFloat
            phoneNumber="573164438383"
            message="¡Hola! Me interesa obtener más información sobre cathaleia."
          />
        </LanguageProvider>
      </body>
    </html>
  );
}
