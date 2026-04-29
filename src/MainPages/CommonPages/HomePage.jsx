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
import { api } from "../../utils/api"
import PageScript from "../../Components/CommonComponents/PageScript"
export default function Home() {
    const [homeData, setHomeData] = useState({});

    useEffect(() => {
        const fetchPageData = async () => {
            try {
                const data = await api.getPage();


                if (data?.status === 1) {
                    // console.log("Result object:", data?.result);
                    setHomeData(data.result);
                }
            } catch (err) {
                console.error("Error fetching page data:", err);
            }
        };

        fetchPageData();
    }, []);


    if (!homeData?.browser_title) return null

    return (
        <>
            <PageScript html={homeData?.script} ownerKey="home" />

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


