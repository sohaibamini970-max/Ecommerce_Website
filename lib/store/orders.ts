import { create } from "zustand";
import { persist } from "zustand/middleware";

export type OrderStatus =
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "out-for-delivery"
    | "delivered"
    | "cancelled";

export type PaymentStatus = "pending" | "paid" | "refunded" | "failed";

export interface OrderItem {
    productId: string;
    name: string;
    image: string;
    color: string;
    size: string;
    price: number;
    quantity: number;
}

export interface Order {
    id: string;
    createdAt: string;         // ISO
    status: OrderStatus;
    items: OrderItem[];
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
    customer: {
        fullName: string;
        email: string;
        phone: string;
        address: string;
        city: string;
        postalCode: string;
        country: string;
    };
    payment: {
        method: "card" | "paypal" | "cod";
        last4?: string;
        status: PaymentStatus;   // 👈 NEW
    };
    trackingNumber?: string;
    estimatedDelivery?: string; // ISO
}

interface OrdersStore {
    orders: Order[];
    addOrder: (order: Omit<Order, "id" | "createdAt">) => Order;
    updateStatus: (id: string, status: OrderStatus) => void;
    updatePaymentStatus: (id: string, status: PaymentStatus) => void;  // 👈 NEW
    getOrder: (id: string) => Order | undefined;
    clearOrders: () => void;
}

export const useOrders = create<OrdersStore>()(
    persist(
        (set, get) => ({
            orders: [],

            addOrder: (data) => {
                const id = `LX-${Date.now().toString(36).toUpperCase()}`;
                const order: Order = {
                    ...data,
                    id,
                    createdAt: new Date().toISOString(),
                };
                set({ orders: [order, ...get().orders] });
                return order;
            },

            updateStatus: (id, status) =>
                set({
                    orders: get().orders.map((o) =>
                        o.id === id ? { ...o, status } : o
                    ),
                }),

            updatePaymentStatus: (id, status) =>
                set({
                    orders: get().orders.map((o) =>
                        o.id === id
                            ? { ...o, payment: { ...o.payment, status } }
                            : o
                    ),
                }),

            getOrder: (id) => get().orders.find((o) => o.id === id),

            clearOrders: () => set({ orders: [] }),
        }),
        { name: "luxe-orders" }
    )
);

/** Human-readable labels for each status */
export const statusLabels: Record<OrderStatus, string> = {
    pending: "Pending",
    confirmed: "Confirmed",
    processing: "Processing",
    shipped: "Shipped",
    "out-for-delivery": "Out for Delivery",
    delivered: "Delivered",
    cancelled: "Cancelled",
};

/** Ordered list of statuses for the progress stepper */
export const statusFlow: OrderStatus[] = [
    "confirmed",
    "processing",
    "shipped",
    "out-for-delivery",
    "delivered",
];