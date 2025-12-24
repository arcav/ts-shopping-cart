import React, { useRef } from 'react';
import { Product } from './Product';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline'; 

type Props = {
    title: string;
    products: CarItemType[];
    handleAddToCar: (clickproduct: CarItemType) => void;
    handleRemoveFromCart: (id: string) => void;
    getItemQuantity: (id: string) => number;
}

const ProductCarousel: React.FC<Props> = ({ title, products, handleAddToCar, handleRemoveFromCart, getItemQuantity }) => {
    const listRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (listRef.current) {
            const { current } = listRef;
            const scrollAmount = 300; // Scroll by roughly one item width
            if (direction === 'left') {
                current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    return (
        <div className="py-8 border-b border-gray-100 last:border-0 relative">
            {title && (
                <div className="flex items-center justify-between mb-6 px-4">
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{title}</h2>
                </div>
            )}


            {/* Carousel Container */}
            <div className="relative group/carousel">
                {/* Left Arrow (Floating Outside) */}
                <button 
                    onClick={() => scroll('left')}
                    className="absolute -left-4 top-1/2 -translate-y-1/2 -translate-x-full z-10 bg-white border border-gray-200 text-gray-800 p-3 rounded-full shadow-lg opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:scale-110 hidden md:flex cursor-pointer"
                    aria-label="Scroll left"
                >
                    <ChevronLeftIcon className="h-6 w-6" />
                </button>

                <div 
                    ref={listRef}
                    className="grid grid-cols-2 gap-2 xs:gap-3 md:flex md:overflow-x-auto md:snap-x md:snap-mandatory scrollbar-hide pb-8 px-2 md:px-0 md:gap-6 scroll-smooth"
                >

                    {products.map(product => (
                        <div key={product.id} className="w-full md:flex-none md:w-72 md:snap-center">
                            <Product
                                product={product}
                                handleAddToCar={handleAddToCar}
                                handleRemoveFromCart={handleRemoveFromCart}
                                itemQuantity={getItemQuantity(product.id)}
                            />
                        </div>
                    ))}
                </div>

                
                {/* Right Arrow (Floating Outside) */}
                <button 
                    onClick={() => scroll('right')}
                    className="absolute -right-4 top-1/2 -translate-y-1/2 translate-x-full z-10 bg-blue-900 text-white p-3 rounded-full shadow-lg shadow-blue-200 opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-blue-800 hidden md:flex cursor-pointer"
                    aria-label="Scroll right"
                >
                    <ChevronRightIcon className="h-6 w-6" />
                </button>

                {/* Fade effect on right edge to indicate scroll  - Optional, removing as arrows are now primary indicator */}
                {/* <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-white/80 to-transparent pointer-events-none md:hidden"></div> */}
            </div>
            
            <style>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
};

export default ProductCarousel;

