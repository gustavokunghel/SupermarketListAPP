import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface CartItem {
  id: number;
  name: string;
  image: string;
  quantity: number;
}

interface CartStore {
  items: Record<number, CartItem>;
  increment: (product: { id: number; name: string; image: string }) => void;
  decrement: (id: number) => void;
  getQuantity: (id: number) => number;
  getCartItems: () => CartItem[];
  getTotalItems: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: {},

      increment: (product) =>
        set((state) => {
          const existing = state.items[product.id];
          return {
            items: {
              ...state.items,
              [product.id]: {
                id: product.id,
                name: product.name,
                image: product.image,
                quantity: (existing?.quantity || 0) + 1,
              },
            },
          };
        }),

      decrement: (id) =>
        set((state) => {
          const existing = state.items[id];
          if (!existing || existing.quantity <= 0) return state;

          if (existing.quantity === 1) {
            const { [id]: _, ...rest } = state.items;
            return { items: rest };
          }

          return {
            items: {
              ...state.items,
              [id]: { ...existing, quantity: existing.quantity - 1 },
            },
          };
        }),

      getQuantity: (id) => get().items[id]?.quantity || 0,

      getCartItems: () => Object.values(get().items).filter((item) => item.quantity > 0),

      getTotalItems: () =>
        Object.values(get().items).reduce((sum, item) => sum + item.quantity, 0),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ items: state.items }),
    },
  ),
);
