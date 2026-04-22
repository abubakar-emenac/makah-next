import React, { useRef, useState, useEffect } from 'react';
import HeroSection from '../../Components/CommonComponents/HeroSection';
import Slider from 'react-slick';
import axios from 'axios';
import { BASE_URL_SVG, endpoints } from '../../Helpers/apiEndpoints';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ScrollDetail from '../../Components/CommonComponents/ScrollDetail';
import FAQSection from '../../Components/CommonComponents/FAQSection';
import ViewAllButton from '../../Components/CommonComponents/ViewAllButton';
import HajjPackageCard from '../../Components/HajjComponents/HajjPackageCard';

export default function HajjPackage({ pageData }) {
    const sliderRefs = {
        section1: useRef(null),
        section2: useRef(null),
    };

    const [packagesData, setPackagesData] = useState({ section1: [], section2: [] });

    const fetchPackages = async (widget) => {
        try {
            if (widget.hajj_package_ids) {
                const ids = widget.hajj_package_ids
                    .split(",")
                    .map((id) => Number(id.trim()))
                    .filter(Boolean);
                if (!ids.length) return [];
                const res = await axios.get(endpoints.hajjById(ids.join(",")));
                return Array.isArray(res.data?.result?.packages?.data)
                    ? res.data.result.packages.data
                    : [];
            }

            if (widget.hajj_type) {
                const res = await axios.get(endpoints.hajjByType(Number(widget.hajj_type)));
                return Array.isArray(res.data?.result?.packages?.data)
                    ? res.data.result.packages.data
                    : [];
            }

            return [];
        } catch (err) {
            console.error("Error fetching Hajj packages:", err);
            return [];
        }
    };

    useEffect(() => {
        const loadPackages = async () => {
            const [section1, section2] = await Promise.all([
                pageData.section_1_widget?.[0] ? fetchPackages(pageData.section_1_widget[0]) : [],
                pageData.section_2_widget?.[0] ? fetchPackages(pageData.section_2_widget[0]) : [],
            ]);
            setPackagesData({ section1, section2 });
        };
        loadPackages();
    }, [pageData]);

    const slickSettings = {
        dots: false,
        infinite: true,
        speed: 700,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false,
        arrows: false,
        responsive: [
            { breakpoint: 1280, settings: { slidesToShow: 4 } },
            { breakpoint: 1024, settings: { slidesToShow: 2.5 } },
            { breakpoint: 768, settings: { slidesToShow: 1.7 } },
            { breakpoint: 480, settings: { slidesToShow: 1 } },
        ],
    };

    const renderPackageSection = (widget, packages, sliderRef, key) => {
        if (!widget || packages.length === 0) return null;

        return (
            <div key={key} className="w-full max-w-[95%] sm:max-w-[90%] lg:max-w-[85%] mx-auto mt-10 sm:mt-16">
                {/* Header */}
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 sm:gap-6">
                    {/* Title & Subtitle */}
                    <div className="w-full lg:w-[45%] flex flex-col justify-start">
                        <img
                            src={`${BASE_URL_SVG}/assets/svgs/crown-black.svg`}
                            alt="Crown"
                            className="w-14 sm:w-16 md:w-20 mb-2 sm:mb-3"
                        />
                        <h2 className="text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] font-abril leading-tight mb-2 sm:mb-3">
                            {widget.heading}
                        </h2>
                        {widget.subheading && <p className="text-gray-600 text-sm sm:text-base">{widget.subheading}</p>}
                    </div>

                    {/* View All + Arrows */}
                    <div className="w-full lg:w-[45%] flex flex-wrap sm:flex-nowrap justify-start lg:justify-end gap-2 sm:gap-3 items-center">
                        {widget.button_text && widget.button_link && (
                            <ViewAllButton
                                color="primary"
                                slug={widget.button_link}
                                size="sm"
                                label={widget.button_text}
                            />
                        )}

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
                            <img src={`${BASE_URL_SVG}/assets/svgs/arrow-right.svg`} alt="Left Arrow" className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                    </div>
                </div>

                {/* Slider */}
                <div className="mt-4 sm:mt-6">
                    <Slider {...slickSettings} ref={sliderRef}>
                        {packages.map((item, index) => (
                            <div key={index} className="px-1 sm:px-2">
                                <HajjPackageCard data={item} />
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        );
    };

    return (
        <div className="pb-10 sm:pb-14 lg:pb-20">
            <HeroSection pageData={pageData} />

            {renderPackageSection(
                pageData.section_1_widget?.[0],
                packagesData.section1,
                sliderRefs.section1,
                "section1"
            )}

            {renderPackageSection(
                pageData.section_2_widget?.[0],
                packagesData.section2,
                sliderRefs.section2,
                "section2"
            )}

            {pageData?.scroll_description && (
                <ScrollDetail pageData={pageData} />
            )}

            {Array.isArray(pageData?.faqs) && pageData.faqs.length > 0 && (
                <FAQSection pageData={pageData} />
            )}
        </div>
    );
}

