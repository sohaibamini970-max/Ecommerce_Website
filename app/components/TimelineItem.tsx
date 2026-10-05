interface TimelineItemProps {
    year: string;
    title: string;
    description: string;
    index: number;
}

export default function TimelineItem({
    year,
    title,
    description,
    index,
}: TimelineItemProps) {
    const isEven = index % 2 === 0;

    return (
        <div
            className={`relative flex flex-col md:flex-row gap-6 md:gap-12 items-start ${isEven ? "md:flex-row" : "md:flex-row-reverse"
                }`}
        >
            <div
                className={`flex-1 pl-20 md:pl-0 ${isEven ? "md:text-right md:pr-12" : "md:text-left md:pl-12"
                    }`}
            >
                <div className="inline-block px-3 py-1 bg-amber-500/10 text-amber-700 text-xs font-bold tracking-widest rounded-full mb-3">
                    {year}
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                    {title}
                </h3>
                <p className="text-gray-500 leading-relaxed max-w-md inline-block">
                    {description}
                </p>
            </div>

            <div className="absolute left-6 md:static md:left-auto -translate-x-1/2 md:translate-x-0 md:flex md:justify-center">
                <div className="relative w-4 h-4 md:w-5 md:h-5 rounded-full bg-amber-500 ring-4 ring-amber-100 md:ring-8">
                    <div className="absolute inset-0 rounded-full bg-amber-500 animate-ping opacity-40" />
                </div>
            </div>

            <div className="hidden md:block flex-1" />
        </div>
    );
}