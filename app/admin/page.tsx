"use client";

import Link from "next/link";
import { useProductsAdmin } from "@/lib/store/productsAdmin";
import { useOrders } from "@/lib/store/orders";
import { useCategoriesAdmin } from "@/lib/store/categoriesAdmin";
import { useCollectionsAdmin } from "@/lib/store/collectionsAdmin";
import StatCard from "@/app/components/admin/StatCard";
import OrderStatusBadge from "@/app/components/OrderStatusBadge";

export default function AdminDashboard() {
    const products = useProductsAdmin((s) => s.products);
    const orders = useOrders((s) => s.orders);
    const categories = useCategoriesAdmin((s) => s.categories);
    const collections = useCollectionsAdmin((s) => s.collections);

    // ---- KPIs ----
    const paidOrders = orders.filter((o) => o.payment?.status === "paid");
    const totalRevenue = paidOrders.reduce((sum, o) => sum + o.total, 0);

    const pendingOrders = orders.filter(
        (o) => o.status === "pending" || o.status === "confirmed"
    ).length;

    const codPending = orders.filter(
        (o) => o.payment?.method === "cod" && o.payment?.status !== "paid"
    ).length;

    const deliveredOrders = orders.filter(
        (o) => o.status === "delivered"
    ).length;

    // ---- Recent data ----
    const recentOrders = orders.slice(0, 5);

    const lowStock = products
        .filter(
            (p) => (p.stockTotal ?? 999) - (p.soldCount ?? 0) < 20
        )
        .slice(0, 5);

    const topProducts = [...products]
        .sort((a, b) => (b.soldCount ?? 0) - (a.soldCount ?? 0))
        .slice(0, 5);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                    <h1 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                        Dashboard
                    </h1>
                    <p className="text-gray-500">
                        A snapshot of your store — sales, orders, and inventory.
                    </p>
                </div>
                <Link
                    href="/admin/products/new"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-semibold rounded-full hover:bg-amber-500 hover:text-black transition shadow-lg self-start"
                >
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                    >
                        <path d="M12 5v14M5 12h14" />
                    </svg>
                    Add Product
                </Link>
            </div>

            {/* KPI grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <StatCard
                    label="Total Revenue"
                    value={`$${totalRevenue.toFixed(2)}`}
                    change={`${paidOrders.length} paid orders`}
                    trend="up"
                    icon="💰"
                    accent="emerald"
                />
                <StatCard
                    label="Total Orders"
                    value={orders.length}
                    change={`${deliveredOrders} delivered`}
                    trend="up"
                    icon="📦"
                    accent="blue"
                />
                <StatCard
                    label="Pending Orders"
                    value={pendingOrders}
                    change={pendingOrders > 0 ? "Needs attention" : "All clear"}
                    trend={pendingOrders > 0 ? "down" : "flat"}
                    icon="⏳"
                    accent="amber"
                />
                <StatCard
                    label="COD Pending"
                    value={codPending}
                    change={codPending > 0 ? "Awaiting cash" : "All collected"}
                    trend={codPending > 0 ? "down" : "flat"}
                    icon="💵"
                    accent="rose"
                />
            </div>

            {/* Two-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent orders */}
                <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="font-display text-xl font-bold text-gray-900">
                            Recent Orders
                        </h2>
                        <Link
                            href="/admin/orders"
                            className="text-sm text-amber-600 hover:text-amber-700 font-semibold flex items-center gap-1 transition"
                        >
                            View all →
                        </Link>
                    </div>

                    {recentOrders.length === 0 ? (
                        <div className="text-center py-12 text-gray-400 text-sm">
                            No orders yet
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {recentOrders.map((order) => (
                                <Link
                                    key={order.id}
                                    href={`/admin/orders/${order.id}`}
                                    className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition group"
                                >
                                    <div className="flex items-center gap-4 min-w-0">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-black font-bold text-xs flex-shrink-0">
                                            {order.id.slice(-2)}
                                        </div>
                                        <div className="min-w-0">
                                            <div className="font-semibold text-gray-900 text-sm font-mono">
                                                {order.id}
                                            </div>
                                            <div className="text-xs text-gray-500 truncate">
                                                {order.customer.fullName} · {order.items.length} item
                                                {order.items.length !== 1 ? "s" : ""}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 flex-shrink-0">
                                        <OrderStatusBadge status={order.status} />
                                        <span className="font-bold text-gray-900 text-sm hidden sm:inline">
                                            ${order.total.toFixed(2)}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right column */}
                <div className="space-y-6">
                    {/* Inventory card */}
                    <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-6 text-white">
                        <div className="text-[10px] tracking-[0.3em] uppercase text-amber-400 font-semibold mb-4">
                            Inventory
                        </div>
                        <div className="space-y-3">
                            <Row label="Products" value={products.length} />
                            <Row label="Categories" value={categories.length} />
                            <Row label="Collections" value={collections.length} />
                            <Row
                                label="Low stock"
                                value={lowStock.length}
                                valueClass="text-amber-400"
                            />
                        </div>
                    </div>

                    {/* Low stock */}
                    {lowStock.length > 0 && (
                        <div className="bg-white rounded-3xl border border-rose-100 p-6">
                            <div className="text-[10px] tracking-[0.3em] uppercase text-rose-600 font-semibold mb-4">
                                ⚠️ Low Stock
                            </div>
                            <div className="space-y-2">
                                {lowStock.map((p) => (
                                    <div
                                        key={p.id}
                                        className="flex items-center justify-between text-sm gap-3"
                                    >
                                        <span className="text-gray-700 truncate">{p.name}</span>
                                        <span className="text-rose-600 font-bold flex-shrink-0">
                                            {(p.stockTotal ?? 0) - (p.soldCount ?? 0)} left
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Top sellers */}
                    <div className="bg-white rounded-3xl border border-gray-100 p-6">
                        <div className="text-[10px] tracking-[0.3em] uppercase text-amber-600 font-semibold mb-4">
                            🔥 Top Sellers
                        </div>
                        <div className="space-y-3">
                            {topProducts.length === 0 ? (
                                <p className="text-sm text-gray-400">No data yet</p>
                            ) : (
                                topProducts.map((p, i) => (
                                    <div
                                        key={p.id}
                                        className="flex items-center gap-3 text-sm"
                                    >
                                        <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 font-bold text-xs flex items-center justify-center flex-shrink-0">
                                            {i + 1}
                                        </span>
                                        <span className="text-gray-700 truncate flex-1">
                                            {p.name}
                                        </span>
                                        <span className="font-bold text-gray-900 flex-shrink-0">
                                            {p.soldCount ?? 0}
                                        </span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: "Add Product", href: "/admin/products/new", icon: "📦" },
                    { label: "New Category", href: "/admin/categories", icon: "🏷️" },
                    { label: "Collections", href: "/admin/collections", icon: "📚" },
                    { label: "Orders", href: "/admin/orders", icon: "📋" },
                ].map((action) => (
                    <Link
                        key={action.href}
                        href={action.href}
                        className="group bg-white rounded-2xl border border-gray-100 p-5 hover:border-amber-300 hover:shadow-lg transition-all flex items-center gap-4"
                    >
                        <span className="text-2xl">{action.icon}</span>
                        <span className="font-semibold text-gray-900 text-sm group-hover:text-amber-600 transition">
                            {action.label}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
}

/** Small helper row for the inventory card */
function Row({
    label,
    value,
    valueClass = "text-white",
}: {
    label: string;
    value: string | number;
    valueClass?: string;
}) {
    return (
        <div className="flex items-center justify-between">
            <span className="text-white/60 text-sm">{label}</span>
            <span className={`font-bold ${valueClass}`}>{value}</span>
        </div>
    );
}