interface StatCardProps {
    num: string;
    label: string;
}

export default function StatCard({ num, label }: StatCardProps) {
    return (
        <div className="text-center">
            <div className="font-display text-4xl md:text-6xl font-bold text-amber-400 mb-2">
                {num}
            </div>
            <div className="text-white/50 text-xs tracking-[0.3em] uppercase">
                {label}
            </div>
        </div>
    );
}