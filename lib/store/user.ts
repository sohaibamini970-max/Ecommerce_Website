import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface RegisteredUser {
  id: string;
  fullName: string;
  email: string;
  role: "customer" | "admin";
  joinedAt: string;      // ISO
  lastLoginAt?: string;  // ISO (optional)
}

interface UsersStore {
  users: RegisteredUser[];
  addUser: (u: Omit<RegisteredUser, "joinedAt">) => void;
  removeUser: (id: string) => void;
  markLogin: (id: string) => void;
  clearUsers: () => void;
}

export const useUsers = create<UsersStore>()(
  persist(
    (set, get) => ({
      users: [
        // Optional demo user so the page isn't empty on first load
        {
          id: "U-DEMO001",
          fullName: "Jane Doe",
          email: "jane@example.com",
          role: "customer",
          joinedAt: new Date(
            Date.now() - 1000 * 60 * 60 * 24 * 14
          ).toISOString(),
          lastLoginAt: new Date(
            Date.now() - 1000 * 60 * 60 * 4
          ).toISOString(),
        },
      ],

      addUser: (data) => {
        // Prevent duplicates by email
        const exists = get().users.some(
          (u) => u.email.toLowerCase() === data.email.toLowerCase()
        );
        if (exists) return;

        const user: RegisteredUser = {
          ...data,
          joinedAt: new Date().toISOString(),
        };
        set({ users: [user, ...get().users] });
      },

      removeUser: (id) =>
        set({ users: get().users.filter((u) => u.id !== id) }),

      markLogin: (id) =>
        set({
          users: get().users.map((u) =>
            u.id === id
              ? { ...u, lastLoginAt: new Date().toISOString() }
              : u
          ),
        }),

      clearUsers: () => set({ users: [] }),
    }),
    { name: "luxe-users" }
  )
);