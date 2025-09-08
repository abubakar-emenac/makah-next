// src/pages/PageNavigator.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { endpoints } from "../Helpers/apiEndpoints";
import HajjPackage from "../Pages/HajjPackages/HajjPackage";
import SpecificCategoryHajj from '../Pages/HajjPackages/SpecificCategoryHajj'
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
                if (res.data?.status === 1) {
                    setPageData(res.data.result);
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

    const { section_1_widget = [], section_2_widget = [], section_3_widget = [] } = pageData;

    const hasHajj = [section_1_widget, section_2_widget, section_3_widget].some(
        (widgets) => widgets.some((w) => "hajj_type" in w)
    );

    const hasUmrah = [section_1_widget, section_2_widget, section_3_widget].some(
        (widgets) => widgets.some((w) => "umrah_type" in w)
    );

    if (hasHajj) {
        const hasHajjSection1 = section_1_widget.some((w) => "hajj_type" in w);
        const hasHajjSection2 = section_2_widget.some((w) => "hajj_type" in w);

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

    



    if (hasUmrah) {
        const hasSection1 = section_1_widget?.length > 0;
        const hasSection2 = section_2_widget?.length > 0;
        const hasSection3 = section_3_widget?.length > 0;
      
        if (hasSection1 && hasSection2 && hasSection3) {
          // All three sections present → show UmrahPackageStar
          return <UmrahPackageStar pageData={pageData}/>;
        }
      
        if (hasSection1 && !hasSection2 && !hasSection3) {
          // Only section_1_widget present → show SpecificCategoryUmrah
          return <SpecificCategoryUmrah pageData={pageData}/>;
        }
      
        // Optional: if you want a fallback for other cases
        return <div>No matching Umrah flow</div>;
      }
      

    return <div className="text-center py-10">No matching handler</div>;
}
