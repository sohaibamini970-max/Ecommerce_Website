import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AdminCollection {
  id: string;
  name: string;
  tagline: string;
  pieces: number;
  featured: boolean;
  image: string;
}

const seed: AdminCollection[] = [
  {
    id: "autumn-essentials",
    name: "Autumn Essentials",
    tagline: "Warm, layered, timeless",
    pieces: 18,
    featured: true,
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "minimalist-wardrobe",
    name: "Minimalist Wardrobe",
    tagline: "Fewer, better things",
    pieces: 12,
    featured: true,
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "evening-edit",
    name: "The Evening Edit",
    tagline: "For nights worth remembering",
    pieces: 9,
    featured: false,
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80",
  },
];

interface CollectionsStore {
  collections: AdminCollection[];
  addCollection: (c: Omit<AdminCollection, "id">) => void;
  updateCollection: (id: string, patch: Partial<AdminCollection>) => void;
  deleteCollection: (id: string) => void;
  toggleFeatured: (id: string) => void;
}

export const useCollectionsAdmin = create<CollectionsStore>()(
  persist(
    (set, get) => ({
      collections: seed,

      addCollection: (data) =>
        set({
          collections: [
            ...get().collections,
            {
              ...data,
              id: data.name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-"),
            },
          ],
        }),

      updateCollection: (id, patch) =>
        set({
          collections: get().collections.map((c) =>
            c.id === id ? { ...c, ...patch } : c
          ),
        }),

      deleteCollection: (id) =>
        set({
          collections: get().collections.filter((c) => c.id !== id),
        }),

      toggleFeatured: (id) =>
        set({
          collections: get().collections.map((c) =>
            c.id === id ? { ...c, featured: !c.featured } : c
          ),
        }),
    }),
    { name: "luxe-admin-collections" }
  )
);