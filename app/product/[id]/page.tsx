"use client";

import { use, useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ProductGallery from "@/app/components/ProductGallery";
import ProductOptions from "@/app/components/ProductOptions";
import AddToCartButton from "@/app/components/AddToCartButton";
import ProductCard from "@/app/components/ProductCard";
import { getProductById, products } from "@/lib/products";

export default function ProductPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    // Next.js 15+ passes params as a Promise — unwrap with React.use()
    const { id } = use(params);

    const product = getProductById(id);

    const [selectedColor, setSelectedColor] = useState(product?.colors[0]);
    const [selectedSize, setSelectedSize] = useState(
        product?.sizes.find((s) => s.inStock) ?? product?.sizes[0]
    );

    // Reset state if the product changes (defensive)
    useEffect(() => {
        if (product) {
            setSelectedColor(product.colors[0]);
            setSelectedSize(product.sizes.find((s) => s.inStock) ?? product.sizes[0]);
        }
    }, [product]);

    const displayPrice = useMemo(() => {
        if (!product || !selectedSize) return 0;
        return product.basePrice + selectedSize.priceModifier;
    }, [product, selectedSize]);

    if (!product || !selectedColor || !selectedSize) {
        notFound();
    }

    // Related products
    const related = products
        .filter((p) => p.id !== product.id && p.category === product.category)
        .slice(0, 4);

    const relatedFallback = products
        .filter((p) => p.id !== product.id)
        .slice(0, 4);

    const relatedToShow = related.length > 0 ? related : relatedFallback;

    return (
        <main className="overflow-x-hidden">
            <Navbar />

            <section className="pt-32 pb-16 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                        <Link href="/" className="hover:text-gray-900">Home</Link>
                        <span>/</span>
                        <Link href="/shop" className="hover:text-gray-900">Shop</Link>
                        <span>/</span>
                        <span className="text-gray-900 font-medium">{product.name}</span>
                    </nav>

                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                        {/* Left: Gallery */}
                        <ProductGallery images={product.images} name={product.name} />

                        {/* Right: Info */}
                        <div className="lg:sticky lg:top-32 self-start space-y-8">
                            {/* Header */}
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-xs text-amber-600 tracking-[0.3em] uppercase font-medium">
                                        {product.category}
                                    </span>
                                    {product.isNew && (
                                        <span className="px-2 py-0.5 bg-black text-white text-[10px] font-bold tracking-widest uppercase rounded-full">
                                            New
                                        </span>
                                    )}
                                </div>
                                <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
                                    {product.name}
                                </h1>

                                <div className="flex items-center gap-4 mb-6">
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <svg
                                                key={i}
                                                className={`w-4 h-4 ${i < Math.round(product.rating) ? "fill-amber-400" : "fill-gray-200"
                                                    }`}
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <span className="text-sm text-gray-500">
                                        {product.rating} · {product.reviews} reviews
                                    </span>
                                </div>

                                <p className="text-gray-600 leading-relaxed">
                                    {product.description}
                                </p>
                            </div>

                            {/* Options + Price */}
                            <ProductOptions
                                colors={product.colors}
                                sizes={product.sizes}
                                selectedColor={selectedColor}
                                selectedSize={selectedSize}
                                onColorChange={setSelectedColor}
                                onSizeChange={setSelectedSize}
                                displayPrice={displayPrice}
                            />

                            {/* Add to Cart */}
                            <AddToCartButton
                                product={product}
                                color={selectedColor}
                                size={selectedSize}
                                price={displayPrice}
                            />

                            {/* Shipping Info */}
                            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                                {[
                                    { icon: "🚚", label: "Free Shipping", sub: "Orders $100+" },
                                    { icon: "↩️", label: "30-Day Returns", sub: "No questions" },
                                    { icon: "🔒", label: "Secure Payment", sub: "SSL encrypted" },
                                ].map((item) => (
                                    <div key={item.label} className="text-center">
                                        <div className="text-2xl mb-1">{item.icon}</div>
                                        <div className="text-xs font-semibold text-gray-900">{item.label}</div>
                                        <div className="text-[10px] text-gray-500">{item.sub}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Features */}
                            <div className="pt-6 border-t border-gray-200">
                                <h3 className="text-sm font-semibold tracking-widest uppercase text-gray-900 mb-4">
                                    Details
                                </h3>
                                <ul className="space-y-2">
                                    {product.features.map((f) => (
                                        <li key={f} className="flex items-center gap-3 text-sm text-gray-600">
                                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Products */}
            {relatedToShow.length > 0 && (
                <section className="py-20 px-6 bg-gradient-to-b from-white to-gray-50">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-end justify-between mb-12">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="w-12 h-[2px] bg-amber-500" />
                                    <span className="text-amber-600 text-sm font-medium tracking-[0.3em] uppercase">
                                        You May Also Like
                                    </span>
                                </div>
                                <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900">
                                    Related <span className="italic">Pieces</span>
                                </h2>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {relatedToShow.map((p) => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <Footer />
        </main>
    );
}