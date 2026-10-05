"use client";

import { useState } from "react";
import { useCategoriesAdmin } from "@/lib/store/categoriesAdmin";

export default function CategoriesPage() {
    const { categories, addCategory, deleteCategory } = useCategoriesAdmin();
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ name: "", description: "" });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name.trim()) return;
        addCategory({
            name: form.name,
            slug: form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
            description: form.description,
        });
        setForm({ name: "", description: "" });
        setShowForm(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="font-display text-3xl font-bold text-gray-900 mb-1">
                        Categories
                    </h1>
                    <p className="text-gray-500 text-sm">
                        {categories.length} categor{categories.length !== 1 ? "ies" : "y"} in your store
                    </p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-semibold rounded-full hover:bg-amber-500 hover:text-black transition shadow-lg"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path d="M12 5v14M5 12h14" />
                    </svg>
                    Add Category
                </button>
            </div>

            {showForm && (
                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 space-y-5"
                >
                    <h2 className="font-display text-xl font-bold text-gray-900">
                        New Category
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
                                placeholder="Sweaters"
                                className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold tracking-widest uppercase text-gray-500 mb-2">
                                Description
                            </label>
                            <input
                                value={form.description}
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                                placeholder="Cozy knits for cooler days"
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
                            Save Category
                        </button>
                    </div>
                </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {categories.map((cat) => (
                    <div
                        key={cat.id}
                        className="group relative bg-white rounded-3xl border border-gray-100 p-6 hover:shadow-xl hover:border-amber-200 transition-all"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-2xl">
                                🏷️
                            </div>
                            <button
                                onClick={() => deleteCategory(cat.id)}
                                className="w-8 h-8 rounded-full hover:bg-rose-50 flex items-center justify-center text-gray-400 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                </svg>
                            </button>
                        </div>
                        <h3 className="font-display text-lg font-bold text-gray-900 mb-1">
                            {cat.name}
                        </h3>
                        <p className="text-sm text-gray-500 mb-4">{cat.description}</p>
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-400 font-mono">/{cat.slug}</span>
                            <span className="font-semibold text-amber-600">
                                {cat.productCount} products
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}