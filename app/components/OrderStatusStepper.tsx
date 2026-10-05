import type { OrderStatus } from "@/lib/store/orders";
import { statusFlow, statusLabels } from "@/lib/store/orders";

export default function OrderStatusStepper({ status }: { status: OrderStatus }) {
    // If cancelled, just show a cancel notice
    if (status === "cancelled") {
        return (
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 flex items-center gap-3">
                <span className="text-2xl">❌</span>
                <div>
                    <p className="font-semibold text-rose-900">Order Cancelled</p>
                    <p className="text-sm text-rose-700">
                        This order was cancelled. Contact support if this was a mistake.
                    </p>
                </div>
            </div>
        );
    }

    const currentIdx = statusFlow.indexOf(status);

    return (
        <div className="w-full">
            {/* Progress bar */}
            <div className="relative flex items-center justify-between">
                {/* Background line */}
                <div className="absolute left-0 right-0 top-[13px] h-[2px] bg-gray-200" />
                {/* Filled line */}
                <div
                    className="absolute left-0 top-[13px] h-[2px] bg-amber-500 transition-all duration-700"
                    style={{
                        width: `${(Math.max(0, currentIdx) / (statusFlow.length - 1)) * 100}%`,
                    }}
                />

                {statusFlow.map((step, i) => {
                    const done = i <= currentIdx;
                    const active = i === currentIdx;
                    return (
                        <div
                            key={step}
                            className="relative z-10 flex flex-col items-center gap-3 flex-1"
                        >
                            <div
                                className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${done
                                        ? "bg-amber-500 text-white"
                                        : "bg-white border-2 border-gray-200 text-gray-300"
                                    } ${active ? "ring-4 ring-amber-100 scale-110" : ""}`}
                            >
                                {done ? (
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M20 6 9 17l-5-5" />
                                    </svg>
                                ) : (
                                    <span className="w-2 h-2 rounded-full bg-gray-300" />
                                )}
                            </div>
                            <span
                                className={`text-[10px] md:text-xs font-medium text-center tracking-wide uppercase ${done ? "text-gray-900" : "text-gray-400"
                                    }`}
                            >
                                {statusLabels[step]}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}