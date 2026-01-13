"use client";

import * as React from "react";
import { useCart } from "@/context/CartContext";
import { CartItem } from "@/components/molecules/CartItem";
import { Button } from "@/components/atoms/Button";
import { Typography } from "@/components/atoms/Typography";
import { PriceTag } from "@/components/atoms/PriceTag";
import { cn } from "@/lib/utils";

export function CartSidebar() {
    const {
        items,
        isCartOpen,
        setIsCartOpen,
        removeFromCart,
        updateQuantity,
        totalPrice,
        clearCart,
    } = useCart();

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 transition-opacity"
                onClick={() => setIsCartOpen(false)}
            />

            {/* Sidebar */}
            <div className="relative z-50 flex h-full w-full max-w-md flex-col bg-white shadow-xl transition-transform animate-in slide-in-from-right duration-300">
                <div className="flex items-center justify-between border-b p-4">
                    <Typography variant="h4" as="h2">
                        Shopping Cart ({items.length})
                    </Typography>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsCartOpen(false)}
                        className="h-8 w-8 rounded-full p-0"
                    >
                        ✕
                    </Button>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                    {items.length === 0 ? (
                        <div className="flex h-full flex-col items-center justify-center space-y-4 text-center">
                            <span className="text-4xl">🛒</span>
                            <Typography variant="muted">Your cart is empty</Typography>
                            <Button onClick={() => setIsCartOpen(false)}>
                                Continue Shopping
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {items.map((item) => (
                                <CartItem
                                    key={item.id}
                                    item={item}
                                    onRemove={removeFromCart}
                                    onUpdateQuantity={updateQuantity}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {items.length > 0 && (
                    <div className="border-t bg-gray-50 p-4 space-y-4">
                        <div className="flex items-center justify-between">
                            <Typography variant="h4" as="span">
                                Total
                            </Typography>
                            <PriceTag price={totalPrice} className="text-xl" />
                        </div>
                        <div className="grid gap-2">
                            <Button size="lg" className="w-full">
                                Checkout
                            </Button>
                            <Button
                                variant="outline"
                                onClick={clearCart}
                                className="w-full text-red-500 hover:bg-red-50 hover:text-red-600"
                            >
                                Clear Cart
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
