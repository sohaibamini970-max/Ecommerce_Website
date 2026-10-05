import Link from "next/link";
import ProductCard from "./ProductCard";
import { products } from "@/lib/products";

export default function LatestArrivals() {
    const latest = products.slice(0, 8); // show first 8

    return (
        <section className="py-24 px-6 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="w-12 h-[2px] bg-amber-500" />
                            <span className="text-amber-600 text-sm font-medium tracking-[0.3em] uppercase">
                                Fresh Drops
                            </span>
                        </div>
                        <h2 className="font-display text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                            Latest <span className="italic">Arrivals</span>
                        </h2>
                        <p className="text-gray-500 mt-4 max-w-lg">
                            Handpicked pieces from our newest collection — crafted for those who appreciate the finer details.
                        </p>
                    </div>

                    <Link
                        href="/shop"
                        className="group inline-flex items-center gap-2 text-gray-900 font-semibold border-b-2 border-gray-900 pb-1 hover:border-amber-500 hover:text-amber-600 transition-all self-start md:self-auto"
                    >
                        View All Products
                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {latest.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}