import React, { useEffect, useState } from 'react';
import HeroSection from '../../Components/CommonComponents/HeroSection';
import PackageCard from '../../Components/CommonComponents/PackageCard';
import ViewAllButton from '../../Components/CommonComponents/ViewAllButton';
import ScrollDetail from '../../Components/CommonComponents/ScrollDetail';
import FAQSection from '../../Components/CommonComponents/FAQSection';
import axios from 'axios';
import { BASE_URL_SVG, endpoints } from '../../Helpers/apiEndpoints';

export default function SpecificCategoryHajj({ pageData }) {
    document.title = pageData.browser_title;

    const [packages, setPackages] = useState([]);
    const [visibleCount, setVisibleCount] = useState(9);
    const [loading, setLoading] = useState(true);
    const [widget, setWidget] = useState(null);

    const fetchPackages = async (widget) => {
        try {
            if (widget.hajj_package_ids) {
                const ids = widget.hajj_package_ids
                    .split(',')
                    .map((id) => Number(id.trim()))
                    .filter(Boolean);

                if (!ids.length) return [];

                try {
                    const res = await axios.get(endpoints.hajjById(ids.join(',')));

                    // ✅ Correct response shape
                    return Array.isArray(res.data?.result?.data)
                        ? res.data.result.data
                        : [];
                } catch (err) {
                    console.error("Error fetching Hajj packages:", err);
                    return [];
                }
            }


            if (widget.hajj_type) {
                try {
                    const res = await axios.get(endpoints.hajjByType(Number(widget.hajj_type)));

                    return Array.isArray(res.data?.result?.data)
                        ? res.data.result.data
                        : [];
                } catch (err) {
                    console.error("Error fetching Hajj packages:", err);
                    return [];
                }
            }


            return [];
        } catch (err) {
            console.error('Error fetching Hajj packages:', err);
            return [];
        }
    };

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);

            // Pick section_1_widget or section_2_widget
            const selectedWidget =
                pageData.section_1_widget?.[0] ||
                pageData.section_2_widget?.[0] ||
                null;

            setWidget(selectedWidget);

            if (!selectedWidget) {
                setPackages([]);
                setLoading(false);
                return;
            }

            const pkg = await fetchPackages(selectedWidget);
            setPackages(pkg);
            setLoading(false);
        };

        loadData();
    }, [pageData]);


    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 9);
    };



    return (
        <div className="flex flex-col mb-4">
            <HeroSection pageData={pageData} />

            <div className="w-full max-w-[90%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-[75%] mx-auto pt-8">
                {/* Header */}
                <div className="w-full lg:w-[45%] flex flex-col justify-start">
                    <img
                        src={`${BASE_URL_SVG}/assets/svgs/crown-black.svg`}
                        alt="Crown"
                        className="w-16 sm:w-18 md:w-20 mb-3 sm:mb-4"
                    />
                    <h2 className="text-[28px] sm:text-[32px] md:text-[36px] font-abril leading-tight mb-3 sm:mb-4">
                        {widget.heading}
                    </h2>
                </div>

                {/* Package Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                    {packages.slice(0, visibleCount).map((pkg) => (
                        <PackageCard key={pkg.id} pkg={pkg} p_type="hajj" />
                    ))}
                </div>


                {/* Load More Button */}
                {visibleCount < packages.length && (
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
            {pageData?.scroll_description?.trim() && (
                <ScrollDetail pageData={pageData} />
            )}
            {
                Array.isArray(pageData?.faqs) && pageData.faqs.length > 0 && (
                    <FAQSection pageData={pageData} />
                )
            }

        </div>
    );
}
