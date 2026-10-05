"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useSearchParams } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import OrderStatusBadge from "@/app/components/OrderStatusBadge";
import OrderStatusStepper from "@/app/components/OrderStatusStepper";
import { useOrders } from "@/lib/store/orders";

export default function OrderDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    const searchParams = useSearchParams();
    const isNew = searchParams.get("new") === "1";
    const order = useOrders((s) => s.orders.find((o) => o.id === id));

    if (!order) notFound();

    const placedDate = new Date(order.createdAt);
    const eta = order.estimatedDelivery
        ? new Date(order.estimatedDelivery)
        : null;

    return (
        <main className="overflow-x-hidden">
            <Navbar alwaysSolid />

            <section className="pt-32 pb-24 px-6 bg-gradient-to-b from-gray-50 to-white min-h-screen">
                <div className="max-w-5xl mx-auto">
                    {/* Success banner */}
                    {isNew && (
                        <div className="mb-8 bg-emerald-50 border border-emerald-200 rounded-3xl p-6 flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                                <svg
                                    className="w-6 h-6 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M20 6 9 17l-5-5" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="font-display text-xl font-bold text-emerald-900 mb-1">
                                    Order Placed Successfully!
                                </h2>
                                <p className="text-sm text-emerald-700">
                                    Thanks for shopping with LUXE. We&apos;ll email a confirmation
                                    to <strong>{order.customer.email}</strong> shortly.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                        <Link href="/" className="hover:text-gray-900">Home</Link>
                        <span>/</span>
                        <Link href="/orders" className="hover:text-gray-900">Orders</Link>
                        <span>/</span>
                        <span className="text-gray-900 font-medium">{order.id}</span>
                    </nav>

                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
                        <div>
                            <div className="flex items-center gap-4 mb-2">
                                <h1 className="font-display text-3xl md:text-4xl font-bold text-gray-900">
                                    {order.id}
                                </h1>
                                <OrderStatusBadge status={order.status} />
                            </div>
                            <p className="text-gray-500 text-sm">
                                Placed on{" "}
                                {placedDate.toLocaleDateString("en-US", {
                                    weekday: "long",
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                            </p>
                        </div>
                    </div>

                    {/* Progress stepper */}
                    <div className="bg-white rounded-3xl border border-gray-100 p-6 lg:p-8 mb-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="font-display text-lg font-bold text-gray-900">
                                Delivery Progress
                            </h2>
                            {eta && order.status !== "delivered" && order.status !== "cancelled" && (
                                <p className="text-sm text-gray-500">
                                    Est. delivery:{" "}
                                    <span className="font-semibold text-gray-900">
                                        {eta.toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </span>
                                </p>
                            )}
                        </div>
                        <OrderStatusStepper status={order.status} />

                        {order.trackingNumber && (
                            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                <div>
                                    <p className="text-xs tracking-widest uppercase text-gray-500 mb-1">
                                        Tracking Number
                                    </p>
                                    <p className="font-mono font-semibold text-gray-900">
                                        {order.trackingNumber}
                                    </p>
                                </div>
                                <button className="px-5 py-2.5 border-2 border-gray-200 text-gray-700 font-semibold rounded-full text-sm hover:border-gray-900 transition self-start">
                                    Track Package
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="grid lg:grid-cols-5 gap-6">
                        {/* Items */}
                        <div className="lg:col-span-3 space-y-4">
                            <div className="bg-white rounded-3xl border border-gray-100 p-6 lg:p-8">
                                <h2 className="font-display text-lg font-bold text-gray-900 mb-6">
                                    Items ({order.items.length})
                                </h2>

                                <div className="space-y-5">
                                    {order.items.map((item, i) => (
                                        <div key={i} className="flex gap-4 pb-5 border-b border-gray-100 last:border-0 last:pb-0">
                                            <Link
                                                href={`/product/${item.productId}`}
                                                className="relative w-20 h-24 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 group"
                                            >
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                    sizes="80px"
                                                />
                                            </Link>
                                            <div className="flex-1 min-w-0">
                                                <Link
                                                    href={`/product/${item.productId}`}
                                                    className="font-semibold text-gray-900 hover:text-amber-600 transition line-clamp-1"
                                                >
                                                    {item.name}
                                                </Link>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    {item.color} · {item.size}
                                                </p>
                                                <p className="text-sm text-gray-500 mt-0.5">
                                                    Qty: {item.quantity}
                                                </p>
                                                <p className="font-bold text-gray-900 mt-2">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <aside className="lg:col-span-2 space-y-6">
                            {/* Order summary */}
                            <div className="bg-white rounded-3xl border border-gray-100 p-6 lg:p-8">
                                <h2 className="font-display text-lg font-bold text-gray-900 mb-6">
                                    Summary
                                </h2>
                                <div className="space-y-3">
                                    <Row label="Subtotal" value={`$${order.subtotal.toFixed(2)}`} />
                                    <Row
                                        label="Shipping"
                                        value={
                                            order.shipping === 0 ? "Free" : `$${order.shipping.toFixed(2)}`
                                        }
                                    />
                                    <Row label="Tax" value={`$${order.tax.toFixed(2)}`} />
                                    <div className="pt-3 border-t border-gray-100 flex items-baseline justify-between">
                                        <span className="text-sm font-semibold tracking-widest uppercase text-gray-500">
                                            Total
                                        </span>
                                        <span className="font-display text-2xl font-bold text-gray-900">
                                            ${order.total.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Shipping address */}
                            <div className="bg-white rounded-3xl border border-gray-100 p-6 lg:p-8">
                                <h2 className="font-display text-lg font-bold text-gray-900 mb-6">
                                    Shipping To
                                </h2>
                                <div className="text-sm text-gray-600 space-y-1">
                                    <p className="font-semibold text-gray-900">
                                        {order.customer.fullName}
                                    </p>
                                    <p>{order.customer.address}</p>
                                    <p>
                                        {order.customer.city}, {order.customer.postalCode}
                                    </p>
                                    <p>{order.customer.country}</p>
                                    <p className="pt-2 text-gray-500">{order.customer.email}</p>
                                    <p className="text-gray-500">{order.customer.phone}</p>
                                </div>
                            </div>

                            {/* Payment */}
                            <div className="bg-white rounded-3xl border border-gray-100 p-6 lg:p-8">
                                <h2 className="font-display text-lg font-bold text-gray-900 mb-6">
                                    Payment
                                </h2>
                                <div className="text-sm text-gray-600">
                                    {order.payment.method === "card" && (
                                        <p>
                                            Card ending in{" "}
                                            <span className="font-semibold text-gray-900">
                                                •••• {order.payment.last4}
                                            </span>
                                        </p>
                                    )}
                                    {order.payment.method === "paypal" && <p>Paid via PayPal</p>}
                                    {order.payment.method === "cod" && <p>Cash on Delivery</p>}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col gap-3">
                                <Link
                                    href="/shop"
                                    className="py-3 text-center bg-black text-white font-semibold rounded-full hover:bg-amber-500 hover:text-black transition"
                                >
                                    Continue Shopping
                                </Link>
                                <Link
                                    href="/orders"
                                    className="py-3 text-center border-2 border-gray-200 text-gray-700 font-semibold rounded-full hover:border-gray-900 transition"
                                >
                                    Back to Orders
                                </Link>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

function Row({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex justify-between text-sm">
            <span className="text-gray-500">{label}</span>
            <span className="text-gray-900 font-medium">{value}</span>
        </div>
    );
}