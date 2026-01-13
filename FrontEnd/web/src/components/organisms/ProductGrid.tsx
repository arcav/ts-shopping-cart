"use client";

import * as React from "react";
import { Product } from "@/types";
import { ProductCard } from "@/components/molecules/ProductCard";
import { useCart } from "@/context/CartContext";

interface ProductGridProps {
    products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
    const { addToCart } = useCart();

    if (!products || products.length === 0) {
        return (
            <div className="w-full py-12 text-center text-gray-500">
                No products found.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={addToCart}
                />
            ))}
        </div>
    );
}
