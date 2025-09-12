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
                console.log("API full response:", res);


                if (res.data?.status === 1) {
                    // console.log("Result object:", res.data?.result);
                    setHomeData(res.data.result);

                    // if (res.data.result?.browser_title) {
                    //     document.title = res.data.result.browser_title;
                    // }

                    // // Set Meta Description
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
                    // ogTitle.setAttribute("content", res.data.result.browser_title || "Home");
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
                }
            } catch (err) {
                console.error("Error fetching page data:", err);
            }
        };

        fetchPageData();
    }, []);

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
            <Testmonials pageData={homeData} />
                <ScrollDetail pageData={homeData} />
            {Array.isArray(homeData?.faqs) && homeData.faqs.length > 0 && (
                <FAQSection pageData={homeData} />
            )}
            <BlogSection pageData={homeData} />
            <NeedHelp />
        </>
    )
}


