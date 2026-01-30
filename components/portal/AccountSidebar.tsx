"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { User, Package, MapPin, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const menuItems = [
  { href: "/mi-cuenta", icon: User, label: "Mi Perfil" },
  { href: "/mi-cuenta/pedidos", icon: Package, label: "Mis Pedidos" },
  { href: "/mi-cuenta/direcciones", icon: MapPin, label: "Direcciones" },
];

interface AccountSidebarProps {
  user: {
    name: string;
    email: string;
    initials: string;
  };
}

export function AccountSidebar({ user }: AccountSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="w-full lg:w-[280px] shrink-0">
      <div className="bg-bg-surface rounded-xl p-6 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
        <div className="flex flex-col gap-6">
          {/* Avatar */}
          <div className="flex justify-center">
            <div className="w-[100px] h-[100px] rounded-full bg-berry-red-light flex items-center justify-center">
              <span className="text-3xl font-bold text-berry-red">
                {user.initials || user.name.charAt(0)}
              </span>
            </div>
          </div>

          {/* User Info */}
          <div className="flex flex-col items-center gap-1">
            <h3 className="text-xl font-bold text-text-primary">{user.name}</h3>
            <p className="text-sm text-text-secondary">{user.email}</p>
          </div>

          {/* Menu Items */}
          <nav className="flex flex-col gap-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 h-12 px-4 rounded-md transition-colors ${
                    isActive
                      ? "bg-berry-red-light text-berry-red"
                      : "text-text-secondary hover:bg-bg-muted"
                  }`}
                >
                  <item.icon
                    className={`w-5 h-5 ${isActive ? "text-berry-red" : "text-text-secondary"}`}
                  />
                  <span
                    className={`text-[15px] ${isActive ? "font-semibold" : "font-medium"}`}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 h-12 px-4 rounded-xl border border-border-subtle text-text-secondary hover:bg-bg-muted transition-colors"
          >
            <LogOut className="w-[18px] h-[18px]" />
            <span className="text-sm font-medium">Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </div>
  );
}
