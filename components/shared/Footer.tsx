import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, MessageCircle } from "lucide-react";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z" />
    </svg>
  );
}

const navLinks = [
  { title: "Navegación", links: [
    { href: "/", label: "Inicio" },
    { href: "/tienda", label: "Tienda" },
    { href: "/empresa", label: "Empresas" },
    { href: "/horeca", label: "HORECA" },
    { href: "/blog", label: "Blog" },
    { href: "/contacto", label: "Contacto" },
  ]},
  { title: "Categorías", links: [
    { href: "/tienda?categoria=berries", label: "Berries Frescos" },
    { href: "/tienda?categoria=congelados", label: "Congelados" },
    { href: "/tienda?categoria=frutos-secos", label: "Frutos Secos" },
    { href: "/tienda?categoria=super-snacks", label: "Súper Snacks" },
    { href: "/tienda?categoria=deshidratados", label: "Deshidratados" },
    { href: "/tienda?categoria=frutas", label: "Frutas Frescas" },
  ]},
  { title: "Contacto", links: [
    { href: "tel:+51952805608", label: "+51 952 805 608" },
    { href: "mailto:ventas@superberriesperu.com", label: "ventas@superberriesperu.com" },
    { href: "#", label: "Lima, Perú" },
  ]},
];

const socialLinks = [
  { href: "https://www.facebook.com/superberriesperu/?locale=es_LA", icon: Facebook, label: "Facebook" },
  { href: "https://www.instagram.com/superberriesperu/", icon: Instagram, label: "Instagram" },
  { href: "https://www.tiktok.com/@superberriesperu", icon: TikTokIcon, label: "TikTok" },
  { href: "https://pe.linkedin.com/company/s%C3%BAper-berries-per%C3%BA", icon: Linkedin, label: "LinkedIn" },
  { href: "https://wa.me/51952805608", icon: MessageCircle, label: "WhatsApp", highlight: true },
];

export function Footer() {
  return (
    <footer className="bg-text-primary py-8 px-5 lg:py-15 lg:px-20">
      {/* Mobile Footer */}
      <div className="flex flex-col items-center gap-6 lg:hidden">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="https://imagedelivery.net/hrfM92Tw965illARz9WHuA/6abdb513-caf3-4e23-42eb-4bcfbae49300/Hero"
            alt="Súper Berries Perú Logo"
            width={32}
            height={32}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-lg font-bold text-text-inverse">
            Súper Berries Perú
          </span>
        </Link>
        <p className="text-sm text-white/65 text-center max-w-[280px] leading-relaxed">
          Berries, frutas frescas, congelados, frutos secos y más. Del campo peruano a tu puerta con delivery programado.
        </p>
        <div className="flex items-center gap-4">
          {socialLinks.map((social) => (
            <Link
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                social.highlight
                  ? "bg-whatsapp hover:opacity-90"
                  : "bg-white/10 hover:bg-white/20"
              }`}
              aria-label={social.label}
            >
              <social.icon className={`w-[18px] h-[18px] ${
                social.highlight ? "text-text-inverse" : "text-white/65"
              }`} />
            </Link>
          ))}
        </div>
        <p className="text-xs text-white/40">
          © {new Date().getFullYear()} Súper Berries Perú
        </p>
      </div>

      {/* Desktop Footer */}
      <div className="hidden lg:block">
        <div className="flex justify-between mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-4 max-w-[300px]">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="https://imagedelivery.net/hrfM92Tw965illARz9WHuA/6abdb513-caf3-4e23-42eb-4bcfbae49300/Hero"
                alt="Súper Berries Perú Logo"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="text-[22px] font-bold text-text-inverse">
                Súper Berries Perú
              </span>
            </Link>
            <p className="text-sm text-white/65 leading-relaxed">
              +60 productos naturales: berries, frutas frescas, congelados, frutos secos, deshidratados y snacks. Del campo peruano a tu puerta con delivery programado en Lima y provincias.
            </p>
          </div>

          {/* Navigation Columns */}
          <div className="flex gap-20">
            {navLinks.map((column) => (
              <div key={column.title} className="flex flex-col gap-4">
                <h4 className="text-base font-semibold text-text-inverse">
                  {column.title}
                </h4>
                <ul className="flex flex-col gap-4">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/65 hover:text-text-inverse transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="flex items-center justify-between pt-6 border-t border-white/20">
          <p className="text-[13px] text-white/50">
            © {new Date().getFullYear()} Súper Berries Perú. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                  social.highlight
                    ? "bg-whatsapp hover:opacity-90"
                    : "bg-white/10 hover:bg-white/20"
                }`}
                aria-label={social.label}
              >
                <social.icon className={`w-[18px] h-[18px] ${
                  social.highlight ? "text-text-inverse" : "text-white/65"
                }`} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
