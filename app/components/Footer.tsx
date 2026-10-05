import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-black text-white">
            {/* Newsletter */}
            <div className="border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
                    <div>
                        <h3 className="font-display text-3xl md:text-4xl font-bold mb-3">
                            Join the <span className="italic text-amber-400">inner circle</span>
                        </h3>
                        <p className="text-white/60 max-w-md">
                            Subscribe for early access to new drops, exclusive offers, and styling inspiration.
                        </p>
                    </div>
                    <form className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-5 py-4 rounded-full bg-white/5 border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-amber-400 transition"
                        />
                        <button className="px-8 py-4 bg-amber-500 text-black font-semibold rounded-full hover:bg-amber-400 transition-all hover:scale-105">
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>

            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
                <div className="col-span-2 md:col-span-1">
                    <Link href="/" className="font-display text-3xl font-bold">
                        LUXE<span className="text-amber-500">.</span>
                    </Link>
                    <p className="text-white/60 mt-4 text-sm leading-relaxed max-w-xs">
                        Curated premium fashion for the modern individual. Quality you can feel, style you can own.
                    </p>
                    <div className="flex gap-4 mt-6">
                        {["instagram", "twitter", "facebook"].map((social) => (
                            <a
                                key={social}
                                href="#"
                                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-amber-500 hover:border-amber-500 hover:text-black transition-all"
                                aria-label={social}
                            >
                                <span className="text-xs uppercase">{social[0]}</span>
                            </a>
                        ))}
                    </div>
                </div>

                {[
                    { title: "Shop", links: ["New Arrivals", "Best Sellers", "Sale", "Collections"] },
                    { title: "Help", links: ["Shipping", "Returns", "Size Guide", "Contact"] },
                    { title: "Company", links: ["About Us", "Careers", "Sustainability", "Press"] },
                ].map((col) => (
                    <div key={col.title}>
                        <h4 className="font-semibold mb-5 text-sm tracking-widest uppercase text-amber-400">
                            {col.title}
                        </h4>
                        <ul className="space-y-3">
                            {col.links.map((link) => (
                                <li key={link}>
                                    <Link
                                        href="#"
                                        className="text-white/60 text-sm hover:text-white transition-colors"
                                    >
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-white/40 text-sm">
                    <p>© 2025 LUXE. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-white transition">Privacy</Link>
                        <Link href="#" className="hover:text-white transition">Terms</Link>
                        <Link href="#" className="hover:text-white transition">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}