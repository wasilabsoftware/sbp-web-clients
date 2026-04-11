"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/hooks/useAuth";
import { MapPin, Phone, FileText, Home, ArrowRight, Loader2 } from "lucide-react";
import { onboardingSchema } from "@/lib/validations/auth";
import { getDistricts } from "@/lib/services/district.service";
import type { District } from "@/types/district";
import type { ApiError } from "@/types/auth";

export default function OnboardingPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading, completeOnboarding, returnUrl, setReturnUrl } = useAuth();
  const [districts, setDistricts] = useState<District[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    documentType: "DNI",
    documentNumber: "",
    address: "",
    districtId: "",
    addressReference: "",
  });

  // Redirect if not authenticated or already onboarded
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.replace("/login");
    }
    if (!authLoading && user?.hasCompletedOnboarding) {
      router.replace("/");
    }
  }, [authLoading, isAuthenticated, user, router]);

  // Pre-fill name from registration
  useEffect(() => {
    if (user) {
      const name = [user.firstName, user.lastName].filter(Boolean).join(" ");
      setFormData((prev) => ({
        ...prev,
        fullName: name || prev.fullName,
        phone: user.phone || prev.phone,
      }));
    }
  }, [user]);

  // Fetch districts
  useEffect(() => {
    getDistricts()
      .then(setDistricts)
      .catch(() => {});
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setServerError(null);

    const parsed = onboardingSchema.safeParse({
      ...formData,
      districtId: formData.districtId ? Number(formData.districtId) : undefined,
    });

    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as string;
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);

    try {
      await completeOnboarding(parsed.data);

      const destination = returnUrl || "/";
      setReturnUrl(null);
      router.push(destination);
    } catch (err) {
      const apiError = err as ApiError;
      setServerError(apiError.error || "Error al completar el perfil");
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary">
        <Loader2 className="w-8 h-8 text-berry-red animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary w-full">
      {/* Header */}
      <div className="bg-berry-red px-6 py-8 lg:py-12 text-center">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-berry-red text-xl font-bold">SB</span>
        </div>
        <h1 className="text-2xl lg:text-3xl font-bold text-white">
          Completa tu perfil
        </h1>
        <p className="text-sm lg:text-base text-white/90 mt-2">
          Necesitamos algunos datos para tus envíos
        </p>
      </div>

      {/* Form */}
      <div className="max-w-[520px] mx-auto px-5 lg:px-0 py-8">
        {serverError && (
          <div className="bg-berry-red-light border border-berry-red/20 rounded-[--radius-md] px-4 py-3 mb-6">
            <p className="text-sm text-berry-red">{serverError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 lg:gap-5">
          <Input
            type="text"
            name="fullName"
            label="Nombre completo"
            placeholder="Juan Pérez García"
            value={formData.fullName}
            onChange={handleChange}
            icon={<FileText className="w-[18px] h-[18px]" />}
            error={errors.fullName}
            required
          />

          <Input
            type="tel"
            name="phone"
            label="Teléfono"
            placeholder="999 888 777"
            value={formData.phone}
            onChange={handleChange}
            icon={<Phone className="w-[18px] h-[18px]" />}
            error={errors.phone}
            required
          />

          {/* Document Type + Number */}
          <div className="flex gap-3">
            <div className="flex flex-col gap-2 w-[140px]">
              <label className="text-sm font-medium text-text-primary">
                Documento
              </label>
              <select
                name="documentType"
                value={formData.documentType}
                onChange={handleChange}
                className="h-[52px] px-4 bg-bg-muted rounded-[--radius-md] text-text-primary border border-transparent focus:outline-none focus:border-berry-red focus:bg-bg-surface transition-colors"
              >
                <option value="DNI">DNI</option>
                <option value="RUC">RUC</option>
                <option value="CE">CE</option>
                <option value="Pasaporte">Pasaporte</option>
              </select>
            </div>

            <div className="flex-1">
              <Input
                type="text"
                name="documentNumber"
                label="Número"
                placeholder={formData.documentType === "RUC" ? "20XXXXXXXXX" : "XXXXXXXX"}
                value={formData.documentNumber}
                onChange={handleChange}
                error={errors.documentNumber}
              />
            </div>
          </div>

          <Input
            type="text"
            name="address"
            label="Dirección de entrega"
            placeholder="Av. Lima 123, San Isidro"
            value={formData.address}
            onChange={handleChange}
            icon={<Home className="w-[18px] h-[18px]" />}
            error={errors.address}
            required
          />

          {/* District Select */}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm font-medium text-text-primary">
              Distrito
            </label>
            <select
              name="districtId"
              value={formData.districtId}
              onChange={handleChange}
              className={`
                w-full h-[52px] px-4
                bg-bg-muted rounded-[--radius-md]
                text-text-primary
                border border-transparent
                focus:outline-none focus:border-berry-red focus:bg-bg-surface
                transition-colors
                ${errors.districtId ? "border-berry-red bg-berry-red-light" : ""}
              `}
            >
              <option value="">Selecciona un distrito</option>
              {districts.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} {d.deliveryFee !== "0.00" ? `(+S/${d.deliveryFee})` : "(Gratis)"}
                </option>
              ))}
            </select>
            {errors.districtId && (
              <span className="text-sm text-berry-red">{errors.districtId}</span>
            )}
          </div>

          <Input
            type="text"
            name="addressReference"
            label="Referencia (opcional)"
            placeholder="Frente al parque, edificio azul"
            value={formData.addressReference}
            onChange={handleChange}
            icon={<MapPin className="w-[18px] h-[18px]" />}
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 lg:h-[52px] flex items-center justify-center gap-2 bg-berry-red text-white font-semibold rounded-[--radius-md] hover:bg-berry-red-dark transition-colors disabled:opacity-50 mt-2"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span className="text-sm lg:text-base">Completar Perfil</span>
                <ArrowRight className="w-[18px] h-[18px]" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
