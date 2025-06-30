import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, ProductDetails } from '@/types';
import { toast } from 'sonner';

type CartItem = {
  product: Product | ProductDetails;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addToCart: (product, quantity = 1) => {
        const current = get().items;
        const exists = current.find((item) => item.product.id === product.id);

        if (exists) {
          set({
            items: current.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          set({ items: [...current, { product, quantity }] });
        }

        toast.success('Product added to cart successfully.');
      },
      removeFromCart: (productId) =>
        set({
          items: get().items.filter((item) => item.product.id !== productId),
        }),
      updateQuantity: (productId, quantity) =>
        set({
          items: get().items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        }),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage',
    }
  )
);
