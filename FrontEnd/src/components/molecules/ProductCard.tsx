import React, { useState } from 'react';
import ProductModal from '@/components/organisms/ProductModal';
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
                className="group flex flex-col h-full md:h-[460px] bg-white rounded-xl md:rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer relative border border-gray-100/60"
                onClick={() => setIsModalOpen(true)}
            >

                {/* Badges Overlay */}
                <div className="absolute top-2 left-2 md:top-3 md:left-3 flex flex-col gap-1 md:gap-2 z-10">
                    {/* Discount Badge */}
                    {hasDiscount && (
                        <span className="inline-block bg-red-600 text-white text-[9px] md:text-[11px] font-black px-1.5 py-1 md:px-3 md:py-1.5 rounded-md md:rounded-lg shadow-lg shadow-red-500/30 tracking-tight transition-transform group-hover:scale-110">
                            -{discountPercent}% OFF
                        </span>
                    )}
                </div>

                {/* Cart Badge (if item in cart) */}
                {itemQuantity > 0 && (
                    <div className="absolute top-2 right-2 md:top-3 md:right-3 bg-blue-900 text-white text-[10px] md:text-xs font-bold rounded-full h-6 w-6 md:h-8 md:w-8 flex items-center justify-center shadow-lg border-2 border-white z-10 animate-in zoom-in duration-300">
                        {itemQuantity}
                    </div>
                )}

                {/* Image Section */}
                <div className="h-24 md:h-52 w-full p-2 md:p-6 flex items-center justify-center relative bg-gradient-to-b from-gray-50/50 to-white">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="h-full w-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                </div>

                {/* Content Section */}
                <div className="flex-1 px-2 py-2 md:px-6 md:py-6 flex flex-col bg-white">
                    {/* Title */}
                    <h3 className="text-[11px] md:text-lg text-gray-900 font-bold md:font-black line-clamp-2 leading-tight md:leading-snug mb-1 md:mb-4 min-h-[32px] md:min-h-[56px] group-hover:text-blue-900 transition-colors tracking-tight" title={product.title}>
                        {product.title}
                    </h3>

                    {/* Price Section */}
                    <div className="mt-auto mb-1.5 md:mb-4">
                        {hasDiscount && (
                            <div className="text-[9px] md:text-xs text-gray-400 line-through mb-0">
                                R$ {product.listPrice?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </div>
                        )}
                        <div className="flex items-baseline gap-0.5 md:gap-1 text-blue-900">
                            <span className="text-[9px] md:text-xs font-bold">R$</span>
                            <span className="text-sm md:text-2xl font-black tracking-tighter">
                                {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </span>
                        </div>
                    </div>

                    {/* Action Button */}
                    <button
                        className="w-full bg-[#1a3a8a] hover:bg-[#1e40af] text-white font-black py-2 md:py-3.5 px-2 md:px-4 rounded-lg md:rounded-xl transition-all duration-300 flex items-center justify-center gap-1 md:gap-2 group/btn shadow-lg shadow-blue-900/10 md:shadow-blue-900/20 hover:shadow-blue-900/40 active:scale-95 cursor-pointer text-[10px] md:text-base"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCar(product);
                        }}
                    >
                        <ShoppingCartIcon className="h-3.5 w-3.5 md:h-5 md:w-5 group-hover/btn:scale-110 transition-transform" />
                        <span>Comprar</span>
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