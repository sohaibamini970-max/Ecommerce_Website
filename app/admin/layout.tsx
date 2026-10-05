"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/store/auth";
import AdminSidebar from "@/app/components/admin/AdminSidebar";
import AdminTopbar from "@/app/components/admin/AdminTopbar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const { isAuthenticated, isAdmin } = useAuth();

    useEffect(() => {
        if (!isAuthenticated || !isAdmin) {
            router.replace(`/login?next=${encodeURIComponent(pathname)}`);
        }
    }, [isAuthenticated, isAdmin, pathname, router]);

    if (!isAuthenticated || !isAdmin) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full border-2 border-amber-500 border-t-transparent animate-spin" />
                    <p className="text-white/60 text-sm">Verifying admin access...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <AdminSidebar currentPath={pathname} />
            <div className="flex-1 flex flex-col min-w-0">
                <AdminTopbar />
                <main className="flex-1 p-6 lg:p-8 overflow-x-hidden">{children}</main>
            </div>
        </div>
    );
}