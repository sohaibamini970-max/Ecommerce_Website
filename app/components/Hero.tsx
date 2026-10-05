import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative h-screen min-h-[700px] w-full overflow-hidden">
            {/* Background Image — clothes rack editorial, no people */}
            <div
                className="absolute inset-0 bg-cover bg-center animate-slow-zoom"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=2070&q=80')",
                }}
            />

            {/* Gradient Overlays — strong left side for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            {/* Warm amber wash — ties the whole hero to your brand accent */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-900/25 via-transparent to-transparent mix-blend-overlay" />

            {/* Content */}
            <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex items-center">
                <div className="max-w-2xl">
                    {/* Tagline */}
                    <div className="flex items-center gap-3 mb-6 animate-fade-up delay-200">
                        <span className="w-12 h-[2px] bg-amber-500" />
                        <span className="text-amber-400 text-sm font-medium tracking-[0.3em] uppercase">
                            New Collection 2025
                        </span>
                    </div>

                    {/* Heading */}
                    <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] mb-6 animate-fade-up delay-400">
                        Elevate
                        <br />
                        Your{" "}
                        <span className="italic bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                            Style
                        </span>
                    </h1>

                    {/* Subheading */}
                    <p className="text-white/80 text-lg md:text-xl max-w-lg mb-10 leading-relaxed animate-fade-up delay-600">
                        Discover timeless pieces crafted for the modern individual. Premium
                        quality, sustainable materials, effortlessly elegant.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap gap-4 animate-fade-up delay-800">
                        <Link
                            href="/shop"
                            className="group relative px-8 py-4 bg-amber-500 text-black font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/50"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Shop Now
                                <svg
                                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </span>
                        </Link>

                        <Link
                            href="/collections"
                            className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full backdrop-blur-sm hover:bg-white/10 hover:border-white/60 transition-all duration-300"
                        >
                            Explore Collections
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="mt-16 flex gap-12 animate-fade-up delay-1000">
                        {[
                            { num: "500+", label: "Products" },
                            { num: "50K+", label: "Customers" },
                            { num: "4.9★", label: "Rating" },
                        ].map((stat) => (
                            <div key={stat.label}>
                                <div className="font-display text-3xl font-bold text-white">
                                    {stat.num}
                                </div>
                                <div className="text-white/60 text-sm tracking-wide">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60">
                <span className="text-xs tracking-[0.3em] uppercase">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-white/60 to-transparent" />
            </div>
        </section>
    );
}