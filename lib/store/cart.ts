import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
    id: string;               // unique: productId-color-size
    productId: string;
    name: string;
    image: string;
    color: string;
    size: string;
    price: number;
    quantity: number;
}

interface CartStore {
    items: CartItem[];
    isOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
    toggleCart: () => void;
    addItem: (item: Omit<CartItem, "id">) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    totalItems: () => number;
    totalPrice: () => number;
}

export const useCart = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,
            openCart: () => set({ isOpen: true }),
            closeCart: () => set({ isOpen: false }),
            toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),

            addItem: (item) => {
                const id = `${item.productId}-${item.color}-${item.size}`;
                const existing = get().items.find((i) => i.id === id);

                if (existing) {
                    set({
                        items: get().items.map((i) =>
                            i.id === id ? { ...i, quantity: i.quantity + item.quantity } : i
                        ),
                    });
                } else {
                    set({ items: [...get().items, { ...item, id }] });
                }
                set({ isOpen: true }); // auto-open cart
            },

            removeItem: (id) =>
                set({ items: get().items.filter((i) => i.id !== id) }),

            updateQuantity: (id, quantity) =>
                set({
                    items:
                        quantity <= 0
                            ? get().items.filter((i) => i.id !== id)
                            : get().items.map((i) => (i.id === id ? { ...i, quantity } : i)),
                }),

            clearCart: () => set({ items: [] }),

            totalItems: () =>
                get().items.reduce((sum, item) => sum + item.quantity, 0),

            totalPrice: () =>
                get().items.reduce(
                    (sum, item) => sum + item.price * item.quantity,
                    0
                ),
        }),
        { name: "luxe-cart" }
    )
);