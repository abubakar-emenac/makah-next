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
import { BannerSkeleton, SliderSkeleton } from "../../Components/CommonComponents/Skeleton"
import PageScript from "../../Components/CommonComponents/PageScript"

export default function Home() {
    const [homeData, setHomeData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPageData = async () => {
            try {
                setLoading(true);
                const data = await api.getPage();

                if (data?.status === 1) {
                    setHomeData(data.result);
                }
            } catch (err) {
                console.error("Error fetching page data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPageData();
    }, []);


    if (loading || !homeData?.browser_title) {
        return (
            <div className="flex flex-col w-full space-y-10 pt-24 md:pt-32 pb-20">
                <BannerSkeleton />
                <div className="max-w-[1240px] mx-auto space-y-16">
                    <SliderSkeleton count={4} />
                    <SliderSkeleton count={4} />
                </div>
            </div>
        );
    }

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


