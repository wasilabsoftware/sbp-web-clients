"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingBag, User, Menu } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import { MobileMenu } from "./MobileMenu";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/productos", label: "Catálogo" },
  { href: "/b2b", label: "Empresas" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export function Header() {
  const { user, isAuthenticated } = useAuth();
  // Use Zustand's built-in reactivity with a selector for proper updates
  const itemCount = useCart((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="bg-bg-surface h-16 lg:h-20 flex items-center justify-between px-5 lg:px-20">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 lg:gap-3">
        <Image
          src="https://imagedelivery.net/hrfM92Tw965illARz9WHuA/6abdb513-caf3-4e23-42eb-4bcfbae49300/Hero"
          alt="Super Berries Logo"
          width={48}
          height={48}
          className="w-9 h-9 lg:w-12 lg:h-12 rounded-full object-cover"
        />
        <span className="text-lg lg:text-2xl font-bold text-text-primary">
          Super Berries Perú
        </span>
      </Link>

      {/* Navigation - Desktop only */}
      <nav className="hidden lg:flex items-center gap-10">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-[15px] font-medium text-text-secondary hover:text-berry-red transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Actions - Desktop */}
      <div className="hidden lg:flex items-center gap-4">
        <button className="w-11 h-11 rounded-full bg-bg-muted flex items-center justify-center hover:bg-border-subtle transition-colors">
          <Search className="w-5 h-5 text-text-secondary" />
        </button>
        <Link
          href="/carrito"
          className="relative w-11 h-11 rounded-full bg-berry-red flex items-center justify-center hover:bg-berry-red-dark transition-colors"
        >
          <ShoppingBag className="w-5 h-5 text-text-inverse" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-berry-green text-text-inverse text-xs font-bold rounded-full flex items-center justify-center">
              {itemCount > 9 ? "9+" : itemCount}
            </span>
          )}
        </Link>

        {/* User button - Show avatar when logged in */}
        {mounted && isAuthenticated && user ? (
          <Link
            href="/mi-cuenta"
            className="w-11 h-11 rounded-full bg-berry-red flex items-center justify-center hover:bg-berry-red-dark transition-colors"
          >
            <span className="text-sm font-bold text-white">{user.initials}</span>
          </Link>
        ) : (
          <Link
            href="/login"
            className="w-11 h-11 rounded-full bg-bg-muted flex items-center justify-center hover:bg-border-subtle transition-colors"
          >
            <User className="w-5 h-5 text-text-secondary" />
          </Link>
        )}
      </div>

      {/* Actions - Mobile */}
      <div className="flex lg:hidden items-center gap-3">
        <Link
          href="/carrito"
          className="relative w-10 h-10 rounded-full bg-berry-red flex items-center justify-center"
        >
          <ShoppingBag className="w-[18px] h-[18px] text-text-inverse" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-berry-green text-text-inverse text-[10px] font-bold rounded-full flex items-center justify-center">
              {itemCount > 9 ? "9+" : itemCount}
            </span>
          )}
        </Link>
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="w-10 h-10 rounded-full bg-bg-muted flex items-center justify-center hover:bg-border-subtle transition-colors"
          aria-label="Abrir menú"
          aria-expanded={mobileMenuOpen}
        >
          <Menu className="w-[18px] h-[18px] text-text-secondary" />
        </button>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  );
}
