"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/store/cart";
import { useAuth } from "@/lib/store/auth";

interface NavbarProps {
    /** Force solid style — use on pages without a dark hero image */
    alwaysSolid?: boolean;
}

export default function Navbar({ alwaysSolid = false }: NavbarProps) {
    const router = useRouter();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    const openCart = useCart((s) => s.openCart);
    const totalItems = useCart((s) => s.totalItems);
    const itemCount = totalItems();

    const { user, isAuthenticated, logout } = useAuth();

    // Scroll listener
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        onScroll();
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Mark as mounted — avoids hydration mismatch on cart badge + auth state
    useEffect(() => {
        setMounted(true);
    }, []);

    // ONE source of truth for the whole component
    const solid = alwaysSolid || scrolled;

    const handleLogout = () => {
        logout();
        router.push("/");
    };

    const links = [
        { name: "Home", href: "/" },
        { name: "Shop", href: "/shop" },
        { name: "Collections", href: "/collections" },
        { name: "About", href: "/about" },
        { name: "Orders", href: "/orders" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${solid
                    ? "bg-white/85 backdrop-blur-xl shadow-lg shadow-black/5 py-3"
                    : "bg-transparent py-5"
                }`}
        >
            <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link
                    href="/"
                    className={`font-display text-2xl md:text-4xl font-bold tracking-tight transition-colors ${solid ? "text-gray-900" : "text-white"
                        }`}
                >
                    LUXE<span className="text-amber-500">.</span>
                </Link>

                {/* Desktop Links */}
                <ul className="hidden md:flex items-center gap-10">
                    {links.map((link) => (
                        <li key={link.name}>
                            <Link
                                href={link.href}
                                className={`relative text-lg font-medium tracking-wide transition-colors group ${solid
                                        ? "text-gray-700 hover:text-gray-900"
                                        : "text-white/90 hover:text-white"
                                    }`}
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-amber-500 transition-all duration-300 group-hover:w-full" />
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Icons */}
                <div className="flex items-center gap-5">
                    {/* Search */}
                    <button
                        aria-label="Search"
                        className={`transition-colors ${solid
                                ? "text-gray-700 hover:text-amber-500"
                                : "text-white hover:text-amber-400"
                            }`}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.35-4.35" />
                        </svg>
                    </button>

                    {/* Cart */}
                    <button
                        onClick={openCart}
                        aria-label="Open cart"
                        className={`relative transition-colors ${solid
                                ? "text-gray-700 hover:text-amber-500"
                                : "text-white hover:text-amber-400"
                            }`}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                            <path d="M3 6h18M16 10a4 4 0 0 1-8 0" />
                        </svg>

                        {/* Only render after mount — prevents hydration mismatch */}
                        {mounted && itemCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                {itemCount > 99 ? "99+" : itemCount}
                            </span>
                        )}
                    </button>

                    {/* Logout — only when signed in */}
                    {mounted && isAuthenticated && (
                        <button
                            onClick={handleLogout}
                            aria-label="Log out"
                            title={user?.fullName ? `Log out (${user.fullName})` : "Log out"}
                            className={`transition-colors ${solid
                                    ? "text-gray-700 hover:text-amber-500"
                                    : "text-white hover:text-amber-400"
                                }`}
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                <polyline points="16 17 21 12 16 7" />
                                <line x1="21" y1="12" x2="9" y2="12" />
                            </svg>
                        </button>
                    )}

                    {/* Sign In — only when signed out */}
                    {mounted && !isAuthenticated && (
                        <Link
                            href="/login"
                            className={`text-sm font-semibold tracking-wide transition-colors ${solid
                                    ? "text-gray-700 hover:text-amber-500"
                                    : "text-white/90 hover:text-amber-400"
                                }`}
                        >
                            Sign In
                        </Link>
                    )}

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className={`md:hidden ${solid ? "text-gray-900" : "text-white"}`}
                        aria-label="Menu"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            {mobileOpen ? (
                                <path d="M18 6 6 18M6 6l12 12" />
                            ) : (
                                <path d="M3 12h18M3 6h18M3 18h18" />
                            )}
                        </svg>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-500 ${mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <ul className="bg-white/95 backdrop-blur-xl px-6 py-6 space-y-4 shadow-xl">
                    {links.map((link) => (
                        <li key={link.name}>
                            <Link
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className="block text-gray-800 font-medium hover:text-amber-500 transition-colors"
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}

                    {/* Auth — mobile */}
                    {mounted && isAuthenticated ? (
                        <li className="pt-2 border-t border-gray-100">
                            <button
                                onClick={() => {
                                    setMobileOpen(false);
                                    handleLogout();
                                }}
                                className="flex items-center gap-3 text-red-600 font-medium hover:text-red-700 transition-colors"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                    <polyline points="16 17 21 12 16 7" />
                                    <line x1="21" y1="12" x2="9" y2="12" />
                                </svg>
                                Log out
                            </button>
                        </li>
                    ) : (
                        mounted && (
                            <li className="pt-2 border-t border-gray-100">
                                <Link
                                    href="/login"
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center gap-3 text-amber-600 font-medium hover:text-amber-700 transition-colors"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                                        <polyline points="10 17 15 12 10 7" />
                                        <line x1="15" y1="12" x2="3" y2="12" />
                                    </svg>
                                    Sign In
                                </Link>
                            </li>
                        )
                    )}
                </ul>
            </div>
        </header>
    );
}