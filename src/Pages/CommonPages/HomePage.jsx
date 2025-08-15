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
export default function Home() {
    const description =
        '<h2><span style="color:hsl(312,81%,25%);">Search Your Desired Holidays</span>&nbsp;&nbsp;<br><span style="color:hsl(287,61%,26%);">Cheap Holidays 2025-26</span></h2><p class="w-full mt-3 mb-4 text-sm sm:text-base text-gray-700"><span style="color:hsl(0,0%,0%);">Travelers always look for comfort on their air trips to the places. Travelers always look for comfort on their air trips to the customers over their budgets. Travelers always look for comfort on their air trips to the customers over their budgets.</span></p><h2><span style="color:hsl(312,81%,25%);">Search Your Desired Holidays</span>&nbsp;&nbsp;<br><span style="color:hsl(287,61%,26%);">Cheap Holidays 2025-26</span></h2><p class="w-full mt-3 mb-4 text-sm sm:text-base text-gray-700"><span style="color:hsl(0,0%,0%);">Travelers always look for comfort on their air trips to the places. Travelers always look for comfort on their air trips to the customers over their budgets. Travelers always look for comfort on their air trips to the customers over their budgets.</span></p><h2><span style="color:hsl(312,81%,25%);">Search Your Desired Holidays</span>&nbsp;&nbsp;<br><span style="color:hsl(287,61%,26%);">Cheap Holidays 2025-26</span></h2><p class="w-full mt-3 mb-4 text-sm sm:text-base text-gray-700"><span style="color:hsl(0,0%,0%);">Travelers always look for comfort on their air trips to the places. Travelers always look for comfort on their air trips to the customers over their budgets. Travelers always look for comfort on their air trips to the customers over their budgets.</span></p><h2><span style="color:hsl(312,81%,25%);">Search Your Desired Holidays</span>&nbsp;&nbsp;<br><span style="color:hsl(287,61%,26%);">Cheap Holidays 2025-26</span></h2><p class="w-full mt-3 mb-4 text-sm sm:text-base text-gray-700"><span style="color:hsl(0,0%,0%);">Travelers always look for comfort on their air trips to the places. Travelers always look for comfort on their air trips to the customers over their budgets. Travelers always look for comfort on their air trips to the customers over their budgets.</span></p><h2><span style="color:hsl(312,81%,25%);">Search Your Desired Holidays</span>&nbsp;&nbsp;<br><span style="color:hsl(287,61%,26%);">Cheap Holidays 2025-26</span></h2><p class="w-full mt-3 mb-4 text-sm sm:text-base text-gray-700"><span style="color:hsl(0,0%,0%);">Travelers always look for comfort on their air trips to the places. Travelers always look for comfort on their air trips to the customers over their budgets. Travelers always look for comfort on their air trips to the customers over their budgets.</span></p><h2><span style="color:hsl(312,81%,25%);">Search Your Desired Holidays</span>&nbsp;&nbsp;<br><span style="color:hsl(287,61%,26%);">Cheap Holidays 2025-26</span></h2><p class="w-full mt-3 mb-4 text-sm sm:text-base text-gray-700"><span style="color:hsl(0,0%,0%);">Travelers always look for comfort on their air trips to the places. Travelers always look for comfort on their air trips to the customers over their budgets. Travelers always look for comfort on their air trips to the customers over their budgets.</span></p><h2><span style="color:hsl(312,81%,25%);">Search Your Desired Holidays</span>&nbsp;&nbsp;<br><span style="color:hsl(287,61%,26%);">Cheap Holidays 2025-26</span></h2><p class="w-full mt-3 mb-4 text-sm sm:text-base text-gray-700"><span style="color:hsl(0,0%,0%);">Travelers always look for comfort on their air trips to the places. Travelers always look for comfort on their air trips to the customers over their budgets. Travelers always look for comfort on their air trips to the customers over their budgets.</span></p><h2><span style="color:hsl(312,81%,25%);">Search Your Desired Holidays</span>&nbsp;&nbsp;<br><span style="color:hsl(287,61%,26%);">Cheap Holidays 2025-26</span></h2><p class="w-full mt-3 mb-4 text-sm sm:text-base text-gray-700"><span style="color:hsl(0,0%,0%);">Travelers always look for comfort on their air trips to the places. Travelers always look for comfort on their air trips to the customers over their budgets. Travelers always look for comfort on their air trips to the customers over their budgets.</span></p><h2><span style="color:hsl(312,81%,25%);">Search Your Desired Holidays</span>&nbsp;&nbsp;<br><span style="color:hsl(287,61%,26%);">Cheap Holidays 2025-26</span></h2><p class="w-full mt-3 mb-4 text-sm sm:text-base text-gray-700"><span style="color:hsl(0,0%,0%);">Travelers always look for comfort on their air trips to the places. Travelers always look for comfort on their air trips to the customers over their budgets. Travelers always look for comfort on their air trips to the customers over their budgets.</span></p>'



    return (
        <>
            <HeroSection />
            <CardSlider />
            <MonthlyUmrahPackages />
            <WhyChoose />
            <CustomzieYpurPackage />
            <HajjDeals />
            <Testmonials />
            <BlogSection />
            <div className="w-full lg:max-w-[75%] mx-auto">
                <ScrollDetail description={description} />
            </div>
            <FAQSection />
            <NeedHelp />
        </>
    )
}


