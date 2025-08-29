// src/app/layout.tsx
import type { Metadata } from "next";
import { Poppins, Open_Sans, Montserrat } from "next/font/google";
import "@/app/styles/globals.css";
import ClientNavBar from "@/components/navbar/ClientNavBar";
import { LanguageProvider } from "@/context/LanguageContext";
import WhatsAppFloat from "@/components/molecules/WhatsAppFloat";

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
  variable: "--font-montserrat" 
});

export const metadata: Metadata = {
  title: "Copower Dashboard",
  description: "App web, managed your analisis data company",
  icons: {
    icon: "@/../favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${openSans.variable} ${montserrat.variable}`}>
        <LanguageProvider>
          <ClientNavBar />
          {children}
          {/* Botón flotante de WhatsApp */}
          <WhatsAppFloat 
            phoneNumber="573164438383" // Cambia por tu número de WhatsApp
            message="¡Hola! Me interesa obtener más información sobre cathaleia."
          />
        </LanguageProvider>
      </body>
    </html>
  );
}