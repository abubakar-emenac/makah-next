// src/pages/PageNavigator.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { endpoints } from "../Helpers/apiEndpoints";
import HajjPackage from "../Pages/HajjPackages/HajjPackage";
import SpecificCategoryHajj from "../Pages/HajjPackages/SpecificCategoryHajj";
import UmrahPackageStar from "../Pages/UmrahPages/UmrahPackageStar";
import SpecificCategoryUmrah from "../Pages/UmrahPages/SpecificCategoryUmrah";
import NotFound from "../Pages/CommonPages/NotFound";
import PageScript from "../Components/CommonComponents/PageScript";
import { BannerSkeleton, SliderSkeleton } from "../Components/CommonComponents/Skeleton";

export default function PageNavigator() {
    const { slug } = useParams();
    const [pageData, setPageData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPage = async () => {
            setLoading(true);
            try {
                const res = await axios.get(endpoints.getPageUrl(slug));
                if (res.data?.status === 1 || res.data?.status === true) {
                    setPageData(res.data.result);
                } else {
                    console.warn("Unexpected API response:", res.data);
                }
            } catch (err) {
                console.error("Error fetching page:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPage();
    }, [slug]);


    if (loading) {
        return (
          <div className="space-y-10">
            <BannerSkeleton />
            <div className="max-w-[1240px] mx-auto px-4 py-10 space-y-16">
                <SliderSkeleton count={4} />
                <SliderSkeleton count={4} />
            </div>
          </div>
        );
    }
    if (!pageData) return (
        <NotFound />
    )

    const {
        section_1_widget = [],
        section_2_widget = [],
        section_3_widget = [],
    } = pageData;

    // Ensure widgets are arrays
    const hasSection1 =
        Array.isArray(section_1_widget) && section_1_widget.length > 0;
    const hasSection2 =
        Array.isArray(section_2_widget) && section_2_widget.length > 0;
    const hasSection3 =
        Array.isArray(section_3_widget) && section_3_widget.length > 0;

    const hasHajj = [section_1_widget, section_2_widget, section_3_widget].some(
        (widgets) => Array.isArray(widgets) && widgets.some((w) => w && w.hajj_type)
    );

    const hasUmrah = [section_1_widget, section_2_widget, section_3_widget].some(
        (widgets) => Array.isArray(widgets) && widgets.some((w) => w && w.umrah_type)
    );

    const HelmetTags = (
        <>
            <PageScript html={pageData?.script} ownerKey={slug} />
        </>
    );

    // ----- Hajj logic -----
    if (hasHajj) {
        const hasHajjSection1 =
            Array.isArray(section_1_widget) &&
            section_1_widget.some((w) => w && w.hajj_type);
        const hasHajjSection2 =
            Array.isArray(section_2_widget) &&
            section_2_widget.some((w) => w && w.hajj_type);


        if (loading) {
            return (
                <div className="space-y-10">
                    <BannerSkeleton />
                    <div className="max-w-[1240px] mx-auto px-4 py-10 space-y-16">
                        <SliderSkeleton count={4} />
                    </div>
                </div>
            );
        }

        if (hasHajjSection1 && hasHajjSection2) {
            return (
                <>
                    {HelmetTags}
                    <HajjPackage pageData={pageData} />
                </>
            );
        }
        if (hasHajjSection1) {
            return (
                <>
                    {HelmetTags}
                    <SpecificCategoryHajj pageData={pageData} />
                </>
            )
        }
        if (hasHajjSection2) {
            return (
                <>
                    {HelmetTags}
                    <SpecificCategoryHajj pageData={pageData} />
                </>
            )
        }

        return (
            <NotFound />
        )
    }

    // ----- Umrah logic -----
    if (hasUmrah) {
        if (hasSection1 && hasSection2 && hasSection3) {
            return (
                <>
                    {HelmetTags}
                    <UmrahPackageStar pageData={pageData} />
                </>
            )
        }
        if (hasSection1 && hasSection2) {
            return (
                <>
                    {HelmetTags}
                    <UmrahPackageStar pageData={pageData} />
                </>
            )
        }
        if (hasSection2 && hasSection3) {
            return (
                <>
                    {HelmetTags}
                    <UmrahPackageStar pageData={pageData} />
                </>
            )
        }

        if (hasSection1 && !hasSection2 && !hasSection3) {
            return (
                <>
                    {HelmetTags}
                    <SpecificCategoryUmrah pageData={pageData} />
                </>
            )
        }

        return (
            <NotFound />
        )
    }

    // ----- Fallback -----
    console.warn("Unmatched pageData structure:", pageData);
    return (
        <NotFound />
    )
}
