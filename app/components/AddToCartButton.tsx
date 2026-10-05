"use client";

import { useState } from "react";
import { useCart } from "@/lib/store/cart";
import type { Product, ColorOption, SizeOption } from "@/lib/products";

interface Props {
    product: Product;
    color: ColorOption;
    size: SizeOption;
    price: number;
}

export default function AddToCartButton({ product, color, size, price }: Props) {
    const addItem = useCart((s) => s.addItem);
    const [added, setAdded] = useState(false);

    const handleAdd = () => {
        if (!size.inStock) return;
        addItem({
            productId: product.id,
            name: product.name,
            image: product.images[0],
            color: color.name,
            size: size.label,
            price,
            quantity: 1,
        });
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <button
            onClick={handleAdd}
            disabled={!size.inStock}
            className={`w-full py-4 rounded-full font-semibold text-base transition-all flex items-center justify-center gap-3 ${!size.inStock
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : added
                        ? "bg-green-600 text-white"
                        : "bg-black text-white hover:bg-amber-500 hover:text-black hover:scale-[1.02] shadow-lg hover:shadow-amber-500/40"
                }`}
        >
            {added ? (
                <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <path d="M20 6 9 17l-5-5" />
                    </svg>
                    Added to Cart
                </>
            ) : (
                <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                        <path d="M3 6h18M16 10a4 4 0 0 1-8 0" />
                    </svg>
                    {size.inStock ? "Add to Cart" : "Out of Stock"}
                </>
            )}
        </button>
    );
}