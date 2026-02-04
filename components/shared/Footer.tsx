import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, MessageCircle } from "lucide-react";

const navLinks = [
  { title: "Navegación", links: [
    { href: "/", label: "Inicio" },
    { href: "/productos", label: "Catálogo" },
    { href: "/b2b", label: "Empresas" },
    { href: "/contacto", label: "Contacto" },
  ]},
  { title: "Categorías", links: [
    { href: "/productos?categoria=berries", label: "Berries" },
    { href: "/productos?categoria=frutos-secos", label: "Frutos Secos" },
    { href: "/productos?categoria=deshidratados", label: "Deshidratados" },
    { href: "/productos?categoria=especiales", label: "Especiales" },
  ]},
  { title: "Contacto", links: [
    { href: "tel:+51952805608", label: "+51 952 805 608" },
    { href: "mailto:hola@superberries.pe", label: "hola@superberries.pe" },
    { href: "#", label: "Lima, Perú" },
  ]},
];

const socialLinks = [
  { href: "https://facebook.com", icon: Facebook, label: "Facebook" },
  { href: "https://instagram.com", icon: Instagram, label: "Instagram" },
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
            alt="Super Berries Logo"
            width={32}
            height={32}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-lg font-bold text-text-inverse">
            Super Berries Perú
          </span>
        </Link>
        <p className="text-sm text-white/65 text-center max-w-[250px]">
          Berries frescos del Perú,{"\n"}directo a tu mesa.
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
          © 2025 Super Berries Perú
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
                alt="Super Berries Logo"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="text-[22px] font-bold text-text-inverse">
                Super Berries
              </span>
            </Link>
            <p className="text-sm text-white/65 leading-relaxed">
              Berries frescos del Perú, directo a tu mesa. Calidad y frescura garantizada.
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
            © 2025 Super Berries Perú. Todos los derechos reservados.
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
