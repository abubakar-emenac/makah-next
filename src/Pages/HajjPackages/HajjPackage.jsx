// import React, { useRef } from 'react'
// import HeroSection from '../../Components/CommonComponents/HeroSection'
// import ViewAllButton from '../../Components/CommonComponents/ViewAllButton';
// import PackageCard from '../../Components/CommonComponents/PackageCard';
// import Slider from 'react-slick';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import data from '../../data/dummyData.json';

// export default function HajjPackage({ title = ' All Shifting Packages', button = 'on', carperrow = 4 }) {
//     const sliderRef = useRef(null);
//     // const [currentSlide, setCurrentSlide] = useState(0);


//     const handleNext = () => {
//         if (sliderRef.current) {
//             sliderRef.current.slickNext();
//         }
//     };

//     const handlePrev = () => {
//         if (sliderRef.current) {
//             sliderRef.current.slickPrev();
//         }
//     };
//     const slickSettings = {
//         dots: false,
//         infinite: true,
//         speed: 700,
//         slidesToShow: 4, // desktop default
//         slidesToScroll: 1,
//         autoplay: false,
//         arrows: false,
//         responsive: [
//             {
//                 breakpoint: 1280, // ≤ 1280px
//                 settings: {
//                     slidesToShow: 4,
//                     slidesToScroll: 1,
//                 }
//             },
//             {
//                 breakpoint: 1024, // ≤ 1024px
//                 settings: {
//                     slidesToShow: 2.5,
//                     slidesToScroll: 1,
//                 }
//             },
//             {
//                 breakpoint: 768, // ≤ 768px
//                 settings: {
//                     slidesToShow: 1.7,
//                     slidesToScroll: 1,
//                 }
//             },
//             {
//                 breakpoint: 480, // ≤ 480px
//                 settings: {
//                     slidesToShow: 1,
//                     slidesToScroll: 1,
//                 }
//             }
//         ],
//     };

//     return (
//         <div>
//             <div>
//                 <HeroSection />
//             </div>
//             <div className='w-full'>
//                 <div className='w-full max-w-[85%] mx-auto'>
//                     <div className="w-full mt-8 sm:mt-12 md:mt-16 px-2 sm:px-6 md:px-9">
//                         {/* Header Section */}
//                         <div className="flex flex-col px-2 lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-0">
//                             <div className="w-full lg:w-[45%] flex flex-col justify-start">
//                                 <img src="/svg/crown-black.svg" alt="Crown" className="w-16 sm:w-18 md:w-20 mb-3 sm:mb-4" />
//                                 <h2 className="text-[28px] sm:text-[32px] md:text-[36px] font-abril leading-tight mb-3 sm:mb-4">
//                                     {title}
//                                 </h2>
//                             </div>

//                             <div className="w-full lg:w-[45%] flex justify-start lg:justify-end">
//                                 <div className="flex items-center gap-3 flex-wrap">
//                                     <div className="flex items-center gap-3">
//                                         <span
//                                             onClick={handlePrev}
//                                             className="bg-white cursor-pointer rounded-full p-2 shadow-md hover:scale-105 transition border border-gray-200"
//                                             aria-label="Previous Slide"
//                                         >
//                                             <img src="/svg/arrow-left.svg" alt="Left Arrow" className="w-5 h-5 sm:w-6 sm:h-6" />
//                                         </span>
//                                         <span
//                                             onClick={handleNext}
//                                             className="bg-white cursor-pointer rounded-full p-2 shadow-md hover:scale-105 transition border border-gray-200"
//                                             aria-label="Next Slide"
//                                         >
//                                             <img src="/svg/arrow-right.svg" alt="Right Arrow" className="w-5 h-5 sm:w-6 sm:h-6" />
//                                         </span>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Slider Section */}
//                         <div className="mt-6 sm:mt-7 md:mt-8">
//                             <Slider {...slickSettings} ref={sliderRef} className="w-full">
//                                 {data.map((item, index) => (
//                                     <div key={index} className="px-2">
//                                         <PackageCard
//                                             description={item.description}
//                                             night={item.night}
//                                             star={item.star}
//                                             price={item.price}
//                                         />
//                                     </div>
//                                 ))}
//                             </Slider>
//                         </div>
//                     </div>
//                 </div>

//             </div>
//         </div>
//     )
// }

import React, { useRef } from 'react';
import HeroSection from '../../Components/CommonComponents/HeroSection';
import PackageCard from '../../Components/CommonComponents/PackageCard';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import hajjDummyData from '../../data/hajjDummyData.json';
import ScrollDetail from '../../Components/CommonComponents/ScrollDetail';
import FAQSection from '../../Components/CommonComponents/FAQSection';

export default function HajjPackage() {
    const description =
        '<h2><span style="color:hsl(312,81%,25%);">Search Your Desired Holidays</span>&nbsp;&nbsp;<br><span style="color:hsl(287,61%,26%);">Cheap Holidays 2025-26</span></h2><p class="w-full mt-3 mb-4 text-sm sm:text-base text-gray-700"><span style="color:hsl(0,0%,0%);">Travelers always look for comfort on their air trips to the places. Travelers always look for comfort on their air trips to the customers over their budgets. Travelers always look for comfort on their air trips to the customers over their budgets.</span></p><h2><span style="color:hsl(312,81%,25%);">Search Your Desired Holidays</span>&nbsp;&nbsp;<br><span style="color:hsl(287,61%,26%);">Cheap Holidays 2025-26</span></h2><p class="w-full mt-3 mb-4 text-sm sm:text-base text-gray-700"><span style="color:hsl(0,0%,0%);">Travelers always look for comfort on their air trips to the places. Travelers always look for comfort on their air trips to the customers over their budgets. Travelers always look for comfort on their air trips to the customers over their budgets.</span></p><h2><span style="color:hsl(312,81%,25%);">Search Your Desired Holidays</span>&nbsp;&nbsp;<br><span style="color:hsl(287,61%,26%);">Cheap Holidays 2025-26</span></h2><p class="w-full mt-3 mb-4 text-sm sm:text-base text-gray-700"><span style="color:hsl(0,0%,0%);">Travelers always look for comfort on their air trips to the places. Travelers always look for comfort on their air trips to the customers over their budgets. Travelers always look for comfort on their air trips to the customers over their budgets.</span></p><h2><span style="color:hsl(312,81%,25%);">Search Your Desired Holidays</span>&nbsp;&nbsp;<br><span style="color:hsl(287,61%,26%);">Cheap Holidays 2025-26</span></h2><p class="w-full mt-3 mb-4 text-sm sm:text-base text-gray-700"><span style="color:hsl(0,0%,0%);">Travelers always look for comfort on their air trips to the places. Travelers always look for comfort on their air trips to the customers over their budgets. Travelers always look for comfort on their air trips to the customers over their budgets.</span></p><h2><span style="color:hsl(312,81%,25%);">Search Your Desired Holidays</span>&nbsp;&nbsp;<br><span style="color:hsl(287,61%,26%);">Cheap Holidays 2025-26</span></h2><p class="w-full mt-3 mb-4 text-sm sm:text-base text-gray-700"><span style="color:hsl(0,0%,0%);">Travelers always look for comfort on their air trips to the places. Travelers always look for comfort on their air trips to the customers over their budgets. Travelers always look for comfort on their air trips to the customers over their budgets.</span></p><h2><span style="color:hsl(312,81%,25%);">Search Your Desired Holidays</span>&nbsp;&nbsp;<br><span style="color:hsl(287,61%,26%);">Cheap Holidays 2025-26</span></h2><p class="w-full mt-3 mb-4 text-sm sm:text-base text-gray-700"><span style="color:hsl(0,0%,0%);">Travelers always look for comfort on their air trips to the places. Travelers always look for comfort on their air trips to the customers over their budgets. Travelers always look for comfort on their air trips to the customers over their budgets.</span></p><h2><span style="color:hsl(312,81%,25%);">Search Your Desired Holidays</span>&nbsp;&nbsp;<br><span style="color:hsl(287,61%,26%);">Cheap Holidays 2025-26</span></h2><p class="w-full mt-3 mb-4 text-sm sm:text-base text-gray-700"><span style="color:hsl(0,0%,0%);">Travelers always look for comfort on their air trips to the places. Travelers always look for comfort on their air trips to the customers over their budgets. Travelers always look for comfort on their air trips to the customers over their budgets.</span></p><h2><span style="color:hsl(312,81%,25%);">Search Your Desired Holidays</span>&nbsp;&nbsp;<br><span style="color:hsl(287,61%,26%);">Cheap Holidays 2025-26</span></h2><p class="w-full mt-3 mb-4 text-sm sm:text-base text-gray-700"><span style="color:hsl(0,0%,0%);">Travelers always look for comfort on their air trips to the places. Travelers always look for comfort on their air trips to the customers over their budgets. Travelers always look for comfort on their air trips to the customers over their budgets.</span></p><h2><span style="color:hsl(312,81%,25%);">Search Your Desired Holidays</span>&nbsp;&nbsp;<br><span style="color:hsl(287,61%,26%);">Cheap Holidays 2025-26</span></h2><p class="w-full mt-3 mb-4 text-sm sm:text-base text-gray-700"><span style="color:hsl(0,0%,0%);">Travelers always look for comfort on their air trips to the places. Travelers always look for comfort on their air trips to the customers over their budgets. Travelers always look for comfort on their air trips to the customers over their budgets.</span></p>'


    const sliderRefShifting = useRef(null);
    const sliderRefNonShifting = useRef(null);

    const slickSettings = {
        dots: false,
        infinite: true,
        speed: 700,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false,
        arrows: false,
        responsive: [
            { breakpoint: 1280, settings: { slidesToShow: 4 } },
            { breakpoint: 1024, settings: { slidesToShow: 2.5 } },
            { breakpoint: 768, settings: { slidesToShow: 1.7 } },
            { breakpoint: 480, settings: { slidesToShow: 1 } }
        ],
    };

    const shiftingPackages = hajjDummyData.filter(
        (pkg) => pkg.type.toLowerCase() === "shifting".toLowerCase()
    );
    const nonShiftingPackages = hajjDummyData.filter(
        (pkg) => pkg.type.toLowerCase() === "non-shifting".toLowerCase()
    );

    const renderPackageSection = (title, packages, sliderRef) => (
        <div className='w-full max-w-[85%] mx-auto mt-16'>
            {/* Header */}
            <div className="flex flex-col px-2 lg:flex-row items-start lg:items-center justify-between gap-6 llg:gap-0">
                <div className="w-full lg:w-[45%] flex flex-col justify-start">
                    <img src="/svg/crown-black.svg" alt="Crown" className="w-16 sm:w-18 md:w-20 mb-3 sm:mb-4" />
                    <h2 className="text-[28px] sm:text-[32px] md:text-[36px] font-abril leading-tight mb-3 sm:mb-4">
                        {title}
                    </h2>
                </div>
                <div className="w-full lg:w-[45%] flex justify-start lg:justify-end gap-3">
                    <button onClick={() => sliderRef.current?.slickPrev()} className="bg-white rounded-full p-2 shadow border border-gray-200">
                        <img src="/svg/arrow-left.svg" alt="Prev" className="w-5 h-5" />
                    </button>
                    <button onClick={() => sliderRef.current?.slickNext()} className="bg-white rounded-full p-2 shadow border border-gray-200">
                        <img src="/svg/arrow-right.svg" alt="Next" className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Slider */}
            <div className="mt-6">
                <Slider {...slickSettings} ref={sliderRef}>
                    {packages.map((item, index) => (
                        <div key={index} className="px-2">
                            <PackageCard
                                description={item.description}
                                night={item.night}
                                star={item.star}
                                price={item.price}
                            />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );

    return (
        <div className=''>
            <HeroSection />
            {renderPackageSection("All Shifting Packages", shiftingPackages, sliderRefShifting)}
            {renderPackageSection("All Non-Shifting Packages", nonShiftingPackages, sliderRefNonShifting)}
            <div className="w-full lg:max-w-[75%] mx-auto my-5 mb-7">
                <ScrollDetail description={description} />
            </div>
            <FAQSection />
        </div>
    );
}
