import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "Ingresa tu contraseña"),
});

export const registerSchema = z
  .object({
    fullName: z.string().min(2, "Ingresa tu nombre completo"),
    email: z.string().email("Email inválido"),
    phone: z
      .string()
      .min(9, "Teléfono inválido")
      .optional()
      .or(z.literal("")),
    password: z
      .string()
      .min(8, "Mínimo 8 caracteres")
      .regex(/[A-Z]/, "Al menos una mayúscula")
      .regex(/[a-z]/, "Al menos una minúscula")
      .regex(/[0-9]/, "Al menos un número")
      .regex(/[^A-Za-z0-9]/, "Al menos un carácter especial"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export const onboardingSchema = z.object({
  fullName: z.string().min(2, "Ingresa tu nombre completo"),
  phone: z.string().min(9, "Teléfono inválido"),
  documentType: z.string().optional(),
  documentNumber: z.string().optional(),
  address: z.string().min(5, "Ingresa una dirección válida"),
  districtId: z.number({ error: "Selecciona un distrito" }),
  addressReference: z.string().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type OnboardingFormData = z.infer<typeof onboardingSchema>;
