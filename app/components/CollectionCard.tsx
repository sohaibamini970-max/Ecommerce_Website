import Image from "next/image";
import Link from "next/link";

export interface Collection {
    id: string;
    name: string;
    tagline: string;
    pieces: number;
    image: string;
    href: string;
}

export default function CollectionCard({ collection }: { collection: Collection }) {
    return (
        <Link
            href={collection.href}
            className="group relative block overflow-hidden rounded-3xl aspect-[4/5] bg-gray-100 shadow-sm hover:shadow-2xl hover:shadow-black/20 transition-all duration-500"
        >
            {/* Image */}
            <Image
                src={collection.image}
                alt={collection.name}
                fill
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {/* Dark gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            {/* Top-right piece count badge */}
            <div className="absolute top-5 right-5 z-10 px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
                <span className="text-white text-[11px] font-medium tracking-wider uppercase">
                    {collection.pieces} pieces
                </span>
            </div>

            {/* Bottom content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7 z-10">
                <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="text-amber-400 text-xs font-medium tracking-[0.3em] uppercase mb-2">
                        Collection
                    </div>
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-white leading-tight mb-2">
                        {collection.name}
                    </h3>
                    <p className="text-white/60 text-sm italic mb-0 opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-20 transition-all duration-500 overflow-hidden">
                        {collection.tagline}
                    </p>
                </div>

                {/* Explore row */}
                <div className="mt-5 flex items-center gap-2 text-white text-sm font-semibold opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500 delay-100">
                    Explore Collection
                    <svg
                        className="w-4 h-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                    >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </div>
            </div>

            {/* Border ring on hover */}
            <div className="absolute inset-0 rounded-3xl ring-0 group-hover:ring-2 group-hover:ring-amber-400/60 transition-all duration-500 pointer-events-none" />
        </Link>
    );
}