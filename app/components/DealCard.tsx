"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";

export default function DealCard({ product }: { product: Product }) {
    const sold = product.soldCount ?? 0;
    const total = product.stockTotal ?? 1;
    const soldPct = Math.min(100, Math.round((sold / total) * 100));
    const remaining = Math.max(0, total - sold);

    return (
        <div className="group relative bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden hover:bg-white/[0.08] hover:border-amber-500/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/20">
            {/* Full-card link */}
            <Link
                href={`/product/${product.id}`}
                className="absolute inset-0 z-20"
                aria-label={`View ${product.name}`}
            />

            {/* Image */}
            <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Discount badge */}
                {product.discount && (
                    <div className="absolute top-4 left-4 z-30">
                        <div className="relative">
                            <div className="absolute inset-0 bg-red-500 rounded-2xl blur-md opacity-60 animate-pulse" />
                            <span className="relative inline-block px-4 py-2 bg-red-500 text-white text-sm font-bold rounded-2xl shadow-lg">
                                -{product.discount}% OFF
                            </span>
                        </div>
                    </div>
                )}

                {/* Stock warning */}
                {remaining <= 20 && (
                    <div className="absolute top-4 right-4 z-30 px-3 py-1 bg-amber-500 text-black text-[10px] font-bold tracking-widest uppercase rounded-full">
                        Only {remaining} left
                    </div>
                )}
            </div>

            {/* Details */}
            <div className="p-5 space-y-4">
                <div>
                    <span className="text-xs text-amber-400 tracking-widest uppercase font-medium">
                        {product.category}
                    </span>
                    <h3 className="font-display text-lg font-semibold text-white mt-1 line-clamp-1">
                        {product.name}
                    </h3>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3">
                    <span className="text-2xl font-bold text-white">
                        ${product.basePrice.toFixed(2)}
                    </span>
                    {product.oldPrice && (
                        <span className="text-sm text-white/40 line-through">
                            ${product.oldPrice.toFixed(2)}
                        </span>
                    )}
                </div>

                {/* Stock progress bar */}
                <div>
                    <div className="flex items-center justify-between text-[11px] text-white/50 mb-2">
                        <span>{sold} sold</span>
                        <span>{remaining} left</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-amber-500 to-red-500 rounded-full transition-all duration-1000"
                            style={{ width: `${soldPct}%` }}
                        />
                    </div>
                </div>

                {/* CTA */}
                <div className="pt-2">
                    <button className="w-full py-3 bg-white text-black font-semibold rounded-full text-sm transition-all group-hover:bg-amber-500 flex items-center justify-center gap-2">
                        Grab the Deal
                        <svg
                            className="w-4 h-4 transition-transform group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            viewBox="0 0 24 24"
                        >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}