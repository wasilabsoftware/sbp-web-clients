import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  id: string;
  name: string;
  email: string;
  initials: string;
  memberSince: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string) => void;
  logout: () => void;
}

// Mock user data based on email
const getMockUser = (email: string): User => {
  const name = email.split("@")[0].replace(/[._]/g, " ");
  const capitalizedName = name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const initials = capitalizedName
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return {
    id: Math.random().toString(36).slice(2),
    name: capitalizedName || "Usuario",
    email,
    initials: initials || "US",
    memberSince: "Enero 2024",
  };
};

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (email: string) => {
        const user = getMockUser(email);
        set({ user, isAuthenticated: true });
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: "sbp-auth",
    }
  )
);
