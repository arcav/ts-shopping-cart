import React from 'react'
import CartProduct from '../CartProduct/CartProduct';
import { XMarkIcon } from '@heroicons/react/24/outline'; // Adjust import based on version, v2 is standard now

//Types
type Props = {
    cartProducts: CarItemType[];
    addToCart: (clickproduct: CarItemType) => void;
    removeFromCart: (id: number) => void
    onClose: () => void
    calculateTotal: (cartProducts: CarItemType[]) => number
}

const Cart: React.FC<Props> = ({ cartProducts, addToCart, removeFromCart, onClose, calculateTotal }) => {
    return (
        <div className="w-full h-full p-4 flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Your Shopping Cart</h2>
                <button
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    onClick={() => onClose()}
                >
                    <XMarkIcon className="h-6 w-6 text-red-500" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto">
                {cartProducts.length === 0 ? <p className="text-center text-gray-500 mt-10">No Products in Cart</p> : null}
                {cartProducts.map(product => (
                    <CartProduct
                        key={product.id}
                        product={product}
                        addToCart={addToCart}
                        removeFromCart={removeFromCart}
                    />
                ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
                <h2 className="text-xl font-bold text-right text-gray-900">Total: ${calculateTotal(cartProducts).toFixed(2)}</h2>
            </div>
        </div>
    )
}
export default Cart