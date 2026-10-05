import Link from "next/link";

interface ShopHeroProps {
    category?: string;
    count?: number;
}

export default function ShopHero({ category, count }: ShopHeroProps) {
    return (
        <section className="relative w-full overflow-hidden">
            {/* Background — designer coat rack, warm editorial */}
            <div
                className="absolute inset-0 bg-cover bg-center animate-slow-zoom"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=2070&q=80')",
                }}
            />

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />

            {/* Warm amber wash for brand unity */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-900/25 via-transparent to-transparent mix-blend-overlay" />

            {/* Guaranteed contrast for the navbar */}
            <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/70 to-transparent" />

            {/* Content */}
            <div className="relative z-10 min-h-[70vh] flex flex-col justify-end">
                <div className="max-w-7xl mx-auto w-full px-6 pb-16 md:pb-24 pt-40">
                    <div className="max-w-3xl">
                        {/* Tagline */}
                        <div className="flex items-center gap-3 mb-5 animate-fade-up delay-200">
                            <span className="w-12 h-[2px] bg-amber-500" />
                            <span className="text-amber-400 text-sm font-medium tracking-[0.3em] uppercase">
                                {category ?? "The Collection"}
                            </span>
                        </div>

                        {/* Heading */}
                        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] mb-6 animate-fade-up delay-400">
                            {category ? (
                                <>
                                    All{" "}
                                    <span className="italic bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                                        {category}
                                    </span>
                                </>
                            ) : (
                                <>
                                    The{" "}
                                    <span className="italic bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                                        Collection
                                    </span>
                                </>
                            )}
                        </h1>

                        {/* Subheading */}
                        <p className="text-white/80 text-lg md:text-xl max-w-xl leading-relaxed animate-fade-up delay-600">
                            Every piece, curated. Premium materials, timeless cuts, and
                            craftsmanship you can feel — all in one place.
                        </p>

                        {/* Stats */}
                        {count !== undefined && (
                            <div className="mt-10 flex gap-10 animate-fade-up delay-800">
                                <div>
                                    <div className="font-display text-3xl font-bold text-white">
                                        {count}
                                    </div>
                                    <div className="text-white/50 text-xs tracking-widest uppercase mt-1">
                                        Products
                                    </div>
                                </div>
                                <div>
                                    <div className="font-display text-3xl font-bold text-white">
                                        8
                                    </div>
                                    <div className="text-white/50 text-xs tracking-widest uppercase mt-1">
                                        Categories
                                    </div>
                                </div>
                                <div>
                                    <div className="font-display text-3xl font-bold text-white">
                                        4.9★
                                    </div>
                                    <div className="text-white/50 text-xs tracking-widest uppercase mt-1">
                                        Avg. Rating
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Scroll hint */}
            <div className="absolute bottom-6 right-6 hidden md:flex flex-col items-center gap-2 text-white/50">
                <span className="text-[10px] tracking-[0.3em] uppercase rotate-90 origin-center translate-y-4">
                    Scroll
                </span>
            </div>
        </section>
    );
}