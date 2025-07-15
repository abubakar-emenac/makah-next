import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
    '/svg/umrah.svg',
    '/svg/img2.svg',
    '/svg/umrah.svg',
    '/svg/img2.svg',
    '/svg/umrah.svg',
    '/svg/img2.svg',
];

export default function ImageGallery() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const goToPrev = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const handleThumbnailClick = (index) => {
        setCurrentIndex(index);
    };

    const getVisibleThumbnails = () => {
        const total = images.length;

        if (total <= 4) return images;

        if (currentIndex < 2) return images.slice(0, 4);
        if (currentIndex > total - 3) return images.slice(total - 4, total);

        return images.slice(currentIndex - 1, currentIndex + 3);
    };


    return (
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center pb-20 relative">
            {/* Main Image */}
            <div className="relative w-full h-[400px] overflow-visible">
                <img
                    src={images[currentIndex]}
                    alt={`Slide ${currentIndex + 1}`}
                    className="w-full h-full object-cover transition-all duration-500 ease-in-out"
                />

                {/* Navigation Arrows */}
                <button
                    onClick={goToPrev}
                    className="absolute -left-5 top-1/2 transform -translate-y-1/2 bg-secondary hover:bg-white p-2 rounded-full shadow"
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    onClick={goToNext}
                    className="absolute -right-5 top-1/2 transform -translate-y-1/2 bg-secondary hover:bg-white p-2 rounded-full shadow"
                >
                    <ChevronRight size={24} />
                </button>

                {/* Fixed 4 Thumbnails */}
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-16 z-10 flex items-center justify-center gap-3">
                    {getVisibleThumbnails().map((img, i) => {
                        const actualIndex = currentIndex < 2
                            ? i
                            : currentIndex > images.length - 3
                                ? images.length - 4 + i
                                : currentIndex - 1 + i;

                        return (
                            <img
                                key={actualIndex}
                                src={img}
                                onClick={() => handleThumbnailClick(actualIndex)}
                                className={`w-48 object-cover cursor-pointer border-2 transition-all duration-300 ${currentIndex === actualIndex
                                    ? 'border-primary ring-2 ring-primary'
                                    : 'border-white'
                                    }`}
                                alt={`Thumbnail ${actualIndex + 1}`}
                            />
                        );
                    })}

                </div>
            </div>

            {/* Pagination */}
            <div className="mt-20 text-sm font-Montserrat text-black">
                {currentIndex + 1} / {images.length}
            </div>
        </div>
    );
}
