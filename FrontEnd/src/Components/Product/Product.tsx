import React from 'react';

//Types
type Props = {
    product: CarItemType;
    handleAddToCar: (clickedproduct: CarItemType) => void
}

export const Product: React.FC<Props> = ({ product, handleAddToCar }) => {
    return (
        <div className="flex flex-col h-[380px] border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 bg-white overflow-hidden">
            <div className="h-48 p-4 flex items-center justify-center bg-white">
                <img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full object-contain"
                />
            </div>

            <div className="flex-1 px-4 py-2 flex flex-col justify-between">
                <div className="mb-2">
                    <h3 className="text-sm font-medium text-gray-800 line-clamp-2" title={product.title}>
                        {product.title}
                    </h3>
                    <p className="font-bold text-lg text-gray-900 mt-1">${product.price}</p>
                </div>

                <button
                    className="w-full mt-auto bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200"
                    onClick={() => handleAddToCar(product)}
                >
                    Add To Cart
                </button>
            </div>
        </div>
    )
}