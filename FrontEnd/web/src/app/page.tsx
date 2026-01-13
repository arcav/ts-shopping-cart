import { ProductGrid } from "@/components/organisms/ProductGrid";
import { products } from "@/lib/data";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
          Atomic Design Shop
        </h1>
        <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
          A modern, performant shopping experience built with Next.js App Router, Tailwind CSS, and Atomic Design principles.
        </p>
      </div>

      <ProductGrid products={products} />
    </div>
  );
}
