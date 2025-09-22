import React, { useState } from 'react';
import { BASE_URL_SVG } from '../../Helpers/apiEndpoints';


export default function ImageSlider({ images = [] }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fade, setFade] = useState(true);

    if (!images || images.length === 0) {
        return (
            <div className="w-full max-w-5xl mx-auto flex flex-col items-center pb-20 relative">
                <div className="relative w-full h-[400px] bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">No images available</span>
                </div>
            </div>
        );
    }

    const goToNext = () => {
        setFade(false);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
            setFade(true);
        }, 200);
    };

    const goToPrev = () => {
        setFade(false);
        setTimeout(() => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
        setFade(true);
    }, 200);
    };

    return (
        <div className="w-full">
            <div className="mt-6 text-xs font-Montserrat text-black text-end">
                {currentIndex + 1} / {images.length}
            </div>

            {/* Main Image */}
            <div className="relative w-full h-[200px] md:h-[300px] lg:h-[280px] overflow-visible">
                <img
                    src={`${BASE_URL_SVG}/${images[currentIndex].url}`}
                    alt={images[currentIndex]?.alt || `Slide ${currentIndex + 1}`}
                    className={`w-full h-full object-fill transition-opacity duration-500 ${fade ? "opacity-100" : "opacity-0"
                        }`}
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
                        <img src={`${BASE_URL_SVG}/assets/svgs/arrow-left.svg`} alt="Right Arrow" className="w-5 h-5 sm:w-6 sm:h-6" />
                    </span>

                    <span
                        onClick={goToNext}
                        className="bg-white cursor-pointer rounded-full p-2 shadow-md hover:scale-105 transition border border-gray-200"
                        aria-label="Next Slide"
                    >
                        <img src={`${BASE_URL_SVG}/assets/svgs/arrow-right.svg`} alt="Right Arrow" className="w-5 h-5 sm:w-6 sm:h-6" />
                    </span>
                </div>
            </div>
        </div>
    );
}
