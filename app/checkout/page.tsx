"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { useCart } from "@/lib/store/cart";
import { useOrders } from "@/lib/store/orders";
import CheckoutForm, { type CheckoutData } from "@/app/components/CheckoutForm";

export default function CheckoutPage() {
    const router = useRouter();
    const { items, totalPrice, clearCart } = useCart();
    const addOrder = useOrders((s) => s.addOrder);
    const [placing, setPlacing] = useState(false);

    const subtotal = totalPrice();
    const shipping = subtotal > 100 ? 0 : 12;
    const tax = subtotal * 0.08; // 8% — replace with real tax logic
    const total = subtotal + shipping + tax;

    const handlePlaceOrder = async (data: CheckoutData) => {
        setPlacing(true);

        // Simulate API delay
        await new Promise((r) => setTimeout(r, 1500));

        const order = addOrder({
            status: "confirmed",
            items: items.map((i) => ({
                productId: i.productId,
                name: i.name,
                image: i.image,
                color: i.color,
                size: i.size,
                price: i.price,
                quantity: i.quantity,
            })),
            subtotal,
            shipping,
            tax,
            total,
            customer: data.customer,
            payment: data.payment,
            trackingNumber: `LX${Math.floor(Math.random() * 900000000) + 100000000}`,
            estimatedDelivery: new Date(
                Date.now() + 5 * 24 * 60 * 60 * 1000
            ).toISOString(),
        });

        clearCart();
        router.push(`/orders/${order.id}?new=1`);
    };

    // Empty cart state
    if (items.length === 0 && !placing) {
        return (
            <main className="overflow-x-hidden">
                <Navbar />
                <div className="pt-40 pb-24 px-6 text-center max-w-md mx-auto">
                    <div className="text-6xl mb-6">🛒</div>
                    <h1 className="font-display text-3xl font-bold text-gray-900 mb-3">
                        Your cart is empty
                    </h1>
                    <p className="text-gray-500 mb-8">
                        Add a few pieces to your cart and come back to check out.
                    </p>
                    <Link
                        href="/shop"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-semibold hover:bg-amber-500 hover:text-black transition"
                    >
                        Start Shopping
                    </Link>
                </div>
                <Footer />
            </main>
        );
    }

    return (
        <main className="overflow-x-hidden">
            <Navbar alwaysSolid />

            <section className="pt-32 pb-24 px-6 bg-gradient-to-b from-gray-50 to-white min-h-screen">
                <div className="max-w-7xl mx-auto">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                        <Link href="/" className="hover:text-gray-900">Home</Link>
                        <span>/</span>
                        <Link href="/shop" className="hover:text-gray-900">Shop</Link>
                        <span>/</span>
                        <span className="text-gray-900 font-medium">Checkout</span>
                    </nav>

                    <div className="mb-10">
                        <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                            Checkout
                        </h1>
                        <p className="text-gray-500">
                            Almost there — just a few details and we&apos;ll get your order
                            on its way.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-5 gap-10">
                        {/* Left: Form */}
                        <div className="lg:col-span-3">
                            <CheckoutForm onSubmit={handlePlaceOrder} placing={placing} />
                        </div>

                        {/* Right: Order Summary */}
                        <aside className="lg:col-span-2">
                            <div className="bg-white rounded-3xl border border-gray-100 p-6 lg:p-8 lg:sticky lg:top-32">
                                <h2 className="font-display text-xl font-bold text-gray-900 mb-6">
                                    Order Summary
                                </h2>

                                {/* Items */}
                                <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-1">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex gap-4">
                                            <div className="relative w-16 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover"
                                                    sizes="64px"
                                                />
                                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-black text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                                                    {item.quantity}
                                                </span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-gray-900 text-sm line-clamp-1">
                                                    {item.name}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-0.5">
                                                    {item.color} · {item.size}
                                                </p>
                                                <p className="text-sm font-bold text-gray-900 mt-1">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Divider */}
                                <div className="border-t border-gray-100 pt-6 space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Subtotal</span>
                                        <span className="text-gray-900 font-medium">
                                            ${subtotal.toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Shipping</span>
                                        <span className="text-gray-900 font-medium">
                                            {shipping === 0 ? (
                                                <span className="text-emerald-600">Free</span>
                                            ) : (
                                                `$${shipping.toFixed(2)}`
                                            )}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Tax (8%)</span>
                                        <span className="text-gray-900 font-medium">
                                            ${tax.toFixed(2)}
                                        </span>
                                    </div>
                                </div>

                                {/* Total */}
                                <div className="border-t border-gray-100 mt-6 pt-6 flex items-baseline justify-between">
                                    <span className="text-sm font-semibold tracking-widest uppercase text-gray-500">
                                        Total
                                    </span>
                                    <span className="font-display text-3xl font-bold text-gray-900">
                                        ${total.toFixed(2)}
                                    </span>
                                </div>

                                {/* Trust badges */}
                                <div className="mt-6 grid grid-cols-3 gap-3 pt-6 border-t border-gray-100">
                                    {[
                                        { icon: "🔒", label: "Secure" },
                                        { icon: "↩️", label: "30-day" },
                                        { icon: "🚚", label: "Fast Ship" },
                                    ].map((b) => (
                                        <div key={b.label} className="text-center">
                                            <div className="text-lg mb-1">{b.icon}</div>
                                            <div className="text-[10px] text-gray-500 tracking-wide uppercase">
                                                {b.label}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}