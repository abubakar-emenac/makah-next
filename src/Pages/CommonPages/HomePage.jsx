import { useState, useEffect } from "react"
import BlogSection from "../../Components/CommonComponents/BlogSection"
import CardSlider from "../../Components/CommonComponents/CardSlider"
import CustomzieYpurPackage from "../../Components/CommonComponents/CustomzieYpurPackage"
import FAQSection from "../../Components/CommonComponents/FAQSection"
import HeroSection from "../../Components/CommonComponents/HeroSection"
import NeedHelp from "../../Components/CommonComponents/NeedHelp"
import ScrollDetail from "../../Components/CommonComponents/ScrollDetail"
import Testmonials from "../../Components/CommonComponents/Testmonials"
import WhyChoose from "../../Components/CommonComponents/WhyChoose"
import HajjDeals from "../../Components/HajjComponents/HajjDeals"
import MonthlyUmrahPackages from "../../Components/UmrahComponents/monthlyUmrahPackages"
import axios from 'axios'
import { BASE_URL_IMG, endpoints } from "../../Helpers/apiEndpoints"
import { Helmet } from "react-helmet"
export default function Home() {
    const [homeData, setHomeData] = useState({});

    useEffect(() => {
        const fetchPageData = async () => {
            try {
                const res = await axios.get(endpoints.getPage);


                if (res.data?.status === 1) {
                    // console.log("Result object:", res.data?.result);
                    setHomeData(res.data.result);
                }
            } catch (err) {
                console.error("Error fetching page data:", err);
            }
        };

        fetchPageData();
    }, []);

    useEffect(() => {
        if (!homeData?.script) return;

        // Parse the HTML string returned from API
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = homeData.script;

        // Find all <script> tags inside it
        const scripts = tempDiv.querySelectorAll("script");

        scripts.forEach((oldScript) => {
            const newScript = document.createElement("script");

            // Copy type, src, and inner content
            if (oldScript.type) newScript.type = oldScript.type;
            if (oldScript.src) {
                newScript.src = oldScript.src;
            } else {
                newScript.text = oldScript.innerHTML;
            }

            document.head.appendChild(newScript);
        });
    }, [homeData]);

    if (!homeData?.browser_title) return null

    const imageUrl = homeData.image_url ? `${BASE_URL_IMG}/${homeData.image_url}` : ""

    return (
        <>
            <Helmet>
                <title>{homeData.browser_title}</title>
                <meta name="description" content={homeData.meta_description || ""} />
                <meta name="keywords" content={homeData.meta_keywords || ""} />

                {/* Open Graph Tags */}
                <meta property="og:title" content={homeData.browser_title} />
                <meta property="og:description" content={homeData.meta_description || ""} />
                <meta property="og:image" content={imageUrl} />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:type" content="Travels & Tours" />

                {/* Canonical */}
                <link rel="canonical" href={window.location.href} />
                {/* <script >
                    {homeData.script}
                </script> */}
            </Helmet>

            <HeroSection pageData={homeData} />
            {homeData?.section_1_widget?.length > 0 && (
                <CardSlider pageData={homeData} />
            )}
            {homeData?.section_2_widget?.length > 0 && (
                <MonthlyUmrahPackages pageData={homeData} />
            )}
            <WhyChoose pageData={homeData} />
            <CustomzieYpurPackage pageData={homeData} />
            {homeData?.section_3_widget?.length > 0 && (
                <HajjDeals pageData={homeData} />
            )}
            {homeData?.ourclientsays_widget?.length > 0 && (
                <Testmonials pageData={homeData} />
            )}
            <ScrollDetail pageData={homeData} />
            {Array.isArray(homeData?.faqs) && homeData.faqs.length > 0 && (
                <FAQSection pageData={homeData} />
            )}
            <BlogSection pageData={homeData} />
            <NeedHelp />
        </>
    )
}


