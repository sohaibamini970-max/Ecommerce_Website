"use client";

import type { ColorOption, SizeOption } from "@/lib/products";

interface Props {
    colors: ColorOption[];
    sizes: SizeOption[];
    selectedColor: ColorOption;
    selectedSize: SizeOption;
    onColorChange: (color: ColorOption) => void;
    onSizeChange: (size: SizeOption) => void;
    displayPrice: number;
}

export default function ProductOptions({
    colors,
    sizes,
    selectedColor,
    selectedSize,
    onColorChange,
    onSizeChange,
    displayPrice,
}: Props) {
    return (
        <div className="space-y-8">
            {/* Colors */}
            <div>
                <div className="flex items-baseline justify-between mb-3">
                    <h3 className="text-sm font-semibold tracking-widest uppercase text-gray-900">
                        Color
                    </h3>
                    <span className="text-sm text-gray-500">{selectedColor.name}</span>
                </div>
                <div className="flex flex-wrap gap-3">
                    {colors.map((color) => (
                        <button
                            key={color.name}
                            onClick={() => onColorChange(color)}
                            aria-label={color.name}
                            className={`relative w-10 h-10 rounded-full border-2 transition-all ${selectedColor.name === color.name
                                    ? "border-black scale-110 shadow-lg"
                                    : "border-gray-200 hover:border-gray-400"
                                }`}
                            style={{ backgroundColor: color.hex }}
                        >
                            {selectedColor.name === color.name && (
                                <span
                                    className="absolute inset-0 m-auto w-2 h-2 rounded-full"
                                    style={{
                                        backgroundColor:
                                            color.hex === "#FFFFFF" || color.hex === "#F8F6F0"
                                                ? "#000"
                                                : "#FFF",
                                    }}
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Sizes */}
            <div>
                <div className="flex items-baseline justify-between mb-3">
                    <h3 className="text-sm font-semibold tracking-widest uppercase text-gray-900">
                        Size
                    </h3>
                    <span className="text-sm text-gray-500">{selectedSize.label}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                        <button
                            key={size.label}
                            onClick={() => size.inStock && onSizeChange(size)}
                            disabled={!size.inStock}
                            className={`min-w-[56px] px-4 py-3 rounded-xl border-2 text-sm font-semibold transition-all relative ${!size.inStock
                                    ? "border-gray-100 text-gray-300 cursor-not-allowed line-through"
                                    : selectedSize.label === size.label
                                        ? "border-black bg-black text-white"
                                        : "border-gray-200 text-gray-700 hover:border-gray-900"
                                }`}
                        >
                            {size.label}
                            {size.priceModifier !== 0 && size.inStock && (
                                <span className="block text-[10px] font-normal opacity-70 mt-0.5">
                                    {size.priceModifier > 0 ? "+" : ""}
                                    ${size.priceModifier}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Price Display */}
            <div className="border-t border-gray-200 pt-6">
                <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-bold text-gray-900">
                        ${displayPrice.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500">
                        {selectedColor.name} / {selectedSize.label}
                    </span>
                </div>
            </div>
        </div>
    );
}