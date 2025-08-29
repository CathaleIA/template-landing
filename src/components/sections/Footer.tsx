import { useTranslation } from '@/../hooks/useTranlation';
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp, FaLinkedin, FaGithubAlt } from "react-icons/fa";

export default function Footer() {
  const t = useTranslation();

  return (
    <footer className="w-full border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4 md:px-6 max-w-full overflow-hidden">
        <div className="flex items-center gap-2">
          <Image
            src="/assets/insignia_degrade.png"
            alt="StreamLine Logon"
            width={40}
            height={40}
            className="rounded"
          />
          <span className="text-xl font-bold">CathaleIA</span>
        </div>
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          {t.footer.copyright}
        </p>
        <div className="flex items-center gap-4">
          <Link href="#" className="text-muted-foreground hover:text-foreground">
            <FaWhatsapp className="h-5 w-5" />
            <span className="sr-only">Whatsapp</span>
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-foreground">
            <FaLinkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-foreground">
            <FaGithubAlt className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}