import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthUser, AuthMeResponse, RegisterData, OnboardingData } from "@/types/auth";
import * as authService from "@/lib/services/auth.service";

// Compat helpers for components that use the old User shape (name, initials)
export function getUserDisplayName(user: AuthUser | null): string {
  if (!user) return "";
  return [user.firstName, user.lastName].filter(Boolean).join(" ") || user.email;
}

export function getUserInitials(user: AuthUser | null): string {
  if (!user) return "";
  const first = user.firstName?.charAt(0) ?? "";
  const last = user.lastName?.charAt(0) ?? "";
  if (first || last) return (first + last).toUpperCase();
  return user.email.charAt(0).toUpperCase();
}

// Compat type for portal components that expect { name, initials, email }
export interface CompatUser extends AuthUser {
  name: string;
  initials: string;
}

export function toCompatUser(user: AuthUser): CompatUser {
  return {
    ...user,
    name: getUserDisplayName(user),
    initials: getUserInitials(user),
  };
}

// Hook that returns a compat user for portal pages
export function useAuthCompat() {
  const state = useAuth();
  return {
    ...state,
    user: state.user ? toCompatUser(state.user) : null,
  };
}

interface AuthState {
  user: AuthUser | null;
  meData: AuthMeResponse | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  returnUrl: string | null;

  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  completeOnboarding: (data: OnboardingData) => Promise<void>;
  setReturnUrl: (url: string | null) => void;
  initialize: () => Promise<void>;
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      meData: null,
      token: null,
      isAuthenticated: false,
      isLoading: true,
      returnUrl: null,

      login: async (email: string, password: string) => {
        const response = await authService.login(email, password);
        set({
          user: response.user,
          token: response.token,
          isAuthenticated: true,
        });
      },

      register: async (data: RegisterData) => {
        const response = await authService.register(data);
        set({
          user: response.user,
          token: response.token,
          isAuthenticated: true,
        });
      },

      logout: async () => {
        const { token } = get();
        if (token) {
          await authService.logout(token).catch(() => {});
        }
        set({
          user: null,
          meData: null,
          token: null,
          isAuthenticated: false,
          returnUrl: null,
        });
      },

      refreshUser: async () => {
        const { token } = get();
        if (!token) {
          set({ isLoading: false });
          return;
        }

        try {
          const meData = await authService.getMe(token);
          set({
            user: {
              id: meData.id,
              email: meData.email,
              role: meData.role,
              firstName: meData.firstName,
              lastName: meData.lastName,
              isActive: meData.isActive,
              emailVerified: meData.emailVerified,
              hasCompletedOnboarding: meData.hasCompletedOnboarding,
              phone: meData.phone,
              customerId: meData.customer?.id ?? null,
              createdAt: meData.createdAt,
              lastLogin: meData.lastLogin,
            },
            meData,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch {
          // Token expired or invalid
          set({
            user: null,
            meData: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      },

      completeOnboarding: async (data: OnboardingData) => {
        const { token, user } = get();
        if (!token) throw new Error("No autenticado");

        await authService.completeOnboarding(token, data);

        if (user) {
          set({
            user: { ...user, hasCompletedOnboarding: true },
          });
        }
      },

      setReturnUrl: (url: string | null) => {
        set({ returnUrl: url });
      },

      initialize: async () => {
        const { token } = get();
        if (token) {
          await get().refreshUser();
        } else {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "sbp-auth",
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        returnUrl: state.returnUrl,
      }),
    }
  )
);
