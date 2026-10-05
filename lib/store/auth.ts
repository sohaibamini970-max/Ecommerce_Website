import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Role = "customer" | "admin";

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: Role;
}

export const ADMIN_CREDENTIALS = {
  email: "admin@luxe.com",
  password: "admin123",
};

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (
    fullName: string,
    email: string,
    password: string
  ) => Promise<User>;
  logout: () => void;
}

export const useAuth = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isAdmin: false,

      login: async (email, password) => {
        await new Promise((r) => setTimeout(r, 900));

        if (!email || !password) {
          throw new Error("Email and password are required");
        }

        // 🔐 ADMIN LOGIN
        if (
          email.toLowerCase().trim() === ADMIN_CREDENTIALS.email &&
          password === ADMIN_CREDENTIALS.password
        ) {
          const user: User = {
            id: "ADMIN-001",
            fullName: "Admin",
            email: ADMIN_CREDENTIALS.email,
            role: "admin",
          };
          set({ user, isAuthenticated: true, isAdmin: true });
          return user; // 👈 MUST return
        }

        // 👤 CUSTOMER LOGIN
        if (password.length < 6) {
          throw new Error("Invalid email or password");
        }

        const user: User = {
          id: `U-${Date.now().toString(36).toUpperCase()}`,
          fullName:
            email
              .split("@")[0]
              .replace(/[._-]/g, " ")
              .replace(/\b\w/g, (c) => c.toUpperCase()) || "Guest User",
          email,
          role: "customer",
        };
        set({ user, isAuthenticated: true, isAdmin: false });
        return user; // 👈 MUST return
      },

      register: async (fullName, email, password) => {
        await new Promise((r) => setTimeout(r, 1100));

        if (!fullName || !email || !password) {
          throw new Error("All fields are required");
        }
        if (password.length < 6) {
          throw new Error("Password must be at least 6 characters");
        }

        const user: User = {
          id: `U-${Date.now().toString(36).toUpperCase()}`,
          fullName,
          email,
          role: "customer",
        };
        set({ user, isAuthenticated: true, isAdmin: false });
        return user;
      },

      logout: () =>
        set({ user: null, isAuthenticated: false, isAdmin: false }),
    }),
    { name: "luxe-auth" }
  )
);