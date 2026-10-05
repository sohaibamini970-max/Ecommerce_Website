import type { OrderStatus } from "@/lib/store/orders";
import { statusLabels } from "@/lib/store/orders";

const styles: Record<OrderStatus, string> = {
    pending: "bg-gray-100 text-gray-700 border-gray-200",
    confirmed: "bg-blue-50 text-blue-700 border-blue-200",
    processing: "bg-amber-50 text-amber-700 border-amber-200",
    shipped: "bg-indigo-50 text-indigo-700 border-indigo-200",
    "out-for-delivery": "bg-purple-50 text-purple-700 border-purple-200",
    delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
    cancelled: "bg-rose-50 text-rose-700 border-rose-200",
};

const dots: Record<OrderStatus, string> = {
    pending: "bg-gray-400",
    confirmed: "bg-blue-500",
    processing: "bg-amber-500",
    shipped: "bg-indigo-500",
    "out-for-delivery": "bg-purple-500",
    delivered: "bg-emerald-500",
    cancelled: "bg-rose-500",
};

export default function OrderStatusBadge({ status }: { status: OrderStatus }) {
    return (
        <span
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${styles[status]}`}
        >
            <span
                className={`w-1.5 h-1.5 rounded-full ${dots[status]} ${status !== "delivered" && status !== "cancelled" ? "animate-pulse" : ""
                    }`}
            />
            {statusLabels[status]}
        </span>
    );
}