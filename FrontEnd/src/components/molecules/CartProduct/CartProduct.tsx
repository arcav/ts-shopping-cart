import React from 'react'

//Types
type Props = {
    product: CarItemType;
    addToCart: (clickproduct: CarItemType) => void
    removeFromCart: (id: string) => void
}

const CartProduct: React.FC<Props> = ({ product, addToCart, removeFromCart }) => {
    return (
        <div className="flex items-center gap-3 border-b border-gray-100 py-3 bg-white last:border-0 relative group">
            <div className="w-16 h-16 flex-shrink-0 bg-white border border-gray-100 rounded-md p-1">
                <img
                    className="w-full h-full object-contain"
                    src={product.image}
                    alt={product.title}
                />
            </div>
            
            <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-800 truncate pr-6">{product.title}</h3>
                <div className="flex items-baseline gap-1">
                    <span className="text-xs text-gray-500">x{product.amount}</span>
                    <span className="text-sm font-bold text-gray-900">${(product.amount * product.price).toFixed(2)}</span>
                </div>
            </div>

            <div className="flex items-center gap-1 bg-gray-50 rounded-lg p-0.5 border border-gray-100">
                <button
                    className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-white rounded-md transition-all text-xs"
                    onClick={() => removeFromCart(product.id)}>
                    -
                </button>
                <span className="w-4 text-center text-xs font-semibold text-gray-700">{product.amount}</span>
                <button
                    className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-green-600 hover:bg-white rounded-md transition-all text-xs"
                    onClick={() => addToCart(product)}>
                    +
                </button>
            </div>
        </div>
    )
}
export default CartProduct