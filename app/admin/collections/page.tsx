"use client";

import Image from "next/image";
import { useState } from "react";
import { useCollectionsAdmin } from "@/lib/store/collectionsAdmin";

export default function CollectionsAdminPage() {
    const { collections, addCollection, deleteCollection, toggleFeatured } =
        useCollectionsAdmin();
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ name: "", tagline: "", pieces: "", image: "" });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name.trim()) return;
        addCollection({
            name: form.name,
            tagline: form.tagline,
            pieces: parseInt(form.pieces) || 0,
            featured: false,
            image:
                form.image ||
                "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
        });
        setForm({ name: "", tagline: "", pieces: "", image: "" });
        setShowForm(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="font-display text-3xl font-bold text-gray-900 mb-1">
                        Collections
                    </h1>
                    <p className="text-gray-500 text-sm">
                        {collections.length} collection{collections.length !== 1 ? "s" : ""} in your store
                    </p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-semibold rounded-full hover:bg-amber-500 hover:text-black transition shadow-lg"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path d="M12 5v14M5 12h14" />
                    </svg>
                    Add Collection
                </button>
            </div>

            {showForm && (
                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 space-y-5"
                >
                    <h2 className="font-display text-xl font-bold text-gray-900">
                        New Collection
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-xs font-semibold tracking-widest uppercase text-gray-500 mb-2">
                                Name
                            </label>
                            <input
                                required
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                placeholder="Winter Edit"
                                className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold tracking-widest uppercase text-gray-500 mb-2">
                                Tagline
                            </label>
                            <input
                                value={form.tagline}
                                onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                                placeholder="Warm, layered, timeless"
                                className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold tracking-widest uppercase text-gray-500 mb-2">
                                Pieces
                            </label>
                            <input
                                type="number"
                                value={form.pieces}
                                onChange={(e) => setForm({ ...form, pieces: e.target.value })}
                                placeholder="12"
                                className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold tracking-widest uppercase text-gray-500 mb-2">
                                Image URL
                            </label>
                            <input
                                value={form.image}
                                onChange={(e) => setForm({ ...form, image: e.target.value })}
                                placeholder="https://..."
                                className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition"
                            />
                        </div>
                    </div>
                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={() => setShowForm(false)}
                            className="px-6 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-full hover:border-gray-900 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-3 bg-black text-white font-semibold rounded-full hover:bg-amber-500 hover:text-black transition"
                        >
                            Save Collection
                        </button>
                    </div>
                </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {collections.map((col) => (
                    <div
                        key={col.id}
                        className="group relative bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-amber-200 transition-all"
                    >
                        <div className="relative h-40 overflow-hidden">
                            <Image
                                src={col.image}
                                alt={col.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            {col.featured && (
                                <span className="absolute top-3 left-3 px-3 py-1 bg-amber-500 text-black text-[10px] font-bold tracking-widest uppercase rounded-full">
                                    Featured
                                </span>
                            )}
                        </div>
                        <div className="p-6">
                            <h3 className="font-display text-lg font-bold text-gray-900 mb-1">
                                {col.name}
                            </h3>
                            <p className="text-sm text-gray-500 italic mb-4">
                                {col.tagline}
                            </p>
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-gray-400">
                                    {col.pieces} pieces
                                </span>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => toggleFeatured(col.id)}
                                        className={`px-3 py-1 rounded-full font-semibold transition ${col.featured
                                                ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
                                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                            }`}
                                    >
                                        {col.featured ? "★ Featured" : "☆ Feature"}
                                    </button>
                                    <button
                                        onClick={() => deleteCollection(col.id)}
                                        className="w-7 h-7 rounded-full hover:bg-rose-50 flex items-center justify-center text-gray-400 hover:text-rose-500 transition"
                                    >
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}