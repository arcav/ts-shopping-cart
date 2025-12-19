import React, { useEffect } from 'react'
import Cart from '../../Cart/Cart'

type Props = {
    cartOpen: boolean
    setCartOpen: (arg: boolean) => void
    products: CarItemType[]
    handleRemoveFromCart: (id: number) => void
    handleAddToCar: (clickproduct: CarItemType) => void
    calculateTotal: (cartProducts: CarItemType[]) => number
}

const CartDrawer: React.FC<Props> = ({ cartOpen, setCartOpen, products, handleRemoveFromCart, handleAddToCar, calculateTotal }: Props) => {
    // Prevent body scroll when drawer is open
    useEffect(() => {
        if (cartOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [cartOpen]);

    return (
        <div
            className={`fixed inset-0 z-50 transition-opacity duration-300 ${cartOpen ? 'visible opacity-100' : 'invisible opacity-0'
                }`}
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={() => setCartOpen(false)}
            ></div>

            {/* Drawer Panel */}
            <div
                className={`absolute right-0 top-0 h-full w-full sm:w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${cartOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="h-full flex flex-col">
                    <Cart
                        cartProducts={products}
                        addToCart={handleAddToCar}
                        removeFromCart={handleRemoveFromCart}
                        onClose={() => setCartOpen(false)}
                        calculateTotal={calculateTotal}
                    />
                </div>
            </div>
        </div>
    )
}
export default CartDrawer