import React, { useState, useEffect, useMemo, useRef } from "react";
import HeroSection from "../../Components/CommonComponents/HeroSection";
import ViewAllButton from "../../Components/CommonComponents/ViewAllButton";
import FAQSection from "../../Components/CommonComponents/FAQSection";
import { BASE_URL_SVG, endpoints } from "../../Helpers/apiEndpoints";
import PackageCardUmrah from "../../Components/UmrahComponents/PackageCardUmrah";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import ScrollDetail from "../../Components/CommonComponents/ScrollDetail";
import { SliderSkeleton } from "../../Components/CommonComponents/Skeleton";

const UmrahStarSection = ({ packages = [], section }) => {
    const sliderRef = useRef(null);

    const slickSettings = {
        dots: false,
        infinite: true,
        speed: 700,
        slidesToShow: 1, 
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 3000,
        arrows: false,
        responsive: [
            {
                breakpoint: 1380, // ≤ 1280px
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1280, // ≤ 1280px
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            
            {
                breakpoint: 1000, // ≤ 1024px
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768, // ≤ 768px
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 576, // ≤ 480px
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            }
        ],
    };

    return (
        <div className="w-full max-w-full sm:max-w-[90%] lg:max-w-[85%] mx-auto mt-12">
            {/* Header */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 sm:gap-6">
                {/* Title */}
                <div className="w-full lg:w-[45%] ml-4 flex flex-col justify-start">
                    <img
                        src={`${BASE_URL_SVG}/assets/svgs/crown-black.svg`}
                        alt="Crown"
                        className="w-14 sm:w-16 md:w-20 mb-2 sm:mb-3"
                    />
                    <h2 className="text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] font-abril leading-tight mb-2 sm:mb-3">
                        {section.heading}
                    </h2>
                    {section.subheading && (
                        <p className="text-gray-600 text-sm sm:text-base">
                            {section.subheading}
                        </p>
                    )}
                </div>

                {/* View All + Arrows */}
                <div className="w-full lg:w-[45%] flex flex-wrap sm:flex-nowrap ml-4 justify-start lg:justify-end gap-2 sm:gap-3 items-center">
                    {section.button_text && section.button_link && (
                        <ViewAllButton
                            color="primary"
                            slug={section.button_link}
                            size="md"
                            label={section.button_text}
                        />
                    )}

                    {/* Prev & Next Arrows */}
                    <button
                        onClick={() => sliderRef.current?.slickPrev()}
                        className="bg-white rounded-full p-2 sm:p-3 shadow border border-gray-200 flex-shrink-0"
                    >
                        <img src={`${BASE_URL_SVG}/assets/svgs/arrow-right.svg`} alt="Left Arrow" className="w-5 h-5 sm:w-6 sm:h-6 rotate-180" />
                    </button>
                    <button
                        onClick={() => sliderRef.current?.slickNext()}
                        className="bg-white rounded-full p-2 sm:p-3 shadow border border-gray-200 flex-shrink-0"
                    >
                        <img
                            src={`${BASE_URL_SVG}/assets/svgs/arrow-right.svg`}
                            alt="Next"
                            className="w-5 sm:w-6 h-5 sm:h-6"
                        />
                    </button>
                </div>
            </div>

            {/* Slider */}
            <div className="mt-4 sm:mt-6">
                {packages.length > 0 ? (
                    <Slider {...slickSettings} ref={sliderRef}>
                        {packages.map((pkg, index) => (
                            <div key={index} className="px-1 sm:px-2">
                                <PackageCardUmrah data={pkg} />
                            </div>
                        ))}
                    </Slider>
                ) : (
                    <p className="col-span-full text-center text-gray-500">
                        No packages available
                    </p>
                )}
            </div>
        </div>
    );
};

export default function UmrahPackageStar({ pageData }) {
    const { section_1_widget, section_2_widget, section_3_widget } = pageData;

    const sections = useMemo(
        () => [
            ...(section_1_widget || []),
            ...(section_2_widget || []),
            ...(section_3_widget || []),
        ],
        [section_1_widget, section_2_widget, section_3_widget]
    );

    const [packagesData, setPackagesData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPackages() {
            setLoading(true);
            try {
                const results = await Promise.all(
                    sections.map(async (widget) => {
                        try {
                            let packages = [];

                            if (widget.umrah_package_ids) {
                                const ids = widget.umrah_package_ids
                                    .split(",")
                                    .map((id) => id.trim())
                                    .filter(Boolean);

                                if (ids.length > 0) {
                                    const res = await axios.get(endpoints.umrahById(ids.join(",")));
                                    packages = Array.isArray(res.data?.result?.data)
                                        ? res.data.result.data
                                        : [];
                                }
                            } else if (widget.star && widget.star !== "0") {
                                const res = await axios.get(endpoints.umrahByStar(widget.star, widget.umrah_type));
                                packages = Array.isArray(res.data?.result?.packages?.data)
                                    ? res.data.result.packages.data
                                    : [];
                            } else if (widget.umrah_type) {
                                const res = await axios.get(endpoints.umrahByType(widget.umrah_type));
                                packages = Array.isArray(res.data?.result?.packages?.data)
                                    ? res.data.result.packages.data
                                    : [];
                            }

                            return { ...widget, packages };
                        } catch (err) {
                            console.error("Error fetching packages for widget:", widget, err);
                            return { ...widget, packages: [] };
                        }
                    })
                );

                setPackagesData(results);
            } catch (error) {
                console.error("Error in fetchPackages:", error);
            } finally {
                setLoading(false);
            }
        }

        if (sections.length > 0) {
            fetchPackages();
        } else {
            setLoading(false);
        }
    }, [sections]);


    return (
        <div className="flex flex-col w-full">
            <HeroSection pageData={pageData} />
            
            <div className="flex flex-col my-8 w-full max-w-full md:max-w-[88%] mx-auto">
                {loading ? (
                    <div className="space-y-12">
                        {[...Array(sections.length || 2)].map((_, i) => (
                            <div key={i} className="space-y-6">
                                <div className="ml-4 space-y-4">
                                    <div className="w-20 h-20 skeleton-shimmer rounded-xl" />
                                    <div className="w-64 h-10 skeleton-shimmer rounded" />
                                </div>
                                <SliderSkeleton count={4} />
                            </div>
                        ))}
                    </div>
                ) : (
                    packagesData.map((section, idx) => (
                        <UmrahStarSection
                            key={idx}
                            packages={section.packages}
                            section={section}
                        />
                    ))
                )}
            </div>
            {!loading && packagesData.length > 0 && pageData?.scroll_description && (
                <ScrollDetail pageData={pageData} />
            )}
            {!loading && packagesData.length > 0 && Array.isArray(pageData?.faqs) && pageData.faqs.length > 0 && (
                <FAQSection pageData={pageData} />
            )}
        </div>
    );
}
