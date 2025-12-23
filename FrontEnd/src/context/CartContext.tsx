import React, { createContext, useContext, useState, ReactNode } from 'react';

type CartContextType = {
    cartProducts: CarItemType[];
    handleAddToCar: (product: CarItemType) => void;
    handleRemoveFromCart: (id: string) => void;
    calculateTotal: (products: CarItemType[]) => number;
    clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cartProducts, setCartProducts] = useState<CarItemType[]>([]);

    const handleAddToCar = (clickproduct: CarItemType) => {
        console.log('🛒 Adding to cart:', clickproduct.id, clickproduct.title);
        setCartProducts(prev => {
            const isProductInCart = prev.find(product => product.id === clickproduct.id);
            console.log('📦 Current cart:', prev.map(p => ({ id: p.id, amount: p.amount })));
            console.log('🔍 Product in cart?', isProductInCart ? 'YES' : 'NO');
            
            if (isProductInCart) {
                const updated = prev.map(product =>
                    product.id === clickproduct.id
                        ? { ...product, amount: product.amount + 1 }
                        : product
                );
                console.log('✅ Updated cart:', updated.map(p => ({ id: p.id, amount: p.amount })));
                return updated;
            }
            const newCart = [...prev, { ...clickproduct, amount: 1 }];
            console.log('✅ New cart:', newCart.map(p => ({ id: p.id, amount: p.amount })));
            return newCart;
        });
    };

    const handleRemoveFromCart = (id: string) => {
        setCartProducts(prev =>
            prev.reduce((ack, product) => {
                if (product.id === id) {
                    if (product.amount === 1) return ack;
                    return [...ack, { ...product, amount: product.amount - 1 }];
                } else {
                    return [...ack, product];
                }
            }, [] as CarItemType[])
        );
    };

    const calculateTotal = (products: CarItemType[]) =>
        products.reduce((ack: number, product) => ack + product.amount * product.price, 0);

    const clearCart = () => {
        setCartProducts([]);
    };

    return (
        <CartContext.Provider
            value={{
                cartProducts,
                handleAddToCar,
                handleRemoveFromCart,
                calculateTotal,
                clearCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCartContext = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCartContext must be used within a CartProvider');
    }
    return context;
};
