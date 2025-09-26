// src/pages/PageNavigator.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL_IMG, endpoints } from "../Helpers/apiEndpoints";
import HajjPackage from "../Pages/HajjPackages/HajjPackage";
import SpecificCategoryHajj from "../Pages/HajjPackages/SpecificCategoryHajj";
import UmrahPackageStar from "../Pages/UmrahPages/UmrahPackageStar";
import SpecificCategoryUmrah from "../Pages/UmrahPages/SpecificCategoryUmrah";
import NotFound from "../Pages/CommonPages/NotFound";
import { Helmet } from "react-helmet";

const FullPageLoader = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
        </div>
    );
};

export default function PageNavigator() {
    const { slug } = useParams();
    const [pageData, setPageData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPage = async () => {
            setLoading(true);
            try {
                const res = await axios.get(endpoints.getPageUrl(slug));
                // console.log("Response", res)
                if (res.data?.status === 1 || res.data?.status === true) {
                    setPageData(res.data.result);

                    // if (res.data.result?.browser_title) {
                    //     document.title = res.data.result.browser_title;
                    // }

                    // Set Meta Description
                    // const desc = document.querySelector('meta[name="description"]') || document.createElement("meta");
                    // desc.setAttribute("name", "description");
                    // desc.setAttribute("content", res.data.result.meta_description || "");
                    // if (!desc.parentNode) document.head.appendChild(desc);

                    // // Set meta keywords
                    // const keywords = document.querySelector('meta[name="keywords"]') || document.createElement("meta");
                    // keywords.setAttribute("name", "keywords");
                    // keywords.setAttribute("content", res.data.result.meta_keywords);
                    // if (!keywords.parentNode) document.head.appendChild(keywords);

                    // // OG Title
                    // const ogTitle = document.querySelector('meta[property="og:title"]') || document.createElement("meta");
                    // ogTitle.setAttribute("property", "og:title");
                    // ogTitle.setAttribute("content", res.data.result.browser_title);
                    // if (!ogTitle.parentNode) document.head.appendChild(ogTitle);

                    // // OG Description
                    // const ogDescription = document.querySelector('meta[property="og:description"]') || document.createElement("meta");
                    // ogDescription.setAttribute("property", "og:description");
                    // ogDescription.setAttribute("content", res.data.result.meta_description || "");
                    // if (!ogDescription.parentNode) document.head.appendChild(ogDescription);

                    // // OG Image (dynamic from banner_img[0])
                    // const imageUrl = res.data.result.image_url
                    //     ? `${BASE_URL_IMG}/${res.data.result.image_url}`
                    //     : '';

                    // const ogImage = document.querySelector('meta[property="og:image"]') || document.createElement("meta");
                    // ogImage.setAttribute("property", "og:image");
                    // ogImage.setAttribute("content", imageUrl);
                    // if (!ogImage.parentNode) document.head.appendChild(ogImage);

                    // // OG URL (current page URL)
                    // const ogUrl = document.querySelector('meta[property="og:url"]') || document.createElement("meta");
                    // ogUrl.setAttribute("property", "og:url");
                    // ogUrl.setAttribute("content", window.location.href);
                    // if (!ogUrl.parentNode) document.head.appendChild(ogUrl);

                    // // OG Type (always set to "Travels & Tours")
                    // const ogType = document.querySelector('meta[property="og:type"]') || document.createElement("meta");
                    // ogType.setAttribute("property", "og:type");
                    // ogType.setAttribute("content", "Travels & Tours");
                    // if (!ogType.parentNode) document.head.appendChild(ogType);

                    // // Canonical Link
                    // let canonicalLink = document.querySelector('link[rel="canonical"]');
                    // if (!canonicalLink) {
                    //     canonicalLink = document.createElement("link");
                    //     canonicalLink.setAttribute("rel", "canonical");
                    //     document.head.appendChild(canonicalLink);
                    // }
                    // canonicalLink.setAttribute("href", window.location.href);
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
        return <FullPageLoader />;
    }
    if (!pageData) return (
        <NotFound />
    )

    const imageUrl = pageData.image_url ? `${BASE_URL_IMG}/${pageData.image_url}` : ""

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
        <Helmet>
            <title>{pageData.browser_title}</title>
            <meta name="description" content={pageData.meta_description || ""} />
            <meta name="keywords" content={pageData.meta_keywords || ""} />

            {/* Open Graph Tags */}
            <meta property="og:title" content={pageData.browser_title} />
            <meta property="og:description" content={pageData.meta_description || ""} />
            <meta property="og:image" content={imageUrl} />
            <meta property="og:url" content={window.location.href} />
            <meta property="og:type" content="Travels & Tours" />

            {/* Canonical */}
            <link rel="canonical" href={window.location.href} />
        </Helmet>
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
            return <FullPageLoader />;   // <-- loader for Hajj routes
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
