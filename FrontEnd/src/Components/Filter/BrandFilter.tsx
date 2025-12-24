import React, { useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface Brand {
    name: string;
    image?: string;
}

interface BrandFilterProps {
    brands: Brand[];
    selectedBrand: string | null;
    onSelectBrand: (brand: string | null) => void;
}

const BrandLogo: React.FC<{ brand: Brand; isSelected: boolean }> = ({ brand, isSelected }) => {
    const [hasError, setHasError] = React.useState(false);

    if (hasError) {
        return (
            <div className="flex items-center justify-center w-full h-full bg-blue-50/30">
                <span className="text-[10px] font-black uppercase tracking-tighter text-blue-900/40 text-center px-2">
                    {brand.name}
                </span>
            </div>
        );
    }

    return (
        <img 
            src={brand.image || 'https://via.placeholder.com/200?text=' + brand.name} 
            alt={brand.name}
            className="w-full h-full object-contain p-2 md:p-4 group-hover:scale-110 transition-transform duration-500"
            onError={() => setHasError(true)}
        />
    );
};

const BrandFilter: React.FC<BrandFilterProps> = ({ brands, selectedBrand, onSelectBrand }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    return (
        <div className="py-6 relative group/carousel">
            <div className="flex items-center justify-between mb-4 px-2">
                <div className="flex gap-2 ml-auto">
                    <button 
                        onClick={() => scroll('left')}
                        className="p-2 bg-white border border-gray-100 rounded-full shadow-md hover:bg-blue-900 hover:text-white transition-all duration-300 active:scale-90 flex items-center justify-center cursor-pointer"
                    >
                        <ChevronLeftIcon className="h-4 w-4" />
                    </button>
                    <button 
                        onClick={() => scroll('right')}
                        className="p-2 bg-white border border-gray-100 rounded-full shadow-md hover:bg-blue-900 hover:text-white transition-all duration-300 active:scale-90 flex items-center justify-center cursor-pointer"
                    >
                        <ChevronRightIcon className="h-4 w-4" />
                    </button>
                </div>
            </div>

            <div 
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 pt-2 px-2"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {/* "Todas" Option */}
                <div
                    onClick={() => onSelectBrand(null)}
                    className="flex-none w-32 md:w-40 snap-center cursor-pointer group"
                >
                    <div className="flex flex-col items-center">
                        <div className={`w-full aspect-square rounded-full overflow-hidden shadow-lg transition-all duration-500 border-4 mb-4 relative flex items-center justify-center ${
                            selectedBrand === null 
                            ? 'border-blue-900 bg-blue-50/50' 
                            : 'border-white bg-gray-50 group-hover:bg-white group-hover:shadow-xl'
                        }`}>
                            <span className={`text-xs font-black uppercase tracking-widest ${
                                selectedBrand === null ? 'text-blue-900' : 'text-gray-400'
                            }`}>
                                Todas
                            </span>
                        </div>
                        <span className={`text-xs font-bold text-center transition-colors uppercase tracking-widest ${
                            selectedBrand === null ? 'text-blue-900' : 'text-gray-600 group-hover:text-blue-800'
                        }`}>
                            Todas las Marcas
                        </span>
                        <div className={`w-4 h-0.5 bg-blue-900 mt-2 rounded-full transition-transform duration-500 ${
                            selectedBrand === null ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                        }`} />
                    </div>
                </div>

                {brands.map((brand) => (
                    <div
                        key={brand.name}
                        onClick={() => onSelectBrand(brand.name)}
                        className="flex-none w-32 md:w-40 snap-center cursor-pointer group"
                    >
                        <div className="flex flex-col items-center">
                            <div className={`w-full aspect-square rounded-full overflow-hidden shadow-lg transition-all duration-500 border-4 mb-4 relative flex items-center justify-center ${
                                selectedBrand === brand.name 
                                ? 'border-blue-900 bg-white' 
                                : 'border-white bg-white group-hover:shadow-xl'
                            }`}>
                                <BrandLogo brand={brand} isSelected={selectedBrand === brand.name} />
                            </div>
                            <span className={`text-xs font-bold text-center transition-colors uppercase tracking-widest ${
                                selectedBrand === brand.name ? 'text-blue-900' : 'text-gray-600 group-hover:text-blue-800'
                            }`}>
                                {brand.name}
                            </span>
                            <div className={`w-4 h-0.5 bg-blue-900 mt-2 rounded-full transition-transform duration-500 ${
                                selectedBrand === brand.name ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                            }`} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default BrandFilter;

