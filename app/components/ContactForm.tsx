"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
    const [status, setStatus] = useState<Status>("idle");
    const [form, setForm] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const update = (field: keyof typeof form, value: string) => {
        setForm((f) => ({ ...f, [field]: value }));
        if (errors[field]) {
            setErrors((e) => {
                const { [field]: _, ...rest } = e;
                return rest;
            });
        }
    };

    const validate = () => {
        const e: Record<string, string> = {};
        if (!form.name.trim()) e.name = "Please enter your name";
        if (!form.email.trim()) e.email = "Please enter your email";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
            e.email = "Please enter a valid email";
        if (!form.subject.trim()) e.subject = "Please enter a subject";
        if (!form.message.trim()) e.message = "Please enter a message";
        else if (form.message.trim().length < 10)
            e.message = "Message should be at least 10 characters";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async (ev: React.FormEvent) => {
        ev.preventDefault();
        if (!validate()) return;

        setStatus("sending");
        await new Promise((r) => setTimeout(r, 1200));
        setStatus("sent");
        setForm({ name: "", email: "", subject: "", message: "" });

        setTimeout(() => setStatus("idle"), 4000);
    };

    // 🎨 Dark palette
    const inputBase =
        "w-full px-5 py-4 rounded-2xl bg-white/[0.03] border text-white placeholder-gray-500 focus:outline-none focus:bg-white/[0.06] focus:ring-4 focus:ring-amber-500/10 transition-all duration-200";

    const inputState = (hasError: boolean) =>
        hasError
            ? "border-red-500/50 focus:border-red-500"
            : "border-white/10 hover:border-white/20 focus:border-amber-500";

    const labelBase =
        "block text-xs font-semibold tracking-widest uppercase text-gray-400 mb-2";

    return (
        <form
            onSubmit={handleSubmit}
            className="relative space-y-5 bg-gradient-to-b from-zinc-900 to-black rounded-3xl p-6 md:p-8 border border-white/10 shadow-2xl shadow-black/50 overflow-hidden"
            noValidate
        >
            {/* Ambient amber glow in the corner */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative space-y-5">
                {/* Name + Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <label className={labelBase}>Your Name</label>
                        <input
                            type="text"
                            value={form.name}
                            onChange={(e) => update("name", e.target.value)}
                            placeholder="Jane Doe"
                            className={`${inputBase} ${inputState(!!errors.name)}`}
                        />
                        {errors.name && (
                            <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                                <span className="w-1 h-1 rounded-full bg-red-400" />
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className={labelBase}>Email</label>
                        <input
                            type="email"
                            value={form.email}
                            onChange={(e) => update("email", e.target.value)}
                            placeholder="jane@example.com"
                            className={`${inputBase} ${inputState(!!errors.email)}`}
                        />
                        {errors.email && (
                            <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                                <span className="w-1 h-1 rounded-full bg-red-400" />
                                {errors.email}
                            </p>
                        )}
                    </div>
                </div>

                {/* Subject */}
                <div>
                    <label className={labelBase}>Subject</label>
                    <input
                        type="text"
                        value={form.subject}
                        onChange={(e) => update("subject", e.target.value)}
                        placeholder="How can we help?"
                        className={`${inputBase} ${inputState(!!errors.subject)}`}
                    />
                    {errors.subject && (
                        <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-red-400" />
                            {errors.subject}
                        </p>
                    )}
                </div>

                {/* Message */}
                <div>
                    <label className={labelBase}>Message</label>
                    <textarea
                        rows={6}
                        value={form.message}
                        onChange={(e) => update("message", e.target.value)}
                        placeholder="Tell us more..."
                        className={`${inputBase} resize-none ${inputState(!!errors.message)}`}
                    />
                    {errors.message && (
                        <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-red-400" />
                            {errors.message}
                        </p>
                    )}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={status === "sending"}
                    className={`w-full md:w-auto px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-3 transition-all ${status === "sending"
                            ? "bg-white/10 text-gray-400 cursor-wait"
                            : status === "sent"
                                ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/30"
                                : "bg-gradient-to-r from-amber-400 to-amber-500 text-black hover:from-amber-300 hover:to-amber-400 hover:scale-[1.02] shadow-lg shadow-amber-500/30"
                        }`}
                >
                    {status === "sending" && (
                        <>
                            <svg
                                className="w-5 h-5 animate-spin"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                viewBox="0 0 24 24"
                            >
                                <path d="M21 12a9 9 0 1 1-6.22-8.56" />
                            </svg>
                            Sending...
                        </>
                    )}
                    {status === "sent" && (
                        <>
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                viewBox="0 0 24 24"
                            >
                                <path d="M20 6 9 17l-5-5" />
                            </svg>
                            Message Sent
                        </>
                    )}
                    {status === "idle" && (
                        <>
                            Send Message
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                viewBox="0 0 24 24"
                            >
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}