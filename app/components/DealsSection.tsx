"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import DealCard from "./DealCard";
import { getDealProducts } from "@/lib/products";

/** Countdown hook — ticks every second */
function useCountdown(target: string) {
    const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });

    useEffect(() => {
        const tick = () => {
            const diff = new Date(target).getTime() - Date.now();
            if (diff <= 0) {
                setTimeLeft({ h: 0, m: 0, s: 0 });
                return;
            }
            const h = Math.floor(diff / (1000 * 60 * 60));
            const m = Math.floor((diff / (1000 * 60)) % 60);
            const s = Math.floor((diff / 1000) % 60);
            setTimeLeft({ h, m, s });
        };
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, [target]);

    return timeLeft;
}

export default function DealsSection() {
    const deals = getDealProducts();
    const endTime =
        deals[0]?.dealEndsAt ?? new Date(Date.now() + 86400000).toISOString();
    const { h, m, s } = useCountdown(endTime);

    const pad = (n: number) => String(n).padStart(2, "0");

    if (deals.length === 0) return null;

    return (
        <section className="relative py-24 px-6 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
            {/* Ambient glows — now soft amber/red pastels */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-200/30 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-rose-200/30 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14 gap-8">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="w-12 h-[2px] bg-amber-500" />
                            <span className="text-amber-600 text-sm font-medium tracking-[0.3em] uppercase">
                                Limited Time
                            </span>
                        </div>
                        <h2 className="font-display text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                            Flash <span className="italic text-amber-600">Deals</span>
                        </h2>
                        <p className="text-gray-500 mt-4 max-w-lg">
                            Up to 30% off premium pieces — only while stock lasts.
                        </p>
                    </div>

                    {/* Countdown */}
                    <div className="flex items-center gap-4">
                        <div className="text-gray-500 text-xs tracking-widest uppercase">
                            Ends in
                        </div>
                        <div className="flex items-center gap-2">
                            {[
                                { value: pad(h), label: "HRS" },
                                { value: pad(m), label: "MIN" },
                                { value: pad(s), label: "SEC" },
                            ].map((t, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <div className="flex flex-col items-center">
                                        <div className="min-w-[60px] h-[60px] bg-white border border-gray-200 shadow-sm rounded-2xl flex items-center justify-center">
                                            <span className="font-display text-2xl font-bold text-gray-900 tabular-nums">
                                                {t.value}
                                            </span>
                                        </div>
                                        <span className="text-[10px] text-gray-400 tracking-widest mt-1">
                                            {t.label}
                                        </span>
                                    </div>
                                    {i < 2 && (
                                        <span className="text-2xl text-amber-500/60 font-bold pb-5">
                                            :
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Deal grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {deals.map((product) => (
                        <DealCard key={product.id} product={product} />
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-14 text-center">
                    <Link
                        href="/shop"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white font-semibold rounded-full hover:bg-amber-500 hover:text-black transition-all hover:scale-105 shadow-xl hover:shadow-amber-500/30"
                    >
                        See All Deals
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
        </section>
    );
}