import { create } from "zustand";
import { persist } from "zustand/middleware";
import { products as seedProducts, type Product } from "@/lib/products";

interface ProductsAdminStore {
  products: Product[];
  addProduct: (p: Omit<Product, "id">) => Product;
  updateProduct: (id: string, patch: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getById: (id: string) => Product | undefined;
}

export const useProductsAdmin = create<ProductsAdminStore>()(
  persist(
    (set, get) => ({
      products: seedProducts,

      addProduct: (data) => {
        const id = data.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
        const product: Product = { ...data, id };
        set({ products: [product, ...get().products] });
        return product;
      },

      updateProduct: (id, patch) =>
        set({
          products: get().products.map((p) =>
            p.id === id ? { ...p, ...patch } : p
          ),
        }),

      deleteProduct: (id) =>
        set({ products: get().products.filter((p) => p.id !== id) }),

      getById: (id) => get().products.find((p) => p.id === id),
    }),
    { name: "luxe-admin-products" }
  )
);