"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
    const [wishlisted, setWishlisted] = useState(false);

    return (
        <div className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-black/10 transition-all duration-500 hover:-translate-y-2">
            {/* Full-card link */}
            <Link
                href={`/product/${product.id}`}
                className="absolute inset-0 z-20"
                aria-label={`View ${product.name}`}
            />

            {/* Image Container */}
            <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2 z-30">
                    {product.isNew && (
                        <span className="px-3 py-1 bg-black text-white text-[10px] font-bold tracking-widest uppercase rounded-full">
                            New
                        </span>
                    )}
                    {product.discount && (
                        <span className="px-3 py-1 bg-amber-500 text-black text-[10px] font-bold tracking-widest uppercase rounded-full">
                            -{product.discount}%
                        </span>
                    )}
                </div>

                {/* Wishlist */}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        setWishlisted(!wishlisted);
                    }}
                    aria-label="Wishlist"
                    className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
                >
                    <svg
                        className={`w-5 h-5 transition-colors ${wishlisted ? "fill-red-500 stroke-red-500" : "fill-none stroke-gray-700"
                            }`}
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                </button>

                {/* View Details on hover */}
                <div className="absolute bottom-4 left-4 right-4 z-30 py-3 bg-white text-black font-semibold rounded-full translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-2 text-sm">
                    View Details
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </div>
            </div>

            {/* Details */}
            <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500 tracking-widest uppercase font-medium">
                        {product.category}
                    </span>
                    <div className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 fill-amber-400 text-amber-400" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        <span className="text-xs font-medium text-gray-700">{product.rating}</span>
                    </div>
                </div>

                <h3 className="font-display text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                    {product.name}
                </h3>

                <div className="flex items-center gap-3">
                    <span className="text-xl font-bold text-gray-900">
                        ${product.basePrice.toFixed(2)}
                    </span>
                    {product.oldPrice && (
                        <span className="text-sm text-gray-400 line-through">
                            ${product.oldPrice.toFixed(2)}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}