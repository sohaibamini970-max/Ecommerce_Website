"use client";

import { useMemo, useState } from "react";
import { useUsers } from "@/lib/store/users";
import type { RegisteredUser } from "@/lib/store/users";

type FilterKey = "all" | "customer" | "admin" | "recent";

const avatarGradients = [
    "from-amber-400 to-orange-500",
    "from-rose-400 to-pink-500",
    "from-emerald-400 to-teal-500",
    "from-violet-400 to-indigo-500",
    "from-sky-400 to-blue-500",
    "from-fuchsia-400 to-purple-500",
];

function initials(name: string) {
    return name
        .split(" ")
        .map((p) => p[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();
}

function gradientFor(id: string) {
    let hash = 0;
    for (let i = 0; i < id.length; i++) hash = (hash + id.charCodeAt(i)) % 997;
    return avatarGradients[hash % avatarGradients.length];
}

function timeAgo(iso?: string) {
    if (!iso) return "Never";
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    if (days < 30) return `${days}d ago`;
    return new Date(iso).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

const pillThemes: Record<
    FilterKey,
    { active: string; idle: string; dot: string; badge: string }
> = {
    all: {
        active: "bg-gray-900 text-white border-gray-900 shadow-lg shadow-gray-900/20",
        idle: "bg-white border-gray-200 text-gray-700 hover:border-gray-900",
        dot: "bg-gray-500",
        badge: "bg-gray-100 text-gray-700",
    },
    customer: {
        active: "bg-amber-500 text-black border-amber-500 shadow-lg shadow-amber-500/30",
        idle: "bg-amber-50 border-amber-200 text-amber-800 hover:border-amber-400",
        dot: "bg-amber-500",
        badge: "bg-amber-100 text-amber-800",
    },
    admin: {
        active: "bg-violet-500 text-white border-violet-500 shadow-lg shadow-violet-500/30",
        idle: "bg-violet-50 border-violet-200 text-violet-800 hover:border-violet-400",
        dot: "bg-violet-500",
        badge: "bg-violet-100 text-violet-800",
    },
    recent: {
        active: "bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-500/30",
        idle: "bg-emerald-50 border-emerald-200 text-emerald-800 hover:border-emerald-400",
        dot: "bg-emerald-500",
        badge: "bg-emerald-100 text-emerald-800",
    },
};

export default function AdminUsersPage() {
    const { users, removeUser } = useUsers();
    const [filter, setFilter] = useState<FilterKey>("all");
    const [search, setSearch] = useState("");
    const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

    const filtered = useMemo(() => {
        let list = [...users];

        if (filter === "customer")
            list = list.filter((u) => u.role === "customer");
        else if (filter === "admin")
            list = list.filter((u) => u.role === "admin");
        else if (filter === "recent") {
            const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
            list = list.filter(
                (u) => new Date(u.joinedAt).getTime() >= weekAgo
            );
        }

        if (search.trim()) {
            const q = search.toLowerCase();
            list = list.filter(
                (u) =>
                    u.fullName.toLowerCase().includes(q) ||
                    u.email.toLowerCase().includes(q)
            );
        }

        return list;
    }, [users, filter, search]);

    const counts = {
        all: users.length,
        customer: users.filter((u) => u.role === "customer").length,
        admin: users.filter((u) => u.role === "admin").length,
        recent: users.filter(
            (u) =>
                new Date(u.joinedAt).getTime() >=
                Date.now() - 7 * 24 * 60 * 60 * 1000
        ).length,
    };

    const filters: { key: FilterKey; label: string; count: number }[] = [
        { key: "all", label: "All Users", count: counts.all },
        { key: "customer", label: "Customers", count: counts.customer },
        { key: "admin", label: "Admins", count: counts.admin },
        { key: "recent", label: "New This Week", count: counts.recent },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <span className="w-10 h-[2px] bg-amber-500" />
                        <span className="text-amber-600 text-xs font-semibold tracking-[0.3em] uppercase">
                            Community
                        </span>
                    </div>
                    <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                        Users
                    </h1>
                    <p className="text-gray-500 text-base">
                        Everyone who has registered on your store.
                    </p>
                </div>

                {/* Total chip */}
                <div className="self-start bg-gradient-to-br from-violet-500 to-indigo-600 rounded-2xl px-6 py-4 text-white shadow-xl shadow-violet-500/20">
                    <div className="text-[10px] tracking-[0.3em] uppercase font-semibold opacity-80 mb-1">
                        Total Members
                    </div>
                    <div className="font-display text-2xl font-bold">
                        {users.length}
                    </div>
                </div>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard label="Total" value={counts.all} accent="gray" icon="👥" />
                <StatCard
                    label="Customers"
                    value={counts.customer}
                    accent="amber"
                    icon="🛍️"
                />
                <StatCard
                    label="Admins"
                    value={counts.admin}
                    accent="violet"
                    icon="🛡️"
                />
                <StatCard
                    label="New This Week"
                    value={counts.recent}
                    accent="emerald"
                    icon="✨"
                />
            </div>

            {/* Filter pills */}
            <div>
                <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-bold tracking-widest uppercase text-gray-500">
                        Filter
                    </span>
                    <span className="flex-1 h-[1px] bg-gray-200" />
                </div>

                <div className="flex flex-wrap gap-2.5">
                    {filters.map((f) => {
                        const theme = pillThemes[f.key];
                        const isActive = filter === f.key;
                        return (
                            <button
                                key={f.key}
                                onClick={() => setFilter(f.key)}
                                className={`inline-flex items-center gap-2.5 px-5 py-3 rounded-full text-base font-semibold border-2 transition-all ${isActive ? theme.active : theme.idle
                                    }`}
                            >
                                <span
                                    className={`w-2 h-2 rounded-full ${isActive ? "bg-white/80" : theme.dot
                                        }`}
                                />
                                {f.label}
                                <span
                                    className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${isActive ? "bg-white/20 text-white" : theme.badge
                                        }`}
                                >
                                    {f.count}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Search */}
            <div className="relative max-w-xl">
                <svg
                    className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by name or email..."
                    className="w-full pl-14 pr-5 py-4 rounded-2xl bg-white border border-gray-200 text-base focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition"
                />
                {search && (
                    <button
                        onClick={() => setSearch("")}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition"
                        aria-label="Clear search"
                    >
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            viewBox="0 0 24 24"
                        >
                            <path d="M18 6 6 18M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>

            {/* Users list */}
            {filtered.length === 0 ? (
                <div className="bg-white rounded-3xl border border-gray-100 p-16 text-center shadow-sm">
                    <div className="text-6xl mb-5">👥</div>
                    <h3 className="font-display text-2xl font-bold text-gray-900 mb-2">
                        No users found
                    </h3>
                    <p className="text-gray-500">
                        {search
                            ? "Try a different search."
                            : "Registered users will appear here."}
                    </p>
                </div>
            ) : (
                <div className="space-y-3">
                    {filtered.map((user) => (
                        <UserRow
                            key={user.id}
                            user={user}
                            onDelete={() => setConfirmDelete(user.id)}
                        />
                    ))}
                </div>
            )}

            {/* Delete confirm */}
            {confirmDelete && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[80] flex items-center justify-center px-6">
                    <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl">
                        <div className="text-4xl mb-4">⚠️</div>
                        <h3 className="font-display text-xl font-bold text-gray-900 mb-2">
                            Remove user?
                        </h3>
                        <p className="text-gray-500 text-sm mb-6">
                            This removes them from the directory. Their orders remain intact.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setConfirmDelete(null)}
                                className="flex-1 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-full hover:border-gray-900 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    removeUser(confirmDelete);
                                    setConfirmDelete(null);
                                }}
                                className="flex-1 py-3 bg-rose-500 text-white font-semibold rounded-full hover:bg-rose-600 transition"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

/* ─────────── Sub-components ─────────── */

function UserRow({
    user,
    onDelete,
}: {
    user: RegisteredUser;
    onDelete: () => void;
}) {
    const gradient = gradientFor(user.id);

    return (
        <div className="relative bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-0.5 transition-all group">
            <div
                className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${user.role === "admin"
                        ? "from-violet-400 to-indigo-600"
                        : "from-amber-400 to-orange-500"
                    }`}
            />

            <div className="relative p-5 md:p-6 pl-7 md:pl-8 flex flex-col md:flex-row md:items-center gap-5">
                {/* Avatar + name */}
                <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-lg shadow-lg flex-shrink-0`}
                    >
                        {initials(user.fullName)}
                    </div>

                    <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="font-display text-lg font-bold text-gray-900 truncate">
                                {user.fullName}
                            </h3>
                            {user.role === "admin" && (
                                <span className="inline-block px-2.5 py-0.5 bg-violet-100 text-violet-800 text-[10px] font-bold tracking-widest uppercase rounded-full">
                                    Admin
                                </span>
                            )}
                        </div>
                        <div className="text-sm text-gray-500 truncate">
                            {user.email}
                        </div>
                        <div className="text-xs text-gray-400 font-mono mt-0.5">
                            {user.id}
                        </div>
                    </div>
                </div>

                {/* Joined + last login */}
                <div className="flex md:flex-col gap-6 md:gap-1 md:w-48">
                    <div>
                        <div className="text-[10px] tracking-widest uppercase font-bold text-gray-500 mb-0.5">
                            Joined
                        </div>
                        <div className="text-sm font-semibold text-gray-900">
                            {new Date(user.joinedAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                            })}
                        </div>
                    </div>
                    <div>
                        <div className="text-[10px] tracking-widest uppercase font-bold text-gray-500 mb-0.5">
                            Last Login
                        </div>
                        <div className="text-sm font-semibold text-gray-700">
                            {timeAgo(user.lastLoginAt)}
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 md:flex-shrink-0">
                    <a
                        href={`mailto:${user.email}`}
                        className="w-10 h-10 rounded-full hover:bg-blue-50 flex items-center justify-center text-gray-500 hover:text-blue-600 transition"
                        title="Send email"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                            <polyline points="22,6 12,13 2,6" />
                        </svg>
                    </a>
                    <button
                        onClick={onDelete}
                        className="w-10 h-10 rounded-full hover:bg-rose-50 flex items-center justify-center text-gray-500 hover:text-rose-500 transition"
                        title="Remove user"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

function StatCard({
    label,
    value,
    accent,
    icon,
}: {
    label: string;
    value: number;
    accent: "gray" | "amber" | "emerald" | "violet";
    icon: string;
}) {
    const themes = {
        gray: {
            bg: "from-gray-50 to-white",
            border: "border-gray-200",
            label: "text-gray-600",
            icon: "from-gray-400 to-gray-600",
            glow: "bg-gray-500/10",
        },
        amber: {
            bg: "from-amber-50 to-white",
            border: "border-amber-200",
            label: "text-amber-700",
            icon: "from-amber-400 to-orange-500",
            glow: "bg-amber-500/10",
        },
        emerald: {
            bg: "from-emerald-50 to-white",
            border: "border-emerald-200",
            label: "text-emerald-700",
            icon: "from-emerald-400 to-teal-500",
            glow: "bg-emerald-500/10",
        },
        violet: {
            bg: "from-violet-50 to-white",
            border: "border-violet-200",
            label: "text-violet-700",
            icon: "from-violet-400 to-indigo-500",
            glow: "bg-violet-500/10",
        },
    }[accent];

    return (
        <div
            className={`relative bg-gradient-to-br ${themes.bg} rounded-2xl border ${themes.border} p-5 overflow-hidden hover:shadow-lg transition-all`}
        >
            <div
                className={`absolute -top-10 -right-10 w-32 h-32 ${themes.glow} rounded-full blur-2xl pointer-events-none`}
            />
            <div className="relative flex items-start justify-between">
                <div>
                    <div
                        className={`text-[10px] tracking-[0.25em] uppercase font-bold mb-2 ${themes.label}`}
                    >
                        {label}
                    </div>
                    <div className="font-display text-3xl font-bold text-gray-900">
                        {value}
                    </div>
                </div>
                <div
                    className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${themes.icon} flex items-center justify-center text-lg shadow-md`}
                >
                    {icon}
                </div>
            </div>
        </div>
    );
}