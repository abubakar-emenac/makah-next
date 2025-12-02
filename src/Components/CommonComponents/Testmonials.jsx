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


    const truncatedText = text.length > 140 && !showFullText
        ? text.substring(0, 130) + '...'
        : text;

    return (
        <div className="min-h-[350px] sm:min-h-[400px]"> {/* outer wrapper for spacing */}
            <div className="relative w-full">
                {/* Avatar */}
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-10">
                    <img
                        src={avatar ? `${BASE_URL_IMG}/${avatar}` : `${BASE_URL_SVG}/assets/svgs/user.svg`}
                        alt={name}
                        className="w-24 h-24 rounded-full object-fill hover:border-black hover:border-4  shadow-lg"
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
                ? widget.reviews_ids.split(",").map(id => Number(id.trim())).filter(id => !isNaN(id))
                : [];


            if (ids.length > 0) {
                axios.get(endpoints.getReviews(ids.join(",")))
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
                <img src={`${BASE_URL_SVG}/assets/svgs/arrow-right.svg`} alt="Left Arrow" className="w-5 h-5 sm:w-6 sm:h-6 rotate-180" />
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

