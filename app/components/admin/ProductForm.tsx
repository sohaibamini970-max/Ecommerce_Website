"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useProductsAdmin } from "@/lib/store/productsAdmin";
import { useCategoriesAdmin } from "@/lib/store/categoriesAdmin";
import type { Product } from "@/lib/products";

const inputBase =
    "w-full px-5 py-3.5 rounded-2xl bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 transition";

const labelBase =
    "block text-xs font-semibold tracking-widest uppercase text-gray-600 mb-2";

const focusRing = {
    amber: "focus:border-amber-500 focus:ring-amber-500/10",
    emerald: "focus:border-emerald-500 focus:ring-emerald-500/10",
    violet: "focus:border-violet-500 focus:ring-violet-500/10",
    rose: "focus:border-rose-500 focus:ring-rose-500/10",
};

const FALLBACK_IMG =
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80";

interface ProductFormProps {
    /** Pass a product to switch the form into "edit" mode. */
    initialProduct?: Product;
}

export default function ProductForm({ initialProduct }: ProductFormProps) {
    const router = useRouter();
    const addProduct = useProductsAdmin((s) => s.addProduct);
    const updateProduct = useProductsAdmin((s) => s.updateProduct);
    const categories = useCategoriesAdmin((s) => s.categories);

    const isEdit = Boolean(initialProduct);

    const [saving, setSaving] = useState(false);

    // ───── Form state ─────
    const [form, setForm] = useState({
        name: initialProduct?.name ?? "",
        category: initialProduct?.category ?? categories[0]?.name ?? "Outerwear",
        basePrice: initialProduct?.basePrice?.toString() ?? "",
        oldPrice: initialProduct?.oldPrice?.toString() ?? "",
        description: initialProduct?.description ?? "",
        isNew: initialProduct?.isNew ?? true,
        discount: initialProduct?.discount?.toString() ?? "",
        isDeal: initialProduct?.isDeal ?? false,
        soldCount: initialProduct?.soldCount?.toString() ?? "0",
        stockTotal: initialProduct?.stockTotal?.toString() ?? "100",
    });

    // ───── Gallery state ─────
    const [images, setImages] = useState<string[]>(
        initialProduct?.images ?? []
    );
    const [imageUrl, setImageUrl] = useState("");
    const [imageError, setImageError] = useState<string | null>(null);

    // Re-sync when the passed product changes (e.g. navigating between edits)
    useEffect(() => {
        if (!initialProduct) return;
        setForm({
            name: initialProduct.name,
            category: initialProduct.category,
            basePrice: initialProduct.basePrice.toString(),
            oldPrice: initialProduct.oldPrice?.toString() ?? "",
            description: initialProduct.description,
            isNew: initialProduct.isNew ?? true,
            discount: initialProduct.discount?.toString() ?? "",
            isDeal: initialProduct.isDeal ?? false,
            soldCount: initialProduct.soldCount?.toString() ?? "0",
            stockTotal: initialProduct.stockTotal?.toString() ?? "100",
        });
        setImages(initialProduct.images);
    }, [initialProduct]);

    const update = (k: keyof typeof form, v: string | boolean) =>
        setForm((f) => ({ ...f, [k]: v }));

    // ───── Gallery handlers ─────
    const addImage = () => {
        const url = imageUrl.trim();
        if (!url) return;

        if (
            !/^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)(\?.*)?$/i.test(url) &&
            !/^https?:\/\/images\.unsplash\.com\//i.test(url)
        ) {
            setImageError("Please enter a valid image URL.");
            return;
        }
        if (images.includes(url)) {
            setImageError("This image is already in the gallery.");
            return;
        }

        setImages((prev) => [...prev, url]);
        setImageUrl("");
        setImageError(null);
    };

    const removeImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const moveImage = (index: number, direction: -1 | 1) => {
        const next = index + direction;
        if (next < 0 || next >= images.length) return;
        setImages((prev) => {
            const copy = [...prev];
            [copy[index], copy[next]] = [copy[next], copy[index]];
            return copy;
        });
    };

    const makeCover = (index: number) => {
        if (index === 0) return;
        setImages((prev) => {
            const copy = [...prev];
            const [picked] = copy.splice(index, 1);
            return [picked, ...copy];
        });
    };

    // ───── Submit ─────
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        await new Promise((r) => setTimeout(r, 800));

        const payload = {
            name: form.name,
            category: form.category,
            basePrice: parseFloat(form.basePrice) || 0,
            oldPrice: form.oldPrice ? parseFloat(form.oldPrice) : undefined,
            isNew: form.isNew,
            discount: form.discount ? parseInt(form.discount) : undefined,
            description: form.description,
            images: images.length > 0 ? images : [FALLBACK_IMG],
            isDeal: form.isDeal,
            soldCount: parseInt(form.soldCount) || 0,
            stockTotal: parseInt(form.stockTotal) || 0,
        };

        if (isEdit && initialProduct) {
            updateProduct(initialProduct.id, payload);
        } else {
            addProduct({
                ...payload,
                rating: 4.8,
                reviews: 0,
                colors: [{ name: "Black", hex: "#000000" }],
                sizes: [{ label: "M", priceModifier: 0, inStock: true }],
                features: ["Premium materials", "Designed in-house"],
            });
        }

        router.push("/admin/products");
    };

    const handleReset = () => {
        if (!initialProduct) return;
        setForm({
            name: initialProduct.name,
            category: initialProduct.category,
            basePrice: initialProduct.basePrice.toString(),
            oldPrice: initialProduct.oldPrice?.toString() ?? "",
            description: initialProduct.description,
            isNew: initialProduct.isNew ?? true,
            discount: initialProduct.discount?.toString() ?? "",
            isDeal: initialProduct.isDeal ?? false,
            soldCount: initialProduct.soldCount?.toString() ?? "0",
            stockTotal: initialProduct.stockTotal?.toString() ?? "100",
        });
        setImages(initialProduct.images);
        setImageUrl("");
        setImageError(null);
    };

    const coverImage = images[0] || FALLBACK_IMG;

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
            {/* ─────────── BASIC INFO (amber) ─────────── */}
            <section className="relative bg-gradient-to-br from-amber-50/60 via-white to-white rounded-3xl border border-amber-100 overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-amber-400 to-orange-500" />
                <div className="absolute -top-16 -right-16 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative p-6 md:p-8 space-y-5">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-lg shadow-md shadow-amber-500/30">
                            🏷️
                        </div>
                        <div>
                            <h2 className="font-display text-xl font-bold text-gray-900">
                                Basic Info
                            </h2>
                            <p className="text-xs text-amber-700/70">
                                Name, category, and description
                            </p>
                        </div>
                    </div>

                    <div>
                        <label className={labelBase}>Product Name</label>
                        <input
                            required
                            value={form.name}
                            onChange={(e) => update("name", e.target.value)}
                            placeholder="Cashmere Oversized Coat"
                            className={`${inputBase} ${focusRing.amber}`}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className={labelBase}>Category</label>
                            <select
                                value={form.category}
                                onChange={(e) => update("category", e.target.value)}
                                className={`${inputBase} ${focusRing.amber} cursor-pointer`}
                            >
                                {categories.map((c) => (
                                    <option key={c.id} value={c.name}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className={labelBase}>Discount % (optional)</label>
                            <input
                                type="number"
                                value={form.discount}
                                onChange={(e) => update("discount", e.target.value)}
                                placeholder="30"
                                className={`${inputBase} ${focusRing.amber}`}
                            />
                        </div>
                    </div>

                    <div>
                        <label className={labelBase}>Description</label>
                        <textarea
                            required
                            rows={4}
                            value={form.description}
                            onChange={(e) => update("description", e.target.value)}
                            placeholder="Crafted from 100% Mongolian cashmere..."
                            className={`${inputBase} ${focusRing.amber} resize-none`}
                        />
                    </div>
                </div>
            </section>

            {/* ─────────── PRICING (emerald) ─────────── */}
            <section className="relative bg-gradient-to-br from-emerald-50/60 via-white to-white rounded-3xl border border-emerald-100 overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-emerald-400 to-teal-500" />
                <div className="absolute -top-16 -right-16 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative p-6 md:p-8 space-y-5">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-lg shadow-md shadow-emerald-500/30">
                            💰
                        </div>
                        <div>
                            <h2 className="font-display text-xl font-bold text-gray-900">
                                Pricing
                            </h2>
                            <p className="text-xs text-emerald-700/70">
                                Set the current and original price
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className={labelBase}>Current Price ($)</label>
                            <input
                                required
                                type="number"
                                step="0.01"
                                value={form.basePrice}
                                onChange={(e) => update("basePrice", e.target.value)}
                                placeholder="289.00"
                                className={`${inputBase} ${focusRing.emerald}`}
                            />
                        </div>
                        <div>
                            <label className={labelBase}>Original Price ($) — optional</label>
                            <input
                                type="number"
                                step="0.01"
                                value={form.oldPrice}
                                onChange={(e) => update("oldPrice", e.target.value)}
                                placeholder="420.00"
                                className={`${inputBase} ${focusRing.emerald}`}
                            />
                        </div>
                    </div>

                    {form.basePrice && form.oldPrice && (
                        <div className="flex items-center gap-2 text-xs bg-emerald-500/10 border border-emerald-200 text-emerald-800 rounded-xl px-4 py-2.5">
                            <span className="font-semibold">Auto-calculated savings:</span>
                            <span>
                                $
                                {(
                                    parseFloat(form.oldPrice) - parseFloat(form.basePrice)
                                ).toFixed(2)}{" "}
                                off
                            </span>
                            <span className="text-emerald-600 font-bold">
                                (
                                {Math.round(
                                    ((parseFloat(form.oldPrice) - parseFloat(form.basePrice)) /
                                        parseFloat(form.oldPrice)) *
                                    100
                                )}
                                %)
                            </span>
                        </div>
                    )}
                </div>
            </section>

            {/* ─────────── INVENTORY (blue) ─────────── */}
            <section className="relative bg-gradient-to-br from-blue-50/60 via-white to-white rounded-3xl border border-blue-100 overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-blue-400 to-indigo-500" />
                <div className="absolute -top-16 -right-16 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative p-6 md:p-8 space-y-5">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-lg shadow-md shadow-blue-500/30">
                            📦
                        </div>
                        <div>
                            <h2 className="font-display text-xl font-bold text-gray-900">
                                Inventory
                            </h2>
                            <p className="text-xs text-blue-700/70">
                                Stock levels and sales tracking
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className={labelBase}>Total Stock</label>
                            <input
                                type="number"
                                value={form.stockTotal}
                                onChange={(e) => update("stockTotal", e.target.value)}
                                placeholder="100"
                                className={`${inputBase} focus:border-blue-500 focus:ring-blue-500/10`}
                            />
                        </div>
                        <div>
                            <label className={labelBase}>Units Sold</label>
                            <input
                                type="number"
                                value={form.soldCount}
                                onChange={(e) => update("soldCount", e.target.value)}
                                placeholder="0"
                                className={`${inputBase} focus:border-blue-500 focus:ring-blue-500/10`}
                            />
                        </div>
                    </div>

                    {form.stockTotal && (
                        <div className="bg-blue-500/10 border border-blue-200 rounded-xl px-4 py-2.5 flex items-center justify-between text-xs">
                            <span className="text-blue-800 font-semibold">
                                Remaining in stock
                            </span>
                            <span className="text-blue-900 font-bold text-base">
                                {Math.max(
                                    0,
                                    (parseInt(form.stockTotal) || 0) -
                                    (parseInt(form.soldCount) || 0)
                                )}
                            </span>
                        </div>
                    )}
                </div>
            </section>

            {/* ─────────── MEDIA (violet) ─────────── */}
            <section className="relative bg-gradient-to-br from-violet-50/60 via-white to-white rounded-3xl border border-violet-100 overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-violet-400 to-indigo-500" />
                <div className="absolute -top-16 -right-16 w-48 h-48 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative p-6 md:p-8 space-y-6">
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center text-lg shadow-md shadow-violet-500/30">
                                🖼️
                            </div>
                            <div>
                                <h2 className="font-display text-xl font-bold text-gray-900">
                                    Media Gallery
                                </h2>
                                <p className="text-xs text-violet-700/70">
                                    Add up to 6 images — first one is the cover
                                </p>
                            </div>
                        </div>
                        <span className="text-xs font-semibold text-violet-600 bg-violet-100 px-3 py-1 rounded-full">
                            {images.length} / 6
                        </span>
                    </div>

                    <div>
                        <label className={labelBase}>Image URL</label>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="url"
                                value={imageUrl}
                                onChange={(e) => {
                                    setImageUrl(e.target.value);
                                    if (imageError) setImageError(null);
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        addImage();
                                    }
                                }}
                                placeholder="https://images.unsplash.com/photo-..."
                                className={`${inputBase} ${focusRing.violet} flex-1`}
                            />
                            <button
                                type="button"
                                onClick={addImage}
                                disabled={images.length >= 6}
                                className={`px-6 py-3.5 rounded-2xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${images.length >= 6
                                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                        : "bg-gradient-to-r from-violet-500 to-indigo-600 text-white hover:from-violet-400 hover:to-indigo-500 shadow-lg shadow-violet-500/30"
                                    }`}
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 5v14M5 12h14" />
                                </svg>
                                Add
                            </button>
                        </div>

                        {imageError && (
                            <p className="text-xs text-rose-600 mt-2 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                                {imageError}
                            </p>
                        )}

                        <p className="text-xs text-gray-500 mt-2">
                            Paste a direct image URL and click <strong>Add</strong>. Press{" "}
                            <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-200 rounded text-[10px] font-mono">
                                Enter
                            </kbd>{" "}
                            to add quickly.
                        </p>
                    </div>

                    {images.length > 0 ? (
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <label className={labelBase + " !mb-0"}>Gallery</label>
                                <span className="text-[11px] text-gray-500">
                                    Cover = first image
                                </span>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {images.map((src, i) => (
                                    <div
                                        key={`${src}-${i}`}
                                        className="group relative aspect-square rounded-2xl overflow-hidden bg-gray-100 ring-2 ring-violet-100 hover:ring-violet-300 transition"
                                    >
                                        <Image
                                            src={src}
                                            alt={`Image ${i + 1}`}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 50vw, 200px"
                                        />

                                        {i === 0 && (
                                            <span className="absolute top-2 left-2 px-2 py-0.5 bg-violet-600 text-white text-[9px] font-bold tracking-widest uppercase rounded-full shadow-lg">
                                                Cover
                                            </span>
                                        )}

                                        <span className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/70 backdrop-blur-sm text-white text-[10px] font-bold flex items-center justify-center">
                                            {i + 1}
                                        </span>

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3 gap-2">
                                            <div className="flex items-center justify-between gap-1">
                                                <button
                                                    type="button"
                                                    onClick={() => moveImage(i, -1)}
                                                    disabled={i === 0}
                                                    title="Move left"
                                                    className={`w-8 h-8 rounded-full flex items-center justify-center transition ${i === 0
                                                            ? "bg-white/10 text-white/30 cursor-not-allowed"
                                                            : "bg-white/90 text-black hover:bg-white"
                                                        }`}
                                                >
                                                    <svg
                                                        className="w-4 h-4"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2.5"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path d="M15 18l-6-6 6-6" />
                                                    </svg>
                                                </button>

                                                {i !== 0 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => makeCover(i)}
                                                        title="Make cover"
                                                        className="px-2.5 py-1.5 bg-amber-500 text-black text-[10px] font-bold tracking-wide uppercase rounded-full hover:bg-amber-400 transition"
                                                    >
                                                        Set Cover
                                                    </button>
                                                )}

                                                <button
                                                    type="button"
                                                    onClick={() => moveImage(i, 1)}
                                                    disabled={i === images.length - 1}
                                                    title="Move right"
                                                    className={`w-8 h-8 rounded-full flex items-center justify-center transition ${i === images.length - 1
                                                            ? "bg-white/10 text-white/30 cursor-not-allowed"
                                                            : "bg-white/90 text-black hover:bg-white"
                                                        }`}
                                                >
                                                    <svg
                                                        className="w-4 h-4"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2.5"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path d="M9 18l6-6-6-6" />
                                                    </svg>
                                                </button>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => removeImage(i)}
                                                title="Remove image"
                                                className="w-full py-1.5 bg-rose-500 text-white text-[10px] font-bold tracking-widest uppercase rounded-full hover:bg-rose-600 transition flex items-center justify-center gap-1"
                                            >
                                                <svg
                                                    className="w-3 h-3"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2.5"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                                </svg>
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                {images.length < 6 && (
                                    <div className="aspect-square rounded-2xl border-2 border-dashed border-violet-200 bg-violet-50/40 flex flex-col items-center justify-center text-violet-400 gap-1">
                                        <svg
                                            className="w-6 h-6"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M12 5v14M5 12h14" />
                                        </svg>
                                        <span className="text-[10px] font-semibold tracking-widest uppercase">
                                            Empty Slot
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-8 rounded-2xl border-2 border-dashed border-violet-200 bg-violet-50/30">
                            <div className="text-3xl mb-2">🖼️</div>
                            <p className="text-sm text-gray-500">
                                No images yet — add one above to get started
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* ─────────── FLAGS (rose) ─────────── */}
            <section className="relative bg-gradient-to-br from-rose-50/60 via-white to-white rounded-3xl border border-rose-100 overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-rose-400 to-pink-500" />
                <div className="absolute -top-16 -right-16 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative p-6 md:p-8 space-y-5">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-lg shadow-md shadow-rose-500/30">
                            ⭐
                        </div>
                        <div>
                            <h2 className="font-display text-xl font-bold text-gray-900">
                                Visibility
                            </h2>
                            <p className="text-xs text-rose-700/70">
                                Mark this product as new or on deal
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="flex items-center gap-3 cursor-pointer select-none">
                            <span className="relative">
                                <input
                                    type="checkbox"
                                    checked={form.isNew}
                                    onChange={(e) => update("isNew", e.target.checked)}
                                    className="peer sr-only"
                                />
                                <span className="block w-6 h-6 rounded-md border-2 border-rose-200 bg-white peer-checked:bg-rose-500 peer-checked:border-rose-500 transition" />
                                <svg
                                    className="absolute inset-0 m-auto w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition pointer-events-none"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M20 6 9 17l-5-5" />
                                </svg>
                            </span>
                            <span className="text-sm font-medium text-gray-700">
                                Mark as{" "}
                                <span className="text-rose-600 font-semibold">
                                    "New Arrival"
                                </span>
                            </span>
                        </label>

                        <label className="flex items-center gap-3 cursor-pointer select-none">
                            <span className="relative">
                                <input
                                    type="checkbox"
                                    checked={form.isDeal}
                                    onChange={(e) => update("isDeal", e.target.checked)}
                                    className="peer sr-only"
                                />
                                <span className="block w-6 h-6 rounded-md border-2 border-amber-200 bg-white peer-checked:bg-amber-500 peer-checked:border-amber-500 transition" />
                                <svg
                                    className="absolute inset-0 m-auto w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition pointer-events-none"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M20 6 9 17l-5-5" />
                                </svg>
                            </span>
                            <span className="text-sm font-medium text-gray-700">
                                Include in{" "}
                                <span className="text-amber-600 font-semibold">
                                    Flash Deals
                                </span>
                            </span>
                        </label>
                    </div>
                </div>
            </section>

            {/* ─────────── LIVE PREVIEW ─────────── */}
            {images.length > 0 && (
                <section className="bg-white rounded-3xl border border-gray-100 p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-lg">👁️</span>
                        <h2 className="font-display text-lg font-bold text-gray-900">
                            Storefront Preview
                        </h2>
                    </div>

                    <div className="flex gap-4">
                        <div className="relative w-24 h-32 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0 ring-2 ring-violet-100">
                            <Image
                                src={coverImage}
                                alt="Cover"
                                fill
                                className="object-cover"
                                sizes="96px"
                            />
                        </div>
                        <div className="min-w-0">
                            <div className="text-[10px] tracking-widest uppercase text-amber-600 font-semibold mb-1">
                                {form.category}
                            </div>
                            <h3 className="font-display text-lg font-bold text-gray-900 truncate">
                                {form.name || "Untitled Product"}
                            </h3>
                            <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                                {form.description || "No description yet."}
                            </p>
                            <div className="flex items-baseline gap-2 mt-2">
                                <span className="text-xl font-bold text-gray-900">
                                    ${form.basePrice || "0.00"}
                                </span>
                                {form.oldPrice && (
                                    <span className="text-xs text-gray-400 line-through">
                                        ${form.oldPrice}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* ─────────── ACTIONS ─────────── */}
            <div className="flex flex-col-reverse md:flex-row gap-3 pt-2">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 py-4 border-2 border-gray-200 text-gray-700 font-semibold rounded-full hover:border-gray-900 hover:bg-gray-50 transition"
                >
                    Cancel
                </button>

                {isEdit && (
                    <button
                        type="button"
                        onClick={handleReset}
                        className="px-6 py-4 border-2 border-blue-200 text-blue-700 font-semibold rounded-full hover:border-blue-600 hover:bg-blue-50 transition"
                    >
                        Discard Changes
                    </button>
                )}

                <button
                    type="submit"
                    disabled={saving}
                    className={`flex-1 py-4 rounded-full font-semibold transition-all flex items-center justify-center gap-3 ${saving
                            ? "bg-gray-300 text-gray-500 cursor-wait"
                            : "bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:from-amber-400 hover:to-amber-500 hover:scale-[1.01] shadow-lg shadow-amber-500/30"
                        }`}
                >
                    {saving ? (
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
                            {isEdit ? "Updating..." : "Saving..."}
                        </>
                    ) : (
                        <>
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                viewBox="0 0 24 24"
                            >
                                {isEdit ? (
                                    <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                                ) : (
                                    <path d="M20 6 9 17l-5-5" />
                                )}
                            </svg>
                            {isEdit ? "Update Product" : "Save Product"}
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}