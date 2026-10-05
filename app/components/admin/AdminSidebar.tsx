"use client";

import Link from "next/link";

const nav = [
    { name: "Dashboard", href: "/admin", icon: "grid" },
    { name: "Products", href: "/admin/products", icon: "box" },
    { name: "Categories", href: "/admin/categories", icon: "tag" },
    { name: "Collections", href: "/admin/collections", icon: "layers" },
    { name: "Orders", href: "/admin/orders", icon: "receipt" },
];

const icons: Record<string, React.ReactNode> = {
    grid: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
    ),
    box: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
    ),
    tag: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M20.59 13.41 13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
            <line x1="7" y1="7" x2="7.01" y2="7" />
        </svg>
    ),
    layers: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
        </svg>
    ),
    receipt: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1z" />
            <line x1="8" y1="8" x2="16" y2="8" />
            <line x1="8" y1="12" x2="16" y2="12" />
            <line x1="8" y1="16" x2="12" y2="16" />
        </svg>
    ),
};

export default function AdminSidebar({ currentPath }: { currentPath: string }) {
    return (
        <aside className="hidden lg:flex w-64 bg-black text-white flex-col border-r border-white/10">
            <div className="p-6 border-b border-white/10">
                <Link
                    href="/"
                    className="font-display text-2xl font-bold tracking-tight text-white"
                >
                    LUXE<span className="text-amber-500">.</span>
                    <span className="block text-[10px] tracking-[0.3em] text-white/40 mt-1">
                        ADMIN
                    </span>
                </Link>
            </div>

            <nav className="flex-1 p-4 space-y-1">
                {nav.map((item) => {
                    const isActive =
                        item.href === "/admin"
                            ? currentPath === "/admin"
                            : currentPath.startsWith(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive
                                    ? "bg-amber-500 text-black shadow-lg shadow-amber-500/30"
                                    : "text-white/70 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            {icons[item.icon]}
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-white/10">
                <Link
                    href="/"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Back to Store
                </Link>
            </div>
        </aside>
    );
}