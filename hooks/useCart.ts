import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ServerCart, ServerCartItem } from "@/types/cart";
import * as cartService from "@/lib/services/cart.service";

interface CartState {
  sessionId: string | null;
  cart: ServerCart | null;
  isLoading: boolean;
  isUpdating: boolean;
  error: string | null;

  getOrCreateSessionId: () => string;
  fetchCart: () => Promise<void>;
  addItem: (productId: string, quantity?: number) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearCart: () => void;

  // Computed helpers
  getItemCount: () => number;
  getSubtotal: () => number;
  getItems: () => ServerCartItem[];
}

function generateSessionId(): string {
  return crypto.randomUUID();
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      sessionId: null,
      cart: null,
      isLoading: false,
      isUpdating: false,
      error: null,

      getOrCreateSessionId: () => {
        let { sessionId } = get();
        if (!sessionId) {
          sessionId = generateSessionId();
          set({ sessionId });
        }
        return sessionId;
      },

      fetchCart: async () => {
        const sessionId = get().getOrCreateSessionId();
        set({ isLoading: true, error: null });

        try {
          const cart = await cartService.getCart(sessionId);
          set({ cart, isLoading: false });
        } catch (err) {
          set({
            error: (err as Error).message,
            isLoading: false,
          });
        }
      },

      addItem: async (productId: string, quantity: number = 1) => {
        const sessionId = get().getOrCreateSessionId();
        set({ isUpdating: true, error: null });

        try {
          await cartService.addItem(
            sessionId,
            productId,
            quantity.toFixed(2)
          );
          // Re-fetch the full cart to get updated summary
          const cart = await cartService.getCart(sessionId);
          set({ cart, isUpdating: false });
        } catch (err) {
          set({
            error: (err as Error).message,
            isUpdating: false,
          });
          throw err;
        }
      },

      updateQuantity: async (itemId: string, quantity: number) => {
        if (quantity < 1) {
          await get().removeItem(itemId);
          return;
        }

        const sessionId = get().getOrCreateSessionId();
        set({ isUpdating: true, error: null });

        try {
          await cartService.updateItem(itemId, quantity.toFixed(2));
          const cart = await cartService.getCart(sessionId);
          set({ cart, isUpdating: false });
        } catch (err) {
          set({
            error: (err as Error).message,
            isUpdating: false,
          });
          throw err;
        }
      },

      removeItem: async (itemId: string) => {
        const sessionId = get().getOrCreateSessionId();
        set({ isUpdating: true, error: null });

        try {
          await cartService.removeItem(itemId);
          const cart = await cartService.getCart(sessionId);
          set({ cart, isUpdating: false });
        } catch (err) {
          set({
            error: (err as Error).message,
            isUpdating: false,
          });
          throw err;
        }
      },

      clearCart: () => {
        set({ sessionId: null, cart: null, error: null });
      },

      getItemCount: () => {
        return get().cart?.summary.itemCount ?? 0;
      },

      getSubtotal: () => {
        return parseFloat(get().cart?.summary.subtotal ?? "0");
      },

      getItems: () => {
        return get().cart?.items ?? [];
      },
    }),
    {
      name: "sbp-cart",
      partialize: (state) => ({
        sessionId: state.sessionId,
      }),
    }
  )
);
