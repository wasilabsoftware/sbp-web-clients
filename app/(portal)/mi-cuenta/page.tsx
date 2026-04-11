"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth, getUserDisplayName, getUserInitials } from "@/hooks/useAuth";
import { updateProfile, changePassword } from "@/lib/services/auth.service";
import { getDistricts } from "@/lib/services/district.service";
import { Header } from "@/components/shared/Header";
import { Input } from "@/components/ui/Input";
import type { District } from "@/types/district";
import type { ApiError } from "@/types/auth";
import {
  Package,
  LogOut,
  Pencil,
  ArrowLeft,
  Settings,
  ChevronRight,
  Check,
  Mail,
  Phone,
  User,
  MapPin,
  Home,
  FileText,
  Lock,
  Loader2,
} from "lucide-react";

export default function MiCuentaPage() {
  const router = useRouter();
  const { user, token, meData, logout, refreshUser, isLoading: authLoading, initialize } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [districts, setDistricts] = useState<District[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    documentType: "",
    documentNumber: "",
    address: "",
    districtId: "",
    addressReference: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => { initialize(); }, [initialize]);

  useEffect(() => {
    getDistricts().then(setDistricts).catch(() => {});
  }, []);

  // Populate form from meData
  useEffect(() => {
    if (meData?.customer) {
      const c = meData.customer;
      setFormData({
        fullName: c.fullName || "",
        phone: c.phone || "",
        documentType: c.documentType || "DNI",
        documentNumber: c.documentNumber || "",
        address: c.address || "",
        districtId: c.districtId?.toString() || "",
        addressReference: c.addressReference || "",
      });
    }
  }, [meData]);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setIsChangingPassword(false);
    setServerError(null);
    setSuccessMessage(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsChangingPassword(false);
    setServerError(null);
  };

  const handleSave = async () => {
    if (!token) return;
    setIsSaving(true);
    setServerError(null);

    try {
      await updateProfile(token, {
        fullName: formData.fullName,
        phone: formData.phone,
        documentType: formData.documentType || undefined,
        documentNumber: formData.documentNumber || undefined,
        address: formData.address,
        districtId: formData.districtId ? Number(formData.districtId) : undefined,
        addressReference: formData.addressReference || undefined,
      });

      await refreshUser();
      setIsEditing(false);
      setSuccessMessage("Perfil actualizado exitosamente");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      const apiError = err as ApiError;
      setServerError(apiError.error || "Error al guardar los cambios");
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (!token) return;
    setIsSaving(true);
    setServerError(null);

    try {
      await changePassword(
        token,
        passwordData.currentPassword,
        passwordData.newPassword,
        passwordData.confirmPassword
      );
      setIsChangingPassword(false);
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setSuccessMessage("Contraseña cambiada exitosamente");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      const apiError = err as ApiError;
      const messages: Record<string, string> = {
        PASSWORD_MISMATCH: "Las contraseñas no coinciden",
        WEAK_PASSWORD: "La contraseña no cumple los requisitos",
        INVALID_CURRENT_PASSWORD: "La contraseña actual es incorrecta",
      };
      setServerError(messages[apiError.code] || apiError.error || "Error al cambiar contraseña");
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-berry-red animate-spin" />
      </div>
    );
  }

  const displayName = getUserDisplayName(user);
  const initials = getUserInitials(user);
  const customer = meData?.customer;
  const districtName = districts.find((d) => d.id === customer?.districtId)?.name;

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      <div className="hidden lg:block"><Header /></div>

      {/* Mobile Header */}
      <header className="flex lg:hidden bg-bg-surface h-16 items-center justify-between px-5">
        <button
          onClick={() => (isEditing || isChangingPassword ? handleCancel() : router.back())}
          className="w-10 h-10 rounded-full bg-bg-muted flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-text-primary" />
        </button>
        <span className="text-lg font-bold text-text-primary">
          {isEditing ? "Editar Perfil" : isChangingPassword ? "Cambiar Contraseña" : "Mi Perfil"}
        </span>
        <div className="w-10" />
      </header>

      {/* Success/Error Messages */}
      {(successMessage || serverError) && (
        <div className="px-5 lg:px-20 pt-4">
          {successMessage && (
            <div className="max-w-3xl mx-auto bg-berry-green-light border border-berry-green/20 rounded-xl px-4 py-3">
              <p className="text-sm text-berry-green">{successMessage}</p>
            </div>
          )}
          {serverError && (
            <div className="max-w-3xl mx-auto bg-berry-red-light border border-berry-red/20 rounded-xl px-4 py-3">
              <p className="text-sm text-berry-red">{serverError}</p>
            </div>
          )}
        </div>
      )}

      {/* Desktop Content */}
      <div className="hidden lg:flex flex-1 gap-12 px-20 py-12">
        {/* Sidebar */}
        <aside className="w-[280px] flex-shrink-0">
          <div className="bg-bg-surface rounded-3xl p-6 shadow-[0_4px_16px_rgba(0,0,0,0.04)] flex flex-col gap-6">
            <div className="flex flex-col items-center gap-4">
              <div className="w-[100px] h-[100px] rounded-full bg-berry-red-light flex items-center justify-center">
                <span className="text-4xl font-bold text-berry-red">{initials}</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-xl font-bold text-text-primary">{displayName}</span>
                <span className="text-sm text-text-secondary">{user.email}</span>
              </div>
            </div>
            <nav className="flex flex-col gap-1">
              <Link href="/mi-cuenta" className="flex items-center gap-3 h-12 px-4 rounded-xl bg-berry-red-light text-berry-red font-semibold">
                <User className="w-5 h-5" /><span className="text-[15px]">Mi Perfil</span>
              </Link>
              <Link href="/mi-cuenta/pedidos" className="flex items-center gap-3 h-12 px-4 rounded-xl text-text-secondary hover:bg-bg-muted transition-colors">
                <Package className="w-5 h-5" /><span className="text-[15px] font-medium">Mis Pedidos</span>
              </Link>
            </nav>
            {!isEditing && !isChangingPassword && (
              <button onClick={handleLogout} className="flex items-center justify-center gap-2 h-12 px-4 rounded-xl border border-border-subtle text-text-secondary hover:bg-bg-muted transition-colors">
                <LogOut className="w-[18px] h-[18px]" /><span className="text-sm font-medium">Cerrar Sesión</span>
              </button>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-[28px] font-bold text-text-primary">
              {isEditing ? "Editar Perfil" : isChangingPassword ? "Cambiar Contraseña" : "Mi Perfil"}
            </h1>
            {!isEditing && !isChangingPassword && (
              <div className="flex gap-3">
                <button onClick={() => { setIsChangingPassword(true); setServerError(null); }} className="flex items-center gap-2 h-11 px-5 rounded-xl border border-border-subtle text-text-secondary font-medium hover:bg-bg-muted transition-colors">
                  <Lock className="w-[18px] h-[18px]" /><span className="text-sm">Cambiar Contraseña</span>
                </button>
                <button onClick={handleEditClick} className="flex items-center gap-2 h-11 px-5 rounded-xl bg-berry-red text-white font-semibold hover:bg-berry-red-dark transition-colors">
                  <Pencil className="w-[18px] h-[18px]" /><span className="text-sm">Editar Perfil</span>
                </button>
              </div>
            )}
          </div>

          {isChangingPassword ? (
            <div className="bg-bg-surface rounded-3xl p-8 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
              <h2 className="text-lg font-bold text-text-primary mb-6">Cambiar Contraseña</h2>
              <div className="grid grid-cols-1 gap-5">
                <Input type="password" name="currentPassword" label="Contraseña actual" placeholder="Ingresa tu contraseña actual" value={passwordData.currentPassword} onChange={(e) => setPasswordData((p) => ({ ...p, currentPassword: e.target.value }))} icon={<Lock className="w-[18px] h-[18px]" />} />
                <Input type="password" name="newPassword" label="Nueva contraseña" placeholder="Mín. 8 caracteres, mayúscula, número, especial" value={passwordData.newPassword} onChange={(e) => setPasswordData((p) => ({ ...p, newPassword: e.target.value }))} icon={<Lock className="w-[18px] h-[18px]" />} />
                <Input type="password" name="confirmPassword" label="Confirmar nueva contraseña" placeholder="Repite la nueva contraseña" value={passwordData.confirmPassword} onChange={(e) => setPasswordData((p) => ({ ...p, confirmPassword: e.target.value }))} icon={<Lock className="w-[18px] h-[18px]" />} />
              </div>
              <div className="flex items-center gap-4 mt-8">
                <button onClick={handleCancel} className="h-12 px-6 rounded-xl border border-border-subtle text-text-secondary font-medium hover:bg-bg-muted transition-colors">Cancelar</button>
                <button onClick={handleChangePassword} disabled={isSaving} className="flex items-center gap-2 h-12 px-8 rounded-xl bg-berry-red text-white font-semibold hover:bg-berry-red-dark transition-colors disabled:opacity-50">
                  {isSaving ? <Loader2 className="w-[18px] h-[18px] animate-spin" /> : <Check className="w-[18px] h-[18px]" />}
                  <span>Cambiar Contraseña</span>
                </button>
              </div>
            </div>
          ) : isEditing ? (
            <div className="bg-bg-surface rounded-3xl p-8 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
              <h2 className="text-lg font-bold text-text-primary mb-6">Información Personal</h2>
              <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                <Input type="text" label="Nombre completo" value={formData.fullName} onChange={(e) => handleInputChange("fullName", e.target.value)} icon={<User className="w-[18px] h-[18px]" />} />
                <Input type="email" label="Correo Electrónico" value={user.email} disabled icon={<Mail className="w-[18px] h-[18px]" />} />
                <Input type="tel" label="Teléfono" value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} icon={<Phone className="w-[18px] h-[18px]" />} />
                <div className="flex gap-3">
                  <div className="flex flex-col gap-2 w-[120px]">
                    <label className="text-sm font-medium text-text-primary">Documento</label>
                    <select value={formData.documentType} onChange={(e) => handleInputChange("documentType", e.target.value)} className="h-[52px] px-4 bg-bg-muted rounded-[--radius-md] text-text-primary border border-transparent focus:outline-none focus:border-berry-red transition-colors">
                      <option value="DNI">DNI</option><option value="RUC">RUC</option><option value="CE">CE</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <Input type="text" label="Número" value={formData.documentNumber} onChange={(e) => handleInputChange("documentNumber", e.target.value)} />
                  </div>
                </div>
                <Input type="text" label="Dirección" value={formData.address} onChange={(e) => handleInputChange("address", e.target.value)} icon={<Home className="w-[18px] h-[18px]" />} />
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-text-primary">Distrito</label>
                  <select value={formData.districtId} onChange={(e) => handleInputChange("districtId", e.target.value)} className="h-[52px] px-4 bg-bg-muted rounded-[--radius-md] text-text-primary border border-transparent focus:outline-none focus:border-berry-red transition-colors">
                    <option value="">Selecciona un distrito</option>
                    {districts.map((d) => (<option key={d.id} value={d.id}>{d.name}</option>))}
                  </select>
                </div>
                <Input type="text" label="Referencia" value={formData.addressReference} onChange={(e) => handleInputChange("addressReference", e.target.value)} icon={<MapPin className="w-[18px] h-[18px]" />} />
              </div>
              <div className="flex items-center gap-4 mt-8">
                <button onClick={handleCancel} className="h-12 px-6 rounded-xl border border-border-subtle text-text-secondary font-medium hover:bg-bg-muted transition-colors">Cancelar</button>
                <button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2 h-12 px-8 rounded-xl bg-berry-red text-white font-semibold hover:bg-berry-red-dark transition-colors disabled:opacity-50">
                  {isSaving ? <Loader2 className="w-[18px] h-[18px] animate-spin" /> : <Check className="w-[18px] h-[18px]" />}
                  <span>Guardar Cambios</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-bg-surface rounded-3xl p-8 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
              <h2 className="text-lg font-bold text-text-primary mb-6">Información Personal</h2>
              <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                <div className="flex flex-col gap-1.5">
                  <span className="text-sm text-text-tertiary">Nombre Completo</span>
                  <span className="text-[15px] font-medium text-text-primary">{displayName}</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-sm text-text-tertiary">Documento</span>
                  <span className="text-[15px] font-medium text-text-primary">{customer?.documentType || "—"} {customer?.documentNumber || ""}</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-sm text-text-tertiary">Correo Electrónico</span>
                  <span className="text-[15px] font-medium text-text-primary">{user.email}</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-sm text-text-tertiary">Teléfono</span>
                  <span className="text-[15px] font-medium text-text-primary">{customer?.phone || "—"}</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-sm text-text-tertiary">Dirección</span>
                  <span className="text-[15px] font-medium text-text-primary">{customer?.address || "—"}</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-sm text-text-tertiary">Distrito</span>
                  <span className="text-[15px] font-medium text-text-primary">{districtName || "—"}</span>
                </div>
                {customer?.totalOrders !== undefined && (
                  <div className="flex flex-col gap-1.5">
                    <span className="text-sm text-text-tertiary">Total pedidos</span>
                    <span className="text-[15px] font-medium text-text-primary">{customer.totalOrders}</span>
                  </div>
                )}
                {customer?.totalSpent && (
                  <div className="flex flex-col gap-1.5">
                    <span className="text-sm text-text-tertiary">Total comprado</span>
                    <span className="text-[15px] font-medium text-text-primary">S/ {parseFloat(customer.totalSpent).toFixed(2)}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Content */}
      <div className="flex lg:hidden flex-col gap-5 p-5">
        {isChangingPassword ? (
          <div className="bg-bg-surface rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex flex-col gap-4">
            <h2 className="text-base font-bold text-text-primary">Cambiar Contraseña</h2>
            <Input type="password" label="Contraseña actual" value={passwordData.currentPassword} onChange={(e) => setPasswordData((p) => ({ ...p, currentPassword: e.target.value }))} icon={<Lock className="w-[18px] h-[18px]" />} />
            <Input type="password" label="Nueva contraseña" value={passwordData.newPassword} onChange={(e) => setPasswordData((p) => ({ ...p, newPassword: e.target.value }))} icon={<Lock className="w-[18px] h-[18px]" />} />
            <Input type="password" label="Confirmar contraseña" value={passwordData.confirmPassword} onChange={(e) => setPasswordData((p) => ({ ...p, confirmPassword: e.target.value }))} icon={<Lock className="w-[18px] h-[18px]" />} />
            <button onClick={handleChangePassword} disabled={isSaving} className="flex items-center justify-center gap-2 h-12 rounded-xl bg-berry-red text-white font-semibold disabled:opacity-50">
              {isSaving ? <Loader2 className="w-[18px] h-[18px] animate-spin" /> : <Check className="w-[18px] h-[18px]" />}
              <span>Cambiar Contraseña</span>
            </button>
          </div>
        ) : isEditing ? (
          <>
            <div className="bg-bg-surface rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex flex-col gap-4">
              <h2 className="text-base font-bold text-text-primary">Información Personal</h2>
              <Input type="text" label="Nombre completo" value={formData.fullName} onChange={(e) => handleInputChange("fullName", e.target.value)} icon={<User className="w-[18px] h-[18px]" />} />
              <Input type="tel" label="Teléfono" value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} icon={<Phone className="w-[18px] h-[18px]" />} />
              <div className="flex gap-3">
                <div className="flex flex-col gap-2 w-[120px]">
                  <label className="text-xs font-medium text-text-tertiary">Documento</label>
                  <select value={formData.documentType} onChange={(e) => handleInputChange("documentType", e.target.value)} className="h-11 px-4 bg-bg-muted rounded-xl text-[15px] text-text-primary">
                    <option value="DNI">DNI</option><option value="RUC">RUC</option><option value="CE">CE</option>
                  </select>
                </div>
                <div className="flex-1">
                  <Input type="text" label="Número" value={formData.documentNumber} onChange={(e) => handleInputChange("documentNumber", e.target.value)} />
                </div>
              </div>
              <Input type="text" label="Dirección" value={formData.address} onChange={(e) => handleInputChange("address", e.target.value)} icon={<Home className="w-[18px] h-[18px]" />} />
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-text-tertiary">Distrito</label>
                <select value={formData.districtId} onChange={(e) => handleInputChange("districtId", e.target.value)} className="h-11 px-4 bg-bg-muted rounded-xl text-[15px] text-text-primary">
                  <option value="">Selecciona</option>
                  {districts.map((d) => (<option key={d.id} value={d.id}>{d.name}</option>))}
                </select>
              </div>
              <Input type="text" label="Referencia" value={formData.addressReference} onChange={(e) => handleInputChange("addressReference", e.target.value)} icon={<MapPin className="w-[18px] h-[18px]" />} />
            </div>
            <button onClick={handleSave} disabled={isSaving} className="flex items-center justify-center gap-2 h-12 rounded-xl bg-berry-red text-white font-semibold disabled:opacity-50">
              {isSaving ? <Loader2 className="w-[18px] h-[18px] animate-spin" /> : <Check className="w-[18px] h-[18px]" />}
              <span>Guardar Cambios</span>
            </button>
            <button onClick={handleCancel} className="h-12 rounded-xl border border-border-subtle text-text-secondary font-medium">Cancelar</button>
          </>
        ) : (
          <>
            <div className="bg-bg-surface rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-berry-red-light flex items-center justify-center">
                <span className="text-3xl font-bold text-berry-red">{initials}</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-xl font-bold text-text-primary">{displayName}</span>
                <span className="text-sm text-text-secondary">{user.email}</span>
              </div>
              <button onClick={handleEditClick} className="w-full h-11 flex items-center justify-center gap-2 bg-berry-red text-white font-semibold rounded-xl">
                <Pencil className="w-4 h-4" /><span className="text-sm">Editar Perfil</span>
              </button>
            </div>
            <div className="bg-bg-surface rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex flex-col gap-4">
              <h2 className="text-base font-bold text-text-primary">Información Personal</h2>
              <div className="flex flex-col gap-1"><span className="text-xs font-medium text-text-tertiary">Nombre Completo</span><span className="text-[15px] text-text-primary">{displayName}</span></div>
              <div className="flex flex-col gap-1"><span className="text-xs font-medium text-text-tertiary">Correo Electrónico</span><span className="text-[15px] text-text-primary">{user.email}</span></div>
              <div className="flex flex-col gap-1"><span className="text-xs font-medium text-text-tertiary">Teléfono</span><span className="text-[15px] text-text-primary">{customer?.phone || "—"}</span></div>
              <div className="flex flex-col gap-1"><span className="text-xs font-medium text-text-tertiary">Documento</span><span className="text-[15px] text-text-primary">{customer?.documentType || "—"} {customer?.documentNumber || ""}</span></div>
              <div className="flex flex-col gap-1"><span className="text-xs font-medium text-text-tertiary">Dirección</span><span className="text-[15px] text-text-primary">{customer?.address || "—"}</span></div>
            </div>
            <div className="bg-bg-surface rounded-2xl p-2 shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex flex-col">
              <Link href="/mi-cuenta/pedidos" className="flex items-center gap-3 h-[52px] px-4">
                <Package className="w-5 h-5 text-text-secondary" />
                <span className="flex-1 text-[15px] font-medium text-text-primary">Mis Pedidos</span>
                <ChevronRight className="w-5 h-5 text-text-tertiary" />
              </Link>
              <button onClick={() => { setIsChangingPassword(true); setServerError(null); }} className="flex items-center gap-3 h-[52px] px-4">
                <Lock className="w-5 h-5 text-text-secondary" />
                <span className="flex-1 text-left text-[15px] font-medium text-text-primary">Cambiar Contraseña</span>
                <ChevronRight className="w-5 h-5 text-text-tertiary" />
              </button>
            </div>
            <button onClick={handleLogout} className="flex items-center justify-center gap-2 h-12 rounded-xl border border-border-subtle text-text-secondary">
              <LogOut className="w-[18px] h-[18px]" /><span className="text-sm font-medium">Cerrar Sesión</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
