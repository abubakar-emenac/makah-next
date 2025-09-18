// import React, { useState } from 'react';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import Slider from 'react-slick';


// const TestimonialCard = ({ avatar, name, location, rating, text }) => {
//     const [showFullText, setShowFullText] = useState(false);

//     const renderStars = (numStars) => {
//         const stars = [];
//         for (let i = 0; i < 5; i++) {
//             stars.push(
//                 <img
//                     key={i}
//                     src={i < numStars ? '/svgs/filledStar.svg' : '/svgs/emptyStar.svg'}
//                     alt={i < numStars ? 'Filled Star' : 'Empty Star'}
//                     className="w-5 h-5"
//                     loading="lazy"
//                 />
//             );
//         }
//         return stars;
//     };

//     const truncatedText = text.length > 150 && !showFullText ? text.substring(0, 150) + '...' : text;

//     return (
//         <div className="relative shadow-md p-6 w-full flex flex-col items-center bg-gray-100 rounded-lg">
//             <div className="absolute -top-12">
//                 <img
//                     src={avatar}
//                     alt={name}
//                     className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
//                     onError={(e) => { e.target.onerror = null; e.target.src = "/svgs/user.svg"; }}
//                 />
//             </div>
//             <div className="mt-16 text-start font-Montserrat text-black leading-relaxed">
//                 <p>{truncatedText}</p>
//             </div>
//             <div className="flex flex-col sm:flex-row items-center justify-between w-full mt-6 pt-4 border-t border-gray-200">
//                 <div className="flex flex-col items-center sm:items-start mb-4 sm:mb-0">
//                     <div className='flex justify-between items-center gap-2'>
//                         <div className="font-semibold text-lg font-Montserrat text-black">{name}</div>
//                         <div className="flex">{renderStars(rating)}</div>
//                     </div>
//                     <div className="text-sm font-Montserrat text-black">{location}</div>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                     {text.length > 200 && (
//                         <button
//                             onClick={() => setShowFullText(!showFullText)}
//                             className="text-secondary cursor-pointer hover:text-green-700 font-medium flex items-center transition-colors duration-200 ease-in-out"
//                         >
//                             {showFullText ? 'Show Less' : 'Show More'}
//                         </button>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// // Utility to chunk array into groups of 3
// const chunkArray = (arr, size) => {
//     return arr.reduce((acc, _, i) => {
//         if (i % size === 0) acc.push(arr.slice(i, i + size));
//         return acc;
//     }, []);
// };

// export default function Testimonials() {
//     const reviews = [
//         {
//             avatar: '/svgs/user.svg', // Placeholder for /svgs/user.svg
//             reviews: 'Makkah Travel is here to help you visit religious places and make Umrah trips that connect with your soul Makkah Travel is here to help you visit religious places and make Umrah trips that connect with your soul.Makkah Travel is here to help you visit religious places and make Umrah trips that connect with your soul.Makkah Travel is here to help you visit religious places and make Umrah trips that connect.',
//             name: 'Abdullah',
//             location: 'london',
//             star: 4
//         },
//         {
//             avatar: '/svgs/user.svg',
//             reviews: 'Makkah Travel is here to help you visit religious places and make Umrah trips that connect with your soul Makkah Travel is here to help you visit religious places and make Umrah trips that connect with your soul.Makkah Travel is here to help you visit religious places and make Umrah trips that connect with your soul.Makkah Travel is here to help you visit religious places and make Umrah trips that connect.',
//             name: 'Aisha',
//             location: 'Dubai',
//             star: 5
//         },
//         {
//             avatar: '/svgs/user.svg',
//             reviews: 'Makkah Travel is here to help you visit religious places and make Umrah trips that connect with your soul Makkah Travel is here to help you visit religious places and make Umrah trips that connect with your soul.Makkah Travel is here to help you visit religious places and make Umrah trips that connect with your soul.Makkah Travel is here to help you visit religious places and make Umrah trips that connect.',
//             name: 'Fatima',
//             location: 'Cairo',
//             star: 3
//         },
//         {
//             avatar: '/svgs/user.svg',
//             reviews: 'Makkah Travel is here to help you visit religious places and make Umrah trips that connect with your soul Makkah Travel is here to help you visit religious places and make Umrah trips that connect with your soul.Makkah Travel is here to help you visit religious places and make Umrah trips that connect with your soul.Makkah Travel is here to help you visit religious places and make Umrah trips that connect.',
//             name: 'Ahmed',
//             location: 'New York',
//             star: 5
//         },
//         {
//             avatar: '/svgs/user.svg',
//             reviews: 'Makkah Travel is here to help you visit religious places and make Umrah trips that connect with your soul Makkah Travel is here to help you visit religious places and make Umrah trips that connect with your soul.Makkah Travel is here to help you visit religious places and make Umrah trips that connect with your soul.Makkah Travel is here to help you visit religious places and make Umrah trips that connect.',
//             name: 'Zainab',
//             location: 'Paris',
//             star: 4
//         },
//         {
//             avatar: '/svgs/user.svg',
//             reviews: 'Makkah Travel is here to help you visit religious places and make Umrah trips that connect with your soul Makkah Travel is here to help you visit religious places and make Umrah trips that connect with your soul.Makkah Travel is here to help you visit religious places and make Umrah trips that connect with your soul.Makkah Travel is here to help you visit religious places and make Umrah trips that connect.',
//             name: 'Omar',
//             location: 'Berlin',
//             star: 5
//         },
//     ];

//     const groupedReviews = chunkArray(reviews, 3);
//     const [currentSlide, setCurrentSlide] = useState(0);

//     const nextSlide = () => {
//         setCurrentSlide((prev) => (prev + 1) % groupedReviews.length);
//     };

//     const prevSlide = () => {
//         setCurrentSlide((prev) => (prev - 1 + groupedReviews.length) % groupedReviews.length);
//     };

//     return (
//         <div className="w-full max-w-[82%] mx-auto mt-8 sm:mt-12 md:mt-28 px-4 sm:px-6 md:px-9 font-sans mb-10">
//             {/* Header */}
//             <div className="w-full lg:w-[48%] mb-24 pl-16 ">
//                 <img src="/svgs/crown-black.svg" alt="Crown" className="w-16 sm:w-18 md:w-24 mb-3 sm:mb-4" />
//                 <h2 className="text-[28px] sm:text-[32px] md:text-[36px] font-abril leading-tight mb-3 sm:mb-4">
//                     What Our Clients Say
//                 </h2>
//                 <p className="font-Montserrat text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed text-black">
//                     Makkah Travel is here to help you visit religious places and make Umrah trips that connect with your soul.
//                 </p>
//             </div>

//             {/* Slider */}
//             <div className="relative w-full ">
//                 {/* Left Arrow */}
//                 <button
//                     onClick={prevSlide}
//                     className="absolute -left-6 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-full z-10"
//                 >
//                     ←
//                 </button>

//                 {/* Testimonials Grid */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-12">
//                     {groupedReviews[currentSlide].map((review, index) => (
//                         <TestimonialCard
//                             key={index}
//                             avatar={review.avatar}
//                             name={review.name}
//                             location={review.location}
//                             rating={review.star}
//                             text={review.reviews}
//                         />
//                     ))}
//                 </div>

//                 {/* Right Arrow */}
//                 <button
//                     onClick={nextSlide}
//                     className="absolute -right-6 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-full z-10"
//                 >
//                     →
//                 </button>

//                 {/* Pills */}
//                 <div className="flex justify-center mt-6">
//                     {groupedReviews.map((_, i) => (
//                         <div
//                             key={i}
//                             onClick={() => setCurrentSlide(i)}
//                             className={`h-2 mx-1 rounded-lg cursor-pointer transition-all duration-300 ease-in-out
//                 ${i === currentSlide ? 'bg-primary w-20' : 'bg-secondary/55 w-11'}`}
//                             style={{ transitionProperty: 'width, background-color' }}
//                         />
//                     ))}
//                 </div>

//             </div>

//         </div>
//     );
// }



// import React, { useState } from 'react';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

// const TestimonialCard = ({ avatar, name, location, rating, text }) => {
//     const [showFullText, setShowFullText] = useState(false);

//     const renderStars = (numStars) => {
//         const stars = [];
//         for (let i = 0; i < 5; i++) {
//             stars.push(
//                 <img
//                     key={i}
//                     src={i < numStars ? '/svgs/filledStar.svg' : '/svgs/emptyStar.svg'}
//                     alt={i < numStars ? 'Filled Star' : 'Empty Star'}
//                     className="w-5 h-5"
//                     loading="lazy"
//                 />
//             );
//         }
//         return stars;
//     };

//     const truncatedText = text.length > 150 && !showFullText ? text.substring(0, 150) + '...' : text;

//     return (
//         <div className="relative shadow-md p-6 w-full flex flex-col items-center bg-gray-100 rounded-lg mx-2">
//             <div className="absolute -top-12">
//                 <img
//                     src={avatar}
//                     alt={name}
//                     className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
//                     onError={(e) => {
//                         e.target.onerror = null;
//                         e.target.src = '/svgs/user.svg';
//                     }}
//                 />
//             </div>
//             <div className="mt-16 text-start font-Montserrat text-black leading-relaxed">
//                 <p>{truncatedText}</p>
//             </div>
//             <div className="flex flex-col sm:flex-row items-center justify-between w-full mt-6 pt-4 border-t border-gray-200">
//                 <div className="flex flex-col items-center sm:items-start mb-4 sm:mb-0">
//                     <div className="flex justify-between items-center gap-2">
//                         <div className="font-semibold text-lg font-Montserrat text-black">{name}</div>
//                         <div className="flex">{renderStars(rating)}</div>
//                     </div>
//                     <div className="text-sm font-Montserrat text-black">{location}</div>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                     {text.length > 200 && (
//                         <button
//                             onClick={() => setShowFullText(!showFullText)}
//                             className="text-secondary cursor-pointer hover:text-green-700 font-medium flex items-center transition-colors duration-200 ease-in-out"
//                         >
//                             {showFullText ? 'Show Less' : 'Show More'}
//                         </button>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default function Testimonials() {
//     const reviews = [
//         {
//             avatar: '/svgs/user.svg',
//             reviews: 'Makkah Travel is here to help you visit religious places and make Umrah trips that connect with your soul.',
//             name: 'Abdullah',
//             location: 'London',
//             star: 4,
//         },
//         {
//             avatar: '/svgs/user.svg',
//             reviews: 'Makkah Travel helped me experience peace through an organized Umrah trip.',
//             name: 'Aisha',
//             location: 'Dubai',
//             star: 5,
//         },
//         {
//             avatar: '/svgs/user.svg',
//             reviews: 'The service was amazing, and the trip was very spiritual.',
//             name: 'Fatima',
//             location: 'Cairo',
//             star: 3,
//         },
//         {
//             avatar: '/svgs/user.svg',
//             reviews: 'Will definitely recommend Makkah Travel to friends and family.',
//             name: 'Ahmed',
//             location: 'New York',
//             star: 5,
//         },
//         {
//             avatar: '/svgs/user.svg',
//             reviews: 'Everything went smoothly. Very happy with the team.',
//             name: 'Zainab',
//             location: 'Paris',
//             star: 4,
//         },
//         {
//             avatar: '/svgs/user.svg',
//             reviews: 'A memorable spiritual experience with all arrangements done professionally.',
//             name: 'Omar',
//             location: 'Berlin',
//             star: 5,
//         },
//     ];

//     const sliderSettings = {
//         dots: true,
//         arrows: false,
//         infinite: true,
//         speed: 600,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         responsive: [
//             {
//                 breakpoint: 640, // mobile (default)
//                 settings: {
//                     slidesToShow: 1,
//                 },
//             },
//             {
//                 breakpoint: 1024, // tablet
//                 settings: {
//                     slidesToShow: 2,
//                 },
//             },
//             {
//                 breakpoint: 1280, // desktop
//                 settings: {
//                     slidesToShow: 3,
//                 },
//             },
//         ],
//         appendDots: dots => (
//             <div className="flex justify-center mt-6">{dots}</div>
//         ),
//         customPaging: i => (
//             <div className="h-2 mx-1 rounded-lg cursor-pointer transition-all duration-300 ease-in-out bg-secondary w-10"></div>
//         ),
//     };

//     return (
//         <div className="w-full max-w-[90%] mx-auto mt-10 px-4 font-sans mb-12">
//             {/* Header */}
//             <div className="w-full lg:w-[48%] mb-12 pl-0 md:pl-8">
//                 <img src="/svgs/crown-black.svg" alt="Crown" className="w-16 sm:w-18 md:w-24 mb-3" />
//                 <h2 className="text-[26px] sm:text-[32px] md:text-[36px] font-abril leading-tight mb-3">
//                     What Our Clients Says
//                 </h2>
//                 <p className="font-Montserrat text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed text-black">
//                     Makkah Travel is here to help you visit religious places and make Umrah trips that connect with your soul.
//                 </p>
//             </div>

//             {/* Slider */}
//             <Slider {...sliderSettings}>
//                 {reviews.map((review, index) => (
//                     <div key={index}>
//                         <TestimonialCard
//                             avatar={review.avatar}
//                             name={review.name}
//                             location={review.location}
//                             rating={review.star}
//                             text={review.reviews}
//                         />
//                     </div>
//                 ))}
//             </Slider>
//         </div>
//     );
// }



// import React, { useRef, useState } from 'react';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import axios from "axios";
// import Slider from 'react-slick';
// import { BASE_URL_IMG, BASE_URL_SVG, endpoints } from '../../Helpers/apiEndpoints';

// const TestimonialCard = ({ avatar, name, location, rating, text }) => {
//     const [showFullText, setShowFullText] = useState(false);

//     const renderStars = (numStars) => {
//         return Array.from({ length: 5 }).map((_, i) => (
//             <img
//                 key={i}
//                 src={i < numStars
//                     ? `${BASE_URL_SVG}/assets/svgs/filledStar.svg`
//                     : `${BASE_URL_SVG}/assets/svgs/emptyStar.svg`
//                 }
//                 alt={i < numStars ? 'Filled Star' : 'Empty Star'}
//                 className="w-5 h-5"
//                 loading="lazy"
//             />
//         ));
//     };

//     const truncatedText = text.length > 150 && !showFullText
//         ? text.substring(0, 150) + '...'
//         : text;

//     return (
//         <div className="relative shadow-md p-6 w-full flex flex-col items-center bg-gray-100 rounded-lg">
//             <div className="absolute -top-8">
//                 <img
//                     src={`${BASE_URL_SVG}/${avatar}`}
//                     alt={name}
//                     className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
//                 />
//             </div>
//             <div className="mt-16 text-start font-Montserrat text-black leading-relaxed">
//                 <p>{truncatedText}</p>
//             </div>
//             <div className="flex flex-col sm:flex-row items-center justify-between w-full mt-6 pt-4 border-t border-gray-200">
//                 <div className="flex flex-col items-center sm:items-start mb-4 sm:mb-0">
//                     <div className='flex justify-between items-center gap-2'>
//                         <div className="font-semibold text-lg font-Montserrat text-black">{name}</div>
//                         <div className="flex">{renderStars(rating)}</div>
//                     </div>
//                     <div className="text-sm font-Montserrat text-black">{location}</div>
//                 </div>
//                 {text.length > 200 && (
//                     <button
//                         onClick={() => setShowFullText(!showFullText)}
//                         className="text-secondary cursor-pointer hover:text-green-700 font-medium flex items-center transition-colors duration-200 ease-in-out"
//                     >
//                         {showFullText ? 'Show Less' : 'Show More'}
//                     </button>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default function Testimonials({ pageData }) {
//     const [heading, setHeading] = useState("");
//     const [subHeading, setSubHeading] = useState("");
//     const [reviewsData, setReviewsData] = useState([]);
//     const reviews = [
//         { avatar: 'assets/svgs/user.svg', reviews: 'Makkah Travel is here to help you visit religious places and make Umrah trips that connect with your soul. '.repeat(3), name: 'Abdullah', location: 'London', star: 4 },
//         { avatar: 'assets/svgs/user.svg', reviews: 'Makkah Travel is here to help you visit religious places and make Umrah trips that connect with your soul. '.repeat(3), name: 'Aisha', location: 'Dubai', star: 5 },
//         { avatar: 'assets/svgs/user.svg', reviews: 'Makkah Travel is here to help you visit religious places and make Umrah trips that connect with your soul. '.repeat(3), name: 'Fatima', location: 'Cairo', star: 3 },
//         { avatar: 'assets/svgs/user.svg', reviews: 'Makkah Travel is here to help you visit religious places and make Umrah trips that connect with your soul. '.repeat(3), name: 'Ahmed', location: 'New York', star: 5 },
//         { avatar: 'assets/svgs/user.svg', reviews: 'Makkah Travel is here to help you visit religious places and make Umrah trips that connect with your soul. '.repeat(3), name: 'Zainab', location: 'Paris', star: 4 },
//         { avatar: 'assets/svgs/user.svg', reviews: 'Makkah Travel is here to help you visit religious places and make Umrah trips that connect with your soul. '.repeat(3), name: 'Omar', location: 'Berlin', star: 5 },
//     ];

//     const sliderRef = useRef(null);

//     const sliderSettings = {
//         dots: true,
//         infinite: true,
//         speed: 500,
//         slidesToShow: 3,
//         slidesToScroll: 1,
//         responsive: [
//             {
//                 breakpoint: 1024, // medium
//                 settings: { slidesToShow: 2 }
//             },
//             {
//                 breakpoint: 640, // small
//                 settings: { slidesToShow: 1 }
//             }
//         ]
//     };

//     return (
//         <div className="w-full max-w-[82%] mx-auto mt-8 sm:mt-12 md:mt-28 px-4 sm:px-6 md:px-9 font-sans mb-10 relative">
//             {/* Header */}
//             <div className="w-full lg:w-[48%] mb-12 sm:mb-16">
//                 <img src={`${BASE_URL_SVG}/assets/svgs/crown-black.svg`} alt="Crown" className="w-16 sm:w-18 md:w-24 mb-3 sm:mb-4" />
//                 <h2 className="text-[28px] sm:text-[32px] md:text-[36px] font-abril leading-tight mb-3 sm:mb-4">
//                     What Our Clients Say
//                 </h2>
//                 <p className="font-Montserrat text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed text-black">
//                     Makkah Travel is here to help you visit religious places and make Umrah trips that connect with your soul.
//                 </p>
//             </div>

//             {/* Desktop/Laptop arrows */}
//             <span
//                 onClick={() => sliderRef.current.slickPrev()}
//                 className="hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2 bg-white cursor-pointer rounded-full p-2 shadow-md hover:scale-105 transition border border-gray-200 z-10"
//                 aria-label="Previous Slide"
//             >
//                 <img src={`${BASE_URL_SVG}/assets/svgs/arrow-left.svg`} alt="Left Arrow" className="w-5 h-5 sm:w-6 sm:h-6" />
//             </span>

//             <span
//                 onClick={() => sliderRef.current.slickNext()}
//                 className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 bg-white cursor-pointer rounded-full p-2 shadow-md hover:scale-105 transition border border-gray-200 z-10"
//                 aria-label="Next Slide"
//             >
//                 <img src={`${BASE_URL_SVG}/assets/svgs/arrow-right.svg`} alt="Right Arrow" className="w-5 h-5 sm:w-6 sm:h-6" />
//             </span>

//             {/* Slider */}
//             <Slider ref={sliderRef} {...sliderSettings}>
//                 {reviews.map((review, index) => (
//                     <div key={index} className="px-3">
//                         <TestimonialCard
//                             avatar={review.avatar}
//                             name={review.name}
//                             location={review.location}
//                             rating={review.star}
//                             text={review.reviews}
//                         />
//                     </div>
//                 ))}
//             </Slider>

//             {/* Mobile/Tablet arrows */}
//             <div className="flex justify-center gap-4 mt-6 md:hidden">
//                 <span
//                     onClick={() => sliderRef.current.slickPrev()}
//                     className="bg-white cursor-pointer rounded-full p-2 shadow-md hover:scale-105 transition border border-gray-200"
//                     aria-label="Previous Slide"
//                 >
//                     <img src={`${BASE_URL_SVG}/assets/svgs/arrow-left.svg`} alt="Left Arrow" className="w-5 h-5 sm:w-6 sm:h-6" />
//                 </span>
//                 <span
//                     onClick={() => sliderRef.current.slickNext()}
//                     className="bg-white cursor-pointer rounded-full p-2 shadow-md hover:scale-105 transition border border-gray-200"
//                     aria-label="Next Slide"
//                 >
//                     <img src={`${BASE_URL_SVG}/assets/svgs/arrow-right.svg`} alt="Right Arrow" className="w-5 h-5 sm:w-6 sm:h-6" />
//                 </span>
//             </div>
//         </div>
//     );
// }

import React, { useRef, useState, useEffect } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from "axios";
import Slider from 'react-slick';
import { BASE_URL_IMG, BASE_URL_SVG, endpoints } from '../../Helpers/apiEndpoints';
import parse from "html-react-parser";

const TestimonialCard = ({ avatar, name, location, rating, text }) => {
    const [showFullText, setShowFullText] = useState(false);

    const renderStars = (numStars) => {
        const starsToRender = Math.min(numStars, 5); // never more than 5

        return Array.from({ length: starsToRender }).map((_, i) => (
            <img
                key={i}
                src={`${BASE_URL_SVG}/assets/svgs/filledStar.svg`}
                alt="Filled Star"
                className="w-5 h-5"
                loading="lazy"
            />
        ));
    };


    const truncatedText = text.length > 120 && !showFullText
        ? text.substring(0, 135) + '...'
        : text;

    return (
        <div className="min-h-[350px] sm:min-h-[400px]"> {/* outer wrapper for spacing */}
            <div className="relative w-full">
                {/* Avatar */}
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-10">
                    <img
                        src={avatar ? `${BASE_URL_IMG}/${avatar}` : `${BASE_URL_SVG}/assets/svgs/user.svg`}
                        alt={name}
                        className="w-24 h-24 rounded-full object-cover hover:border-black hover:border-4  shadow-lg"
                    />
                </div>

                {/* Card */}
                <div className="mt-16 relative shadow-md p-6 pt-16 w-full flex flex-col bg-gray-100 rounded-lg min-h-[280px]">
                    {/* Text Section */}
                    <div className="text-start font-Montserrat text-black leading-relaxed flex-1">
                        <p>{parse(truncatedText)}</p>
                    </div>

                    {/* Footer Section */}
                    <div className="flex flex-col sm:flex-row items-center justify-between w-full mt-6 pt-4 border-t border-gray-200">
                        <div className="flex flex-col items-center sm:items-start mb-4 sm:mb-0">
                            <div className="flex justify-between items-center gap-2">
                                <div className="font-semibold text-lg font-Montserrat text-black">{name}</div>
                                <div className="flex">{renderStars(Number(rating))}</div>
                            </div>
                            <div className="text-sm font-Montserrat text-black">{location}</div>
                        </div>

                        {text.length > 200 && (
                            <button
                                onClick={() => setShowFullText(!showFullText)}
                                className="text-secondary cursor-pointer hover:text-green-700 font-medium flex items-center transition-colors duration-200 ease-in-out"
                            >
                                {showFullText ? 'Show Less' : 'Show More'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>


    );
};

export default function Testimonials({ pageData }) {
    const [heading, setHeading] = useState("");
    const [subHeading, setSubHeading] = useState("");
    const [reviewsData, setReviewsData] = useState([]);
    const sliderRef = useRef(null);

    useEffect(() => {
        if (pageData?.ourclientsays_widget?.length > 0) {
            const widget = pageData.ourclientsays_widget[0];
            setHeading(widget.heading || "");
            setSubHeading(widget.sub_heading || "");

            // Convert comma-separated string into number array
            const ids = widget.reviews_ids
                .split(",")
                .map(id => Number(id.trim()))
                .filter(id => !isNaN(id));

            if (ids.length > 0) {
                axios.get(endpoints.getReviews(ids))
                    .then(res => {
                        if (res.data?.status === 1) {
                            setReviewsData(res.data.result.reviews || []);
                        }
                    })
                    .catch(err => console.error("Error fetching reviews:", err.response?.data || err.message));
            }
        }
    }, [pageData]);


    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        autoplay: false,
        autoplaySpeed: 3000,
        slidesToScroll: 1,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 640, settings: { slidesToShow: 1 } }
        ]
    };

    return (
        <div className="w-full max-w-[82%] mx-auto mt-8 sm:mt-12 md:mt-28 sm:px-2 md:px-9 font-sans mb-10 relative">
            {/* Header */}
            <div className="w-full lg:w-[48%] mb-12 sm:mb-16">
                <img src={`${BASE_URL_SVG}/assets/svgs/crown-black.svg`} alt="Crown" className="w-16 sm:w-18 md:w-24 mb-3 sm:mb-4" />
                {heading && (
                    <h2 className="text-[28px] sm:text-[32px] md:text-[36px] font-abril leading-tight mb-3 sm:mb-4">
                        {heading}
                    </h2>
                )}
                {subHeading && (
                    <p className="font-Montserrat text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed text-black">
                        {subHeading}
                    </p>
                )}
            </div>
            <span
                onClick={() => sliderRef.current.slickPrev()}
                className="hidden md:flex absolute -left-6 top-[60%] -translate-y-1/2 bg-white cursor-pointer rounded-full p-2 shadow-md hover:scale-105 transition border border-gray-200 z-10"
                aria-label="Previous Slide"
            >
                <img src={`${BASE_URL_SVG}/assets/svgs/arrow-left.svg`} alt="Left Arrow" className="w-5 h-5 sm:w-6 sm:h-6" />
            </span>

            <span
                onClick={() => sliderRef.current.slickNext()}
                className="hidden md:flex absolute -right-6 top-[60%] -translate-y-1/2 bg-white cursor-pointer rounded-full p-2 shadow-md hover:scale-105 transition border border-gray-200 z-10"
                aria-label="Next Slide"
            >
                <img src={`${BASE_URL_SVG}/assets/svgs/arrow-right.svg`} alt="Right Arrow" className="w-5 h-5 sm:w-6 sm:h-6" />
            </span>

            {/* Slider */}
            <Slider ref={sliderRef} {...sliderSettings}>
                {reviewsData.map((review) => (
                    <div key={review.id} className="px-3">
                        <TestimonialCard
                            avatar={review.image_url}
                            name={review.publisher}
                            location={review.address}
                            rating={review.rating}
                            text={review.review} // strip HTML tags
                        />
                    </div>
                ))}
            </Slider>
            <div className="flex justify-center gap-4 mt-6 md:hidden">
                <span
                    onClick={() => sliderRef.current.slickPrev()}
                    className="bg-white cursor-pointer rounded-full p-2 shadow-md hover:scale-105 transition border border-gray-200"
                    aria-label="Previous Slide"
                >
                    <img src={`${BASE_URL_SVG}/assets/svgs/arrow-left.svg`} alt="Left Arrow" className="w-5 h-5 sm:w-6 sm:h-6" />
                </span>
                <span
                    onClick={() => sliderRef.current.slickNext()}
                    className="bg-white cursor-pointer rounded-full p-2 shadow-md hover:scale-105 transition border border-gray-200"
                    aria-label="Next Slide"
                >
                    <img src={`${BASE_URL_SVG}/assets/svgs/arrow-right.svg`} alt="Right Arrow" className="w-5 h-5 sm:w-6 sm:h-6" />
                </span>
            </div>
        </div>
    );
}

