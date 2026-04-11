import { z } from "zod";

export const DELIVERY_TIME_SLOTS = [
  "09:00 - 11:00",
  "11:00 - 13:00",
  "13:00 - 15:00",
  "15:00 - 17:00",
  "17:00 - 19:00",
] as const;

export const deliveryFormSchema = z.object({
  address: z.string().min(10, "Ingresa una dirección válida (mínimo 10 caracteres)"),
  districtId: z.number({ error: "Selecciona un distrito" }),
  addressReference: z.string().optional(),
  phone: z.string().min(9, "Teléfono inválido"),
  deliveryDate: z.string().min(1, "Selecciona una fecha de entrega"),
  deliveryTimeSlot: z.enum(DELIVERY_TIME_SLOTS, {
    error: "Selecciona un horario de entrega",
  }),
  notes: z.string().optional(),
});

export type DeliveryFormData = z.infer<typeof deliveryFormSchema>;
