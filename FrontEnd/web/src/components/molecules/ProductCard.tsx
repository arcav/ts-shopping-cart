import * as React from "react";
import Image from "next/image";
import { Product } from "@/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/atoms/Card";
import { Button } from "@/components/atoms/Button";
import { Typography } from "@/components/atoms/Typography";
import { PriceTag } from "@/components/atoms/PriceTag";

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
    return (
        <Card className="flex flex-col h-full overflow-hidden transition-all hover:shadow-lg">
            <div className="relative aspect-square w-full overflow-hidden bg-gray-100 p-4">
                <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain transition-transform hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
            <CardHeader className="p-4 pb-0">
                <Typography variant="muted" className="text-xs uppercase tracking-wider">
                    {product.category}
                </Typography>
                <Typography variant="h4" as="h3" className="line-clamp-2 text-base h-12 leading-tight mt-1" title={product.title}>
                    {product.title}
                </Typography>
            </CardHeader>
            <CardContent className="flex-grow p-4 pt-2">
                {/* Placeholder for rating or other details */}
                {product.brand && (
                    <Typography variant="small" className="text-gray-500">
                        {product.brand}
                    </Typography>
                )}
            </CardContent>
            <CardFooter className="p-4 pt-0 flex items-center justify-between mt-auto">
                <PriceTag price={product.price} />
                <Button onClick={() => onAddToCart(product)} size="sm">
                    Add to Cart
                </Button>
            </CardFooter>
        </Card>
    );
}
