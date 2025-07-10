import CardSlider from "../../Components/CommonComponents/CardSlider"
import CustomzieYpurPackage from "../../Components/CommonComponents/CustomzieYpurPackage"
import HeroSection from "../../Components/CommonComponents/HeroSection"
import WhyChoose from "../../Components/CommonComponents/WhyChoose"
import MonthlyUmrahPackages from "../../Components/UmrahComponents/monthlyUmrahPackages"
export default function Home() {


    return (
        <>
            <HeroSection />
            <CardSlider />
            <MonthlyUmrahPackages />
            <WhyChoose />
            <CustomzieYpurPackage />
        </>
    )
}


