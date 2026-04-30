import React, { useState, useEffect, useMemo } from "react";
import HeroSection from "../../Components/CommonComponents/HeroSection";
import PackageCard from "../../Components/CommonComponents/PackageCard";
import ViewAllButton from "../../Components/CommonComponents/ViewAllButton";
import ScrollDetail from "../../Components/CommonComponents/ScrollDetail";
import FAQSection from "../../Components/CommonComponents/FAQSection";
import { BASE_URL_SVG, endpoints } from "../../Helpers/apiEndpoints";
import axios from "axios";
import { Skeleton } from "../../Components/CommonComponents/Skeleton";

export default function SpecificCategoryUmrah({ pageData }) {
    const { section_1_widget } = pageData;

    const sections = useMemo(
        () => [...(section_1_widget || [])],
        [section_1_widget]
    );

    const [visibleCount, setVisibleCount] = useState(9);
    const [packagesData, setPackagesData] = useState([]);
    const [loading, setLoading] = useState(true);

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
            setLoading(true);
            try {
                const results = await Promise.all(
                    sections.map(async (widget) => {
                        const packages = await fetchPackages(widget);
                        return { ...widget, packages };
                    })
                );
                const flattened = results.flatMap((section) => section.packages);
                setPackagesData(flattened);
            } catch (error) {
                console.error("Error in loadPackages:", error);
            } finally {
                setLoading(false);
            }
        }

        if (sections.length > 0) {
            loadPackages();
        } else {
            setLoading(false);
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

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="space-y-4">
                                <Skeleton className="w-full h-[250px] rounded-2xl" />
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-rows-2 lg:grid-cols-3 gap-6 mt-10">
                            {packagesData.slice(0, visibleCount).map((pkg, index) => (
                                <PackageCard key={index} p_type="umrah" pkg={pkg} />
                            ))}
                        </div>

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
                    </>
                )}
            </div>
            {!loading && pageData?.scroll_description && (
                <ScrollDetail pageData={pageData} />
            )}

            {!loading && Array.isArray(pageData?.faqs) && pageData.faqs.length > 0 && (
                <FAQSection pageData={pageData} />
            )}
        </div>
    );
}
