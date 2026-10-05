import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import PageHero from "@/app/components/PageHero";
import CollectionCard from "@/app/components/CollectionCard";

export const metadata = {
    title: "Collections — LUXE",
    description: "Explore our curated collections — seasonals, essentials, and statement pieces.",
};

const collections = [
    {
        id: "autumn-essentials",
        name: "Autumn Essentials",
        tagline: "Warm, layered, timeless",
        pieces: 18,
        image:
            "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
        href: "/shop",
    },
    {
        id: "minimalist-wardrobe",
        name: "Minimalist Wardrobe",
        tagline: "Fewer, better things",
        pieces: 12,
        image:
            "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80",
        href: "/shop",
    },
    {
        id: "evening-edit",
        name: "The Evening Edit",
        tagline: "For nights worth remembering",
        pieces: 9,
        image:
            "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=80",
        href: "/shop",
    },
    {
        id: "everyday-leather",
        name: "Everyday Leather",
        tagline: "Crafted to age beautifully",
        pieces: 14,
        image:
            "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80",
        href: "/shop",
    },
    {
        id: "linen-summer",
        name: "Linen & Summer",
        tagline: "Breezy, effortless, sunlit",
        pieces: 11,
        image:
            "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1200&q=80",
        href: "/shop",
    },
    {
        id: "statement-knitwear",
        name: "Statement Knitwear",
        tagline: "Softness with presence",
        pieces: 8,
        image:
            "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1200&q=80",
        href: "/shop",
    },
];

export default function CollectionsPage() {
    return (
        <main className="overflow-x-hidden">
            <Navbar />

            <PageHero
                eyebrow="Curated by LUXE"
                title="Our"
                accent="Collections"
                subtitle="Six curated edits — each built around a mood, a season, or a way of living. Discover the pieces that belong together."
                image="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2070&q=80"
                breadcrumb="Collections"
                height="medium"
            >
                <div className="flex gap-10">
                    <div>
                        <div className="font-display text-3xl font-bold text-white">6</div>
                        <div className="text-white/50 text-xs tracking-widest uppercase mt-1">
                            Collections
                        </div>
                    </div>
                    <div>
                        <div className="font-display text-3xl font-bold text-white">72</div>
                        <div className="text-white/50 text-xs tracking-widest uppercase mt-1">
                            Pieces
                        </div>
                    </div>
                    <div>
                        <div className="font-display text-3xl font-bold text-white">2025</div>
                        <div className="text-white/50 text-xs tracking-widest uppercase mt-1">
                            Edition
                        </div>
                    </div>
                </div>
            </PageHero>

            {/* Grid */}
            <section className="py-24 px-6 bg-gradient-to-b from-white to-gray-50">
                <div className="max-w-7xl mx-auto">
                    {/* Section header */}
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="w-12 h-[2px] bg-amber-500" />
                                <span className="text-amber-600 text-sm font-medium tracking-[0.3em] uppercase">
                                    Explore
                                </span>
                            </div>
                            <h2 className="font-display text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                                All <span className="italic">Edits</span>
                            </h2>
                            <p className="text-gray-500 mt-4 max-w-lg">
                                Each collection is a small story — pick one, and let it tell
                                yours.
                            </p>
                        </div>
                    </div>

                    {/* Collection cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {collections.map((collection) => (
                            <CollectionCard key={collection.id} collection={collection} />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA band */}
            <section className="py-24 px-6 bg-black relative overflow-hidden">
                <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-rose-500/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="relative max-w-3xl mx-auto text-center">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <span className="w-12 h-[2px] bg-amber-500" />
                        <span className="text-amber-400 text-sm font-medium tracking-[0.3em] uppercase">
                            Not sure where to start?
                        </span>
                        <span className="w-12 h-[2px] bg-amber-500" />
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                        Let us guide you to{" "}
                        <span className="italic text-amber-400">your style</span>
                    </h2>
                    <p className="text-white/60 mb-10 max-w-xl mx-auto">
                        Take our 60-second style quiz and we&apos;ll curate a personal
                        collection just for you.
                    </p>
                    <a
                        href="/shop"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-amber-500 text-black font-semibold rounded-full hover:bg-amber-400 transition-all hover:scale-105 shadow-2xl shadow-amber-500/30"
                    >
                        Browse All Products
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            viewBox="0 0 24 24"
                        >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>
            </section>

            <Footer />
        </main>
    );
}