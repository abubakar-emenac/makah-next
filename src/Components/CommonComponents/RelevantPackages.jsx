import React, { useRef, useState, useEffect } from 'react';
import ViewAllButton from '../CommonComponents/ViewAllButton';
import PackageCard from '../CommonComponents/PackageCard';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BASE_URL_SVG, endpoints } from '../../Helpers/apiEndpoints';
import axios from 'axios';
export default function RelevantPackages({ pageData }) {
    const sliderRef = useRef(null);
    const [packages, setPackages] = useState([]);
    const [type, setType] = useState();
    const widgetData = pageData?.section_2_widget?.[0];
    // const [currentSlide, setCurrentSlide] = useState(0);
    useEffect(() => {
        const fetchPackages = async () => {
            try {
                let response;
                if (widgetData?.umrah_type !== undefined) {
                    setType("umrah")
                    if (widgetData?.umrah_package_ids) {
                        response = await axios.get(
                            endpoints.umrahById(widgetData.umrah_package_ids)
                        );
                    } else if (widgetData?.star && Number(widgetData.star) > 0) {
                        const stars = Number(widgetData.star);
                        const type = Number(widgetData.umrah_type);
                        response = await axios.get(endpoints.umrahByStar(stars, type));
                    }
                    else if (widgetData?.umrah_type) {
                        response = await axios.get(
                            endpoints.umrahByType(widgetData.umrah_type)
                        );
                    } else {
                        response = await axios.get(endpoints.getUmrah);
                    }
                }
                else if (widgetData?.hajj_type !== undefined) {
                    setType("hajj")
                    if (widgetData?.hajj_package_ids) {
                        response = await axios.get(
                            endpoints.hajjById(widgetData.hajj_package_ids)
                        );
                    } else if (widgetData?.star && Number(widgetData.star) > 0) {
                        const stars = Number(widgetData.star);
                        const type = Number(widgetData.hajj_type);
                        response = await axios.get(endpoints.hajjByStar(stars, type));
                    }
                    else if (widgetData?.hajj_type) {
                        response = await axios.get(
                            endpoints.hajjByType(widgetData.hajj_type)
                        );
                    } else {
                        response = await axios.get(endpoints.getHajj);
                    }
                }
                else {
                    response = await axios.get(endpoints.getUmrah);
                }

                setPackages(response.data?.result?.data || []);
            } catch (error) {
                console.error("Error fetching packages:", error);
            }
        };

        fetchPackages();
    }, [widgetData]);

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
    const slickSettings = {
        dots: false,
        infinite: true,
        speed: 700,
        slidesToShow: 3, // desktop default
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 3000,
        arrows: false,
        responsive: [
            {
                breakpoint: 1380, // ≤ 1280px
                settings: {
                    slidesToShow: 2.5,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1280, // ≤ 1280px
                settings: {
                    slidesToShow: 2.5,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1024, // ≤ 1024px
                settings: {
                    slidesToShow: 2,
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
                    <img src={`${BASE_URL_SVG}/assets/svgs/crown-black.svg`} alt="Crown" className="w-16 sm:w-18 md:w-20 mb-3 sm:mb-4" />
                    <h2 className="text-[28px] sm:text-[32px] md:text-[36px] font-abril leading-tight mb-3 sm:mb-4">
                        {widgetData.heading}
                    </h2>
                    <span className="font-Montserrat text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed text-black max-w-2xl">
                        {widgetData.subheading}
                    </span>
                </div>

                <div className="w-full lg:w-[45%] flex justify-start lg:justify-end">
                    <div className="flex items-center gap-3 flex-wrap">
                        <ViewAllButton color="primary" slug={widgetData.button_link} label={widgetData.button_text} size="md" />
                        <div className="flex items-center gap-3">
                            <span
                                onClick={handlePrev}
                                className="bg-white cursor-pointer rounded-full p-2 shadow-md hover:scale-105 transition border border-gray-200"
                                aria-label="Previous Slide"
                            >
                                <img src={`${BASE_URL_SVG}/assets/svgs/arrow-right.svg`} alt="Left Arrow" className="w-5 h-5 sm:w-6 sm:h-6 rotate-180" />
                            </span>
                            <span
                                onClick={handleNext}
                                className="bg-white cursor-pointer rounded-full p-2 shadow-md hover:scale-105 transition border border-gray-200"
                                aria-label="Next Slide"
                            >
                                <img src={`${BASE_URL_SVG}/assets/svgs/arrow-right.svg`} alt="Right Arrow" className="w-5 h-5 sm:w-6 sm:h-6" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Slider Section */}
            <div className="mt-6 sm:mt-7 md:mt-8">
                <Slider {...slickSettings} ref={sliderRef} className="w-full">
                    {packages.map((item, index) => (
                        <div key={index} className="px-2">
                            <PackageCard pkg={item} p_type={type} />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}
