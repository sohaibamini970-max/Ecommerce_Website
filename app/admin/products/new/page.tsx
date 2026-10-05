import Link from "next/link";
import ProductForm from "@/app/components/admin/ProductForm";

export default function NewProductPage() {
    return (
        <div className="space-y-6">
            <div>
                <Link
                    href="/admin/products"
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-4 transition"
                >
                    ← Back to Products
                </Link>
                <h1 className="font-display text-3xl font-bold text-gray-900 mb-2">
                    Add Product
                </h1>
                <p className="text-gray-500 text-sm">
                    Create a new product in your store.
                </p>
            </div>
            <ProductForm />
        </div>
    );
}