"use client";

import Link from "next/link";
import OrderStatusBadge from "@/app/components/OrderStatusBadge";
import type { Order, OrderStatus, PaymentStatus } from "@/lib/store/orders";
import { statusLabels } from "@/lib/store/orders";

const paymentStyles: Record<PaymentStatus, string> = {
    paid: "bg-emerald-100 text-emerald-800 border-emerald-300",
    pending: "bg-amber-100 text-amber-800 border-amber-300",
    refunded: "bg-blue-100 text-blue-800 border-blue-300",
    failed: "bg-rose-100 text-rose-800 border-rose-300",
};

const paymentLabels: Record<PaymentStatus, string> = {
    paid: "Paid",
    pending: "COD Pending",
    refunded: "Refunded",
    failed: "Failed",
};

/** Row background + accent per order status */
const rowThemes: Record<
    OrderStatus,
    { row: string; leftBar: string; hover: string }
> = {
    pending: {
        row: "bg-gradient-to-r from-gray-50 to-white",
        leftBar: "from-gray-300 to-gray-500",
        hover: "hover:from-gray-100 hover:to-gray-50",
    },
    confirmed: {
        row: "bg-gradient-to-r from-blue-50/70 to-white",
        leftBar: "from-blue-400 to-blue-600",
        hover: "hover:from-blue-100/70 hover:to-blue-50/30",
    },
    processing: {
        row: "bg-gradient-to-r from-amber-50/70 to-white",
        leftBar: "from-amber-400 to-orange-500",
        hover: "hover:from-amber-100/70 hover:to-amber-50/30",
    },
    shipped: {
        row: "bg-gradient-to-r from-indigo-50/70 to-white",
        leftBar: "from-indigo-400 to-indigo-600",
        hover: "hover:from-indigo-100/70 hover:to-indigo-50/30",
    },
    "out-for-delivery": {
        row: "bg-gradient-to-r from-purple-50/70 to-white",
        leftBar: "from-purple-400 to-purple-600",
        hover: "hover:from-purple-100/70 hover:to-purple-50/30",
    },
    delivered: {
        row: "bg-gradient-to-r from-emerald-50/70 to-white",
        leftBar: "from-emerald-400 to-emerald-600",
        hover: "hover:from-emerald-100/70 hover:to-emerald-50/30",
    },
    cancelled: {
        row: "bg-gradient-to-r from-rose-50/70 to-white",
        leftBar: "from-rose-400 to-rose-600",
        hover: "hover:from-rose-100/70 hover:to-rose-50/30",
    },
};

export function PaymentBadge({
    status,
    method,
}: {
    status: PaymentStatus;
    method: string;
}) {
    return (
        <span
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${paymentStyles[status]}`}
        >
            {method === "cod" ? "💵" : method === "card" ? "💳" : "🅿️"}
            {paymentLabels[status]}
        </span>
    );
}

interface Props {
    orders: Order[];
    onUpdateStatus: (id: string, status: OrderStatus) => void;
    onUpdatePayment: (id: string, status: PaymentStatus) => void;
}

export default function OrdersTable({
    orders,
    onUpdateStatus,
    onUpdatePayment,
}: Props) {
    if (orders.length === 0) {
        return (
            <div className="bg-white rounded-3xl border border-gray-100 p-16 text-center shadow-sm">
                <div className="text-6xl mb-5">📭</div>
                <h3 className="font-display text-2xl font-bold text-gray-900 mb-2">
                    No orders found
                </h3>
                <p className="text-gray-500">
                    Try changing your filter or search query.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {orders.map((order) => {
                const paymentStatus = order.payment?.status ?? "pending";
                const theme = rowThemes[order.status];
                const itemCount = order.items.reduce(
                    (sum, i) => sum + i.quantity,
                    0
                );

                return (
                    <div
                        key={order.id}
                        className={`relative rounded-3xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 ${theme.row} ${theme.hover}`}
                    >
                        {/* Colored left accent bar */}
                        <div
                            className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${theme.leftBar}`}
                        />

                        <div className="relative p-5 md:p-6 pl-7 md:pl-8">
                            <div className="flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-6">
                                {/* Left: Order id + customer */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                                        <Link
                                            href={`/admin/orders/${order.id}`}
                                            className="font-mono font-bold text-gray-900 hover:text-amber-600 transition text-lg"
                                        >
                                            {order.id}
                                        </Link>
                                        <OrderStatusBadge status={order.status} />
                                    </div>
                                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-600">
                                        <span className="font-semibold text-gray-900">
                                            {order.customer.fullName}
                                        </span>
                                        <span className="text-gray-300">·</span>
                                        <span className="truncate max-w-[220px]">
                                            {order.customer.email}
                                        </span>
                                        <span className="text-gray-300">·</span>
                                        <span className="text-gray-500">
                                            {new Date(order.createdAt).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                            })}
                                        </span>
                                    </div>
                                    <div className="text-xs text-gray-500 mt-2">
                                        {itemCount} item{itemCount !== 1 ? "s" : ""} ·{" "}
                                        {order.customer.city}, {order.customer.country}
                                    </div>
                                </div>

                                {/* Middle: Total */}
                                <div className="flex lg:flex-col items-baseline lg:items-start gap-3 lg:gap-0 lg:w-32">
                                    <span className="text-[10px] tracking-widest uppercase font-bold text-gray-500 lg:mb-1">
                                        Total
                                    </span>
                                    <span className="font-display text-2xl font-bold text-gray-900">
                                        ${order.total.toFixed(2)}
                                    </span>
                                </div>

                                {/* Middle: Order status control */}
                                <div className="flex flex-col gap-2 lg:w-44">
                                    <span className="text-[10px] tracking-widest uppercase font-bold text-gray-500">
                                        Order Status
                                    </span>
                                    <select
                                        value={order.status}
                                        onChange={(e) =>
                                            onUpdateStatus(order.id, e.target.value as OrderStatus)
                                        }
                                        className="text-sm font-semibold border-2 border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 cursor-pointer bg-white hover:border-gray-400 transition"
                                    >
                                        {(Object.keys(statusLabels) as OrderStatus[]).map((s) => (
                                            <option key={s} value={s}>
                                                {statusLabels[s]}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Middle: Payment */}
                                <div className="flex flex-col gap-2 lg:w-44">
                                    <span className="text-[10px] tracking-widest uppercase font-bold text-gray-500">
                                        Payment
                                    </span>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <PaymentBadge
                                            status={paymentStatus}
                                            method={order.payment?.method ?? "card"}
                                        />
                                    </div>
                                    {order.payment?.method === "cod" &&
                                        paymentStatus !== "paid" && (
                                            <button
                                                onClick={() => onUpdatePayment(order.id, "paid")}
                                                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-bold rounded-full hover:from-emerald-400 hover:to-teal-500 shadow-md shadow-emerald-500/30 transition-all hover:scale-[1.02]"
                                            >
                                                <svg
                                                    className="w-3.5 h-3.5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="3"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M20 6 9 17l-5-5" />
                                                </svg>
                                                Mark as Paid
                                            </button>
                                        )}
                                </div>

                                {/* Right: View link */}
                                <div className="flex-shrink-0">
                                    <Link
                                        href={`/admin/orders/${order.id}`}
                                        className="inline-flex items-center gap-2 px-5 py-3 bg-black text-white text-sm font-semibold rounded-full hover:bg-amber-500 hover:text-black transition-all group"
                                    >
                                        View
                                        <svg
                                            className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2.5"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}