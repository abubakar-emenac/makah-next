// import React, { useState } from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import { BASE_URL_SVG } from '../../Helpers/apiEndpoints';


// export default function ImageGallery({ images = [] }) {
//     const [currentIndex, setCurrentIndex] = useState(0);
//     if (!images || images.length === 0) {
//         return (
//             <div className="w-full max-w-5xl mx-auto flex flex-col items-center pb-20 relative">
//                 <div className="relative w-full h-[400px] bg-gray-200 flex items-center justify-center">
//                     <span className="text-gray-500">No images available</span>
//                 </div>
//             </div>
//         );
//     }
//     if (images.length === 0) {
//         return <div className="text-center text-gray-500">No images available</div>;
//     }

//     const goToNext = () => {
//         setCurrentIndex((prev) => (prev + 1) % images.length);
//     };

//     const goToPrev = () => {
//         setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
//     };

//     const handleThumbnailClick = (index) => {
//         setCurrentIndex(index);
//     };

//     const getVisibleThumbnails = () => {
//         const total = images.length;

//         if (total <= 4) return images;

//         if (currentIndex < 2) return images.slice(0, 4);
//         if (currentIndex > total - 3) return images.slice(total - 4, total);

//         return images.slice(currentIndex - 1, currentIndex + 3);
//     };


//     return (
//         <div className="w-full max-w-5xl mx-auto flex flex-col items-center pb-20 relative">
//             {/* Main Image */}
//             <div className="relative w-full h-[400px] overflow-visible">
//                 <img
//                     src={`${BASE_URL_SVG}/${images[currentIndex].url}`}
//                     alt={images[currentIndex]?.alt || `Slide ${currentIndex + 1}`}
//                     className="w-full h-full object-fill transition-transform duration-700 ease-in-out"
//                 />

//                 {/* Navigation Arrows */}
//                 <button
//                     onClick={goToPrev}
//                     className="absolute -left-5 top-1/2 transform -translate-y-1/2 bg-secondary hover:bg-white p-2 rounded-full shadow"
//                 >
//                     <ChevronLeft size={24} />
//                 </button>
//                 <button
//                     onClick={goToNext}
//                     className="absolute -right-5 top-1/2 transform -translate-y-1/2 bg-secondary hover:bg-white p-2 rounded-full shadow"
//                 >
//                     <ChevronRight size={24} />
//                 </button>

//                 {/* Fixed 4 Thumbnails */}
//                 <div className="absolute left-1/2 -translate-x-1/2 -bottom-16 z-10 flex items-center justify-center gap-3">
//                     {getVisibleThumbnails().map((img, i) => {
//                         const actualIndex = currentIndex < 2
//                             ? i
//                             : currentIndex > images.length - 3
//                                 ? images.length - 4 + i
//                                 : currentIndex - 1 + i;

//                         return (
//                             <img
//                                 key={actualIndex}
//                                 src={`${BASE_URL_SVG}/${img.url}`}
//                                 onClick={() => handleThumbnailClick(actualIndex)}
//                                 className={`w-48 object-fill cursor-pointer border-2 transition-all duration-300 ${currentIndex === actualIndex
//                                     ? 'border-primary ring-2 ring-primary'
//                                     : 'border-white'
//                                     }`}
//                                 alt={`Thumbnail ${actualIndex + 1}`}
//                             />
//                         );
//                     })}

//                 </div>
//             </div>

//             {/* Pagination */}
//             <div className="mt-20 text-sm font-Montserrat text-black">
//                 {currentIndex + 1} / {images.length}
//             </div>
//         </div>
//     );
// }

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BASE_URL_SVG } from "../../Helpers/apiEndpoints";

export default function ImageGallery({ images = [] }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleCount, setVisibleCount] = useState(4);

    useEffect(() => {
        const updateVisibleCount = () => {
            if (window.innerWidth < 640) setVisibleCount(2); // mobile
            else if (window.innerWidth < 1024) setVisibleCount(3); // tablet
            else setVisibleCount(4); // desktop
        };

        updateVisibleCount();
        window.addEventListener("resize", updateVisibleCount);

        return () => window.removeEventListener("resize", updateVisibleCount);
    }, []);

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
        if (total <= visibleCount) return images;

        const half = Math.floor(visibleCount / 2);

        if (currentIndex < half) return images.slice(0, visibleCount);
        if (currentIndex > total - half - 1)
            return images.slice(total - visibleCount, total);

        return images.slice(currentIndex - half, currentIndex - half + visibleCount);
    };



    return (
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center pb-20 relative">
            {/* Main Image */}
            <div className="relative w-full h-[440px]">
                <img
                    src={`${BASE_URL_SVG}/${images[currentIndex].url}`}
                    alt={images[currentIndex]?.alt || `Slide ${currentIndex + 1}`}
                    className="w-full h-full object-fill transition-transform duration-700 ease-in-out"
                />

                {/* Navigation Arrows */}
                <button
                    onClick={goToPrev}
                    className="absolute -left-5 top-1/2 transform -translate-y-1/2 bg-white hover:bg-white p-2 rounded-full shadow"
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    onClick={goToNext}
                    className="absolute -right-5 top-1/2 transform -translate-y-1/2 bg-white hover:bg-white p-2 rounded-full shadow"
                >
                    <ChevronRight size={24} />
                </button>

                {/* Responsive Thumbnails */}
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-16 z-10 flex items-center justify-center">
                    {getVisibleThumbnails().map((img, i) => {
                        const actualIndex =
                            currentIndex < Math.floor(visibleCount / 2)
                                ? i
                                : currentIndex > images.length - Math.ceil(visibleCount / 2)
                                    ? images.length - visibleCount + i
                                    : currentIndex - Math.floor(visibleCount / 2) + i;

                        return (
                            <img
                                key={actualIndex}
                                src={`${BASE_URL_SVG}/${img.url}`}
                                onClick={() => handleThumbnailClick(actualIndex)}
                                className={`w-20 sm:w-28 md:w-32 lg:w-36 xl:w-40 object-fill cursor-pointer border-2 transition-all duration-300 ${currentIndex === actualIndex
                                    ? "border-secondary ring-2 ring-secondary"
                                    : "border-white"
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
