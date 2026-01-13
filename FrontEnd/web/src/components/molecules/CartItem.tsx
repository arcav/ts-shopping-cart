import * as React from "react";
import Image from "next/image";
import { CartItem as CartItemType } from "@/types";
import { Button } from "@/components/atoms/Button";
import { Typography } from "@/components/atoms/Typography";
import { PriceTag } from "@/components/atoms/PriceTag";
import { Card } from "@/components/atoms/Card";

interface CartItemProps {
    item: CartItemType;
    onUpdateQuantity: (id: string | number, quantity: number) => void;
    onRemove: (id: string | number) => void;
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
    return (
        <Card className="flex flex-col sm:flex-row items-center p-4 gap-4">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md border border-gray-200 bg-white p-2">
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain"
                />
            </div>
            <div className="flex flex-1 flex-col gap-1 w-full text-center sm:text-left">
                <Typography variant="h4" as="h4" className="text-base line-clamp-2">
                    {item.title}
                </Typography>
                <Typography variant="muted" className="text-xs capitalize">
                    {item.category}
                </Typography>
                <PriceTag price={item.price} className="text-sm" />
            </div>
            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    disabled={item.quantity <= 1}
                >
                    -
                </Button>
                <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                >
                    +
                </Button>
            </div>
            <Button
                variant="ghost"
                size="sm"
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                onClick={() => onRemove(item.id)}
            >
                Remove
            </Button>
        </Card>
    );
}
