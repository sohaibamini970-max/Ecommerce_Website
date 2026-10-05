"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
    useOrders,
    statusLabels,
    type OrderStatus,
    type PaymentStatus,
} from "@/lib/store/orders";
import OrderStatusBadge from "@/app/components/OrderStatusBadge";
import { PaymentBadge } from "@/app/components/admin/OrdersTable";

export default function AdminOrderDetail({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    const { getOrder, updateStatus, updatePaymentStatus } = useOrders();
    const order = getOrder(id);

    if (!order) notFound();

    const paymentStatus = order.payment?.status ?? "pending";
    const orderStatuses: OrderStatus[] = [
        "pending",
        "confirmed",
        "processing",
        "shipped",
        "out-for-delivery",
        "delivered",
        "cancelled",
    ];
    const paymentStatuses: PaymentStatus[] = [
        "pending",
        "paid",
        "refunded",
        "failed",
    ];

    return (
        <div className="space-y-6">
            {/* Breadcrumb */}
            <div>
                <Link
                    href="/admin/orders"
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-4 transition"
                >
                    ← Back to Orders
                </Link>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="font-display text-3xl font-bold text-gray-900 font-mono">
                                {order.id}
                            </h1>
                            <OrderStatusBadge status={order.status} />
                        </div>
                        <p className="text-sm text-gray-500">
                            Placed{" "}
                            {new Date(order.createdAt).toLocaleDateString("en-US", {
                                weekday: "long",
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                            })}
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Left: items */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Items card */}
                    <div className="bg-white rounded-3xl border border-gray-100 p-6">
                        <h2 className="font-display text-lg font-bold text-gray-900 mb-6">
                            Items ({order.items.length})
                        </h2>
                        <div className="space-y-4">
                            {order.items.map((item, i) => (
                                <div
                                    key={i}
                                    className="flex gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                                >
                                    <div className="relative w-16 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                            sizes="64px"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-semibold text-gray-900 text-sm">
                                            {item.name}
                                        </div>
                                        <div className="text-xs text-gray-500 mt-0.5">
                                            {item.color} · {item.size} · Qty {item.quantity}
                                        </div>
                                    </div>
                                    <div className="font-bold text-gray-900">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Totals */}
                        <div className="mt-6 pt-6 border-t border-gray-100 space-y-2 text-sm">
                            <div className="flex justify-between text-gray-500">
                                <span>Subtotal</span>
                                <span className="text-gray-900 font-medium">
                                    ${order.subtotal.toFixed(2)}
                                </span>
                            </div>
                            <div className="flex justify-between text-gray-500">
                                <span>Shipping</span>
                                <span className="text-gray-900 font-medium">
                                    ${order.shipping.toFixed(2)}
                                </span>
                            </div>
                            <div className="flex justify-between text-gray-500">
                                <span>Tax</span>
                                <span className="text-gray-900 font-medium">
                                    ${order.tax.toFixed(2)}
                                </span>
                            </div>
                            <div className="flex justify-between pt-3 border-t border-gray-100 text-base">
                                <span className="font-semibold text-gray-700">Total</span>
                                <span className="font-display font-bold text-gray-900 text-xl">
                                    ${order.total.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Status controls */}
                    <div className="bg-white rounded-3xl border border-gray-100 p-6 space-y-6">
                        <h2 className="font-display text-lg font-bold text-gray-900">
                            Update Status
                        </h2>

                        {/* Order status */}
                        <div>
                            <label className="block text-xs font-semibold tracking-widest uppercase text-gray-500 mb-3">
                                Order Status
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {orderStatuses.map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => updateStatus(order.id, s)}
                                        className={`px-4 py-2 rounded-full text-sm font-semibold transition ${order.status === s
                                                ? "bg-black text-white shadow-lg"
                                                : "bg-white border border-gray-200 text-gray-700 hover:border-gray-900"
                                            }`}
                                    >
                                        {statusLabels[s]}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Payment status */}
                        <div>
                            <label className="block text-xs font-semibold tracking-widest uppercase text-gray-500 mb-3">
                                Payment Status
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {paymentStatuses.map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => updatePaymentStatus(order.id, s)}
                                        className={`px-4 py-2 rounded-full text-sm font-semibold transition ${paymentStatus === s
                                                ? "bg-emerald-500 text-white shadow-lg"
                                                : "bg-white border border-gray-200 text-gray-700 hover:border-gray-900"
                                            }`}
                                    >
                                        {s === "paid" && order.payment?.method === "cod"
                                            ? "Cash Collected"
                                            : s.charAt(0).toUpperCase() + s.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: sidebar */}
                <aside className="space-y-6">
                    {/* Customer */}
                    <div className="bg-white rounded-3xl border border-gray-100 p-6">
                        <h3 className="font-display text-lg font-bold text-gray-900 mb-4">
                            Customer
                        </h3>
                        <div className="text-sm space-y-1">
                            <p className="font-semibold text-gray-900">
                                {order.customer.fullName}
                            </p>
                            <p className="text-gray-500">{order.customer.email}</p>
                            <p className="text-gray-500">{order.customer.phone}</p>
                        </div>
                    </div>

                    {/* Shipping */}
                    <div className="bg-white rounded-3xl border border-gray-100 p-6">
                        <h3 className="font-display text-lg font-bold text-gray-900 mb-4">
                            Shipping To
                        </h3>
                        <div className="text-sm text-gray-500 space-y-1">
                            <p>{order.customer.address}</p>
                            <p>
                                {order.customer.city}, {order.customer.postalCode}
                            </p>
                            <p>{order.customer.country}</p>
                        </div>
                    </div>

                    {/* Payment */}
                    <div className="bg-white rounded-3xl border border-gray-100 p-6">
                        <h3 className="font-display text-lg font-bold text-gray-900 mb-4">
                            Payment
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-500">Method</span>
                                <span className="text-sm font-semibold text-gray-900">
                                    {order.payment?.method === "cod"
                                        ? "Cash on Delivery"
                                        : order.payment?.method === "card"
                                            ? `Card •••• ${order.payment?.last4 ?? "••••"}`
                                            : "PayPal"}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-500">Status</span>
                                <PaymentBadge
                                    status={paymentStatus}
                                    method={order.payment?.method ?? "card"}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Tracking */}
                    {order.trackingNumber && (
                        <div className="bg-white rounded-3xl border border-gray-100 p-6">
                            <h3 className="font-display text-lg font-bold text-gray-900 mb-4">
                                Tracking
                            </h3>
                            <p className="font-mono text-sm text-gray-700">
                                {order.trackingNumber}
                            </p>
                        </div>
                    )}
                </aside>
            </div>
        </div>
    );
}