interface StatCardProps {
    label: string;
    value: string | number;
    change?: string;
    trend?: "up" | "down" | "flat";
    icon: string;
    accent: "amber" | "blue" | "emerald" | "rose" | "violet";
}

const accents = {
    amber: "from-amber-500 to-orange-600 bg-amber-50 border-amber-100 text-amber-700",
    blue: "from-blue-500 to-indigo-600 bg-blue-50 border-blue-100 text-blue-700",
    emerald: "from-emerald-500 to-teal-600 bg-emerald-50 border-emerald-100 text-emerald-700",
    rose: "from-rose-500 to-pink-600 bg-rose-50 border-rose-100 text-rose-700",
    violet: "from-violet-500 to-purple-600 bg-violet-50 border-violet-100 text-violet-700",
};

export default function StatCard({
    label,
    value,
    change,
    trend = "up",
    icon,
    accent,
}: StatCardProps) {
    const [gradient, bg, border, text] = accents[accent].split(" ");
    const trendIcon =
        trend === "up" ? "↑" : trend === "down" ? "↓" : "→";
    const trendColor =
        trend === "up"
            ? "text-emerald-600"
            : trend === "down"
                ? "text-rose-600"
                : "text-gray-500";

    return (
        <div
            className={`relative bg-white rounded-3xl border ${border} p-6 overflow-hidden hover:shadow-xl transition-all`}
        >
            <div className={`absolute -top-12 -right-12 w-32 h-32 ${bg} rounded-full blur-2xl opacity-60`} />
            <div className="relative flex items-start justify-between">
                <div>
                    <div className={`text-[10px] tracking-[0.25em] uppercase font-semibold mb-2 ${text}`}>
                        {label}
                    </div>
                    <div className="font-display text-3xl font-bold text-gray-900">
                        {value}
                    </div>
                    {change && (
                        <div className={`text-xs mt-2 font-medium ${trendColor}`}>
                            {trendIcon} {change}
                        </div>
                    )}
                </div>
                <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-2xl shadow-lg`}
                >
                    {icon}
                </div>
            </div>
        </div>
    );
}