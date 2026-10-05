"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/store/cart";

export default function CartDrawer() {
    const { items, isOpen, closeCart, updateQuantity, removeItem, totalPrice } = useCart();

    return (
        <>
            {/* Overlay */}
            <div
                onClick={closeCart}
                className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
            />

            {/* Drawer */}
            <aside
                className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col transition-transform duration-500 ease-out ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="font-display text-2xl font-bold text-gray-900">
                        Your Cart
                        <span className="ml-2 text-sm font-normal text-gray-500">
                            ({items.length})
                        </span>
                    </h2>
                    <button
                        onClick={closeCart}
                        className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition"
                        aria-label="Close"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M18 6 6 18M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {items.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="text-6xl mb-4">🛒</div>
                            <p className="text-gray-500 mb-6">Your cart is empty</p>
                            <Link
                                href="/shop"
                                onClick={closeCart}
                                className="inline-block px-6 py-3 bg-black text-white rounded-full font-semibold hover:bg-amber-500 hover:text-black transition"
                            >
                                Start Shopping
                            </Link>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-100">
                                <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-gray-900 text-sm line-clamp-1">
                                        {item.name}
                                    </h3>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {item.color} · {item.size}
                                    </p>
                                    <p className="text-sm font-bold text-gray-900 mt-2">
                                        ${item.price.toFixed(2)}
                                    </p>

                                    <div className="flex items-center gap-3 mt-2">
                                        <div className="flex items-center border border-gray-200 rounded-full">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-black"
                                                aria-label="Decrease"
                                            >
                                                −
                                            </button>
                                            <span className="w-6 text-center text-sm font-medium">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-black"
                                                aria-label="Increase"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="text-xs text-gray-400 hover:text-red-500 transition"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="p-6 border-t border-gray-100 space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Subtotal</span>
                            <span className="font-display text-2xl font-bold text-gray-900">
                                ${totalPrice().toFixed(2)}
                            </span>
                        </div>
                        <p className="text-xs text-gray-400">
                            Shipping & taxes calculated at checkout.
                        </p>
                        <Link
                            href="/checkout"
                            onClick={closeCart}
                            className="block w-full py-4 bg-black text-white text-center font-semibold rounded-full hover:bg-amber-500 hover:text-black transition-all"
                        >
                            Proceed to Checkout
                        </Link>
                        <button
                            onClick={closeCart}
                            className="block w-full py-3 text-sm text-gray-500 hover:text-gray-900 transition"
                        >
                            Continue Shopping
                        </button>
                    </div>
                )}
            </aside>
        </>
    );
}