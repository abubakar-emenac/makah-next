import React, { useState, useEffect, useMemo } from "react";
import HeroSection from "../../Components/CommonComponents/HeroSection";
import PackageCard from "../../Components/CommonComponents/PackageCard";
import ViewAllButton from "../../Components/CommonComponents/ViewAllButton";
import ScrollDetail from "../../Components/CommonComponents/ScrollDetail";
import FAQSection from "../../Components/CommonComponents/FAQSection";
import { BASE_URL_SVG, endpoints } from "../../Helpers/apiEndpoints";

export default function SpecificCategoryUmrah({ pageData }) {
    const { section_1_widget, section_2_widget, section_3_widget } = pageData;

    useEffect(() => {
        document.title = pageData.browser_title;
    }, [pageData.browser_title]);

    const sections = useMemo(
        () => [
            ...(section_1_widget || []),
            ...(section_2_widget || []),
            ...(section_3_widget || []),
        ],
        [section_1_widget, section_2_widget, section_3_widget]
    );

    const [visibleCount, setVisibleCount] = useState(9);
    const [packagesData, setPackagesData] = useState([]);

    useEffect(() => {
        async function fetchPackages() {
            const results = await Promise.all(
                sections.map(async (widget) => {
                    const { umrah_type, umrah_package_ids, star } = widget;

                    let url = "";
                    if (umrah_package_ids) {
                        url = endpoints.umrahById(umrah_package_ids);
                    } else if (star && star !== "0") {
                        url = endpoints.umrahByStar(star, umrah_type);
                    } else {
                        url = endpoints.umrahByType(umrah_type);
                    }

                    const res = await fetch(url);
                    const data = await res.json();

                    const packages = data?.result?.packages?.data || [];

                    return { ...widget, packages };
                })
            );

            // flatten all package arrays into a single array
            const flattened = results.flatMap((section) => section.packages);
            setPackagesData(flattened);
        }

        if (sections.length > 0) {
            fetchPackages();
        }
    }, [sections]);

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 9);
    };

    return (
        <div className="flex flex-col mb-4">
            <HeroSection pageData={pageData} />

            <div className="w-full max-w-[90%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-[75%] mx-auto pt-8 mb-20">
                {/* Header */}
                <div className="w-full lg:w-[45%] flex flex-col justify-start">
                    <img
                        src={`${BASE_URL_SVG}/assets/svgs/crown-black.svg`}
                        alt="Crown"
                        className="w-16 sm:w-18 md:w-20 mb-3 sm:mb-4"
                    />
                    <h2 className="text-[28px] sm:text-[32px] md:text-[36px] font-abril leading-tight mb-3 sm:mb-4">
                        {sections[0]?.heading || "Umrah Packages"}
                    </h2>
                </div>

                {/* Package Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-rows-2 lg:grid-cols-3 gap-6 mt-10">
                    {packagesData.slice(0, visibleCount).map((pkg, index) => (
                        <PackageCard key={index} p_type="umrah" pkg={pkg} />
                    ))}
                </div>

                {/* Load More Button */}
                {visibleCount < packagesData.length && (
                    <div className="w-full flex justify-center mt-10">
                        <ViewAllButton
                            label="Load More Packages"
                            onClick={handleLoadMore}
                            color="primary"
                            size="md"
                        />
                    </div>
                )}
            </div>

            <div className="w-full max-w-[75%] mx-auto">
                <ScrollDetail pageData={pageData} />
            </div>

            <FAQSection pageData={pageData} />
        </div>
    );
}
