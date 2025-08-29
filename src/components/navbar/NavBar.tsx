'use client'
import Image from 'next/image'
import MobileMenu from '@/components/mobile-menu/MobileMenu';
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import ThemeToggle from '@/components/ui/ThemeToggle';
import LanguageSwitcher from '@/components/ui/LenguageToggle';
import { useTranslation } from '@/../hooks/useTranlation';

export default function NavBar() {
  const t = useTranslation();
  const router = useRouter();
  
  // Estado de scroll
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0); // ✅ ahora detecta en el primer scroll
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header
      className={`
        fixed top-0 z-40 w-full
        transition-all duration-300
        ${scrolled
          ? 'bg-background border-b border-border backdrop-blur-none shadow-sm' // ✅ sólido al hacer scroll con sombra sutil
          : 'backdrop-blur-md bg-background/10 border-none' // ✅ blur/transparente en el top
        }
      `}
    >
      <div className='container flex h-16 items-center justify-between py-4 px-4 md:px-6 w-full'>
        {/* Logo */}
        <div className='flex items-center gap-2'>
          <Link href='/'>
            <div className='flex items-center space-x-1 rtl:space-x-reverse'>
              <Image
                src='/assets/insignia_degrade.png'
                alt='ctahlkesd'
                width={20}
                height={20}
              />
              <span className='text-xl font-bold text-foreground'>
                CATHALE<span className='text-muted-foreground'>IA</span>
              </span>
            </div>
          </Link>
        </div>
        
        {/* Mobile Menu */}
        <MobileMenu />
        
        {/* Navegación */}
        <nav className='hidden md:flex items-center gap-2 lg:gap-6'>
          {t.header.nav.map((nav) => (
            <Link
              key={nav.id}
              href={`#${nav.id}`}
              className='text-sm font-medium text-foreground hover:text-primary transition-colors duration-200'
            >
              {nav.title}
            </Link>
          ))}
        </nav>
        
        {/* Acciones */}
        <div className='flex items-center'>
          <div className='mr-2 text-muted-foreground'>|</div>
          <Button
            type="button"
            size="lg"
            className='px-2 bg-primary hover:bg-primary/90 text-primary-foreground'
            onClick={() => router.push('/signup')}
          >
            SignUp
          </Button>
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  )
}