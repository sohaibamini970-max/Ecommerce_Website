"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductForm from "@/app/components/admin/ProductForm";
import { useProductsAdmin } from "@/lib/store/productsAdmin";

export default function EditProductPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    // Next.js 15+ passes params as a Promise
    const { id } = use(params);
    const product = useProductsAdmin((s) =>
        s.products.find((p) => p.id === id)
    );

    if (!product) notFound();

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <Link
                    href="/admin/products"
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-4 transition"
                >
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Back to Products
                </Link>

                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="w-10 h-[2px] bg-blue-500" />
                            <span className="text-blue-600 text-xs font-semibold tracking-[0.3em] uppercase">
                                Editing
                            </span>
                        </div>
                        <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                            Edit Product
                        </h1>
                        <p className="text-gray-500 text-base">
                            Update <span className="font-semibold text-gray-900">{product.name}</span>
                            {" · "}
                            <span className="font-mono text-sm">{product.id}</span>
                        </p>
                    </div>

                    <Link
                        href={`/product/${product.id}`}
                        target="_blank"
                        className="inline-flex items-center gap-2 px-5 py-3 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-full hover:border-amber-500 hover:text-amber-600 transition self-start"
                    >
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                        View on Store
                    </Link>
                </div>
            </div>

            {/* Form — reuse ProductForm with initialProduct */}
            <ProductForm initialProduct={product} />
        </div>
    );
}