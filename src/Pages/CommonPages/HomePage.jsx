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
import { endpoints } from "../../Helpers/apiEndpoints"
export default function Home() {
    const [homeData, setHomeData] = useState({});

    useEffect(() => {
        const fetchPageData = async () => {
            try {
                const res = await axios.get(endpoints.getPage);
                console.log("API full response:", res.data);


                if (res.data?.status === 1) {
                    console.log("Result object:", res.data?.result);
                    setHomeData(res.data.result);

                    if (res.data.result?.browser_title) {
                        document.title = res.data.result.browser_title;
                    }
                }
            } catch (err) {
                console.error("Error fetching page data:", err);
            }
        };

        fetchPageData();
    }, []);



    return (
        <>
            <HeroSection pageData={homeData} />
            <CardSlider pageData={homeData} />
            <MonthlyUmrahPackages pageData={homeData} />
            <WhyChoose pageData={homeData} />
            <CustomzieYpurPackage pageData={homeData} />
            <HajjDeals pageData={homeData} />
            <Testmonials pageData={homeData} />
            <BlogSection pageData={homeData} />
            <div className="w-full lg:max-w-[75%] mx-auto">
                <ScrollDetail pageData={homeData} />
            </div>
            <FAQSection pageData={homeData} />
            <NeedHelp />
        </>
    )
}


