import React, { useState } from 'react';
import ProductModal from './ProductModal';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';

//Types
type Props = {
    product: CarItemType;
    handleAddToCar: (clickedproduct: CarItemType) => void;
    handleRemoveFromCart: (id: string) => void;
    itemQuantity: number;
}

export const Product: React.FC<Props> = ({ product, handleAddToCar, handleRemoveFromCart, itemQuantity }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Calculate discount if listPrice exist
    const hasDiscount = product.listPrice && product.listPrice > product.price;
    const discountPercent = hasDiscount 
        ? Math.round(((product.listPrice! - product.price) / product.listPrice!) * 100) 
        : 0;

    return (
        <>
            <div
                className="group flex flex-col h-[400px] bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer relative border border-gray-100/60"
                onClick={() => setIsModalOpen(true)}
            >
                {/* Badges Overlay */}
                <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
                    {/* Discount Badge - Now sleeker and removed category name badge */}
                    {hasDiscount && (
                        <span className="inline-block bg-red-600 text-white text-[11px] font-black px-3 py-1.5 rounded-lg shadow-lg shadow-red-500/30 tracking-tight transition-transform group-hover:scale-110">
                            -{discountPercent}% OFF
                        </span>
                    )}
                </div>

                {/* Cart Badge (if item in cart) */}
                {itemQuantity > 0 && (
                    <div className="absolute top-3 right-3 bg-blue-900 text-white text-xs font-bold rounded-full h-8 w-8 flex items-center justify-center shadow-lg border-2 border-white z-10 animate-in zoom-in duration-300">
                        {itemQuantity}
                    </div>
                )}

                {/* Image Section with subtle gradient background */}
                <div className="h-52 w-full p-6 flex items-center justify-center relative bg-gradient-to-b from-gray-50/50 to-white">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="h-full w-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                </div>

                {/* Content Section */}
                <div className="flex-1 px-5 py-5 flex flex-col bg-white">
                    {/* Title */}
                    <h3 className="text-sm text-gray-800 font-bold line-clamp-2 leading-snug mb-3 min-h-[40px] group-hover:text-blue-900 transition-colors" title={product.title}>
                        {product.title}
                    </h3>

                    {/* Price Section */}
                    <div className="mt-auto mb-4">
                        {hasDiscount && (
                            <div className="text-xs text-gray-400 line-through mb-0.5">
                                R$ {product.listPrice?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </div>
                        )}
                        <div className="flex items-baseline gap-1.5 text-blue-900">
                            <span className="text-xs font-bold">R$</span>
                            <span className="text-2xl font-black tracking-tighter">
                                {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </span>
                        </div>
                    </div>

                    {/* Action Button - Brand blue with accentuation instead of black */}
                    <button
                        className="w-full bg-[#1a3a8a] hover:bg-[#1e40af] text-white font-black py-3.5 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 active:scale-95 cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCar(product);
                        }}
                    >
                        <ShoppingCartIcon className="h-5 w-5 group-hover/btn:scale-110 transition-transform" />
                        <span>Comprar Agora</span>
                    </button>
                </div>
            </div>

            <ProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                product={product}
                handleAddToCar={handleAddToCar}
                handleRemoveFromCart={handleRemoveFromCart}
                itemQuantity={itemQuantity}
            />
        </>
    )
}