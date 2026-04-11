"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { MapPin, Phone, Home, Calendar, Clock, FileText, ArrowLeft } from "lucide-react";
import { deliveryFormSchema, DELIVERY_TIME_SLOTS } from "@/lib/validations/checkout";
import type { DeliveryFormData } from "@/lib/validations/checkout";
import { getDistricts } from "@/lib/services/district.service";
import type { District } from "@/types/district";

interface DeliveryFormProps {
  initialData?: Partial<DeliveryFormData>;
  onSubmit: (data: DeliveryFormData) => void;
  onBack: () => void;
}

function getTomorrowDate(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split("T")[0];
}

export function DeliveryForm({
  initialData,
  onSubmit,
  onBack,
}: DeliveryFormProps) {
  const [districts, setDistricts] = useState<District[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    address: initialData?.address ?? "",
    districtId: initialData?.districtId?.toString() ?? "",
    addressReference: initialData?.addressReference ?? "",
    phone: initialData?.phone ?? "",
    deliveryDate: initialData?.deliveryDate ?? "",
    deliveryTimeSlot: initialData?.deliveryTimeSlot ?? "",
    notes: initialData?.notes ?? "",
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const parsed = deliveryFormSchema.safeParse({
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

    onSubmit(parsed.data);
  };

  const minDate = getTomorrowDate();

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="bg-bg-surface rounded-xl p-5 lg:p-6">
        <h3 className="text-base lg:text-lg font-bold text-text-primary mb-5">
          Dirección de Entrega
        </h3>

        <div className="flex flex-col gap-4">
          <Input
            type="text"
            name="address"
            label="Dirección"
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
                  {d.name}
                  {d.deliveryFee !== "0.00" ? ` (+S/${d.deliveryFee})` : " (Gratis)"}
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

          <Input
            type="tel"
            name="phone"
            label="Teléfono de contacto"
            placeholder="999 888 777"
            value={formData.phone}
            onChange={handleChange}
            icon={<Phone className="w-[18px] h-[18px]" />}
            error={errors.phone}
            required
          />
        </div>
      </div>

      <div className="bg-bg-surface rounded-xl p-5 lg:p-6">
        <h3 className="text-base lg:text-lg font-bold text-text-primary mb-5">
          Fecha y Horario
        </h3>

        <div className="flex flex-col gap-4">
          {/* Date */}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm font-medium text-text-primary">
              Fecha de entrega
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary">
                <Calendar className="w-[18px] h-[18px]" />
              </div>
              <input
                type="date"
                name="deliveryDate"
                value={formData.deliveryDate}
                onChange={handleChange}
                min={minDate}
                className={`
                  w-full h-[52px] px-4 pl-12
                  bg-bg-muted rounded-[--radius-md]
                  text-text-primary
                  border border-transparent
                  focus:outline-none focus:border-berry-red focus:bg-bg-surface
                  transition-colors
                  ${errors.deliveryDate ? "border-berry-red bg-berry-red-light" : ""}
                `}
              />
            </div>
            {errors.deliveryDate && (
              <span className="text-sm text-berry-red">
                {errors.deliveryDate}
              </span>
            )}
          </div>

          {/* Time Slot */}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm font-medium text-text-primary">
              Horario de entrega
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary">
                <Clock className="w-[18px] h-[18px]" />
              </div>
              <select
                name="deliveryTimeSlot"
                value={formData.deliveryTimeSlot}
                onChange={handleChange}
                className={`
                  w-full h-[52px] px-4 pl-12
                  bg-bg-muted rounded-[--radius-md]
                  text-text-primary
                  border border-transparent
                  focus:outline-none focus:border-berry-red focus:bg-bg-surface
                  transition-colors appearance-none
                  ${errors.deliveryTimeSlot ? "border-berry-red bg-berry-red-light" : ""}
                `}
              >
                <option value="">Selecciona un horario</option>
                {DELIVERY_TIME_SLOTS.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
            {errors.deliveryTimeSlot && (
              <span className="text-sm text-berry-red">
                {errors.deliveryTimeSlot}
              </span>
            )}
          </div>

          {/* Notes */}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm font-medium text-text-primary">
              Notas adicionales (opcional)
            </label>
            <div className="relative">
              <div className="absolute left-4 top-4 text-text-tertiary">
                <FileText className="w-[18px] h-[18px]" />
              </div>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Dejar con el portero, tocar timbre, etc."
                rows={3}
                className="w-full px-4 pl-12 py-3 bg-bg-muted rounded-[--radius-md] text-text-primary placeholder:text-text-tertiary border border-transparent focus:outline-none focus:border-berry-red focus:bg-bg-surface transition-colors resize-none"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full h-12 lg:h-[52px]"
        >
          Continuar
        </Button>
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={onBack}
          className="w-full h-12 lg:h-[52px]"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al Resumen
        </Button>
      </div>
    </form>
  );
}
