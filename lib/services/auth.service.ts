import type {
  AuthResponse,
  AuthMeResponse,
  RegisterData,
  OnboardingData,
  ApiError,
} from "@/types/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function getApiUrl(): string {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }
  return API_URL;
}

function authHeaders(token: string): HeadersInit {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const data: ApiError = await res.json().catch(() => ({
      error: "Error de conexión",
      code: "NETWORK_ERROR",
    }));
    throw data;
  }
  return res.json();
}

export async function register(data: RegisterData): Promise<AuthResponse> {
  const res = await fetch(`${getApiUrl()}/api/v1/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      fullName: data.fullName,
      phone: data.phone,
      role: "customer",
    }),
  });
  return handleResponse<AuthResponse>(res);
}

export async function login(
  email: string,
  password: string
): Promise<AuthResponse> {
  const res = await fetch(`${getApiUrl()}/api/v1/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return handleResponse<AuthResponse>(res);
}

export async function getMe(token: string): Promise<AuthMeResponse> {
  const res = await fetch(`${getApiUrl()}/api/v1/auth/me`, {
    headers: authHeaders(token),
  });
  return handleResponse<AuthMeResponse>(res);
}

export async function completeOnboarding(
  token: string,
  data: OnboardingData
): Promise<void> {
  const res = await fetch(
    `${getApiUrl()}/api/v1/auth/complete-onboarding`,
    {
      method: "POST",
      headers: authHeaders(token),
      body: JSON.stringify(data),
    }
  );
  await handleResponse<{ message: string; hasCompletedOnboarding: boolean }>(
    res
  );
}

export async function logout(token: string): Promise<void> {
  await fetch(`${getApiUrl()}/api/v1/auth/logout`, {
    method: "POST",
    headers: authHeaders(token),
  });
}

export interface ProfileUpdateData {
  fullName?: string;
  phone?: string;
  documentType?: string;
  documentNumber?: string;
  address?: string;
  districtId?: number;
  addressReference?: string;
  preferredCommunication?: "whatsapp" | "email" | "phone";
  marketingConsent?: boolean;
}

export interface ProfileUpdateResponse {
  message: string;
  customer: AuthMeResponse["customer"];
}

export async function updateProfile(
  token: string,
  data: ProfileUpdateData
): Promise<ProfileUpdateResponse> {
  const res = await fetch(`${getApiUrl()}/api/v1/auth/profile`, {
    method: "PATCH",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
  return handleResponse<ProfileUpdateResponse>(res);
}

export async function changePassword(
  token: string,
  currentPassword: string,
  newPassword: string,
  confirmPassword: string
): Promise<{ message: string; passwordChanged: boolean }> {
  const res = await fetch(`${getApiUrl()}/api/v1/auth/change-password`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
  });
  return handleResponse<{ message: string; passwordChanged: boolean }>(res);
}
