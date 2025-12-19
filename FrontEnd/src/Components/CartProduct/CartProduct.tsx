import React from 'react'

//Types
type Props = {
    product: CarItemType;
    addToCart: (clickproduct: CarItemType) => void
    removeFromCart: (id: number) => void
}

const CartProduct: React.FC<Props> = ({ product, addToCart, removeFromCart }) => {
    return (
        <div className="border border-gray-200 rounded-xl mb-4 p-4 shadow-sm bg-white">
            <h3 className="text-xl font-medium text-center mb-2">{product.title}</h3>
            <div className="flex justify-between items-center text-gray-600 mb-2 px-4">
                <p>Price: ${product.price}</p>
                <p>Total: ${(product.amount * product.price).toFixed(2)}</p>
            </div>

            <div className="flex justify-between items-center bg-gray-50 rounded-lg p-2 mb-4 max-w-xs mx-auto">
                <button
                    className="w-8 h-8 flex items-center justify-center bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
                    onClick={() => removeFromCart(product.id)}>
                    -
                </button>
                <p className="font-bold text-lg">{product.amount}</p>
                <button
                    className="w-8 h-8 flex items-center justify-center bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition-colors"
                    onClick={() => addToCart(product)}>
                    +
                </button>
            </div>

            <div className="flex justify-center items-center min-h-[25vh] mb-5">
                <img
                    className="max-w-[120px] object-contain"
                    src={product.image}
                    alt={product.title}
                />
            </div>
        </div>
    )
}
export default CartProduct