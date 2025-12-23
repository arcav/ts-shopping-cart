import React from 'react'
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

//Types
type Props = {
    setCartOpen: (arg: boolean) => void,
    products: CarItemType[]
}

const CartButton = ({ setCartOpen, products }: Props) => {
    const getTotalProducts = (products: CarItemType[]) =>
        products.reduce((ack: number, product) => ack + product.amount, 0)

    const total = getTotalProducts(products);

    return (
        <button
            className="fixed z-50 bottom-5 right-5 bg-blue-900 hover:bg-blue-800 text-white rounded-full p-4 shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center group transform hover:scale-110 cursor-pointer"
            onClick={() => setCartOpen(true)}
        >
            <div className="relative">
                <ShoppingCartIcon className="h-6 w-6" />
                {total > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-blue-900">
                        {total}
                    </span>
                )}
            </div>
        </button>
    )
}
export default CartButton
