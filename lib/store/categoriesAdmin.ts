import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  productCount: number;
}

const seed: Category[] = [
  { id: "1", name: "Outerwear", slug: "outerwear", description: "Coats & jackets", productCount: 1 },
  { id: "2", name: "Tops", slug: "tops", description: "Blouses & shirts", productCount: 1 },
  { id: "3", name: "Bottoms", slug: "bottoms", description: "Trousers & skirts", productCount: 1 },
  { id: "4", name: "Dresses", slug: "dresses", description: "Everyday & evening", productCount: 1 },
  { id: "5", name: "Knitwear", slug: "knitwear", description: "Sweaters & cardigans", productCount: 1 },
  { id: "6", name: "Footwear", slug: "footwear", description: "Boots & shoes", productCount: 1 },
  { id: "7", name: "Accessories", slug: "accessories", description: "Bags & eyewear", productCount: 2 },
];

interface CategoriesStore {
  categories: Category[];
  addCategory: (c: Omit<Category, "id" | "productCount">) => void;
  updateCategory: (id: string, patch: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
}

export const useCategoriesAdmin = create<CategoriesStore>()(
  persist(
    (set, get) => ({
      categories: seed,

      addCategory: (data) =>
        set({
          categories: [
            ...get().categories,
            {
              ...data,
              id: Date.now().toString(),
              productCount: 0,
            },
          ],
        }),

      updateCategory: (id, patch) =>
        set({
          categories: get().categories.map((c) =>
            c.id === id ? { ...c, ...patch } : c
          ),
        }),

      deleteCategory: (id) =>
        set({ categories: get().categories.filter((c) => c.id !== id) }),
    }),
    { name: "luxe-admin-categories" }
  )
);