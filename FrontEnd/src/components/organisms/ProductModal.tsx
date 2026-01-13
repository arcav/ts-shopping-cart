import React, { useEffect } from 'react';
import { ShoppingCartIcon, XMarkIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    product: CarItemType;
    handleAddToCar: (product: CarItemType) => void;
    handleRemoveFromCart: (id: string) => void;
    itemQuantity: number;
};

const ProductModal: React.FC<Props> = ({ isOpen, onClose, product, handleAddToCar, handleRemoveFromCart, itemQuantity }) => {
    
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const hasDiscount = product.listPrice && product.listPrice > product.price;
    const discountPercent = hasDiscount 
        ? Math.round(((product.listPrice! - product.price) / product.listPrice!) * 100) 
        : 0;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8 animate-in fade-in duration-300">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-blue-900/40 backdrop-blur-md transition-opacity" 
                onClick={onClose} 
            />
            
            {/* Modal Content */}
            <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-2xl w-full max-w-4xl overflow-hidden relative flex flex-col md:flex-row animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 ease-out max-h-[92vh] overflow-y-auto md:overflow-hidden m-2 sm:m-0">
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 md:top-6 md:right-6 z-20 p-2 bg-gray-100/90 backdrop-blur-sm hover:bg-gray-200 text-gray-500 hover:text-gray-900 rounded-full transition-all duration-300 active:scale-90 shadow-sm"
                >
                    <XMarkIcon className="h-5 w-5 md:h-6 md:w-6" />
                </button>

                {/* Left Side: Product Image */}
                <div className="md:w-1/2 bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-6 md:p-12 relative min-h-[250px] md:min-h-[350px]">
                    <img 
                        src={product.image} 
                        alt={product.title} 
                        className="max-h-[200px] md:max-h-[450px] w-auto object-contain mix-blend-multiply drop-shadow-2xl hover:scale-105 transition-transform duration-700"
                    />
                    
                    {/* Floating Discount Tag */}
                    {hasDiscount && (
                        <div className="absolute top-6 left-6 md:top-10 md:left-10 bg-red-500 text-white font-black px-3 py-1 md:px-5 md:py-2 rounded-xl md:rounded-2xl shadow-xl shadow-red-500/20 tracking-tighter text-sm md:text-xl rotate-[-5deg]">
                            -{discountPercent}%
                        </div>
                    )}
                </div>

                {/* Right Side: Details */}
                <div className="md:w-1/2 p-5 md:p-14 flex flex-col justify-center">
                    <div className="mb-4 md:mb-8">
                        <h2 className="text-xl md:text-4xl font-black text-gray-900 leading-[1.2] md:leading-[1.1] mb-2 md:mb-4">
                            {product.title}
                        </h2>
                        <div className="prose prose-sm text-gray-500 leading-relaxed line-clamp-3 md:line-clamp-4 overflow-y-auto max-h-[60px] md:max-h-[100px] text-xs md:text-sm">
                            {product.description}
                        </div>
                    </div>

                    <div className="mt-2 md:mt-4">
                        <div className="mb-4 md:mb-8">
                            {hasDiscount && (
                                <p className="text-gray-400 line-through text-sm md:text-lg mb-0.5">
                                    R$ {product.listPrice?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                </p>
                            )}
                            <div className="flex items-baseline gap-1.5 md:gap-2 text-blue-900">
                                <span className="text-sm md:text-xl font-bold">R$</span>
                                <span className="text-3xl md:text-5xl font-black tracking-tighter">
                                    {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                </span>
                            </div>
                        </div>

                        {/* Quantity Controls & Buy Button */}
                        <div className="flex flex-col gap-3 md:gap-4 items-stretch mt-4 md:mt-6">
                            <div className="flex items-center justify-between md:justify-start bg-gray-100 rounded-xl md:rounded-2xl p-1 md:p-1.5 border border-gray-200 shadow-inner">
                                <button 
                                    onClick={() => handleRemoveFromCart(product.id)}
                                    className="p-2 md:p-3 hover:bg-white text-gray-600 rounded-lg md:rounded-xl transition-all duration-300 disabled:opacity-30 disabled:hover:bg-transparent"
                                    disabled={itemQuantity === 0}
                                >
                                    <MinusIcon className="h-4 w-4 md:h-5 md:w-5 stroke-3" />
                                </button>
                                <span className="px-3 md:px-5 text-lg md:text-xl font-black text-gray-900 min-w-[2.5rem] md:min-w-[3rem] text-center">
                                    {itemQuantity}
                                </span>
                                <button 
                                    onClick={() => handleAddToCar(product)}
                                    className="p-2 md:p-3 hover:bg-white text-blue-900 rounded-lg md:rounded-xl transition-all duration-300 shadow-none hover:shadow-lg"
                                >
                                    <PlusIcon className="h-4 w-4 md:h-5 md:w-5 stroke-3" />
                                </button>
                            </div>

                            <button
                                onClick={() => handleAddToCar(product)}
                                className="flex-1 bg-blue-900 hover:bg-black text-white font-black py-4 md:py-5 px-6 md:px-8 rounded-xl md:rounded-2xl transition-all duration-500 flex items-center justify-center gap-2 md:gap-3 shadow-2xl shadow-blue-900/20 hover:shadow-black/20 group active:scale-95 text-sm md:text-base"
                            >
                                <ShoppingCartIcon className="h-5 w-5 md:h-6 md:w-6 group-hover:rotate-12 transition-transform" />
                                <span className="whitespace-nowrap">Comprar agora</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ProductModal;
