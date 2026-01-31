"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  X,
  House,
  Grid3X3,
  Building2,
  Users,
  Mail,
  LogIn,
  UserPlus,
  User,
  ShoppingBag,
  MapPin,
  Settings,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { href: "/", label: "Inicio", icon: House },
  { href: "/productos", label: "Catálogo", icon: Grid3X3 },
  { href: "/b2b", label: "B2B Empresas", icon: Building2, badge: "NUEVO" },
  { href: "/nosotros", label: "Nosotros", icon: Users },
  { href: "/contacto", label: "Contacto", icon: Mail },
];

const profileItems = [
  { href: "/mi-cuenta", label: "Mi Cuenta", icon: User },
  { href: "/mi-cuenta/pedidos", label: "Mis Pedidos", icon: ShoppingBag, badge: 2 },
  { href: "/mi-cuenta/direcciones", label: "Direcciones", icon: MapPin },
  { href: "/mi-cuenta/configuracion", label: "Configuración", icon: Settings },
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-[390px] bg-bg-surface z-50 flex flex-col transition-transform duration-300 ease-out lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
      >
        {/* Menu Header */}
        <div className="h-16 flex items-center justify-between px-5">
          <Link href="/" className="flex items-center gap-2" onClick={onClose}>
            <div className="w-9 h-9 rounded-full bg-berry-red" />
            <span className="text-lg font-bold text-text-primary">
              Super Berries
            </span>
          </Link>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-bg-muted flex items-center justify-center hover:bg-border-subtle transition-colors"
            aria-label="Cerrar menú"
          >
            <X className="w-5 h-5 text-text-primary" />
          </button>
        </div>

        {/* Divider */}
        <div className="h-px bg-border-subtle" />

        {/* Guest CTA Section - Only show when not authenticated */}
        {!isAuthenticated && (
          <div className="bg-bg-muted p-5 flex flex-col gap-4">
            <h2 className="text-xl font-bold text-text-primary">
              ¡Bienvenido!
            </h2>
            <p className="text-sm text-text-secondary">
              Inicia sesión para acceder a tu cuenta, ver tus pedidos y
              disfrutar de beneficios exclusivos.
            </p>
            <div className="flex flex-col gap-3">
              <Link
                href="/login"
                onClick={onClose}
                className="flex items-center justify-center gap-2.5 px-6 py-4 bg-berry-red rounded-lg hover:bg-berry-red-dark transition-colors"
              >
                <LogIn className="w-[18px] h-[18px] text-text-inverse" />
                <span className="text-[15px] font-semibold text-text-inverse">
                  Iniciar Sesión
                </span>
              </Link>
              <Link
                href="/registro"
                onClick={onClose}
                className="flex items-center justify-center gap-2.5 px-6 py-4 bg-transparent border-2 border-berry-red rounded-lg hover:bg-berry-red/10 transition-colors"
              >
                <UserPlus className="w-[18px] h-[18px] text-berry-red" />
                <span className="text-[15px] font-semibold text-berry-red">
                  Crear Cuenta
                </span>
              </Link>
            </div>
          </div>
        )}

        {/* User Section - Show when authenticated */}
        {isAuthenticated && user && (
          <div className="bg-bg-muted p-5 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-berry-red-light flex items-center justify-center">
              <span className="text-xl font-bold text-berry-red">
                {user.initials}
              </span>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <span className="text-lg font-semibold text-text-primary">
                {user.name}
              </span>
              <span className="text-sm text-text-secondary">
                {user.email}
              </span>
            </div>
            {/* B2B Badge - TODO: conditionally show based on user type */}
            <span className="px-2.5 py-1 bg-berry-green-light text-berry-green text-[11px] font-bold rounded-full">
              B2B
            </span>
          </div>
        )}

        {/* Navigation Section */}
        <nav className="py-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-4 px-5 py-4 transition-colors ${
                  isActive
                    ? "text-berry-red"
                    : "text-text-primary hover:bg-bg-muted"
                }`}
              >
                <Icon
                  className={`w-[22px] h-[22px] ${
                    isActive ? "text-berry-red" : "text-text-secondary"
                  }`}
                />
                <span
                  className={`text-base ${
                    isActive ? "font-semibold" : "font-medium"
                  }`}
                >
                  {item.label}
                </span>
                {item.badge && (
                  <span className="px-2 py-0.5 bg-berry-red text-text-inverse text-[9px] font-bold rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Profile Section - Only show when authenticated */}
        {isAuthenticated && (
          <>
            {/* Divider */}
            <div className="h-px bg-border-subtle" />

            <div className="py-2">
              <span className="px-5 py-2 text-[11px] font-bold text-text-tertiary tracking-wide">
                MI CUENTA
              </span>
              {profileItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center gap-4 px-5 py-3.5 text-text-primary hover:bg-bg-muted transition-colors"
                  >
                    <Icon className="w-5 h-5 text-text-secondary" />
                    <span className="text-[15px] font-medium">{item.label}</span>
                    {item.badge && (
                      <span className="w-5 h-5 bg-berry-red text-text-inverse text-[11px] font-bold rounded-full flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Footer Section */}
        <div className="p-5 flex flex-col gap-3">
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2.5 px-5 py-3.5 border border-border-subtle rounded-lg hover:bg-bg-muted transition-colors"
            >
              <LogOut className="w-[18px] h-[18px] text-text-secondary" />
              <span className="text-[15px] font-medium text-text-secondary">
                Cerrar Sesión
              </span>
            </button>
          )}
          <span className="text-xs text-text-tertiary text-center">
            Versión 1.0.0
          </span>
        </div>
      </div>
    </>
  );
}
