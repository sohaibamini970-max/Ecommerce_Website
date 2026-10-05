"use client";

import { useState } from "react";
import type { Order } from "@/lib/store/orders";

export interface CheckoutData {
    customer: Order["customer"];
    payment: Order["payment"];
}

interface Props {
    onSubmit: (data: CheckoutData) => void | Promise<void>;
    placing?: boolean;
}

const inputBase =
    "w-full px-5 py-3.5 rounded-2xl bg-white border text-gray-900 placeholder-gray-400 focus:outline-none transition-all duration-200";

export default function CheckoutForm({ onSubmit, placing = false }: Props) {
    const [step, setStep] = useState<1 | 2>(1);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        postalCode: "",
        country: "United States",
        paymentMethod: "card" as "card" | "paypal" | "cod",
        cardNumber: "",
        cardName: "",
        cardExpiry: "",
        cardCvc: "",
    });

    const update = (field: keyof typeof form, value: string) => {
        setForm((f) => ({ ...f, [field]: value }));
        if (errors[field]) {
            setErrors((e) => {
                const { [field]: _, ...rest } = e;
                return rest;
            });
        }
    };

    const validateShipping = () => {
        const e: Record<string, string> = {};
        if (!form.fullName.trim()) e.fullName = "Required";
        if (!form.email.trim()) e.email = "Required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
            e.email = "Invalid email";
        if (!form.phone.trim()) e.phone = "Required";
        if (!form.address.trim()) e.address = "Required";
        if (!form.city.trim()) e.city = "Required";
        if (!form.postalCode.trim()) e.postalCode = "Required";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const validatePayment = () => {
        const e: Record<string, string> = {};
        if (form.paymentMethod === "card") {
            if (form.cardNumber.replace(/\s/g, "").length < 15)
                e.cardNumber = "Enter a valid card number";
            if (!form.cardName.trim()) e.cardName = "Required";
            if (!/^\d{2}\/\d{2}$/.test(form.cardExpiry))
                e.cardExpiry = "MM/YY";
            if (form.cardCvc.length < 3) e.cardCvc = "3 digits";
        }
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const nextStep = () => {
        if (validateShipping()) setStep(2);
    };

    const handleSubmit = async (ev: React.FormEvent) => {
        ev.preventDefault();
        if (!validatePayment()) return;

        await onSubmit({
            customer: {
                fullName: form.fullName,
                email: form.email,
                phone: form.phone,
                address: form.address,
                city: form.city,
                postalCode: form.postalCode,
                country: form.country,
            },
            payment: {
                method: form.paymentMethod,
                last4:
                    form.paymentMethod === "card"
                        ? form.cardNumber.replace(/\s/g, "").slice(-4)
                        : undefined,
            },
        });
    };

    // Format helpers
    const formatCard = (v: string) =>
        v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

    const formatExpiry = (v: string) =>
        v.replace(/\D/g, "").slice(0, 4).replace(/(\d{2})(\d{1,2})?/, "$1/$2");

    return (
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Step indicator */}
            <div className="flex items-center gap-3 mb-2">
                <StepPill num={1} label="Shipping" active={step === 1} done={step === 2} />
                <div className="flex-1 h-[2px] bg-gray-200 max-w-12" />
                <StepPill num={2} label="Payment" active={step === 2} done={false} />
            </div>

            {/* Step 1 — Shipping */}
            {step === 1 && (
                <div className="bg-white rounded-3xl border border-gray-100 p-6 lg:p-8 space-y-5">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">📦</span>
                        <h2 className="font-display text-xl font-bold text-gray-900">
                            Shipping Address
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <Field label="Full Name" error={errors.fullName}>
                            <input
                                value={form.fullName}
                                onChange={(e) => update("fullName", e.target.value)}
                                placeholder="Jane Doe"
                                className={`${inputBase} ${errors.fullName ? "border-red-400" : "border-gray-200 focus:border-gray-900"
                                    }`}
                            />
                        </Field>

                        <Field label="Email" error={errors.email}>
                            <input
                                type="email"
                                value={form.email}
                                onChange={(e) => update("email", e.target.value)}
                                placeholder="jane@example.com"
                                className={`${inputBase} ${errors.email ? "border-red-400" : "border-gray-200 focus:border-gray-900"
                                    }`}
                            />
                        </Field>

                        <Field label="Phone" error={errors.phone}>
                            <input
                                value={form.phone}
                                onChange={(e) => update("phone", e.target.value)}
                                placeholder="+1 555 123 4567"
                                className={`${inputBase} ${errors.phone ? "border-red-400" : "border-gray-200 focus:border-gray-900"
                                    }`}
                            />
                        </Field>

                        <Field label="Country" error={errors.country}>
                            <select
                                value={form.country}
                                onChange={(e) => update("country", e.target.value)}
                                className={`${inputBase} border-gray-200 focus:border-gray-900 cursor-pointer`}
                            >
                                {["United States", "Canada", "United Kingdom", "Germany", "Australia", "Pakistan", "India"].map((c) => (
                                    <option key={c}>{c}</option>
                                ))}
                            </select>
                        </Field>

                        <div className="md:col-span-2">
                            <Field label="Address" error={errors.address}>
                                <input
                                    value={form.address}
                                    onChange={(e) => update("address", e.target.value)}
                                    placeholder="124 Greene Street, Apt 4B"
                                    className={`${inputBase} ${errors.address ? "border-red-400" : "border-gray-200 focus:border-gray-900"
                                        }`}
                                />
                            </Field>
                        </div>

                        <Field label="City" error={errors.city}>
                            <input
                                value={form.city}
                                onChange={(e) => update("city", e.target.value)}
                                placeholder="New York"
                                className={`${inputBase} ${errors.city ? "border-red-400" : "border-gray-200 focus:border-gray-900"
                                    }`}
                            />
                        </Field>

                        <Field label="Postal Code" error={errors.postalCode}>
                            <input
                                value={form.postalCode}
                                onChange={(e) => update("postalCode", e.target.value)}
                                placeholder="10012"
                                className={`${inputBase} ${errors.postalCode ? "border-red-400" : "border-gray-200 focus:border-gray-900"
                                    }`}
                            />
                        </Field>
                    </div>

                    <button
                        type="button"
                        onClick={nextStep}
                        className="w-full mt-4 py-4 bg-black text-white font-semibold rounded-full hover:bg-amber-500 hover:text-black transition-all flex items-center justify-center gap-2"
                    >
                        Continue to Payment
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            )}

            {/* Step 2 — Payment */}
            {step === 2 && (
                <div className="bg-white rounded-3xl border border-gray-100 p-6 lg:p-8 space-y-5">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">💳</span>
                        <h2 className="font-display text-xl font-bold text-gray-900">
                            Payment Method
                        </h2>
                    </div>

                    {/* Payment methods */}
                    <div className="grid grid-cols-3 gap-3">
                        {[
                            { key: "card", label: "Card", icon: "💳" },
                            { key: "paypal", label: "PayPal", icon: "🅿️" },
                            { key: "cod", label: "Cash", icon: "💵" },
                        ].map((p) => (
                            <button
                                key={p.key}
                                type="button"
                                onClick={() => update("paymentMethod", p.key)}
                                className={`py-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-1 ${form.paymentMethod === p.key
                                        ? "border-black bg-black text-white"
                                        : "border-gray-200 hover:border-gray-900"
                                    }`}
                            >
                                <span className="text-xl">{p.icon}</span>
                                <span className="text-xs font-semibold tracking-wide uppercase">
                                    {p.label}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Card fields */}
                    {form.paymentMethod === "card" && (
                        <div className="space-y-5 pt-2">
                            <Field label="Card Number" error={errors.cardNumber}>
                                <input
                                    value={form.cardNumber}
                                    onChange={(e) => update("cardNumber", formatCard(e.target.value))}
                                    placeholder="4242 4242 4242 4242"
                                    inputMode="numeric"
                                    className={`${inputBase} ${errors.cardNumber ? "border-red-400" : "border-gray-200 focus:border-gray-900"
                                        }`}
                                />
                            </Field>

                            <Field label="Cardholder Name" error={errors.cardName}>
                                <input
                                    value={form.cardName}
                                    onChange={(e) => update("cardName", e.target.value)}
                                    placeholder="Jane Doe"
                                    className={`${inputBase} ${errors.cardName ? "border-red-400" : "border-gray-200 focus:border-gray-900"
                                        }`}
                                />
                            </Field>

                            <div className="grid grid-cols-2 gap-5">
                                <Field label="Expiry" error={errors.cardExpiry}>
                                    <input
                                        value={form.cardExpiry}
                                        onChange={(e) => update("cardExpiry", formatExpiry(e.target.value))}
                                        placeholder="MM/YY"
                                        inputMode="numeric"
                                        className={`${inputBase} ${errors.cardExpiry ? "border-red-400" : "border-gray-200 focus:border-gray-900"
                                            }`}
                                    />
                                </Field>

                                <Field label="CVC" error={errors.cardCvc}>
                                    <input
                                        value={form.cardCvc}
                                        onChange={(e) => update("cardCvc", e.target.value.replace(/\D/g, "").slice(0, 4))}
                                        placeholder="123"
                                        inputMode="numeric"
                                        className={`${inputBase} ${errors.cardCvc ? "border-red-400" : "border-gray-200 focus:border-gray-900"
                                            }`}
                                    />
                                </Field>
                            </div>
                        </div>
                    )}

                    {form.paymentMethod === "paypal" && (
                        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 text-sm text-blue-900">
                            You&apos;ll be redirected to PayPal after placing the order.
                        </div>
                    )}

                    {form.paymentMethod === "cod" && (
                        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-sm text-amber-900">
                            Pay in cash when your order is delivered. A $3 handling fee may
                            apply.
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="flex-1 py-4 border-2 border-gray-200 text-gray-700 font-semibold rounded-full hover:border-gray-900 transition"
                        >
                            Back
                        </button>
                        <button
                            type="submit"
                            disabled={placing}
                            className={`flex-[2] py-4 rounded-full font-semibold flex items-center justify-center gap-3 transition-all ${placing
                                    ? "bg-gray-300 text-gray-500 cursor-wait"
                                    : "bg-black text-white hover:bg-amber-500 hover:text-black hover:scale-[1.02] shadow-lg hover:shadow-amber-500/40"
                                }`}
                        >
                            {placing ? (
                                <>
                                    <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                        <path d="M21 12a9 9 0 1 1-6.22-8.56" />
                                    </svg>
                                    Placing Order...
                                </>
                            ) : (
                                <>
                                    Place Order
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            )}
        </form>
    );
}

/** Small helpers */
function StepPill({
    num,
    label,
    active,
    done,
}: {
    num: number;
    label: string;
    active: boolean;
    done: boolean;
}) {
    return (
        <div className="flex items-center gap-3">
            <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${done
                        ? "bg-emerald-500 text-white"
                        : active
                            ? "bg-black text-white ring-4 ring-gray-100"
                            : "bg-gray-100 text-gray-400"
                    }`}
            >
                {done ? "✓" : num}
            </div>
            <span
                className={`text-sm font-semibold ${active ? "text-gray-900" : "text-gray-400"
                    }`}
            >
                {label}
            </span>
        </div>
    );
}

function Field({
    label,
    error,
    children,
}: {
    label: string;
    error?: string;
    children: React.ReactNode;
}) {
    return (
        <div>
            <label className="block text-xs font-semibold tracking-widest uppercase text-gray-500 mb-2">
                {label}
            </label>
            {children}
            {error && <p className="text-xs text-red-500 mt-1.5">{error}</p>}
        </div>
    );
}