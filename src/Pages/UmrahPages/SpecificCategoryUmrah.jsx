import React, { useState, useEffect, useMemo } from "react";
import HeroSection from "../../Components/CommonComponents/HeroSection";
import PackageCard from "../../Components/CommonComponents/PackageCard";
import ViewAllButton from "../../Components/CommonComponents/ViewAllButton";
import ScrollDetail from "../../Components/CommonComponents/ScrollDetail";
import FAQSection from "../../Components/CommonComponents/FAQSection";
import { BASE_URL_SVG, endpoints } from "../../Helpers/apiEndpoints";
import axios from "axios";

export default function SpecificCategoryUmrah({ pageData }) {
    const { section_1_widget } = pageData;

    useEffect(() => {
        document.title = pageData.browser_title;
    }, [pageData.browser_title]);

    const sections = useMemo(
        () => [...(section_1_widget || [])],
        [section_1_widget]
    );

    const [visibleCount, setVisibleCount] = useState(9);
    const [packagesData, setPackagesData] = useState([]);

    const fetchPackages = async (widget) => {
        try {
            if (widget.umrah_package_ids) {
                const ids = widget.umrah_package_ids
                    .split(",")
                    .map((id) => id.trim())
                    .filter(Boolean);

                if (!ids.length) return [];

                try {
                    const res = await axios.get(endpoints.umrahById(ids.join(",")));
                    console.log("Umrah by IDs response:", res.data);

                    // Response shape: result.data
                    if (Array.isArray(res.data?.result?.data)) {
                        return res.data.result.data;
                    }
                    return [];
                } catch (err) {
                    console.error("Error fetching Umrah by IDs:", err);
                    return [];
                }
            }


            if (widget.star && widget.star !== "0") {
                const res = await axios.get(endpoints.umrahByStar(widget.star, widget.umrah_type));
                return Array.isArray(res.data?.result?.packages?.data)
                    ? res.data.result.packages.data
                    : [];
            }

            if (widget.umrah_type) {
                const res = await axios.get(endpoints.umrahByType(Number(widget.umrah_type)));
                return Array.isArray(res.data?.result?.packages?.data)
                    ? res.data.result.packages.data
                    : [];
            }

            return [];
        } catch (err) {
            console.error("Error fetching Umrah packages:", err);
            return [];
        }
    };


    useEffect(() => {
        async function loadPackages() {
            const results = await Promise.all(
                sections.map(async (widget) => {
                    const packages = await fetchPackages(widget);
                    return { ...widget, packages };
                })
            );
            // flatten all packages
            const flattened = results.flatMap((section) => section.packages);
            setPackagesData(flattened);
        }

        if (sections.length > 0) {
            loadPackages();
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
