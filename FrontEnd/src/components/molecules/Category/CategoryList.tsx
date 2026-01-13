import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

type Category = {
    path: string;
    label: string;
    image?: string;
};

type Props = {
    categories: Category[];
};

const CategoryList: React.FC<Props> = ({ categories }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    if (!categories || categories.length === 0) return null;

    return (
        <div className="py-12 relative group/carousel">
            <div className="flex items-center justify-between mb-8 px-2">
                <div>
                    <h3 className="text-3xl font-black text-gray-900 tracking-tight">Categorias Premium</h3>
                    <p className="text-gray-500 text-sm mt-1">Explore os melhores produtos por categoria</p>
                </div>
                
                <div className="flex gap-2">
                    <button 
                        onClick={() => scroll('left')}
                        className="p-3 bg-white border border-gray-100 rounded-full shadow-lg hover:bg-blue-900 hover:text-white transition-all duration-300 active:scale-90 flex items-center justify-center group"
                    >
                        <ChevronLeftIcon className="h-5 w-5" />
                    </button>
                    <button 
                        onClick={() => scroll('right')}
                        className="p-3 bg-white border border-gray-100 rounded-full shadow-lg hover:bg-blue-900 hover:text-white transition-all duration-300 active:scale-90 flex items-center justify-center group"
                    >
                        <ChevronRightIcon className="h-5 w-5" />
                    </button>
                </div>
            </div>

            <div 
                ref={scrollRef}
                className="flex gap-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-8 pt-4 px-2"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {categories.map((category) => (
                    <Link
                        key={category.path}
                        to={`/category?path=${encodeURIComponent(category.path)}`}
                        className="flex-none w-40 md:w-56 snap-center group"
                    >
                        <div className="flex flex-col items-center">
                            {/* Circular Card */}
                            <div className="w-full aspect-square rounded-full overflow-hidden bg-white shadow-xl group-hover:shadow-[0_20px_50px_rgba(26,58,138,0.15)] transition-all duration-700 border-4 border-white mb-6 relative">
                                <div className="absolute inset-0 bg-gradient-to-tr from-gray-50 to-white -z-10" />
                                <img 
                                    src={category.image || 'https://via.placeholder.com/300?text=Appliance'} 
                                    alt={category.label}
                                    className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-700 ease-out mix-blend-multiply"
                                />
                                {/* Bottom Accent line hidden in circle */}
                                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-blue-900/10 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                            </div>

                            {/* Label */}
                            <span className="text-sm md:text-base font-bold text-gray-800 text-center px-2 group-hover:text-blue-900 transition-colors uppercase tracking-widest leading-tight">
                                {category.label}
                            </span>
                            
                            {/* Indicator bar */}
                            <div className="w-6 h-1 bg-blue-900 mt-3 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                        </div>
                    </Link>
                ))}
            </div>

            {/* Invisibility gradient masks */}
            <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-gray-50/50 to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-gray-50/50 to-transparent pointer-events-none" />
        </div>
    );
};

export default CategoryList;
