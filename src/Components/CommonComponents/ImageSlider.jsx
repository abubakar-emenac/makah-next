import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
    '/svg/umrah.svg',
    '/svg/umrah.svg',
    '/svg/umrah.svg',
    '/svg/umrah.svg',
    '/svg/umrah.svg',
    '/svg/umrah.svg',
];

export default function ImageSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const goToPrev = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="w-full">
            <div className="mt-6 text-xs font-Montserrat text-black text-end">
                {currentIndex + 1} / {images.length}
            </div>

            {/* Main Image */}
            <div className="relative w-full h-[200px] md:h-[300px] lg:h-[280px] overflow-visible">
                <img
                    src={images[currentIndex]}
                    alt={`Slide ${currentIndex + 1}`}
                    className="w-full h-full object-cover transition-all duration-500 ease-in-out"
                />

                {/* Bottom-positioned Arrows */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 flex gap-4">
                    {/* <button
                        onClick={goToPrev}
                        className="bg-secondary hover:bg-white p-1.5 rounded-full shadow"
                    >
                        <ChevronLeft size={18} />
                    </button> */}
                    <span
                        onClick={goToPrev}
                        className="bg-white cursor-pointer rounded-full p-2 shadow-md hover:scale-105 transition border border-gray-200"
                        aria-label="Next Slide"
                    >
                        <img src="/svg/arrow-left.svg" alt="Right Arrow" className="w-5 h-5 sm:w-6 sm:h-6" />
                    </span>

                    <span
                        onClick={goToNext}
                        className="bg-white cursor-pointer rounded-full p-2 shadow-md hover:scale-105 transition border border-gray-200"
                        aria-label="Next Slide"
                    >
                        <img src="/svg/arrow-right.svg" alt="Right Arrow" className="w-5 h-5 sm:w-6 sm:h-6" />
                    </span>
                </div>
            </div>
        </div>
    );
}
