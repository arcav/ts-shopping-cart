import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface IBannerHeroProps {
    images: string[];
    autoPlayInterval?: number;
}

export const BannerHero: React.FC<IBannerHeroProps> = ({ images, autoPlayInterval = 5000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex: number) => {
        setCurrentIndex(slideIndex);
    };

    useEffect(() => {
        if (!autoPlayInterval || images.length === 0) return;
        const slideInterval = setInterval(nextSlide, autoPlayInterval);
        return () => clearInterval(slideInterval);
    }, [currentIndex, autoPlayInterval, images.length]);

    if (!images || images.length === 0) return null;

    return (
        <div className="w-[95%] h-[40vh] md:w-full md:h-[45vh] mx-auto relative group mt-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">

            <div
                style={{ backgroundImage: `url(${images[currentIndex]})` }}
                className="w-full h-full bg-center bg-cover duration-700 ease-in-out transition-all transform hover:scale-105"
            >
                {/* Overlay gradient for better text visibility if needed, or just style */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Left Arrow */}
            <div 
                onClick={prevSlide}
                className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-4 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hover:bg-black/50 hover:scale-110 transition-all backdrop-blur-sm"
            >
                <ChevronLeftIcon className="h-5 w-5" />
            </div>

            {/* Right Arrow */}
            <div 
                onClick={nextSlide}
                className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-4 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hover:bg-black/50 hover:scale-110 transition-all backdrop-blur-sm"
            >
                <ChevronRightIcon className="h-5 w-5" />
            </div>


            {/* Dots */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
                {images.map((_, slideIndex) => (
                    <div
                        key={slideIndex}
                        onClick={() => goToSlide(slideIndex)}
                        className={`transition-all duration-300 cursor-pointer rounded-full h-1.5 shadow-sm ${
                            currentIndex === slideIndex ? 'bg-white w-6' : 'bg-white/50 w-2 hover:bg-white/80'
                        }`}
                    ></div>
                ))}
            </div>
        </div>
    );
};
