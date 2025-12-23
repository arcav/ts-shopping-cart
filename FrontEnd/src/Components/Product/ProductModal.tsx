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
            <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-4xl overflow-hidden relative flex flex-col md:flex-row animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 ease-out max-h-[95vh] overflow-y-auto md:overflow-hidden">
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-6 right-6 z-20 p-2.5 bg-gray-100/80 backdrop-blur-sm hover:bg-gray-200 text-gray-500 hover:text-gray-900 rounded-full transition-all duration-300 active:scale-90"
                >
                    <XMarkIcon className="h-6 w-6" />
                </button>

                {/* Left Side: Product Image */}
                <div className="md:w-1/2 bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-12 relative min-h-[350px]">
                    <img 
                        src={product.image} 
                        alt={product.title} 
                        className="max-h-[300px] md:max-h-[450px] w-auto object-contain mix-blend-multiply drop-shadow-2xl hover:scale-105 transition-transform duration-700"
                    />
                    
                    {/* Floating Discount Tag */}
                    {hasDiscount && (
                        <div className="absolute top-10 left-10 bg-red-500 text-white font-black px-5 py-2 rounded-2xl shadow-xl shadow-red-500/20 tracking-tighter text-xl rotate-[-5deg]">
                            -{discountPercent}%
                        </div>
                    )}
                </div>

                {/* Right Side: Details */}
                <div className="md:w-1/2 p-8 md:p-14 flex flex-col justify-center">
                    <div className="mb-8">
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-[1.1] mb-4">
                            {product.title}
                        </h2>
                        <div className="prose prose-sm text-gray-500 leading-relaxed line-clamp-4 overflow-y-auto max-h-[100px]">
                            {product.description}
                        </div>
                    </div>

                    <div className="mt-4">
                        <div className="mb-8">
                            {hasDiscount && (
                                <p className="text-gray-400 line-through text-lg mb-1">
                                    R$ {product.listPrice?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                </p>
                            )}
                            <div className="flex items-baseline gap-2 text-blue-900">
                                <span className="text-xl font-bold">R$</span>
                                <span className="text-5xl font-black tracking-tighter">
                                    {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                </span>
                            </div>
                        </div>

                        {/* Quantity Controls & Buy Button */}
                        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center mt-6">
                            <div className="flex items-center bg-gray-100 rounded-2xl p-1.5 border border-gray-200 shadow-inner">
                                <button 
                                    onClick={() => handleRemoveFromCart(product.id)}
                                    className="p-3 hover:bg-white text-gray-600 rounded-xl transition-all duration-300 disabled:opacity-30 disabled:hover:bg-transparent"
                                    disabled={itemQuantity === 0}
                                >
                                    <MinusIcon className="h-5 w-5 stroke-3" />
                                </button>
                                <span className="px-5 text-xl font-black text-gray-900 min-w-[3rem] text-center">
                                    {itemQuantity}
                                </span>
                                <button 
                                    onClick={() => handleAddToCar(product)}
                                    className="p-3 hover:bg-white text-blue-900 rounded-xl transition-all duration-300 shadow-none hover:shadow-lg"
                                >
                                    <PlusIcon className="h-5 w-5 stroke-3" />
                                </button>
                            </div>

                            <button
                                onClick={() => handleAddToCar(product)}
                                className="flex-1 bg-blue-900 hover:bg-black text-white font-black py-5 px-8 rounded-2xl transition-all duration-500 flex items-center justify-center gap-3 shadow-2xl shadow-blue-900/20 hover:shadow-black/20 group active:scale-95"
                            >
                                <ShoppingCartIcon className="h-6 w-6 group-hover:rotate-12 transition-transform" />
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
