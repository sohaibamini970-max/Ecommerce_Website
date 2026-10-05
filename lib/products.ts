export interface ColorOption {
    name: string;
    hex: string;
}

export interface SizeOption {
    label: string;
    priceModifier: number; // added to base price
    inStock: boolean;
}

export interface Product {
    id: string;
    name: string;
    category: string;
    basePrice: number;
    oldPrice?: number;
    rating: number;
    reviews: number;
    isNew?: boolean;
    discount?: number;
    description: string;
    images: string[];
    colors: ColorOption[];
    sizes: SizeOption[];
    features: string[];
    // 👇 Deals section fields
    isDeal?: boolean;
    dealEndsAt?: string;    // ISO date string
    soldCount?: number;     // units sold so far
    stockTotal?: number;    // total units in stock (for progress bar)
}

export const products: Product[] = [
    {
        id: "cashmere-oversized-coat",
        name: "Cashmere Oversized Coat",
        category: "Outerwear",
        basePrice: 289.0,
        oldPrice: 420.0,
        rating: 4.9,
        reviews: 128,
        isNew: true,
        discount: 30,
        isDeal: true,
        dealEndsAt: "2026-12-31T23:59:59Z",
        soldCount: 187,
        stockTotal: 250,
        description:
            "Crafted from 100% Mongolian cashmere, this oversized coat drapes effortlessly while keeping you warm. A timeless silhouette that pairs with everything from tailored trousers to denim.",
        images: [
            "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=1200&q=80",
        ],
        colors: [
            { name: "Camel", hex: "#C19A6B" },
            { name: "Charcoal", hex: "#36454F" },
            { name: "Ivory", hex: "#FFFFF0" },
            { name: "Forest", hex: "#228B22" },
        ],
        sizes: [
            { label: "XS", priceModifier: -20, inStock: true },
            { label: "S", priceModifier: 0, inStock: true },
            { label: "M", priceModifier: 0, inStock: true },
            { label: "L", priceModifier: 20, inStock: true },
            { label: "XL", priceModifier: 30, inStock: false },
        ],
        features: [
            "100% Mongolian cashmere",
            "Oversized relaxed fit",
            "Double-breasted closure",
            "Fully lined interior",
            "Dry clean only",
        ],
    },
    {
        id: "silk-minimalist-blouse",
        name: "Silk Minimalist Blouse",
        category: "Tops",
        basePrice: 129.0,
        rating: 4.8,
        reviews: 94,
        isNew: true,
        description:
            "A featherweight silk blouse with a clean, minimalist cut. Effortless elegance for work or weekend.",
        images: [
            "https://images.unsplash.com/photo-1564257577054-56d7f17c7b91?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?auto=format&fit=crop&w=1200&q=80",
        ],
        colors: [
            { name: "Pearl", hex: "#F8F6F0" },
            { name: "Blush", hex: "#E8B4B8" },
            { name: "Navy", hex: "#1B2A41" },
        ],
        sizes: [
            { label: "XS", priceModifier: 0, inStock: true },
            { label: "S", priceModifier: 0, inStock: true },
            { label: "M", priceModifier: 0, inStock: true },
            { label: "L", priceModifier: 10, inStock: true },
            { label: "XL", priceModifier: 20, inStock: true },
        ],
        features: [
            "100% mulberry silk",
            "Relaxed drape",
            "Hidden button placket",
            "Dry clean or hand wash",
        ],
    },
    {
        id: "leather-crossbody-bag",
        name: "Leather Crossbody Bag",
        category: "Accessories",
        basePrice: 199.0,
        oldPrice: 249.0,
        rating: 5.0,
        reviews: 203,
        discount: 20,
        isDeal: true,
        dealEndsAt: "2026-12-31T23:59:59Z",
        soldCount: 312,
        stockTotal: 400,
        description:
            "Full-grain Italian leather with hand-stitched detailing. Compact yet roomy enough for daily essentials.",
        images: [
            "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=1200&q=80",
        ],
        colors: [
            { name: "Black", hex: "#000000" },
            { name: "Tan", hex: "#B8860B" },
            { name: "Burgundy", hex: "#800020" },
        ],
        sizes: [{ label: "One Size", priceModifier: 0, inStock: true }],
        features: [
            "Full-grain Italian leather",
            "Adjustable strap",
            "Interior zip pocket",
            "Magnetic closure",
        ],
    },
    {
        id: "tailored-wool-trousers",
        name: "Tailored Wool Trousers",
        category: "Bottoms",
        basePrice: 159.0,
        rating: 4.7,
        reviews: 76,
        isNew: true,
        description:
            "Precision-tailored wool trousers with a modern straight leg. A wardrobe staple for every season.",
        images: [
            "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1200&q=80",
        ],
        colors: [
            { name: "Black", hex: "#000000" },
            { name: "Grey", hex: "#808080" },
            { name: "Cream", hex: "#F5F5DC" },
        ],
        sizes: [
            { label: "28", priceModifier: -10, inStock: true },
            { label: "30", priceModifier: 0, inStock: true },
            { label: "32", priceModifier: 0, inStock: true },
            { label: "34", priceModifier: 10, inStock: true },
            { label: "36", priceModifier: 20, inStock: true },
        ],
        features: [
            "98% wool, 2% elastane",
            "Straight leg",
            "Side pockets",
            "Dry clean only",
        ],
    },
    {
        id: "classic-aviator-sunglasses",
        name: "Classic Aviator Sunglasses",
        category: "Accessories",
        basePrice: 89.0,
        rating: 4.6,
        reviews: 142,
        isNew: true,
        description:
            "Iconic aviator silhouette with polarized lenses and a lightweight titanium frame.",
        images: [
            "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=80",
        ],
        colors: [
            { name: "Gold", hex: "#D4AF37" },
            { name: "Silver", hex: "#C0C0C0" },
            { name: "Black", hex: "#000000" },
        ],
        sizes: [{ label: "One Size", priceModifier: 0, inStock: true }],
        features: [
            "Polarized UV400 lenses",
            "Titanium frame",
            "Includes case & cloth",
        ],
    },
    {
        id: "knit-cashmere-sweater",
        name: "Knit Cashmere Sweater",
        category: "Knitwear",
        basePrice: 179.0,
        oldPrice: 230.0,
        rating: 4.9,
        reviews: 187,
        discount: 22,
        isDeal: true,
        dealEndsAt: "2026-12-31T23:59:59Z",
        soldCount: 98,
        stockTotal: 150,
        description:
            "Ultra-soft cashmere with a classic crew neck. Perfect layering piece for cooler days.",
        images: [
            "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1200&q=80",
        ],
        colors: [
            { name: "Cream", hex: "#F5F5DC" },
            { name: "Navy", hex: "#1B2A41" },
            { name: "Rust", hex: "#B7410E" },
        ],
        sizes: [
            { label: "XS", priceModifier: -10, inStock: true },
            { label: "S", priceModifier: 0, inStock: true },
            { label: "M", priceModifier: 0, inStock: true },
            { label: "L", priceModifier: 10, inStock: true },
            { label: "XL", priceModifier: 20, inStock: true },
        ],
        features: [
            "100% cashmere",
            "Crew neck",
            "Ribbed cuffs & hem",
            "Hand wash cold",
        ],
    },
    {
        id: "premium-leather-boots",
        name: "Premium Leather Boots",
        category: "Footwear",
        basePrice: 211.65,
        oldPrice: 249.0,
        rating: 4.8,
        reviews: 112,
        isNew: true,
        discount: 15,
        isDeal: true,
        dealEndsAt: "2026-12-31T23:59:59Z",
        soldCount: 143,
        stockTotal: 200,
        description:
            "Handcrafted Italian leather boots with a stacked heel and cushioned insole for all-day comfort.",
        images: [
            "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=1200&q=80",
        ],
        colors: [
            { name: "Black", hex: "#000000" },
            { name: "Cognac", hex: "#9B4722" },
        ],
        sizes: [
            { label: "36", priceModifier: -10, inStock: true },
            { label: "37", priceModifier: 0, inStock: true },
            { label: "38", priceModifier: 0, inStock: true },
            { label: "39", priceModifier: 0, inStock: true },
            { label: "40", priceModifier: 0, inStock: true },
            { label: "41", priceModifier: 10, inStock: false },
        ],
        features: [
            "Italian full-grain leather",
            "Stacked heel",
            "Cushioned insole",
            "Made in Italy",
        ],
    },
    {
        id: "linen-summer-dress",
        name: "Linen Summer Dress",
        category: "Dresses",
        basePrice: 139.0,
        rating: 4.7,
        reviews: 89,
        isNew: true,
        description:
            "Breezy 100% linen dress with a flattering A-line cut. Your warm-weather essential.",
        images: [
            "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1200&q=80",
        ],
        colors: [
            { name: "White", hex: "#FFFFFF" },
            { name: "Sage", hex: "#9CAF88" },
            { name: "Terracotta", hex: "#E2725B" },
        ],
        sizes: [
            { label: "XS", priceModifier: 0, inStock: true },
            { label: "S", priceModifier: 0, inStock: true },
            { label: "M", priceModifier: 0, inStock: true },
            { label: "L", priceModifier: 10, inStock: true },
        ],
        features: [
            "100% European linen",
            "A-line silhouette",
            "Side pockets",
            "Machine wash cold",
        ],
    },
];

export function getProductById(id: string): Product | undefined {
    return products.find((p) => p.id === id);
}

export function getDealProducts(): Product[] {
    return products.filter((p) => p.isDeal);
}