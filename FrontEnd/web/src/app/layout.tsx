import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { Header } from "@/components/organisms/Header";
import { CartSidebar } from "@/components/organisms/CartSidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Atomic Shop",
  description: "Modern Atomic Design Shopping Cart",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <Header />
          <CartSidebar />
          <main className="min-h-screen bg-gray-50 pb-20">
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
