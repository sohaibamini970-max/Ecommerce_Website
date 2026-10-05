"use client";

import { useState, useMemo } from "react";
import ProductCard from "./ProductCard";
import { products } from "@/lib/products";

const categories = [
    "All",
    "Outerwear",
    "Tops",
    "Bottoms",
    "Dresses",
    "Knitwear",
    "Footwear",
    "Accessories",
];

type SortKey = "featured" | "price-asc" | "price-desc" | "rating";

interface ShopGridProps {
    /** Called whenever the filtered count or category changes — useful for the hero stats */
    onFilterChange?: (info: { count: number; category: string }) => void;
    /** Optional initial category to preselect */
    initialCategory?: string;
}

export default function ShopGrid({
    onFilterChange,
    initialCategory = "All",
}: ShopGridProps) {
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [sortBy, setSortBy] = useState<SortKey>("featured");

    const filtered = useMemo(() => {
        const list =
            selectedCategory === "All"
                ? [...products]
                : products.filter((p) => p.category === selectedCategory);

        switch (sortBy) {
            case "price-asc":
                list.sort((a, b) => a.basePrice - b.basePrice);
                break;
            case "price-desc":
                list.sort((a, b) => b.basePrice - a.basePrice);
                break;
            case "rating":
                list.sort((a, b) => b.rating - a.rating);
                break;
        }
        return list;
    }, [selectedCategory, sortBy]);

    // Notify parent whenever filter changes
    // (Call this in a useEffect in a real app — simplified here for brevity)
    useMemo(() => {
        onFilterChange?.({ count: filtered.length, category: selectedCategory });
    }, [filtered.length, selectedCategory, onFilterChange]);

    return (
        <>
            {/* Filters bar */}
            <section className="px-6 pt-16 pb-8 bg-white">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between">
                    {/* Category pills */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === cat
                                        ? "bg-black text-white shadow-lg"
                                        : "bg-white text-gray-700 border border-gray-200 hover:border-gray-900"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Sort dropdown */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as SortKey)}
                        className="px-5 py-3 rounded-full bg-white border border-gray-200 text-sm font-medium text-gray-700 focus:outline-none focus:border-gray-900 cursor-pointer"
                    >
                        <option value="featured">Featured</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="rating">Top Rated</option>
                    </select>
                </div>
            </section>

            {/* Grid */}
            <section className="px-6 pb-24 bg-white">
                <div className="max-w-7xl mx-auto">
                    {filtered.length === 0 ? (
                        <div className="text-center py-24">
                            <div className="text-6xl mb-6">🔍</div>
                            <h3 className="font-display text-2xl font-bold text-gray-900 mb-3">
                                No products found
                            </h3>
                            <p className="text-gray-500 mb-8">
                                Try a different category or clear your filters.
                            </p>
                            <button
                                onClick={() => setSelectedCategory("All")}
                                className="px-6 py-3 bg-black text-white rounded-full font-semibold hover:bg-amber-500 hover:text-black transition-all"
                            >
                                Show all products
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* Result count */}
                            <div className="flex items-center justify-between mb-8">
                                <p className="text-sm text-gray-500">
                                    Showing{" "}
                                    <span className="font-semibold text-gray-900">
                                        {filtered.length}
                                    </span>{" "}
                                    {filtered.length === 1 ? "product" : "products"}
                                    {selectedCategory !== "All" && (
                                        <>
                                            {" "}
                                            in{" "}
                                            <span className="font-semibold text-gray-900">
                                                {selectedCategory}
                                            </span>
                                        </>
                                    )}
                                </p>
                            </div>

                            {/* Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                {filtered.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>
        </>
    );
}