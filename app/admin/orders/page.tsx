"use client";

import { useState, useMemo } from "react";
import { useOrders } from "@/lib/store/orders";
import OrdersTable from "@/app/components/admin/OrdersTable";

type FilterKey =
    | "all"
    | "pending"
    | "active"
    | "delivered"
    | "cancelled"
    | "cod-pending";

/** Color theme per filter pill */
const pillThemes: Record<
    FilterKey,
    {
        active: string;      // when selected
        idle: string;        // when not selected
        dot: string;         // small status dot
        badge: string;       // badge inside the pill
    }
> = {
    all: {
        active: "bg-gray-900 text-white border-gray-900 shadow-lg shadow-gray-900/20",
        idle: "bg-white border-gray-200 text-gray-700 hover:border-gray-900",
        dot: "bg-gray-500",
        badge: "bg-gray-100 text-gray-700",
    },
    pending: {
        active: "bg-amber-500 text-black border-amber-500 shadow-lg shadow-amber-500/30",
        idle: "bg-amber-50 border-amber-200 text-amber-800 hover:border-amber-400",
        dot: "bg-amber-500",
        badge: "bg-amber-100 text-amber-800",
    },
    active: {
        active: "bg-blue-500 text-white border-blue-500 shadow-lg shadow-blue-500/30",
        idle: "bg-blue-50 border-blue-200 text-blue-800 hover:border-blue-400",
        dot: "bg-blue-500",
        badge: "bg-blue-100 text-blue-800",
    },
    delivered: {
        active: "bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-500/30",
        idle: "bg-emerald-50 border-emerald-200 text-emerald-800 hover:border-emerald-400",
        dot: "bg-emerald-500",
        badge: "bg-emerald-100 text-emerald-800",
    },
    cancelled: {
        active: "bg-rose-500 text-white border-rose-500 shadow-lg shadow-rose-500/30",
        idle: "bg-rose-50 border-rose-200 text-rose-800 hover:border-rose-400",
        dot: "bg-rose-500",
        badge: "bg-rose-100 text-rose-800",
    },
    "cod-pending": {
        active: "bg-violet-500 text-white border-violet-500 shadow-lg shadow-violet-500/30",
        idle: "bg-violet-50 border-violet-200 text-violet-800 hover:border-violet-400",
        dot: "bg-violet-500",
        badge: "bg-violet-100 text-violet-800",
    },
};

export default function AdminOrdersPage() {
    const { orders, updateStatus, updatePaymentStatus } = useOrders();
    const [filter, setFilter] = useState<FilterKey>("all");
    const [search, setSearch] = useState("");

    const filtered = useMemo(() => {
        let list = [...orders];

        if (filter === "pending") {
            list = list.filter((o) => o.status === "pending");
        } else if (filter === "active") {
            list = list.filter((o) =>
                ["confirmed", "processing", "shipped", "out-for-delivery"].includes(
                    o.status
                )
            );
        } else if (filter === "delivered") {
            list = list.filter((o) => o.status === "delivered");
        } else if (filter === "cancelled") {
            list = list.filter((o) => o.status === "cancelled");
        } else if (filter === "cod-pending") {
            list = list.filter(
                (o) => o.payment?.method === "cod" && o.payment?.status !== "paid"
            );
        }

        if (search.trim()) {
            const q = search.toLowerCase();
            list = list.filter(
                (o) =>
                    o.id.toLowerCase().includes(q) ||
                    o.customer.fullName.toLowerCase().includes(q) ||
                    o.customer.email.toLowerCase().includes(q)
            );
        }

        return list;
    }, [orders, filter, search]);

    const counts = {
        all: orders.length,
        pending: orders.filter((o) => o.status === "pending").length,
        active: orders.filter((o) =>
            ["confirmed", "processing", "shipped", "out-for-delivery"].includes(
                o.status
            )
        ).length,
        delivered: orders.filter((o) => o.status === "delivered").length,
        cancelled: orders.filter((o) => o.status === "cancelled").length,
        codPending: orders.filter(
            (o) => o.payment?.method === "cod" && o.payment?.status !== "paid"
        ).length,
    };

    // Revenue only from paid orders
    const totalRevenue = orders
        .filter((o) => o.payment?.status === "paid")
        .reduce((sum, o) => sum + o.total, 0);

    const filters: { key: FilterKey; label: string; count: number }[] = [
        { key: "all", label: "All Orders", count: counts.all },
        { key: "pending", label: "Pending", count: counts.pending },
        { key: "active", label: "Active", count: counts.active },
        { key: "delivered", label: "Delivered", count: counts.delivered },
        { key: "cancelled", label: "Cancelled", count: counts.cancelled },
        { key: "cod-pending", label: "COD Pending", count: counts.codPending },
    ];

    return (
        <div className="space-y-8">
            {/* ─────────── Header ─────────── */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <span className="w-10 h-[2px] bg-amber-500" />
                        <span className="text-amber-600 text-xs font-semibold tracking-[0.3em] uppercase">
                            Fulfillment
                        </span>
                    </div>
                    <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                        Orders
                    </h1>
                    <p className="text-gray-500 text-base">
                        Manage order status and payment collection.
                    </p>
                </div>

                {/* Revenue chip */}
                <div className="self-start bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl px-6 py-4 text-white shadow-xl shadow-emerald-500/20">
                    <div className="text-[10px] tracking-[0.3em] uppercase font-semibold opacity-80 mb-1">
                        Paid Revenue
                    </div>
                    <div className="font-display text-2xl font-bold">
                        ${totalRevenue.toFixed(2)}
                    </div>
                </div>
            </div>

            {/* ─────────── Stat Cards ─────────── */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard
                    label="Total"
                    value={counts.all}
                    accent="gray"
                    icon="📦"
                />
                <StatCard
                    label="Pending"
                    value={counts.pending}
                    accent="amber"
                    icon="⏳"
                />
                <StatCard
                    label="Delivered"
                    value={counts.delivered}
                    accent="emerald"
                    icon="✅"
                />
                <StatCard
                    label="COD Pending"
                    value={counts.codPending}
                    accent="violet"
                    icon="💵"
                />
            </div>

            {/* ─────────── Filter Pills ─────────── */}
            <div>
                <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-bold tracking-widest uppercase text-gray-500">
                        Filter
                    </span>
                    <span className="flex-1 h-[1px] bg-gray-200" />
                </div>

                <div className="flex flex-wrap gap-2.5">
                    {filters.map((f) => {
                        const theme = pillThemes[f.key];
                        const isActive = filter === f.key;
                        return (
                            <button
                                key={f.key}
                                onClick={() => setFilter(f.key)}
                                className={`inline-flex items-center gap-2.5 px-5 py-3 rounded-full text-base font-semibold border-2 transition-all ${isActive ? theme.active : theme.idle
                                    }`}
                            >
                                <span
                                    className={`w-2 h-2 rounded-full ${isActive ? "bg-white/80" : theme.dot
                                        }`}
                                />
                                {f.label}
                                <span
                                    className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${isActive ? "bg-white/20 text-white" : theme.badge
                                        }`}
                                >
                                    {f.count}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* ─────────── Search ─────────── */}
            <div className="relative max-w-xl">
                <svg
                    className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by order ID, customer, or email..."
                    className="w-full pl-14 pr-5 py-4 rounded-2xl bg-white border border-gray-200 text-base focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition"
                />
                {search && (
                    <button
                        onClick={() => setSearch("")}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition"
                        aria-label="Clear search"
                    >
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            viewBox="0 0 24 24"
                        >
                            <path d="M18 6 6 18M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>

            {/* ─────────── Results label ─────────── */}
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                    Showing{" "}
                    <span className="font-bold text-gray-900">{filtered.length}</span>{" "}
                    {filtered.length === 1 ? "order" : "orders"}
                    {filter !== "all" && (
                        <>
                            {" "}
                            · filtered by{" "}
                            <span className="font-semibold text-gray-900">
                                {filters.find((f) => f.key === filter)?.label}
                            </span>
                        </>
                    )}
                </p>
            </div>

            {/* ─────────── Table ─────────── */}
            <OrdersTable
                orders={filtered}
                onUpdateStatus={updateStatus}
                onUpdatePayment={updatePaymentStatus}
            />
        </div>
    );
}

/** Small stat card used at the top */
function StatCard({
    label,
    value,
    accent,
    icon,
}: {
    label: string;
    value: number;
    accent: "gray" | "amber" | "emerald" | "violet";
    icon: string;
}) {
    const themes = {
        gray: {
            bg: "from-gray-50 to-white",
            border: "border-gray-200",
            label: "text-gray-600",
            icon: "from-gray-400 to-gray-600",
            glow: "bg-gray-500/10",
        },
        amber: {
            bg: "from-amber-50 to-white",
            border: "border-amber-200",
            label: "text-amber-700",
            icon: "from-amber-400 to-orange-500",
            glow: "bg-amber-500/10",
        },
        emerald: {
            bg: "from-emerald-50 to-white",
            border: "border-emerald-200",
            label: "text-emerald-700",
            icon: "from-emerald-400 to-teal-500",
            glow: "bg-emerald-500/10",
        },
        violet: {
            bg: "from-violet-50 to-white",
            border: "border-violet-200",
            label: "text-violet-700",
            icon: "from-violet-400 to-indigo-500",
            glow: "bg-violet-500/10",
        },
    }[accent];

    return (
        <div
            className={`relative bg-gradient-to-br ${themes.bg} rounded-2xl border ${themes.border} p-5 overflow-hidden hover:shadow-lg transition-all`}
        >
            <div
                className={`absolute -top-10 -right-10 w-32 h-32 ${themes.glow} rounded-full blur-2xl pointer-events-none`}
            />
            <div className="relative flex items-start justify-between">
                <div>
                    <div
                        className={`text-[10px] tracking-[0.25em] uppercase font-bold mb-2 ${themes.label}`}
                    >
                        {label}
                    </div>
                    <div className="font-display text-3xl font-bold text-gray-900">
                        {value}
                    </div>
                </div>
                <div
                    className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${themes.icon} flex items-center justify-center text-lg shadow-md`}
                >
                    {icon}
                </div>
            </div>
        </div>
    );
}