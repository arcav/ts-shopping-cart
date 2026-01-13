import React from 'react'
import CartProduct from '@/components/molecules/CartProduct/CartProduct';
import { XMarkIcon, TrashIcon } from '@heroicons/react/24/outline'; // Adjust import based on version, v2 is standard now

//Types
type Props = {
    cartProducts: CarItemType[];
    addToCart: (clickproduct: CarItemType) => void;
    removeFromCart: (id: string) => void
    onClose: () => void
    calculateTotal: (cartProducts: CarItemType[]) => number
    clearCart: () => void
}

const Cart: React.FC<Props> = ({ cartProducts, addToCart, removeFromCart, onClose, calculateTotal, clearCart }) => {
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
                <h2 className="text-xl font-bold text-right text-gray-900 mb-4">Total: ${calculateTotal(cartProducts).toFixed(2)}</h2>
                {cartProducts.length > 0 && (
                    <button
                        onClick={clearCart}
                        className="w-full flex items-center justify-center space-x-2 bg-red-100 text-red-600 hover:bg-red-200 font-bold py-3 px-4 rounded-lg transition-colors"
                    >
                        <TrashIcon className="h-5 w-5" />
                        <span>Clear Cart</span>
                    </button>
                )}
            </div>
        </div>
    )
}
export default Cart