// import React, { useMemo, useState } from "react";
// import Slider from "react-slick";
// import { useGlobalData } from "../../Helpers/useGlobalData";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { BASE_URL_SVG } from "../../Helpers/apiEndpoints";

// export default function WhyChoose() {
//     const { globalData } = useGlobalData();
//     const [currentSlide, setCurrentSlide] = useState(0);

//     const homePageSettings = useMemo(() => {
//         return globalData?.result?.settings?.find(
//             (s) => s.ref_name === "Home Page Widgets"
//         )?.contents;
//     }, [globalData]);

//     const slogansEnabled = homePageSettings?.business_slogans_enable === "1";

//     const sloganData = useMemo(() => {
//         if (!slogansEnabled || !homePageSettings) return null;

//         const parser = new DOMParser();

//         // main heading & subheading
//         const mainHeadingEl = parser.parseFromString(
//             homePageSettings.business_slogans_main_heading,
//             "text/html"
//         );
//         const heading = mainHeadingEl.querySelector("h2")?.textContent || "";
//         const subHeading = mainHeadingEl.querySelector("p")?.textContent || "";

//         // cards
//         const cards = [];
//         for (let i = 1; i <= 4; i++) {
//             let iconPath = homePageSettings[`business_slogan_icon_${i}`];
//             const input = homePageSettings[`business_slogan_input_${i}`];

//             if (!iconPath || !input) continue;

//             // remove leading slash if exists
//             if (iconPath.startsWith("/")) iconPath = iconPath.slice(1);

//             const icon = `${BASE_URL_SVG}/${iconPath}`;

//             const cardEl = parser.parseFromString(input, "text/html");
//             const cardHeading = cardEl.querySelector("h3")?.textContent || "";
//             const cardText = cardEl.querySelector("p")?.textContent || "";

//             cards.push({ icon, heading: cardHeading, text: cardText });
//         }

//         return { heading, subHeading, cards };
//     }, [homePageSettings, slogansEnabled]);

//     if (!slogansEnabled || !sloganData) return null;

//     const sliderSettings = {
//         dots: true,
//         infinite: false,
//         speed: 500,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         beforeChange: (_, next) => setCurrentSlide(next),
//         arrows: false,
//     };

//     return (
//         <div className="w-full max-w-[90%] sm:max-w-[85%] md:max-w-[75%] mx-auto mt-6 sm:mt-10 md:mt-16 px-4 sm:px-6 md:px-9">
//             {/* Header */}
//             <div className="w-full lg:w-[45%] flex flex-col justify-start mb-6">
//                 <img
//                     src="/svgs/crown-black.svg"
//                     alt="Crown"
//                     className="w-20 sm:w-16 md:w-20 mb-3 sm:mb-4"
//                 />
//                 <h2 className="text-[24px] sm:text-[30px] md:text-[36px] font-abril leading-tight mb-2">
//                     {sloganData.heading}
//                 </h2>
//                 <p className="font-Montserrat text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed text-black">
//                     {sloganData.subHeading}
//                 </p>
//             </div>

//             {/* Desktop Grid */}
//             <div className="hidden lg:grid grid-cols-4 gap-8 sm:gap-10">
//                 {sloganData.cards.map((item, index) => (
//                     <div key={index} className="flex flex-col items-center text-center px-2 sm:px-0">
//                         <img src={item.icon} alt={item.heading} className="w-28 sm:w-28 h-auto mb-2" />
//                         <h3 className="text-[18px] sm:text-[20px] font-abril leading-tight mb-1">
//                             {item.heading}
//                         </h3>
//                         <p className="text-[14px] sm:text-[14px] font-Montserrat leading-relaxed">
//                             {item.text}
//                         </p>
//                     </div>
//                 ))}
//             </div>

//             {/* Mobile Slider */}
//             <div className="lg:hidden">
//                 <Slider {...sliderSettings}>
//                     {sloganData.cards.map((item, index) => (
//                         <div key={index} className="flex flex-col items-center text-center px-2 sm:px-0">
//                             <div className="flex justify-center w-full mb-4">
//                                 <img
//                                     src={item.icon}
//                                     alt={item.heading}
//                                     className="w-28 h-auto object-contain"
//                                 />
//                             </div>
//                             <h3 className="text-[18px] sm:text-[20px] font-abril leading-tight mb-1">
//                                 {item.heading}
//                             </h3>
//                             <p className="text-[14px] sm:text-[14px] font-Montserrat leading-relaxed">
//                                 {item.text}
//                             </p>
//                         </div>
//                     ))}
//                 </Slider>
//             </div>
//         </div>
//     );
// }


import React, { useMemo, useState } from "react";
import Slider from "react-slick";
import { useGlobalData } from "../../Helpers/useGlobalData";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BASE_URL_IMG, BASE_URL_SVG } from "../../Helpers/apiEndpoints";

export default function WhyChoose() {
    const { globalData } = useGlobalData();
    const [currentSlide, setCurrentSlide] = useState(0);

    const homePageSettings = useMemo(() => {
        return globalData?.result?.settings?.find(
            (s) => s.ref_name === "Home Page Widgets"
        )?.contents;
    }, [globalData]);

    const slogansEnabled = homePageSettings?.business_slogans_enable === "1";

    const sloganData = useMemo(() => {
        if (!slogansEnabled || !homePageSettings) return null;

        const parser = new DOMParser();

        // Main heading & subheading
        const mainHeadingEl = parser.parseFromString(
            homePageSettings.business_slogans_main_heading,
            "text/html"
        );
        const heading = mainHeadingEl.querySelector("h2")?.textContent || "";
        const subHeading = mainHeadingEl.querySelector("p")?.textContent || "";

        // Cards
        const cards = [];
        for (let i = 1; i <= 4; i++) {
            let iconPath = homePageSettings[`business_slogan_icon_${i}`];
            const input = homePageSettings[`business_slogan_input_${i}`];
            if (!iconPath || !input) continue;

            if (iconPath.startsWith("/")) iconPath = iconPath.slice(1);
            const icon = `${BASE_URL_SVG}/${iconPath}`;

            const cardEl = parser.parseFromString(input, "text/html");
            const cardHeading = cardEl.querySelector("h3")?.textContent || "";
            const cardText = cardEl.querySelector("p")?.textContent || "";

            cards.push({ icon, heading: cardHeading, text: cardText });
        }

        return { heading, subHeading, cards };
    }, [homePageSettings, slogansEnabled]);

    if (!slogansEnabled || !sloganData) return null;

    const sliderSettings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (_, next) => setCurrentSlide(next),
        arrows: false,
        adaptiveHeight: true, // auto-adjust height for content
        centerMode: true, // center slide
        centerPadding: "0px",
    };

    return (
        <div className="w-full max-w-[90%] sm:max-w-[85%] md:max-w-[75%] mx-auto mt-6 sm:mt-10 md:mt-16 px-4 sm:px-6 md:px-9">
            {/* Header */}
            <div className="w-full sm:w-[80%] md:w-[60%] lg:w-[45%] flex flex-col justify-start mb-6">

                <img
                    src={`${BASE_URL_SVG}/assets/svgs/crown-black.svg`}
                    alt="Crown"
                    className="w-20 sm:w-16 md:w-20 mb-3 sm:mb-4"
                />
                <h2 className="text-[24px] sm:text-[30px] md:text-[36px] font-abril leading-tight mb-2 break-words">
                    {sloganData.heading}
                </h2>
                <p className="font-Montserrat text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed text-black break-words">
                    {sloganData.subHeading}
                </p>
            </div>

            {/* Desktop Grid */}
            <div className="hidden lg:grid grid-cols-4 gap-6 lg:gap-8">
                {sloganData.cards.map((item, index) => (
                    <div key={index} className="flex flex-col items-center text-center px-2 sm:px-0">
                        <img src={item.icon} alt={`${item.heading}`} className="w-24 sm:w-28 h-auto mb-2 object-contain" />
                        <h3 className="text-[16px] sm:text-[18px] md:text-[20px] font-abril leading-tight mb-1 break-words">
                            {item.heading}
                        </h3>
                        <p className="text-[13px] sm:text-[14px] md:text-[15px] font-Montserrat leading-relaxed break-words">
                            {item.text}
                        </p>
                    </div>
                ))}
            </div>

            {/* Mobile Slider */}
            <div className="lg:hidden mt-6">
                <Slider {...sliderSettings}>
                    {sloganData.cards.map((item, index) => (
                        <div key={index} className="flex flex-col items-center text-center px-4">
                            <div className="flex justify-center w-full mb-3">
                                <img
                                    src={item.icon}
                                    alt={item.heading}
                                    className="w-24 sm:w-28 h-auto object-contain"
                                />
                            </div>
                            <h3 className="text-[16px] sm:text-[18px] font-abril leading-tight mb-1 max-w-[80%]">
                                {item.heading}
                            </h3>
                            <p className="text-[13px] sm:text-[14px] font-Montserrat leading-relaxed max-w-[85%]">
                                {item.text}
                            </p>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}
