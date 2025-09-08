// src/pages/PageNavigator.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { endpoints } from "../Helpers/apiEndpoints";
import HajjPackage from "../Pages/HajjPackages/HajjPackage";
import SpecificCategoryHajj from "../Pages/HajjPackages/SpecificCategoryHajj";
import UmrahPackageStar from "../Pages/UmrahPages/UmrahPackageStar";
import SpecificCategoryUmrah from "../Pages/UmrahPages/SpecificCategoryUmrah";

export default function PageNavigator() {
    const { slug } = useParams();
    const [pageData, setPageData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPage = async () => {
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

    if (loading) return <p className="text-center py-10">Loading...</p>;
    if (!pageData) return <p className="text-center py-10">Page not found</p>;

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

    // ----- Hajj logic -----
    if (hasHajj) {
        const hasHajjSection1 =
            Array.isArray(section_1_widget) &&
            section_1_widget.some((w) => w && w.hajj_type);
        const hasHajjSection2 =
            Array.isArray(section_2_widget) &&
            section_2_widget.some((w) => w && w.hajj_type);

        if (hasHajjSection1 && hasHajjSection2) {
            return <HajjPackage pageData={pageData} />;
        }
        if (hasHajjSection1) {
            return <SpecificCategoryHajj pageData={pageData} />;
        }
        if (hasHajjSection2) {
            return <SpecificCategoryHajj pageData={pageData} />;
        }

        return <div className="text-center py-10">No valid Hajj section found</div>;
    }

    // ----- Umrah logic -----
    if (hasUmrah) {
        if (hasSection1 && hasSection2 && hasSection3) {
            return <UmrahPackageStar pageData={pageData} />;
        }

        if (hasSection1 && !hasSection2 && !hasSection3) {
            return <SpecificCategoryUmrah pageData={pageData} />;
        }

        return <div className="text-center py-10">No matching Umrah flow</div>;
    }

    // ----- Fallback -----
    console.warn("Unmatched pageData structure:", pageData);
    return <div className="text-center py-10">No matching handler</div>;
}
