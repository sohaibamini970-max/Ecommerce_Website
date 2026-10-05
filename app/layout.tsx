import type { Metadata } from "next";
import "./globals.css";
import CartDrawer from "./components/CartDrawer";

export const metadata: Metadata = {
  title: "LUXE — Premium Fashion Store",
  description: "Discover curated premium fashion and lifestyle products.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <CartDrawer />
      </body>
    </html>
  );
}