"use client";

import { useState, useMemo } from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ProductCard from "@/app/components/ProductCard";
import ShopHero from "@/app/components/ShopHero";
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

export default function ShopPage() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortBy, setSortBy] = useState<
        "featured" | "price-asc" | "price-desc" | "rating"
    >("featured");

    const filtered = useMemo(() => {
        let list =
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

    return (
        <main className="overflow-x-hidden">
            <Navbar />

            {/* Hero — navbar renders transparent over this */}
            <ShopHero
                category={selectedCategory !== "All" ? selectedCategory : undefined}
                count={filtered.length}
            />

            {/* Filters */}
            <section className="px-6 pt-16 pb-8 bg-white">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between">
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

                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
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
                        <div className="text-center py-20 text-gray-500">
                            No products found in this category.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {filtered.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}