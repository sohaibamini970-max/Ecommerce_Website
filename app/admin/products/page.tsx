"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useProductsAdmin } from "@/lib/store/productsAdmin";
import type { Product } from "@/lib/products";

export default function AdminProductsPage() {
    const { products, deleteProduct } = useProductsAdmin();
    const [search, setSearch] = useState("");
    const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
    const [previewProduct, setPreviewProduct] = useState<Product | null>(null);

    const filtered = products.filter(
        (p) =>
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.category.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-8">
            {/* ─────────── Header ─────────── */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <span className="w-10 h-[2px] bg-amber-500" />
                        <span className="text-amber-600 text-xs font-semibold tracking-[0.3em] uppercase">
                            Catalog
                        </span>
                    </div>
                    <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                        Products
                    </h1>
                    <p className="text-gray-500 text-base">
                        {products.length} product{products.length !== 1 ? "s" : ""} in
                        your store · {filtered.length} showing
                    </p>
                </div>
                <Link
                    href="/admin/products/new"
                    className="inline-flex items-center gap-2 px-7 py-4 bg-black text-white font-semibold rounded-full hover:bg-amber-500 hover:text-black transition shadow-xl self-start"
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                    >
                        <path d="M12 5v14M5 12h14" />
                    </svg>
                    Add Product
                </Link>
            </div>

            {/* ─────────── Search ─────────── */}
            <div className="relative max-w-xl">
                <svg
                    className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by name or category..."
                    className="w-full pl-14 pr-5 py-4 rounded-2xl bg-white border border-gray-200 text-base focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition"
                />
            </div>

            {/* ─────────── Table ─────────── */}
            <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gradient-to-b from-gray-50 to-white border-b border-gray-100">
                            <tr>
                                {[
                                    "Product",
                                    "Category",
                                    "Price",
                                    "Stock",
                                    "Status",
                                    "Actions",
                                ].map((h) => (
                                    <th
                                        key={h}
                                        className={`text-left text-xs tracking-widest uppercase font-bold text-gray-600 px-7 py-5 ${h === "Actions" ? "text-right" : ""
                                            }`}
                                    >
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filtered.map((p) => {
                                const stock = (p.stockTotal ?? 0) - (p.soldCount ?? 0);
                                return (
                                    <tr
                                        key={p.id}
                                        className="hover:bg-amber-50/30 transition-colors"
                                    >
                                        {/* Product */}
                                        <td className="px-7 py-5">
                                            <div className="flex items-center gap-5">
                                                <div className="relative w-16 h-20 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0 ring-2 ring-gray-100">
                                                    <Image
                                                        src={p.images[0]}
                                                        alt={p.name}
                                                        fill
                                                        className="object-cover"
                                                        sizes="64px"
                                                    />
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="font-semibold text-gray-900 text-base truncate">
                                                        {p.name}
                                                    </div>
                                                    <div className="text-sm text-gray-500 font-mono truncate mt-0.5">
                                                        {p.id}
                                                    </div>
                                                    <div className="flex items-center gap-1 mt-1">
                                                        <svg
                                                            className="w-3.5 h-3.5 fill-amber-400"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                                        </svg>
                                                        <span className="text-xs text-gray-600 font-medium">
                                                            {p.rating} · {p.reviews} reviews
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Category */}
                                        <td className="px-7 py-5">
                                            <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-800 text-sm font-semibold rounded-full">
                                                {p.category}
                                            </span>
                                        </td>

                                        {/* Price */}
                                        <td className="px-7 py-5">
                                            <div className="font-bold text-gray-900 text-lg">
                                                ${p.basePrice.toFixed(2)}
                                            </div>
                                            {p.oldPrice && (
                                                <div className="text-sm text-gray-400 line-through">
                                                    ${p.oldPrice.toFixed(2)}
                                                </div>
                                            )}
                                        </td>

                                        {/* Stock */}
                                        <td className="px-7 py-5">
                                            <div
                                                className={`font-bold text-lg ${stock < 20
                                                        ? "text-rose-600"
                                                        : stock < 50
                                                            ? "text-amber-600"
                                                            : "text-emerald-600"
                                                    }`}
                                            >
                                                {stock}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {p.soldCount ?? 0} sold
                                            </div>
                                        </td>

                                        {/* Status */}
                                        <td className="px-7 py-5">
                                            <div className="flex flex-wrap items-center gap-1.5">
                                                {p.isNew && (
                                                    <span className="inline-block px-3 py-1 bg-black text-white text-[11px] font-bold tracking-widest uppercase rounded-full">
                                                        New
                                                    </span>
                                                )}
                                                {p.discount && (
                                                    <span className="inline-block px-3 py-1 bg-rose-500 text-white text-[11px] font-bold tracking-widest uppercase rounded-full">
                                                        -{p.discount}%
                                                    </span>
                                                )}
                                                {p.isDeal && (
                                                    <span className="inline-block px-3 py-1 bg-amber-500 text-black text-[11px] font-bold tracking-widest uppercase rounded-full">
                                                        Deal
                                                    </span>
                                                )}
                                                {!p.isNew && !p.discount && !p.isDeal && (
                                                    <span className="text-sm text-gray-400">—</span>
                                                )}
                                            </div>
                                        </td>

                                        {/* Actions */}
                                        <td className="px-7 py-5">
                                            <div className="flex items-center justify-end gap-2">
                                                {/* Preview */}
                                                <button
                                                    onClick={() => setPreviewProduct(p)}
                                                    className="w-10 h-10 rounded-full hover:bg-violet-50 flex items-center justify-center text-gray-500 hover:text-violet-600 transition"
                                                    title="Preview details"
                                                >
                                                    <svg
                                                        className="w-5 h-5"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                                        <circle cx="12" cy="12" r="3" />
                                                    </svg>
                                                </button>

                                                {/* Edit */}
                                                <Link
                                                    href={`/admin/products/${p.id}/edit`}
                                                    className="w-10 h-10 rounded-full hover:bg-blue-50 flex items-center justify-center text-gray-500 hover:text-blue-600 transition"
                                                    title="Edit product"
                                                >
                                                    <svg
                                                        className="w-5 h-5"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path d="M12 20h9" />
                                                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                                                    </svg>
                                                </Link>

                                                {/* View on store */}
                                                <Link
                                                    href={`/product/${p.id}`}
                                                    target="_blank"
                                                    className="w-10 h-10 rounded-full hover:bg-amber-50 flex items-center justify-center text-gray-500 hover:text-amber-600 transition"
                                                    title="Open on store"
                                                >
                                                    <svg
                                                        className="w-5 h-5"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                                        <polyline points="15 3 21 3 21 9" />
                                                        <line x1="10" y1="14" x2="21" y2="3" />
                                                    </svg>
                                                </Link>

                                                {/* Delete */}
                                                <button
                                                    onClick={() => setConfirmDelete(p.id)}
                                                    className="w-10 h-10 rounded-full hover:bg-rose-50 flex items-center justify-center text-gray-500 hover:text-rose-500 transition"
                                                    title="Delete"
                                                >
                                                    <svg
                                                        className="w-5 h-5"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    {filtered.length === 0 && (
                        <div className="text-center py-20">
                            <div className="text-5xl mb-4">🔍</div>
                            <p className="text-gray-500 text-base">
                                No products match your search.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* ─────────── Delete confirmation modal ─────────── */}
            {confirmDelete && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[80] flex items-center justify-center px-6">
                    <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl">
                        <div className="text-4xl mb-4">⚠️</div>
                        <h3 className="font-display text-xl font-bold text-gray-900 mb-2">
                            Delete product?
                        </h3>
                        <p className="text-gray-500 text-sm mb-6">
                            This action cannot be undone.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setConfirmDelete(null)}
                                className="flex-1 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-full hover:border-gray-900 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    deleteProduct(confirmDelete);
                                    setConfirmDelete(null);
                                }}
                                className="flex-1 py-3 bg-rose-500 text-white font-semibold rounded-full hover:bg-rose-600 transition"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ─────────── Product Preview modal ─────────── */}
            {previewProduct && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80] overflow-y-auto"
                    onClick={() => setPreviewProduct(null)}
                >
                    {/* Outer scroll container — content grows naturally, no top cut-off */}
                    <div className="min-h-full flex items-start justify-center p-4 sm:p-8">
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden"
                        >
                            {/* Close bar */}
                            <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white z-10">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                                        <svg
                                            className="w-5 h-5 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 className="font-display text-xl font-bold text-gray-900">
                                            Product Preview
                                        </h2>
                                        <p className="text-xs text-gray-500 font-mono">
                                            {previewProduct.id}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setPreviewProduct(null)}
                                    className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 transition"
                                    aria-label="Close"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M18 6 6 18M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Body */}
                            <div className="grid md:grid-cols-2 gap-0">
                                {/* Left — gallery */}
                                <div className="bg-gradient-to-br from-violet-50/60 to-white p-6 md:p-8">
                                    <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-gray-100 ring-2 ring-violet-100 shadow-lg">
                                        <Image
                                            src={previewProduct.images[0]}
                                            alt={previewProduct.name}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 400px"
                                        />
                                        {previewProduct.discount && (
                                            <span className="absolute top-4 left-4 px-3 py-1.5 bg-rose-500 text-white text-xs font-bold tracking-widest uppercase rounded-full shadow-lg">
                                                -{previewProduct.discount}% OFF
                                            </span>
                                        )}
                                        {previewProduct.isNew && (
                                            <span className="absolute top-4 right-4 px-3 py-1.5 bg-black text-white text-xs font-bold tracking-widest uppercase rounded-full shadow-lg">
                                                New
                                            </span>
                                        )}
                                    </div>

                                    {/* Thumbnails */}
                                    {previewProduct.images.length > 1 && (
                                        <div className="grid grid-cols-4 gap-3 mt-4">
                                            {previewProduct.images.slice(0, 4).map((img, i) => (
                                                <div
                                                    key={i}
                                                    className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 ring-1 ring-violet-100"
                                                >
                                                    <Image
                                                        src={img}
                                                        alt={`${previewProduct.name} ${i + 1}`}
                                                        fill
                                                        className="object-cover"
                                                        sizes="80px"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Right — details */}
                                <div className="p-6 md:p-8 space-y-6">
                                    {/* Header */}
                                    <div>
                                        <span className="text-xs text-amber-600 tracking-[0.3em] uppercase font-semibold">
                                            {previewProduct.category}
                                        </span>
                                        <h3 className="font-display text-3xl font-bold text-gray-900 mt-2 leading-tight">
                                            {previewProduct.name}
                                        </h3>
                                        <div className="flex items-center gap-2 mt-3">
                                            <div className="flex items-center gap-0.5">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg
                                                        key={i}
                                                        className={`w-4 h-4 ${i < Math.round(previewProduct.rating)
                                                                ? "fill-amber-400"
                                                                : "fill-gray-200"
                                                            }`}
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                                    </svg>
                                                ))}
                                            </div>
                                            <span className="text-sm text-gray-500">
                                                {previewProduct.rating} · {previewProduct.reviews}{" "}
                                                reviews
                                            </span>
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div className="flex items-baseline gap-3 pb-6 border-b border-gray-100">
                                        <span className="font-display text-4xl font-bold text-gray-900">
                                            ${previewProduct.basePrice.toFixed(2)}
                                        </span>
                                        {previewProduct.oldPrice && (
                                            <span className="text-lg text-gray-400 line-through">
                                                ${previewProduct.oldPrice.toFixed(2)}
                                            </span>
                                        )}
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <h4 className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-2">
                                            Description
                                        </h4>
                                        <p className="text-sm text-gray-700 leading-relaxed">
                                            {previewProduct.description}
                                        </p>
                                    </div>

                                    {/* Colors */}
                                    <div>
                                        <h4 className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-3">
                                            Colors ({previewProduct.colors.length})
                                        </h4>
                                        <div className="flex flex-wrap gap-3">
                                            {previewProduct.colors.map((c) => (
                                                <div key={c.name} className="flex items-center gap-2">
                                                    <span
                                                        className="w-7 h-7 rounded-full border-2 border-gray-200 shadow-sm"
                                                        style={{ backgroundColor: c.hex }}
                                                    />
                                                    <span className="text-sm text-gray-700">
                                                        {c.name}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Sizes */}
                                    <div>
                                        <h4 className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-3">
                                            Sizes ({previewProduct.sizes.length})
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {previewProduct.sizes.map((s) => (
                                                <span
                                                    key={s.label}
                                                    className={`px-3 py-1.5 rounded-lg text-sm font-semibold border-2 ${s.inStock
                                                            ? "border-gray-200 text-gray-900"
                                                            : "border-gray-100 text-gray-300 line-through"
                                                        }`}
                                                >
                                                    {s.label}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Features */}
                                    <div>
                                        <h4 className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-3">
                                            Features
                                        </h4>
                                        <ul className="space-y-2">
                                            {previewProduct.features.map((f) => (
                                                <li
                                                    key={f}
                                                    className="flex items-start gap-2 text-sm text-gray-700"
                                                >
                                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                                                    {f}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Inventory */}
                                    <div className="grid grid-cols-2 gap-3 pt-6 border-t border-gray-100">
                                        <div className="bg-emerald-50 rounded-2xl p-4">
                                            <div className="text-[10px] tracking-widest uppercase font-semibold text-emerald-700 mb-1">
                                                In Stock
                                            </div>
                                            <div className="font-display text-2xl font-bold text-emerald-900">
                                                {(previewProduct.stockTotal ?? 0) -
                                                    (previewProduct.soldCount ?? 0)}
                                            </div>
                                        </div>
                                        <div className="bg-amber-50 rounded-2xl p-4">
                                            <div className="text-[10px] tracking-widest uppercase font-semibold text-amber-700 mb-1">
                                                Sold
                                            </div>
                                            <div className="font-display text-2xl font-bold text-amber-900">
                                                {previewProduct.soldCount ?? 0}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer actions */}
                            <div className="flex flex-col sm:flex-row gap-3 p-5 border-t border-gray-100 bg-gray-50">
                                <button
                                    onClick={() => setPreviewProduct(null)}
                                    className="flex-1 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-full hover:border-gray-900 transition"
                                >
                                    Close Preview
                                </button>
                                <Link
                                    href={`/admin/products/${previewProduct.id}/edit`}
                                    className="flex-1 py-3 bg-black text-white text-center font-semibold rounded-full hover:bg-blue-600 transition flex items-center justify-center gap-2"
                                >
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 20h9" />
                                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                                    </svg>
                                    Edit Product
                                </Link>
                                <Link
                                    href={`/product/${previewProduct.id}`}
                                    target="_blank"
                                    className="flex-1 py-3 bg-amber-500 text-black text-center font-semibold rounded-full hover:bg-amber-400 transition flex items-center justify-center gap-2"
                                >
                                    Open on Store
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
                    </div>
                </div>
            )}
        </div>
    );
}