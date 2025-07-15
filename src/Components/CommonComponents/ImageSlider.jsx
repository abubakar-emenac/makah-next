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
                    <button
                        onClick={goToPrev}
                        className="bg-secondary hover:bg-white p-1.5 rounded-full shadow"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <button
                        onClick={goToNext}
                        className="bg-secondary hover:bg-white p-1.5 rounded-full shadow"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
