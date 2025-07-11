import CardSlider from "../../Components/CommonComponents/CardSlider"
import CustomzieYpurPackage from "../../Components/CommonComponents/CustomzieYpurPackage"
import Footer from "../../Components/CommonComponents/Footer"
import HeroSection from "../../Components/CommonComponents/HeroSection"
import NeedHelp from "../../Components/CommonComponents/NeedHelp"
import Testmonials from "../../Components/CommonComponents/Testmonials"
import WhyChoose from "../../Components/CommonComponents/WhyChoose"
import HajjDeals from "../../Components/HajjComponents/HajjDeals"
import MonthlyUmrahPackages from "../../Components/UmrahComponents/monthlyUmrahPackages"
export default function Home() {


    return (
        <>
            <HeroSection />
            <CardSlider />
            <MonthlyUmrahPackages />
            <WhyChoose />
            <CustomzieYpurPackage />
            <HajjDeals />
            <Testmonials />
            <NeedHelp />
            <Footer />
        </>
    )
}


