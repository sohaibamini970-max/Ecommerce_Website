"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductGallery({ images, name }: { images: string[]; name: string }) {
    const [activeIdx, setActiveIdx] = useState(0);

    return (
        <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-100">
                <Image
                    src={images[activeIdx]}
                    alt={name}
                    fill
                    className="object-cover transition-all duration-500"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                />
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setActiveIdx(idx)}
                        className={`relative aspect-square rounded-xl overflow-hidden transition-all ${activeIdx === idx
                                ? "ring-2 ring-black ring-offset-2"
                                : "opacity-60 hover:opacity-100"
                            }`}
                    >
                        <Image src={img} alt={`${name} ${idx + 1}`} fill className="object-cover" sizes="150px" />
                    </button>
                ))}
            </div>
        </div>
    );
}