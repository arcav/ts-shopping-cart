"use client";

import * as React from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/atoms/Button";
import { Typography } from "@/components/atoms/Typography";

export function Header() {
    const { setIsCartOpen, totalItems } = useCart();

    return (
        <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-2xl">🛍️</span>
                    <Typography variant="h3" as="h1" className="hidden sm:inline-block">
                        Store
                    </Typography>
                </Link>
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        className="relative"
                        onClick={() => setIsCartOpen(true)}
                    >
                        <span className="text-xl">🛒</span>
                        {totalItems > 0 && (
                            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                                {totalItems}
                            </span>
                        )}
                        <span className="sr-only">Open cart</span>
                    </Button>
                </div>
            </div>
        </header>
    );
}
