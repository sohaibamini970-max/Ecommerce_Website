"use client";

import Link from "next/link";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import OrderStatusBadge from "@/app/components/OrderStatusBadge";
import { useOrders, type OrderStatus } from "@/lib/store/orders";

/** Per-status color theme for the card accent + glow */
const cardThemes: Record<
    OrderStatus,
    { bar: string; glow: string; hover: string; icon: string }
> = {
    pending: {
        bar: "bg-gradient-to-b from-gray-400 to-gray-600",
        glow: "from-gray-500/5",
        hover: "hover:border-gray-300 hover:shadow-gray-500/10",
        icon: "⏳",
    },
    confirmed: {
        bar: "bg-gradient-to-b from-blue-400 to-blue-600",
        glow: "from-blue-500/5",
        hover: "hover:border-blue-300 hover:shadow-blue-500/10",
        icon: "✅",
    },
    processing: {
        bar: "bg-gradient-to-b from-amber-400 to-amber-600",
        glow: "from-amber-500/5",
        hover: "hover:border-amber-300 hover:shadow-amber-500/10",
        icon: "⚙️",
    },
    shipped: {
        bar: "bg-gradient-to-b from-indigo-400 to-indigo-600",
        glow: "from-indigo-500/5",
        hover: "hover:border-indigo-300 hover:shadow-indigo-500/10",
        icon: "🚚",
    },
    "out-for-delivery": {
        bar: "bg-gradient-to-b from-purple-400 to-purple-600",
        glow: "from-purple-500/5",
        hover: "hover:border-purple-300 hover:shadow-purple-500/10",
        icon: "📦",
    },
    delivered: {
        bar: "bg-gradient-to-b from-emerald-400 to-emerald-600",
        glow: "from-emerald-500/5",
        hover: "hover:border-emerald-300 hover:shadow-emerald-500/10",
        icon: "🎉",
    },
    cancelled: {
        bar: "bg-gradient-to-b from-rose-400 to-rose-600",
        glow: "from-rose-500/5",
        hover: "hover:border-rose-300 hover:shadow-rose-500/10",
        icon: "✖️",
    },
};

export default function OrdersPage() {
    const orders = useOrders((s) => s.orders);

    // Compute summary stats
    const totalOrders = orders.length;
    const activeOrders = orders.filter(
        (o) => !["delivered", "cancelled"].includes(o.status)
    ).length;
    const totalSpent = orders.reduce((sum, o) => sum + o.total, 0);

    return (
        <main className="overflow-x-hidden">
            <Navbar alwaysSolid />

            <section className="pt-32 pb-24 px-6 bg-gradient-to-b from-amber-50/40 via-gray-50 to-white min-h-screen">
                <div className="max-w-5xl mx-auto">
                    {/* Header with warm accent bar */}
                    <div className="relative mb-10 pl-6">
                        <div className="absolute left-0 top-1 bottom-1 w-1 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full" />
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-amber-600 text-sm font-medium tracking-[0.3em] uppercase">
                                Your Orders
                            </span>
                        </div>
                        <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                            Order{" "}
                            <span className="italic bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">
                                History
                            </span>
                        </h1>
                        <p className="text-gray-500">
                            Track deliveries, reorder favorites, and view past purchases.
                        </p>
                    </div>

                    {/* Summary stats — colorful pills */}
                    {orders.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                            <div className="relative bg-gradient-to-br from-blue-50 to-white rounded-2xl p-5 border border-blue-100/60 shadow-sm overflow-hidden">
                                <div className="absolute -top-8 -right-8 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl" />
                                <div className="relative">
                                    <div className="text-[10px] text-blue-600 tracking-[0.25em] uppercase font-semibold mb-2">
                                        Total Orders
                                    </div>
                                    <div className="font-display text-3xl font-bold text-gray-900">
                                        {totalOrders}
                                    </div>
                                </div>
                            </div>

                            <div className="relative bg-gradient-to-br from-amber-50 to-white rounded-2xl p-5 border border-amber-100/60 shadow-sm overflow-hidden">
                                <div className="absolute -top-8 -right-8 w-24 h-24 bg-amber-500/15 rounded-full blur-2xl" />
                                <div className="relative">
                                    <div className="text-[10px] text-amber-700 tracking-[0.25em] uppercase font-semibold mb-2">
                                        Active
                                    </div>
                                    <div className="font-display text-3xl font-bold text-gray-900">
                                        {activeOrders}
                                    </div>
                                </div>
                            </div>

                            <div className="relative bg-gradient-to-br from-emerald-50 to-white rounded-2xl p-5 border border-emerald-100/60 shadow-sm overflow-hidden">
                                <div className="absolute -top-8 -right-8 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl" />
                                <div className="relative">
                                    <div className="text-[10px] text-emerald-700 tracking-[0.25em] uppercase font-semibold mb-2">
                                        Total Spent
                                    </div>
                                    <div className="font-display text-3xl font-bold text-gray-900">
                                        ${totalSpent.toFixed(2)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {orders.length === 0 ? (
                        <div className="relative bg-gradient-to-br from-white to-amber-50/40 rounded-3xl border border-amber-100/60 p-12 text-center overflow-hidden shadow-sm">
                            {/* Ambient glows */}
                            <div className="absolute -top-16 -right-16 w-56 h-56 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
                            <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

                            <div className="relative">
                                <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center text-4xl shadow-lg shadow-amber-500/20">
                                    📦
                                </div>
                                <h2 className="font-display text-2xl font-bold text-gray-900 mb-3">
                                    No orders yet
                                </h2>
                                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                                    When you place your first order, it will appear here with live
                                    tracking and status updates.
                                </p>
                                <Link
                                    href="/shop"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black rounded-full font-semibold hover:from-amber-400 hover:to-amber-500 transition-all hover:scale-105 shadow-lg shadow-amber-500/30"
                                >
                                    Start Shopping
                                    <svg
                                        className="w-4 h-4"
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
                    ) : (
                        <div className="space-y-5">
                            {orders.map((order) => {
                                const itemCount = order.items.reduce(
                                    (sum, i) => sum + i.quantity,
                                    0
                                );
                                const theme = cardThemes[order.status];

                                return (
                                    <Link
                                        key={order.id}
                                        href={`/orders/${order.id}`}
                                        className={`group relative block bg-white rounded-3xl border border-gray-100 overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${theme.hover}`}
                                    >
                                        {/* Colored left accent bar */}
                                        <div
                                            className={`absolute left-0 top-0 bottom-0 w-1.5 ${theme.bar}`}
                                        />

                                        {/* Colored ambient glow (subtle) */}
                                        <div
                                            className={`absolute -top-16 -right-16 w-56 h-56 bg-gradient-to-br ${theme.glow} to-transparent rounded-full blur-3xl pointer-events-none`}
                                        />

                                        <div className="relative p-6 lg:p-8 pl-8">
                                            {/* Top row */}
                                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                                                <div>
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <span className="font-display text-xl font-bold text-gray-900">
                                                            {order.id}
                                                        </span>
                                                        <OrderStatusBadge status={order.status} />
                                                    </div>
                                                    <p className="text-sm text-gray-500 flex items-center gap-2">
                                                        <span className="text-base">{theme.icon}</span>
                                                        Placed{" "}
                                                        {new Date(order.createdAt).toLocaleDateString(
                                                            "en-US",
                                                            {
                                                                month: "short",
                                                                day: "numeric",
                                                                year: "numeric",
                                                            }
                                                        )}
                                                        <span className="text-gray-300">·</span>
                                                        <span className="font-medium text-gray-700">
                                                            {itemCount}{" "}
                                                            {itemCount === 1 ? "item" : "items"}
                                                        </span>
                                                    </p>
                                                </div>

                                                <div className="flex items-baseline gap-2">
                                                    <span className="text-xs text-gray-500 tracking-widest uppercase">
                                                        Total
                                                    </span>
                                                    <span className="font-display text-2xl font-bold text-gray-900">
                                                        ${order.total.toFixed(2)}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Item thumbnails */}
                                            <div className="flex items-center gap-3 flex-wrap">
                                                {order.items.slice(0, 5).map((item, i) => (
                                                    <div
                                                        key={i}
                                                        className="relative w-16 h-20 rounded-xl overflow-hidden bg-gray-100 ring-1 ring-gray-100 group-hover:ring-amber-200 transition-all"
                                                    >
                                                        <Image
                                                            src={item.image}
                                                            alt={item.name}
                                                            fill
                                                            className="object-cover"
                                                            sizes="64px"
                                                        />
                                                    </div>
                                                ))}
                                                {order.items.length > 5 && (
                                                    <div className="w-16 h-20 rounded-xl bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center text-sm font-semibold text-gray-600 ring-1 ring-gray-100">
                                                        +{order.items.length - 5}
                                                    </div>
                                                )}

                                                <div className="ml-auto hidden md:flex items-center gap-2 text-sm font-semibold text-gray-900 group-hover:text-amber-600 transition-colors">
                                                    View Details
                                                    <svg
                                                        className="w-4 h-4 transition-transform group-hover:translate-x-1"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2.5"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}