import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import HeroSection from "../../Components/CommonComponents/HeroSection"
import { api } from "../../utils/api"
import { BannerSkeleton, SliderSkeleton } from "../../Components/CommonComponents/Skeleton"
import PageScript from "../../Components/CommonComponents/PageScript"

const BlogSection = dynamic(() => import("../../Components/CommonComponents/BlogSection"));
const CardSlider = dynamic(() => import("../../Components/CommonComponents/CardSlider"), { ssr: false });
const CustomzieYpurPackage = dynamic(() => import("../../Components/CommonComponents/CustomzieYpurPackage"));
const FAQSection = dynamic(() => import("../../Components/CommonComponents/FAQSection"));
const NeedHelp = dynamic(() => import("../../Components/CommonComponents/NeedHelp"));
const ScrollDetail = dynamic(() => import("../../Components/CommonComponents/ScrollDetail"));
const Testmonials = dynamic(() => import("../../Components/CommonComponents/Testmonials"), { ssr: false });
const WhyChoose = dynamic(() => import("../../Components/CommonComponents/WhyChoose"));
const HajjDeals = dynamic(() => import("../../Components/HajjComponents/HajjDeals"), { ssr: false });
const MonthlyUmrahPackages = dynamic(() => import("../../Components/UmrahComponents/monthlyUmrahPackages"), { ssr: false });

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


