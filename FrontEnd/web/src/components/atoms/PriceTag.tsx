import * as React from "react";
import { cn } from "@/lib/utils";

interface PriceTagProps {
    price: number;
    currency?: string;
    className?: string;
}

export function PriceTag({ price, currency = "USD", className }: PriceTagProps) {
    const formattedPrice = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
    }).format(price);

    return (
        <span className={cn("text-lg font-bold text-gray-900", className)}>
            {formattedPrice}
        </span>
    );
}
