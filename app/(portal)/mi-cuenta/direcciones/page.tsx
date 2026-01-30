"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Header } from "@/components/shared/Header";
import {
  Package,
  MapPin,
  Heart,
  LogOut,
  Plus,
  Home,
  Briefcase,
  Check,
  ArrowLeft,
  ChevronRight,
  User,
} from "lucide-react";

interface Address {
  id: string;
  type: "casa" | "oficina" | "otro";
  name: string;
  address: string;
  district: string;
  city: string;
  postalCode: string;
  phone: string;
  reference: string;
  isDefault: boolean;
}

const mockAddresses: Address[] = [
  {
    id: "1",
    type: "casa",
    name: "Casa",
    address: "Av. Javier Prado Este 4200",
    district: "San Borja",
    city: "Lima",
    postalCode: "15037",
    phone: "+51 999 888 777",
    reference: "Frente al parque",
    isDefault: true,
  },
  {
    id: "2",
    type: "oficina",
    name: "Oficina",
    address: "Calle Los Negocios 456, Piso 12",
    district: "San Isidro",
    city: "Lima",
    postalCode: "15036",
    phone: "+51 999 888 777",
    reference: "",
    isDefault: false,
  },
];

export default function DireccionesPage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>(mockAddresses);
  const [selectedId, setSelectedId] = useState<string>("1");
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    type: "casa" as "casa" | "oficina" | "otro",
    name: "",
    address: "",
    district: "",
    city: "",
    postalCode: "",
    phone: "",
    reference: "",
    isDefault: false,
  });

  const isEditing = editingId !== null;

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({
      type: "casa",
      name: "",
      address: "",
      district: "",
      city: "",
      postalCode: "",
      phone: "",
      reference: "",
      isDefault: false,
    });
    setIsAdding(true);
  };

  const handleEdit = (addr: Address) => {
    setEditingId(addr.id);
    setFormData({
      type: addr.type,
      name: addr.name,
      address: addr.address,
      district: addr.district,
      city: addr.city,
      postalCode: addr.postalCode,
      phone: addr.phone,
      reference: addr.reference,
      isDefault: addr.isDefault,
    });
    setIsAdding(true);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
  };

  const handleSave = () => {
    // TODO: Implement save logic
    setIsAdding(false);
    setEditingId(null);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "casa":
        return <Home className="w-5 h-5" />;
      case "oficina":
        return <Briefcase className="w-5 h-5" />;
      default:
        return <MapPin className="w-5 h-5" />;
    }
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
        <button onClick={() => router.back()} className="w-10 h-10 rounded-full bg-bg-muted flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-text-primary" />
        </button>
        <span className="text-lg font-bold text-text-primary">Mis Direcciones</span>
        <button
          onClick={handleAddNew}
          className="w-10 h-10 rounded-full bg-berry-red-light flex items-center justify-center"
        >
          <Plus className="w-5 h-5 text-berry-red" />
        </button>
      </header>

      {/* Desktop Content */}
      <div className="hidden lg:flex flex-1 gap-12 px-20 py-12">
        {/* Sidebar */}
        <aside className="w-[280px] flex-shrink-0">
          <div className="bg-bg-surface rounded-3xl p-6 shadow-[0_4px_16px_rgba(0,0,0,0.04)] flex flex-col gap-6">
            <div className="flex flex-col items-center gap-4">
              <div className="w-[100px] h-[100px] rounded-full bg-berry-red-light flex items-center justify-center">
                <span className="text-4xl font-bold text-berry-red">{user.initials}</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-xl font-bold text-text-primary">{user.name}</span>
                <span className="text-sm text-text-secondary">{user.email}</span>
              </div>
            </div>

            <nav className="flex flex-col gap-1">
              <Link href="/mi-cuenta" className="flex items-center gap-3 h-12 px-4 rounded-xl text-text-secondary hover:bg-bg-muted transition-colors">
                <User className="w-5 h-5" />
                <span className="text-[15px] font-medium">Mi Perfil</span>
              </Link>
              <Link href="/mi-cuenta/pedidos" className="flex items-center gap-3 h-12 px-4 rounded-xl text-text-secondary hover:bg-bg-muted transition-colors">
                <Package className="w-5 h-5" />
                <span className="text-[15px] font-medium">Mis Pedidos</span>
              </Link>
              <Link href="/mi-cuenta/direcciones" className="flex items-center gap-3 h-12 px-4 rounded-xl bg-berry-red-light text-berry-red font-semibold">
                <MapPin className="w-5 h-5" />
                <span className="text-[15px]">Direcciones</span>
              </Link>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col gap-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-[28px] font-bold text-text-primary">Mis Direcciones</h1>
            <button
              onClick={handleAddNew}
              className="flex items-center gap-2 h-11 px-5 rounded-xl bg-berry-red text-white font-semibold hover:bg-berry-red-dark transition-colors"
            >
              <Plus className="w-[18px] h-[18px]" />
              <span className="text-sm">Nueva Dirección</span>
            </button>
          </div>

          {/* Content Layout */}
          <div className="flex gap-8">
            {/* Saved Addresses */}
            <div className="w-[400px] flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-base font-semibold text-text-primary">Direcciones guardadas</span>
                <span className="px-2.5 py-1 bg-bg-muted rounded-full text-xs font-medium text-text-secondary">
                  {addresses.length}
                </span>
              </div>
              <div className="flex flex-col gap-3">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    onClick={() => setSelectedId(addr.id)}
                    className={`p-4 rounded-2xl text-left transition-all cursor-pointer ${
                      selectedId === addr.id
                        ? "bg-bg-surface border-2 border-berry-red shadow-[0_4px_16px_rgba(230,57,70,0.12)]"
                        : "bg-bg-surface border border-border-subtle shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        selectedId === addr.id ? "bg-berry-red-light text-berry-red" : "bg-bg-muted text-text-secondary"
                      }`}>
                        {getTypeIcon(addr.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-text-primary">{addr.name}</span>
                          {addr.isDefault && (
                            <span className="px-2 py-0.5 bg-berry-red-light text-berry-red text-xs font-medium rounded">
                              Principal
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-text-secondary mt-1 truncate">{addr.address}</p>
                        <p className="text-sm text-text-tertiary">{addr.district}, {addr.city}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border-subtle">
                      <button onClick={(e) => { e.stopPropagation(); handleEdit(addr); }} className="text-sm text-berry-red font-medium hover:underline">Editar</button>
                      <span className="text-border-subtle">•</span>
                      <button onClick={(e) => e.stopPropagation()} className="text-sm text-text-tertiary hover:text-berry-red">Eliminar</button>
                      {!addr.isDefault && (
                        <>
                          <span className="text-border-subtle">•</span>
                          <button onClick={(e) => e.stopPropagation()} className="text-sm text-text-tertiary hover:text-berry-red">Marcar principal</button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Area */}
            <div className="flex-1 bg-bg-surface rounded-3xl p-8 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
              <div className="flex flex-col gap-1 mb-6">
                <h2 className="text-lg font-bold text-text-primary">
                  {isEditing ? "Editar dirección" : isAdding ? "Agregar nueva dirección" : "Detalles de dirección"}
                </h2>
                <p className="text-sm text-text-tertiary">
                  {isEditing ? "Modifica los datos de esta dirección" : isAdding ? "Completa los datos de tu nueva dirección de envío" : "Información de la dirección seleccionada"}
                </p>
              </div>

              <div className="h-px bg-border-subtle mb-6" />

              {/* Type Selector */}
              <div className="mb-6">
                <label className="text-sm font-medium text-text-secondary mb-2.5 block">
                  Tipo de dirección
                </label>
                <div className="flex gap-3">
                  {[
                    { value: "casa", label: "Casa", icon: Home },
                    { value: "oficina", label: "Oficina", icon: Briefcase },
                    { value: "otro", label: "Otro", icon: MapPin },
                  ].map(({ value, label, icon: Icon }) => (
                    <button
                      key={value}
                      onClick={() => handleInputChange("type", value)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-colors ${
                        formData.type === value
                          ? "border-berry-red bg-berry-red-light text-berry-red"
                          : "border-border-subtle text-text-secondary hover:border-berry-red"
                      }`}
                    >
                      <Icon className="w-[18px] h-[18px]" />
                      <span className="text-sm font-medium">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-5 mb-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-text-secondary">Nombre / Etiqueta</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Casa de mamá"
                    className="h-12 px-4 bg-bg-muted rounded-xl text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-berry-red"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-text-secondary">Teléfono de contacto</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+51 999 888 777"
                    className="h-12 px-4 bg-bg-muted rounded-xl text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-berry-red"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-text-secondary">Dirección completa</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    placeholder="Calle, número, urbanización"
                    className="h-12 px-4 bg-bg-muted rounded-xl text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-berry-red"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-text-secondary">Distrito</label>
                  <input
                    type="text"
                    value={formData.district}
                    onChange={(e) => handleInputChange("district", e.target.value)}
                    placeholder="Selecciona un distrito"
                    className="h-12 px-4 bg-bg-muted rounded-xl text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-berry-red"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-text-secondary">Referencia</label>
                  <input
                    type="text"
                    value={formData.reference}
                    onChange={(e) => handleInputChange("reference", e.target.value)}
                    placeholder="Cerca de... frente a..."
                    className="h-12 px-4 bg-bg-muted rounded-xl text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-berry-red"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-text-secondary">Código Postal</label>
                  <input
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => handleInputChange("postalCode", e.target.value)}
                    placeholder="15000"
                    className="h-12 px-4 bg-bg-muted rounded-xl text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-berry-red"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <div
                    onClick={() => handleInputChange("isDefault", !formData.isDefault)}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                      formData.isDefault ? "bg-berry-red border-berry-red" : "border-border-strong"
                    }`}
                  >
                    {formData.isDefault && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <span className="text-sm text-text-secondary">Establecer como dirección principal</span>
                </label>

                <div className="flex gap-3">
                  <button
                    onClick={handleCancel}
                    className="h-12 px-6 rounded-xl border border-border-subtle text-text-secondary font-medium hover:bg-bg-muted transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 h-12 px-6 rounded-xl bg-berry-red text-white font-semibold hover:bg-berry-red-dark transition-colors"
                  >
                    <Check className="w-[18px] h-[18px]" />
                    <span>{isEditing ? "Guardar Cambios" : "Guardar Dirección"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Content */}
      <div className="flex lg:hidden flex-col gap-5 p-5">
        {/* Saved Addresses Section */}
        <div className="flex flex-col gap-3">
          <span className="text-sm font-semibold text-text-secondary">Direcciones guardadas</span>
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className="bg-bg-surface p-4 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
            >
              <div className="flex items-start gap-3">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                  addr.isDefault ? "bg-berry-red-light text-berry-red" : "bg-bg-muted text-text-secondary"
                }`}>
                  {getTypeIcon(addr.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-text-primary">{addr.name}</span>
                    {addr.isDefault && (
                      <span className="px-2 py-0.5 bg-berry-red-light text-berry-red text-xs font-medium rounded">
                        Principal
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-text-secondary mt-1">{addr.address}</p>
                  <p className="text-[13px] text-text-tertiary">{addr.district}, {addr.city} {addr.postalCode}</p>
                  <div className="flex items-center gap-4 mt-2 pt-2">
                    <button onClick={() => handleEdit(addr)} className="text-sm text-berry-red font-medium">Editar</button>
                    <button className="text-sm text-text-tertiary">Eliminar</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add/Edit Address Form */}
        <div className="bg-bg-surface p-5 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-text-secondary">
              {isEditing ? "Editar dirección" : "Agregar nueva dirección"}
            </span>
            {isEditing && (
              <button onClick={handleCancel} className="text-sm text-text-tertiary">
                Cancelar
              </button>
            )}
          </div>

          {/* Type Selector */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-text-secondary">Tipo de dirección</label>
            <div className="flex gap-2.5">
              {[
                { value: "casa", label: "Casa", icon: Home },
                { value: "oficina", label: "Oficina", icon: Briefcase },
                { value: "otro", label: "Otro", icon: MapPin },
              ].map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => handleInputChange("type", value)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm transition-colors ${
                    formData.type === value
                      ? "border-berry-red bg-berry-red-light text-berry-red font-medium"
                      : "border-border-subtle text-text-secondary"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Name Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-text-secondary">Nombre / Etiqueta</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Ej: Casa de mamá"
              className="h-12 px-3.5 bg-bg-muted rounded-lg text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-berry-red"
            />
          </div>

          {/* Address Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-text-secondary">Dirección</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              placeholder="Calle, número, urbanización"
              className="h-12 px-3.5 bg-bg-muted rounded-lg text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-berry-red"
            />
          </div>

          {/* Reference Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-text-secondary">Referencia</label>
            <input
              type="text"
              value={formData.reference}
              onChange={(e) => handleInputChange("reference", e.target.value)}
              placeholder="Cerca de... frente a..."
              className="h-12 px-3.5 bg-bg-muted rounded-lg text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-berry-red"
            />
          </div>

          {/* District & Postal Code Row */}
          <div className="flex gap-3">
            <div className="flex-1 flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-text-secondary">Distrito</label>
              <select
                value={formData.district}
                onChange={(e) => handleInputChange("district", e.target.value)}
                className="h-12 px-3.5 bg-bg-muted rounded-lg text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-berry-red appearance-none"
              >
                <option value="">Seleccionar...</option>
                <option value="Miraflores">Miraflores</option>
                <option value="San Isidro">San Isidro</option>
                <option value="San Borja">San Borja</option>
                <option value="Surco">Surco</option>
              </select>
            </div>
            <div className="flex-1 flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-text-secondary">Código Postal</label>
              <input
                type="text"
                value={formData.postalCode}
                onChange={(e) => handleInputChange("postalCode", e.target.value)}
                placeholder="15000"
                className="h-12 px-3.5 bg-bg-muted rounded-lg text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-berry-red"
              />
            </div>
          </div>

          {/* Default Checkbox */}
          <label className="flex items-center gap-3 py-1 cursor-pointer">
            <div
              onClick={() => handleInputChange("isDefault", !formData.isDefault)}
              className={`w-[22px] h-[22px] rounded-md flex items-center justify-center transition-colors ${
                formData.isDefault ? "bg-berry-red" : "border-2 border-border-strong"
              }`}
            >
              {formData.isDefault && <Check className="w-3.5 h-3.5 text-white" />}
            </div>
            <span className="text-sm font-medium text-text-primary">Establecer como dirección principal</span>
          </label>

          {/* Submit Button */}
          <button
            onClick={handleSave}
            className="flex items-center justify-center gap-2 h-[52px] bg-berry-red text-white font-semibold rounded-xl"
          >
            {isEditing ? (
              <Check className="w-[18px] h-[18px]" />
            ) : (
              <Plus className="w-[18px] h-[18px]" />
            )}
            <span className="text-[15px]">{isEditing ? "Guardar Cambios" : "Guardar Dirección"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
