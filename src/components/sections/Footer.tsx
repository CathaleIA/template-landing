import { useTranslation } from '@/../hooks/useTranlation';
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp, FaLinkedin, FaGithubAlt, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  const t = useTranslation();
  
  return (
    <footer className="w-full bg-white text-gray-800 border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-6 py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 group">
              <div className="relative overflow-hidden rounded-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-primary/20">
                <Image
                  src="/assets/insignia_degrade.png"
                  alt="CathaleIA Logo"
                  width={48}
                  height={48}
                  className="rounded transition-transform duration-300 group-hover:rotate-3"
                />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent transition-all duration-300 group-hover:from-primary/90 group-hover:to-primary">
                CathaleIA
              </span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed max-w-sm transition-colors duration-300 hover:text-gray-800">
              {t.footer.description}
            </p>
            <div className="flex items-center gap-4 pt-2">
              <Link 
                href={`https://wa.me/${t.footer.contact.whatsapp}`} 
                className="group relative p-2 text-gray-500 hover:text-green-500 transition-all duration-300 hover:scale-110 hover:bg-green-50 rounded-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp className="h-5 w-5 transition-all duration-300 group-hover:animate-pulse" />
                <span className="sr-only">{t.footer.social.whatsapp}</span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-green-600 opacity-0 group-hover:opacity-20 transition-all duration-300 scale-0 group-hover:scale-100"></div>
              </Link>
              <Link 
                href={t.footer.contact.linkedin} 
                className="group relative p-2 text-gray-500 hover:text-blue-600 transition-all duration-300 hover:scale-110 hover:bg-blue-50 rounded-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="h-5 w-5 transition-all duration-300 group-hover:animate-pulse" />
                <span className="sr-only">{t.footer.social.linkedin}</span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-20 transition-all duration-300 scale-0 group-hover:scale-100"></div>
              </Link>
              <Link 
                href={t.footer.contact.github} 
                className="group relative p-2 text-gray-500 hover:text-gray-800 transition-all duration-300 hover:scale-110 hover:bg-gray-50 rounded-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithubAlt className="h-5 w-5 transition-all duration-300 group-hover:animate-pulse" />
                <span className="sr-only">{t.footer.social.github}</span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-400 to-gray-600 opacity-0 group-hover:opacity-20 transition-all duration-300 scale-0 group-hover:scale-100"></div>
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary mb-4 relative">
              {t.footer.sections.contact}
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary/60 transition-all duration-500 group-hover:w-full"></div>
            </h3>
            <div className="space-y-4">
              <div className="group flex items-start gap-3 p-2 rounded-lg transition-all duration-300 hover:bg-gray-50 hover:shadow-sm cursor-pointer">
                <div className="p-1.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                  <FaPhone className="h-3.5 w-3.5 text-primary flex-shrink-0 transition-all duration-300 group-hover:rotate-12" />
                </div>
                <div>
                  <p className="text-gray-700 text-sm font-medium group-hover:text-gray-900 transition-colors duration-300">{t.footer.contact.phone}</p>
                  <p className="text-gray-500 text-xs group-hover:text-gray-600 transition-colors duration-300">{t.footer.contact.phoneLabel}</p>
                </div>
              </div>
              <div className="group flex items-start gap-3 p-2 rounded-lg transition-all duration-300 hover:bg-gray-50 hover:shadow-sm">
                <div className="p-1.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                  <FaEnvelope className="h-3.5 w-3.5 text-primary flex-shrink-0 transition-all duration-300 group-hover:rotate-12" />
                </div>
                <div>
                  <Link 
                    href={`mailto:${t.footer.contact.email}`}
                    className="text-gray-700 text-sm font-medium hover:text-primary transition-all duration-300 relative group-hover:text-primary"
                  >
                    {t.footer.contact.email}
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></div>
                  </Link>
                  <p className="text-gray-500 text-xs group-hover:text-gray-600 transition-colors duration-300">{t.footer.contact.emailLabel}</p>
                </div>
              </div>
              <div className="group flex items-start gap-3 p-2 rounded-lg transition-all duration-300 hover:bg-gray-50 hover:shadow-sm cursor-pointer">
                <div className="p-1.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                  <FaMapMarkerAlt className="h-3.5 w-3.5 text-primary flex-shrink-0 transition-all duration-300 group-hover:rotate-12" />
                </div>
                <div>
                  <p className="text-gray-700 text-sm font-medium group-hover:text-gray-900 transition-colors duration-300">{t.footer.contact.address}</p>
                  <p className="text-gray-500 text-xs group-hover:text-gray-600 transition-colors duration-300">{t.footer.contact.addressLabel}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary mb-4 relative group">
              {t.footer.sections.quickLinks}
            </h3>
            <nav className="space-y-1">
              <Link 
                href="/" 
                className="group flex items-center text-gray-600 text-sm hover:text-primary transition-all duration-300 py-2 px-3 rounded-lg hover:bg-primary/5 hover:translate-x-1"
              >
                <div className="w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-2 rounded-full"></div>
                {t.footer.links.home}
              </Link>
              <Link 
                href="/aboutus" 
                className="group flex items-center text-gray-600 text-sm hover:text-primary transition-all duration-300 py-2 px-3 rounded-lg hover:bg-primary/5 hover:translate-x-1"
              >
                <div className="w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-2 rounded-full"></div>
                {t.footer.links.about}
              </Link>
              <Link 
                href="/flexible" 
                className="group flex items-center text-gray-600 text-sm hover:text-primary transition-all duration-300 py-2 px-3 rounded-lg hover:bg-primary/5 hover:translate-x-1"
              >
                <div className="w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-2 rounded-full"> </div>
                {t.footer.links.products}
              </Link>
              <Link 
                href="/whyUs" 
                className="group flex items-center text-gray-600 text-sm hover:text-primary transition-all duration-300 py-2 px-3 rounded-lg hover:bg-primary/5 hover:translate-x-1"
              >
                <div className="w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-2 rounded-full"></div>
                {t.footer.links.news}
              </Link>
              <Link 
                href="/contact" 
                className="group flex items-center text-gray-600 text-sm hover:text-primary transition-all duration-300 py-2 px-3 rounded-lg hover:bg-primary/5 hover:translate-x-1"
              >
                <div className="w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-2 rounded-full"></div>
                {t.footer.links.contact}
              </Link>
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary mb-4 relative group">
              {t.footer.sections.services}
            </h3>
            <nav className="space-y-1">
              <Link 
                href="/services/ev-chargers" 
                className="group flex items-center text-gray-600 text-sm hover:text-primary transition-all duration-300 py-2 px-3 rounded-lg hover:bg-primary/5 hover:translate-x-1"
              >
                <div className="w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-2 rounded-full"></div>
                {t.footer.services.evChargers}
              </Link>
              <Link 
                href="/services/charging-stations" 
                className="group flex items-center text-gray-600 text-sm hover:text-primary transition-all duration-300 py-2 px-3 rounded-lg hover:bg-primary/5 hover:translate-x-1"
              >
                <div className="w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-2 rounded-full"></div>
                {t.footer.services.chargingStations}
              </Link>
              <Link 
                href="/services/fast-charging" 
                className="group flex items-center text-gray-600 text-sm hover:text-primary transition-all duration-300 py-2 px-3 rounded-lg hover:bg-primary/5 hover:translate-x-1"
              >
                <div className="w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-2 rounded-full"></div>
                {t.footer.services.fastCharging}
              </Link>
              <Link 
                href="/services/dc-charging" 
                className="group flex items-center text-gray-600 text-sm hover:text-primary transition-all duration-300 py-2 px-3 rounded-lg hover:bg-primary/5 hover:translate-x-1"
              >
                <div className="w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-2 rounded-full"></div>
                {t.footer.services.dcCharging}
              </Link>
              <Link 
                href="/services/manufacturers" 
                className="group flex items-center text-gray-600 text-sm hover:text-primary transition-all duration-300 py-2 px-3 rounded-lg hover:bg-primary/5 hover:translate-x-1"
              >
                <div className="w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-2 rounded-full"></div>
                {t.footer.services.manufacturers}
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm transition-colors duration-300 hover:text-gray-700">
              {t.footer.copyright}
            </p>
            <div className="flex items-center gap-6">
              <Link 
                href="/privacy" 
                className="group relative text-gray-500 text-sm hover:text-primary transition-all duration-300 py-1"
              >
                {t.footer.legal.privacy}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></div>
              </Link>
              <Link 
                href="/terms" 
                className="group relative text-gray-500 text-sm hover:text-primary transition-all duration-300 py-1"
              >
                {t.footer.legal.terms}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></div>
              </Link>
              <Link 
                href="/cookies" 
                className="group relative text-gray-500 text-sm hover:text-primary transition-all duration-300 py-1"
              >
                {t.footer.legal.cookies}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}