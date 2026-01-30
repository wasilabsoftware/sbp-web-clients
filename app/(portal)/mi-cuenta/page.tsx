"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Header } from "@/components/shared/Header";
import {
  Package,
  MapPin,
  LogOut,
  Pencil,
  CheckCircle,
  ArrowLeft,
  Settings,
  ChevronRight,
  Check,
  Mail,
  Phone,
  User,
} from "lucide-react";

export default function MiCuentaPage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "López",
    email: "",
    telefono: "+51 987 654 321",
    dni: "12345678",
    fechaNacimiento: "15/03/1990",
  });

  // Initialize form with user data
  useState(() => {
    if (user) {
      const nameParts = user.name.split(" ");
      setFormData((prev) => ({
        ...prev,
        nombre: nameParts[0] || "",
        apellido: nameParts.slice(1).join(" ") || "López",
        email: user.email,
      }));
    }
  });

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleEditClick = () => {
    if (user) {
      const nameParts = user.name.split(" ");
      setFormData({
        nombre: nameParts[0] || "",
        apellido: nameParts.slice(1).join(" ") || "López",
        email: user.email,
        telefono: "+51 987 654 321",
        dni: "12345678",
        fechaNacimiento: "15/03/1990",
      });
    }
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    // TODO: Implement actual save logic
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      {/* Desktop Header */}
      <div className="hidden lg:block">
        <Header />
      </div>

      {/* Mobile Header */}
      <header className="flex lg:hidden bg-bg-surface h-16 items-center justify-between px-5">
        <button
          onClick={() => (isEditing ? handleCancel() : router.back())}
          className="w-10 h-10 rounded-full bg-bg-muted flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-text-primary" />
        </button>
        <span className="text-lg font-bold text-text-primary">
          {isEditing ? "Editar Perfil" : "Mi Perfil"}
        </span>
        <button className="w-10 h-10 rounded-full bg-bg-muted flex items-center justify-center">
          <Settings className="w-5 h-5 text-text-secondary" />
        </button>
      </header>

      {/* Desktop Content */}
      <div className="hidden lg:flex flex-1 gap-12 px-20 py-12">
        {/* Sidebar */}
        <aside className="w-[280px] flex-shrink-0">
          <div className="bg-bg-surface rounded-3xl p-6 shadow-[0_4px_16px_rgba(0,0,0,0.04)] flex flex-col gap-6">
            {/* Avatar */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-[100px] h-[100px] rounded-full bg-berry-red-light flex items-center justify-center">
                <span className="text-4xl font-bold text-berry-red">
                  {user.initials}
                </span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-xl font-bold text-text-primary">
                  {user.name}
                </span>
                <span className="text-sm text-text-secondary">{user.email}</span>
              </div>
            </div>

            {/* Menu */}
            <nav className="flex flex-col gap-1">
              <Link
                href="/mi-cuenta"
                className="flex items-center gap-3 h-12 px-4 rounded-xl bg-berry-red-light text-berry-red font-semibold"
              >
                <User className="w-5 h-5" />
                <span className="text-[15px]">Mi Perfil</span>
              </Link>
              <Link
                href="/mi-cuenta/pedidos"
                className="flex items-center gap-3 h-12 px-4 rounded-xl text-text-secondary hover:bg-bg-muted transition-colors"
              >
                <Package className="w-5 h-5" />
                <span className="text-[15px] font-medium">Mis Pedidos</span>
              </Link>
              <Link
                href="/mi-cuenta/direcciones"
                className="flex items-center gap-3 h-12 px-4 rounded-xl text-text-secondary hover:bg-bg-muted transition-colors"
              >
                <MapPin className="w-5 h-5" />
                <span className="text-[15px] font-medium">Direcciones</span>
              </Link>
            </nav>

            {/* Logout - only show when not editing */}
            {!isEditing && (
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 h-12 px-4 rounded-xl border border-border-subtle text-text-secondary hover:bg-bg-muted transition-colors"
              >
                <LogOut className="w-[18px] h-[18px]" />
                <span className="text-sm font-medium">Cerrar Sesión</span>
              </button>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col gap-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-[28px] font-bold text-text-primary">
              {isEditing ? "Editar Perfil" : "Mi Perfil"}
            </h1>
            {!isEditing && (
              <button
                onClick={handleEditClick}
                className="flex items-center gap-2 h-11 px-5 rounded-xl bg-berry-red text-white font-semibold hover:bg-berry-red-dark transition-colors"
              >
                <Pencil className="w-[18px] h-[18px]" />
                <span className="text-sm">Editar Perfil</span>
              </button>
            )}
          </div>

          {/* Personal Info Card */}
          <div className="bg-bg-surface rounded-3xl p-8 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
            <h2 className="text-lg font-bold text-text-primary mb-6">
              Información Personal
            </h2>

            {isEditing ? (
              /* Edit Mode */
              <>
                <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                  {/* Nombre */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-text-primary">
                      Nombre
                    </label>
                    <input
                      type="text"
                      value={formData.nombre}
                      onChange={(e) => handleInputChange("nombre", e.target.value)}
                      className="h-12 px-4 bg-bg-muted rounded-xl text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-berry-red"
                      placeholder="Nombre"
                    />
                  </div>

                  {/* Apellido */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-text-primary">
                      Apellido
                    </label>
                    <input
                      type="text"
                      value={formData.apellido}
                      onChange={(e) => handleInputChange("apellido", e.target.value)}
                      className="h-12 px-4 bg-bg-muted rounded-xl text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-berry-red"
                      placeholder="Apellido"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-text-primary">
                      Correo Electrónico
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="w-full h-12 pl-12 pr-4 bg-bg-muted rounded-xl text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-berry-red"
                        placeholder="correo@ejemplo.com"
                      />
                    </div>
                  </div>

                  {/* Teléfono */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-text-primary">
                      Teléfono
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
                      <input
                        type="tel"
                        value={formData.telefono}
                        onChange={(e) => handleInputChange("telefono", e.target.value)}
                        className="w-full h-12 pl-12 pr-4 bg-bg-muted rounded-xl text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-berry-red"
                        placeholder="+51 999 999 999"
                      />
                    </div>
                  </div>

                  {/* DNI */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-text-primary">
                      DNI
                    </label>
                    <input
                      type="text"
                      value={formData.dni}
                      onChange={(e) => handleInputChange("dni", e.target.value)}
                      className="h-12 px-4 bg-bg-muted rounded-xl text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-berry-red"
                      placeholder="12345678"
                    />
                  </div>

                  {/* Fecha de Nacimiento */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-text-primary">
                      Fecha de Nacimiento
                    </label>
                    <input
                      type="text"
                      value={formData.fechaNacimiento}
                      onChange={(e) =>
                        handleInputChange("fechaNacimiento", e.target.value)
                      }
                      className="h-12 px-4 bg-bg-muted rounded-xl text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-berry-red"
                      placeholder="DD/MM/AAAA"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-4 mt-8">
                  <button
                    onClick={handleCancel}
                    className="h-12 px-6 rounded-xl border border-border-subtle text-text-secondary font-medium hover:bg-bg-muted transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 h-12 px-8 rounded-xl bg-berry-red text-white font-semibold hover:bg-berry-red-dark transition-colors"
                  >
                    <Check className="w-[18px] h-[18px]" />
                    <span>Guardar Cambios</span>
                  </button>
                </div>
              </>
            ) : (
              /* View Mode */
              <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                <div className="flex flex-col gap-1.5">
                  <span className="text-sm text-text-tertiary">Nombre Completo</span>
                  <span className="text-[15px] font-medium text-text-primary">
                    {user.name}
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-sm text-text-tertiary">DNI</span>
                  <span className="text-[15px] font-medium text-text-primary">
                    12345678
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-sm text-text-tertiary">
                    Correo Electrónico
                  </span>
                  <span className="text-[15px] font-medium text-text-primary">
                    {user.email}
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-sm text-text-tertiary">
                    Fecha de Nacimiento
                  </span>
                  <span className="text-[15px] font-medium text-text-primary">
                    15 de Marzo, 1990
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-sm text-text-tertiary">Teléfono</span>
                  <span className="text-[15px] font-medium text-text-primary">
                    +51 987 654 321
                  </span>
                </div>
              </div>
            )}
          </div>

        </main>
      </div>

      {/* Mobile Content */}
      <div className="flex lg:hidden flex-col gap-5 p-5">
        {isEditing ? (
          /* Mobile Edit Mode */
          <>
            {/* User Card */}
            <div className="bg-bg-surface rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-berry-red-light flex items-center justify-center">
                <span className="text-3xl font-bold text-berry-red">
                  {user.initials}
                </span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-xl font-bold text-text-primary">
                  {user.name}
                </span>
                <span className="text-sm text-text-secondary">{user.email}</span>
              </div>
            </div>

            {/* Edit Form Card */}
            <div className="bg-bg-surface rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex flex-col gap-4">
              <h2 className="text-base font-bold text-text-primary">
                Información Personal
              </h2>

              {/* Nombre */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-text-tertiary">
                  Nombre
                </label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => handleInputChange("nombre", e.target.value)}
                  className="h-11 px-4 bg-bg-muted rounded-xl text-[15px] text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-berry-red"
                />
              </div>

              {/* Apellido */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-text-tertiary">
                  Apellido
                </label>
                <input
                  type="text"
                  value={formData.apellido}
                  onChange={(e) => handleInputChange("apellido", e.target.value)}
                  className="h-11 px-4 bg-bg-muted rounded-xl text-[15px] text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-berry-red"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-text-tertiary">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-text-tertiary" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full h-11 pl-11 pr-4 bg-bg-muted rounded-xl text-[15px] text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-berry-red"
                  />
                </div>
              </div>

              {/* Teléfono */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-text-tertiary">
                  Teléfono
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-text-tertiary" />
                  <input
                    type="tel"
                    value={formData.telefono}
                    onChange={(e) => handleInputChange("telefono", e.target.value)}
                    className="w-full h-11 pl-11 pr-4 bg-bg-muted rounded-xl text-[15px] text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-berry-red"
                  />
                </div>
              </div>

              {/* DNI */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-text-tertiary">DNI</label>
                <input
                  type="text"
                  value={formData.dni}
                  onChange={(e) => handleInputChange("dni", e.target.value)}
                  className="h-11 px-4 bg-bg-muted rounded-xl text-[15px] text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-berry-red"
                />
              </div>

              {/* Fecha de Nacimiento */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-text-tertiary">
                  Fecha de Nacimiento
                </label>
                <input
                  type="text"
                  value={formData.fechaNacimiento}
                  onChange={(e) =>
                    handleInputChange("fechaNacimiento", e.target.value)
                  }
                  className="h-11 px-4 bg-bg-muted rounded-xl text-[15px] text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-berry-red"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleSave}
                className="flex items-center justify-center gap-2 h-12 rounded-xl bg-berry-red text-white font-semibold"
              >
                <Check className="w-[18px] h-[18px]" />
                <span>Guardar Cambios</span>
              </button>
              <button
                onClick={handleCancel}
                className="h-12 rounded-xl border border-border-subtle text-text-secondary font-medium"
              >
                Cancelar
              </button>
            </div>
          </>
        ) : (
          /* Mobile View Mode */
          <>
            {/* User Card */}
            <div className="bg-bg-surface rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-berry-red-light flex items-center justify-center">
                <span className="text-3xl font-bold text-berry-red">
                  {user.initials}
                </span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-xl font-bold text-text-primary">
                  {user.name}
                </span>
                <span className="text-sm text-text-secondary">{user.email}</span>
              </div>
              <button
                onClick={handleEditClick}
                className="w-full h-11 flex items-center justify-center gap-2 bg-berry-red text-white font-semibold rounded-xl"
              >
                <Pencil className="w-4 h-4" />
                <span className="text-sm">Editar Perfil</span>
              </button>
            </div>

            {/* Info Card */}
            <div className="bg-bg-surface rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex flex-col gap-4">
              <h2 className="text-base font-bold text-text-primary">
                Información Personal
              </h2>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-text-tertiary">
                  Nombre Completo
                </span>
                <span className="text-[15px] text-text-primary">{user.name}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-text-tertiary">
                  Correo Electrónico
                </span>
                <span className="text-[15px] text-text-primary">{user.email}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-text-tertiary">
                  Teléfono
                </span>
                <span className="text-[15px] text-text-primary">
                  +51 987 654 321
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-text-tertiary">DNI</span>
                <span className="text-[15px] text-text-primary">12345678</span>
              </div>
            </div>

            {/* Menu Card */}
            <div className="bg-bg-surface rounded-2xl p-2 shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex flex-col">
              <Link
                href="/mi-cuenta/pedidos"
                className="flex items-center gap-3 h-[52px] px-4"
              >
                <Package className="w-5 h-5 text-text-secondary" />
                <span className="flex-1 text-[15px] font-medium text-text-primary">
                  Mis Pedidos
                </span>
                <ChevronRight className="w-5 h-5 text-text-tertiary" />
              </Link>
              <Link
                href="/mi-cuenta/direcciones"
                className="flex items-center gap-3 h-[52px] px-4"
              >
                <MapPin className="w-5 h-5 text-text-secondary" />
                <span className="flex-1 text-[15px] font-medium text-text-primary">
                  Direcciones
                </span>
                <ChevronRight className="w-5 h-5 text-text-tertiary" />
              </Link>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 h-12 rounded-xl border border-border-subtle text-text-secondary"
            >
              <LogOut className="w-[18px] h-[18px]" />
              <span className="text-sm font-medium">Cerrar Sesión</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
