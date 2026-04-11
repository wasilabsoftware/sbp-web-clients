export interface AuthUser {
  id: string;
  email: string;
  role: string;
  firstName: string | null;
  lastName: string | null;
  isActive: boolean;
  emailVerified: boolean;
  hasCompletedOnboarding: boolean;
  phone: string | null;
  customerId: string | null;
  createdAt: string;
  lastLogin: string | null;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
  expiresIn: number;
}

export interface AuthCustomer {
  id: string;
  fullName: string;
  phone: string | null;
  documentType: string | null;
  documentNumber: string | null;
  address: string | null;
  districtId: number | null;
  addressReference: string | null;
  customerType: string;
  totalOrders: number;
  totalSpent: string;
}

export interface AuthMeResponse extends AuthUser {
  displayName: string;
  customer: AuthCustomer | null;
}

export interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  phone?: string;
  role?: string;
}

export interface OnboardingData {
  fullName: string;
  phone: string;
  documentType?: string;
  documentNumber?: string;
  address: string;
  districtId: number;
  addressReference?: string;
}

export interface ApiError {
  error: string;
  code: string;
  details?: Record<string, unknown>;
}
