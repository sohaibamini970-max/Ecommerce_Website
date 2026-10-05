"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/store/auth";

export default function AdminTopbar() {
    const router = useRouter();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        router.push("/");
    };

    const initials =
        user?.fullName
            ?.split(" ")
            .map((n) => n[0])
            .slice(0, 2)
            .join("")
            .toUpperCase() ?? "A";

    return (
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-200">
            <div className="h-16 px-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <h1 className="font-display text-xl font-bold text-gray-900">
                        Admin Panel
                    </h1>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden md:block text-right">
                        <div className="text-sm font-semibold text-gray-900">
                            {user?.fullName ?? "Admin"}
                        </div>
                        <div className="text-xs text-gray-500">
                            {user?.email ?? "admin@luxe.com"}
                        </div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-black font-bold text-sm">
                        {initials}
                    </div>
                    <button
                        onClick={handleLogout}
                        aria-label="Log out"
                        className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:text-red-500 hover:border-red-200 transition"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
}