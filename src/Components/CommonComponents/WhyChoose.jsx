// import React, { useMemo, useState } from "react";
// import Slider from "react-slick";
// import { useGlobalData } from "../../Helpers/useGlobalData";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { BASE_URL_IMG, BASE_URL_SVG } from "../../Helpers/apiEndpoints";

// export default function WhyChoose() {
//     const { globalData } = useGlobalData();
//     const [currentSlide, setCurrentSlide] = useState(0);
//     const [hoveredIndex, setHoveredIndex] = useState(null);

//     const homePageSettings = useMemo(() => {
//         return globalData?.result?.settings?.find(
//             (s) => s.ref_name === "Home Page Widgets"
//         )?.contents;
//     }, [globalData]);

//     const slogansEnabled = homePageSettings?.business_slogans_enable === "1";

//     const sloganData = useMemo(() => {
//         if (!slogansEnabled || !homePageSettings) return null;

//         const parser = new DOMParser();

//         // Main heading & subheading
//         const mainHeadingEl = parser.parseFromString(
//             homePageSettings.business_slogans_main_heading,
//             "text/html"
//         );
//         const heading = mainHeadingEl.querySelector("h2")?.textContent || "";
//         const subHeading = mainHeadingEl.querySelector("p")?.textContent || "";

//         // Cards
//         const cards = [];
//         for (let i = 1; i <= 4; i++) {
//             let iconPath = homePageSettings[`business_slogan_icon_${i}`];
//             const input = homePageSettings[`business_slogan_input_${i}`];
//             if (!iconPath || !input) continue;

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
//         infinite: true,
//         speed: 500,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         beforeChange: (_, next) => setCurrentSlide(next),
//         arrows: false,
//         adaptiveHeight: true, // auto-adjust height for content
//         autoplay: true,
//         autoplaySpeed: 3000,
//     };


//     const hoveredImage = [
//         {
//             url: "wc1.svg",
//             icon: "/svg/wc1.svg"
//         },
//         {
//             url: "wc2.svg",
//             icon: "/svg/wc2.svg"
//         },
//         {
//             url: "wc3.svg",
//             icon: "/svg/wc3.svg"
//         },
//         {
//             url: "wc4.svg",
//             icon: "/svg/wc4.svg"
//         },
//     ]

//     return (
//         <div className="w-full max-w-[90%] sm:max-w-[85%] md:max-w-[75%] mx-auto mt-6 sm:mt-10 md:mt-16 px-4 sm:px-6 md:px-9">
//             {/* Header */}
//             <div className="w-full sm:w-[80%] md:w-[60%] lg:w-[45%] flex flex-col justify-start mb-6">

//                 <img
//                     src={`${BASE_URL_SVG}/assets/svgs/crown-black.svg`}
//                     alt="Crown"
//                     className="w-20 sm:w-16 md:w-20 mb-3 sm:mb-4"
//                 />
//                 <h2 className="text-[36px] font-abril leading-tight mb-2 break-words">
//                     {sloganData.heading}
//                 </h2>
//                 <p className="font-Montserrat text-[16px] leading-relaxed text-black break-words">
//                     {sloganData.subHeading}
//                 </p>
//             </div>

//             {/* <div className="hidden lg:grid grid-cols-4 gap-6 lg:gap-8">
//                 {sloganData.cards.map((item, index) => (

//                     <div
//                         key={index}
//                         className="flex flex-col items-center text-center px-4 py-6 h-full"
//                     >
//                         <div className="flex-shrink-0 flex justify-center items-center h-28">
//                             <img
//                                 src={item.icon}
//                                 alt={`${item.heading}`}
//                                 className="w-20 sm:w-24 h-auto object-contain"
//                             />
//                         </div>
//                         <h3 className="mt-1 text-[20px] font-abril leading-tight break-words min-h-[50px] flex items-center justify-center">
//                             {item.heading}
//                         </h3>
//                         <p className="mt-1 text-[15px] font-Montserrat leading-relaxed break-words min-h-[70px] flex items-center justify-center">
//                             {item.text}
//                         </p>
//                     </div>
//                 ))}
//             </div> */}
//             <div className="hidden lg:grid grid-cols-4 gap-6 lg:gap-8">
//                 {sloganData.cards.map((item, index) => {
//                     const fileName = item.icon.split("/").pop();
//                     const hoverMatch = hoveredImage.find((h) => h.url === fileName);

//                     return (
//                         <div
//                             key={index}
//                             className="flex flex-col items-center text-center px-4 py-6 h-full"
//                             onMouseEnter={() => setHoveredIndex(index)}
//                             onMouseLeave={() => setHoveredIndex(null)}
//                         >
//                             <div className="flex-shrink-0 flex justify-center items-center h-28 perspective">
//                                 <div
//                                     className={`relative w-20 sm:w-24 h-auto transform-style preserve-3d transition-transform duration-500 ${hoveredIndex === index ? "rotate-y-180" : ""
//                                         }`}
//                                 >
//                                     {/* Default image */}
//                                     <img
//                                         src={item.icon}
//                                         alt={item.heading}
//                                         className="absolute backface-hidden w-full h-full object-contain"
//                                     />
//                                     {/* Hover image */}
//                                     {hoverMatch && (
//                                         <img
//                                             src={`${hoverMatch.icon}`}
//                                             alt={item.heading}
//                                             className="absolute backface-hidden w-full h-full object-contain rotate-y-180"
//                                         />
//                                     )}
//                                 </div>
//                             </div>
//                             <h3 className="mt-1 text-[20px] font-abril leading-tight break-words min-h-[50px] flex items-center justify-center">
//                                 {item.heading}
//                             </h3>
//                             <p className="mt-1 text-[15px] font-Montserrat leading-relaxed break-words min-h-[70px] flex items-center justify-center">
//                                 {item.text}
//                             </p>
//                         </div>
//                     );
//                 })}
//             </div>




//             {/* Mobile Slider */}
//             <div className="lg:hidden mt-6">
//                 <Slider {...sliderSettings}>
//                     {sloganData.cards.map((item, index) => (
//                         <div
//                             key={index}
//                             className="flex flex-col items-center text-center px-4 py-6"
//                         >
//                             <div className="flex-shrink-0 flex justify-center items-center h-28 mb-3">
//                                 <img
//                                     src={item.icon}
//                                     alt={item.heading}
//                                     className="w-20 sm:w-24 h-auto object-contain"
//                                 />
//                             </div>
//                             <h3 className="text-[20px] font-abril leading-tight min-h-[50px] flex items-center justify-center">
//                                 {item.heading}
//                             </h3>
//                             <p className="mt-2 text-[17px] font-Montserrat leading-relaxed min-h-[70px] flex items-center justify-center">
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
    const [hoveredIndex, setHoveredIndex] = useState(null);

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
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (_, next) => setCurrentSlide(next),
        arrows: false,
        adaptiveHeight: true,
        autoplay: false,
        autoplaySpeed: 3000,
    };

    // Hover images are stored locally in frontend, not backend
    const hoveredImage = [
        {
            url: "wc1.svg",
            icon: "/svg/wc1.svg" // Local frontend path
        },
        {
            url: "wc2.svg",
            icon: "/svg/wc2.svg" // Local frontend path
        },
        {
            url: "wc3.svg",
            icon: "/svg/wc3.svg" // Local frontend path
        },
        {
            url: "wc4.svg",
            icon: "/svg/wc4.svg" // Local frontend path
        },
    ];

    return (
        <>
            {/* Add custom CSS for 3D flip effect */}
            <style jsx>{`
                .perspective {
                    perspective: 1000px;
                }
                .transform-style {
                    transform-style: preserve-3d;
                }
                .preserve-3d {
                    transform-style: preserve-3d;
                }
                .backface-hidden {
                    backface-visibility: hidden;
                }
                .rotate-y-180 {
                    transform: rotateY(180deg);
                }
            `}</style>

            <div className="w-full max-w-[90%] sm:max-w-[85%] md:max-w-[75%] mx-auto mt-6 sm:mt-10 md:mt-16 px-4 sm:px-6 md:px-9">
                {/* Header */}
                <div className="w-full sm:w-[80%] md:w-[60%] lg:w-[45%] flex flex-col justify-start mb-6">
                    <img
                        src={`${BASE_URL_SVG}/assets/svgs/crown-black.svg`}
                        alt="Crown"
                        className="w-20 sm:w-16 md:w-20 mb-3 sm:mb-4"
                    />
                    <h2 className="text-[36px] font-abril leading-tight mb-2 break-words">
                        {sloganData.heading}
                    </h2>
                    <p className="font-Montserrat text-[16px] leading-relaxed text-black break-words">
                        {sloganData.subHeading}
                    </p>
                </div>

                {/* Desktop Grid with Hover Effect */}
                <div className="hidden lg:grid grid-cols-4 gap-6 lg:gap-8">
                    {sloganData.cards.map((item, index) => {
                        // Extract filename from the icon path
                        const fileName = item.icon.split("/").pop();
                        const hoverMatch = hoveredImage.find((h) => h.url === fileName);


                        return (
                            <div
                                key={index}
                                className="flex flex-col items-center text-center px-4 py-6 h-full cursor-pointer"
                                onMouseEnter={() => {
                                    setHoveredIndex(index);
                                }}
                                onMouseLeave={() => {
                                    setHoveredIndex(null);
                                }}
                            >
                                <div className="flex-shrink-0 flex justify-center items-center h-28 perspective">
                                    {hoverMatch ? (
                                        // 3D Flip Effect
                                        <div
                                            className={`relative w-20 sm:w-24 h-20 sm:h-24 transform-style preserve-3d transition-transform duration-500 ${hoveredIndex === index ? "rotate-y-180" : ""
                                                }`}
                                        >
                                            {/* Default image (front) */}
                                            <img
                                                src={item.icon}
                                                alt={item.heading}
                                                className="absolute inset-0 backface-hidden w-full h-full object-contain"
                                            />
                                            {/* Hover image (back) */}
                                            <img
                                                src={hoverMatch.icon}
                                                alt={`${item.heading}`}
                                                className="absolute inset-0 backface-hidden w-full h-full object-contain rotate-y-180"
                                            />
                                        </div>
                                    ) : (
                                        // Simple fade effect fallback
                                        <div className="relative w-20 sm:w-24 h-20 sm:h-24">
                                            <img
                                                src={item.icon}
                                                    alt={item.heading}
                                                    className={`w-full h-full object-contain transition-opacity duration-300 ${hoveredIndex === index ? "opacity-70" : "opacity-100"
                                                        }`}
                                                />
                                            </div>
                                    )}
                                </div>
                                <p className="mt-1 text-[20px] font-abril leading-tight break-words min-h-[50px] flex items-center justify-center">
                                    {item.heading}
                                </p>
                                <p className="mt-1 text-[15px] font-Montserrat leading-relaxed break-words min-h-[70px] flex items-center justify-center">
                                    {item.text}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Mobile Slider */}
                <div className="lg:hidden mt-6">
                    <Slider {...sliderSettings}>
                        {sloganData.cards.map((item, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center text-center px-4 py-6"
                            >
                                <div className="flex-shrink-0 flex justify-center items-center h-28 mb-3">
                                    <img
                                        src={item.icon}
                                        alt={item.heading}
                                        className="w-20 sm:w-24 h-auto object-contain"
                                    />
                                </div>
                                <p className="text-[20px] font-abril leading-tight min-h-[50px] flex items-center justify-center">
                                    {item.heading}
                                </p>
                                <p className="mt-2 text-[17px] font-Montserrat leading-relaxed min-h-[70px] flex items-center justify-center">
                                    {item.text}
                                </p>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </>
    );
}