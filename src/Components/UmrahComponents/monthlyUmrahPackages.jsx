import React, { useRef, useState } from 'react';
import ViewAllButton from '../CommonComponents/ViewAllButton';
import PackageCard from '../CommonComponents/PackageCard';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import data from '../../data/dummyData.json';

export default function MonthlyUmrahPackages({ title = ' December Umrah Deals', subtitle = `Makkah Travel is here to help you visit religious places and make Umrah trips that connect with your soul. We're experts at creating meaningful journeys. `, button = 'on', carperrow = 4 }) {
    const sliderRef = useRef(null);
    // const [currentSlide, setCurrentSlide] = useState(0);


    const handleNext = () => {
        if (sliderRef.current) {
            sliderRef.current.slickNext();
        }
    };

    const handlePrev = () => {
        if (sliderRef.current) {
            sliderRef.current.slickPrev();
        }
    };

    // const slickSettings = {
    //     dots: false,
    //     infinite: true,
    //     speed: 700,
    //     slidesToShow: 1, // mobile-first
    //     slidesToScroll: 1,
    //     autoplay: false,
    //     arrows: false,
    //     responsive: [
    //         {
    //             breakpoint: 480, // mobile
    //             settings: {
    //                 slidesToShow: 1,
    //                 slidesToScroll: 1,
    //             }
    //         },
    //         {
    //             breakpoint: 768, // tablet
    //             settings: {
    //                 slidesToShow: 1.7,
    //                 slidesToScroll: 1,
    //             }
    //         },
    //         {
    //             breakpoint: 1024, // small laptops
    //             settings: {
    //                 slidesToShow: 4,
    //                 slidesToScroll: 1,
    //             }
    //         },
    //         {
    //             breakpoint: 1280, // desktop
    //             settings: {
    //                 slidesToShow: 4,
    //                 slidesToScroll: 1,
    //             }
    //         },
    //     ],
    // };
    const slickSettings = {
        dots: false,
        infinite: true,
        speed: 700,
        slidesToShow: 4, // desktop default
        slidesToScroll: 1,
        autoplay: false,
        arrows: false,
        responsive: [
            {
                breakpoint: 1280, // ≤ 1280px
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1024, // ≤ 1024px
                settings: {
                    slidesToShow: 2.5,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768, // ≤ 768px
                settings: {
                    slidesToShow: 1.7,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480, // ≤ 480px
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ],
    };



    return (
        <div className="w-full mt-8 sm:mt-12 md:mt-16 px-2 sm:px-6 md:px-2">
            {/* Header Section */}
            <div className="flex flex-col px-2 lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-0">
                <div className="w-full lg:w-[45%] flex flex-col justify-start">
                    <img src="/svg/crown-black.svg" alt="Crown" className="w-16 sm:w-18 md:w-20 mb-3 sm:mb-4" />
                    <h2 className="text-[28px] sm:text-[32px] md:text-[36px] font-abril leading-tight mb-3 sm:mb-4">
                        {title}
                    </h2>
                    <span className="font-Montserrat text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed text-black max-w-md">
                        {subtitle}
                    </span>
                </div>

                <div className="w-full lg:w-[45%] flex justify-start lg:justify-end">
                    <div className="flex items-center gap-3 flex-wrap">
                        <ViewAllButton color="primary" slug="/" size="md" />
                        <div className="flex items-center gap-3">
                            <span
                                onClick={handlePrev}
                                className="bg-white cursor-pointer rounded-full p-2 shadow-md hover:scale-105 transition border border-gray-200"
                                aria-label="Previous Slide"
                            >
                                <img src="/svg/arrow-left.svg" alt="Left Arrow" className="w-5 h-5 sm:w-6 sm:h-6" />
                            </span>
                            <span
                                onClick={handleNext}
                                className="bg-white cursor-pointer rounded-full p-2 shadow-md hover:scale-105 transition border border-gray-200"
                                aria-label="Next Slide"
                            >
                                <img src="/svg/arrow-right.svg" alt="Right Arrow" className="w-5 h-5 sm:w-6 sm:h-6" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Slider Section */}
            <div className="mt-6 sm:mt-7 md:mt-8">
                <Slider {...slickSettings} ref={sliderRef} className="w-full">
                    {data.map((item, index) => (
                        <div key={index} className="px-2">
                            <PackageCard
                                description={item.description}
                                night={item.night}
                                star={item.star}
                                price={item.price}
                            />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}
