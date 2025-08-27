// import React, { useRef, useState } from 'react';
// import ViewAllButton from '../CommonComponents/ViewAllButton';
// import PackageCard from '../CommonComponents/PackageCard';
// import Slider from 'react-slick';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import data from '../../data/dummyData.json';
// import HajjCard from './HajjCard';

// const CARDS_PER_SLIDE = 4;

// const HajjCards = () => {

//     const sliderRef = useRef(null);
//     const [currentSlide, setCurrentSlide] = useState(0);

//     // Create slides of 3 cards each
//     const slides = [];
//     for (let i = 0; i < data.length; i += CARDS_PER_SLIDE) {
//         slides.push(data.slice(i, i + CARDS_PER_SLIDE));
//     }

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
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         autoplay: false,
//         arrows: false,
//         beforeChange: (current, next) => setCurrentSlide(next),
//         responsive: [
//             {
//                 breakpoint: 1024,
//                 settings: {
//                     slidesToShow: 1,
//                     slidesToScroll: 1,
//                 }
//             },
//             {
//                 breakpoint: 768,
//                 settings: {
//                     slidesToShow: 1,
//                     slidesToScroll: 1,
//                 }
//             },
//             {
//                 breakpoint: 480,
//                 settings: {
//                     slidesToShow: 1,
//                     slidesToScroll: 1,
//                 }
//             }
//         ]
//     };

//     return (
//         // <div className="w-full mt-8 sm:mt-12 md:mt-16 px-4 sm:px-6 md:px-9">
//         <div className='w-full'>
//             {/* Header Section */}
//             <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-0">
//                 <div className="w-full lg:w-[45%] flex flex-col justify-start">
//                     <img src="/svg/crown-black.svg" alt="Crown" className="w-16 sm:w-18 md:w-20 mb-3 sm:mb-4" />
//                     <h2 className="text-[28px] sm:text-[32px] md:text-[36px] font-abril leading-tight mb-3 sm:mb-4">
//                         Best Hajj Deals 2025
//                     </h2>
//                     <span className="font-Montserrat text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed text-black max-w-md">
//                         Makkah Travel is here to help you visit religious places and make Umrah trips that connect with your soul. We're experts at creating meaningful journeys.
//                     </span>
//                 </div>

//                 <div className="w-full lg:w-[45%] flex justify-start lg:justify-end">
//                     <div className="flex items-center gap-3 flex-wrap">
//                         <ViewAllButton color="primary" slug="/" size="md" />
//                         <div className="flex items-center gap-3">
//                             <span
//                                 onClick={handlePrev}
//                                 className="bg-white cursor-pointer rounded-full p-2 shadow-md hover:scale-105 transition border border-gray-200"
//                                 aria-label="Previous Slide"
//                             >
//                                 <img src="/svg/arrow-left.svg" alt="Left Arrow" className="w-5 h-5 sm:w-6 sm:h-6" />
//                             </span>
//                             <span
//                                 onClick={handleNext}
//                                 className="bg-white cursor-pointer rounded-full p-2 shadow-md hover:scale-105 transition border border-gray-200"
//                                 aria-label="Next Slide"
//                             >
//                                 <img src="/svg/arrow-right.svg" alt="Right Arrow" className="w-5 h-5 sm:w-6 sm:h-6" />
//                             </span>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Slider Section */}
//             <div className="mt-6 sm:mt-7 md:mt-8 overflow-hidden w-full flex flex-col items-center justify-center">
//                 <Slider {...slickSettings} ref={sliderRef} className="w-full">
//                     {slides.map((slide, index) => (
//                         <div key={index} className="w-full">
//                             <div className="flex flex-col sm:flex-row justify-center sm:justify-between gap-4 sm:gap-2 px-1">
//                                 {slide.map((item, i) => (
//                                     <div key={i} className="w-full sm:w-1/3 px-1 sm:px-2">
//                                         <HajjCard
//                                             description={item.description}
//                                             night={item.night}
//                                             star={item.star}
//                                             price={item.price}
//                                         />
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     ))}
//                 </Slider>

//                 <div className="flex mt-6 gap-2 w-full mx-auto ">
//                     {slides.map((_, index) => (
//                         <span
//                             key={index}
//                             onClick={() => {
//                                 setCurrentSlide(index);
//                                 if (sliderRef.current) {
//                                     sliderRef.current.slickGoTo(index);
//                                 }
//                             }}
//                             className={`h-2 cursor-pointer rounded-full transition-all duration-300 ${currentSlide === index ? 'w-8 bg-primary' : 'w-3 bg-secondary'
//                                 }`}
//                         />
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }




// export default function HajjDeals() {
//     return (
//         <div className="w-full mt-8 sm:mt-12 md:mt-16 px-4 sm:px-6 md:px-9 flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8">
//         <div className="w-full lg:w-[72%]"> {/* Adjust width for HajjCards */}
//             <HajjCards/>
//         </div>
//         {/* Added a wrapper div for HajjSvg to control its size and prevent shrinking */}
//         <div className="hidden lg:flex w-full lg:w-[28%] justify-center items-center  mt-32">
//     <img src='/svg/hajj_element.svg' alt='Illustration of Hajj Journey' className='w-[673.47px] h-[551.75px]'/>
// </div>

//     </div>
//     )
//   }


// HajjCards.tsx

import React, { useRef, useState } from 'react';
import ViewAllButton from '../CommonComponents/ViewAllButton';
import HajjCard from './HajjCard';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import data from '../../data/dummyData.json';
import PackageCard from '../CommonComponents/PackageCard';

const HajjCards = ({ Packagedata }) => {
    const sliderRef = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    const handleNext = () => sliderRef.current?.slickNext();
    const handlePrev = () => sliderRef.current?.slickPrev();
    const pillsPerPage = 5;
    const [pillPage, setPillPage] = useState(0);

    const cardData = Packagedata

    // const slickSettings = {
    //     dots: false,
    //     infinite: true,
    //     speed: 700,
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     autoplay: false,
    //     arrows: false,
    //     beforeChange: (current, next) => {
    //         setCurrentSlide(next);
    //         const newPillPage = Math.floor(next / pillsPerPage);
    //         setPillPage(newPillPage);
    //     },
    //     responsive: [
    //         {
    //             breakpoint: 768,
    //             settings: {
    //                 slidesToShow: 1,
    //                 slidesToScroll: 1,
    //             }
    //         },
    //         {
    //             breakpoint: 1024,
    //             settings: {
    //                 slidesToShow: 3,
    //                 slidesToScroll: 1,
    //             }
    //         },
    //         {
    //             breakpoint: 1440,
    //             settings: {
    //                 slidesToShow: 4,
    //                 slidesToScroll: 1,
    //             }
    //         }
    //     ]
    // };
    const slickSettings = {
        dots: false,
        infinite: true,
        speed: 700,
        slidesToShow: 3, // desktop default
        slidesToScroll: 1,
        autoplay: false,
        arrows: false,
        beforeChange: (current, next) => {
            setCurrentSlide(next);
            const newPillPage = Math.floor(next / pillsPerPage);
            setPillPage(newPillPage);
        },
        responsive: [
            {
                breakpoint: 1440, // ≤ 1440px
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1024, // ≤ 1024px
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768, // ≤ 768px
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    return (
        <div className="w-full">
            {/* Header */}
            <div className="flex flex-col sm:flex-row lg:flex-row items-start px-7 lg:items-center justify-between gap-6 lg:gap-0">
                <div className="w-full lg:w-[45%]">
                    <img src="/svg/crown-black.svg" alt="Crown" className="w-16 mb-3" />
                    <h2 className="text-[24px] sm:text-[32px] md:text-[36px] font-abril mb-3 leading-tight">
                        {cardData.heading}
                    </h2>
                    <p className="text-[14px] sm:text-[15px] md:text-[16px] font-Montserrat max-w-md leading-relaxed">
                        {cardData.subheading}
                    </p>
                </div>

                <div className="w-full lg:w-[45%] flex justify-start lg:justify-end mt-4 lg:mt-0">
                    <div className="flex items-center gap-3 flex-wrap">
                        <ViewAllButton color="primary" slug={cardData.button_link} size="md" label={cardData.button_text} />
                        <div className="flex items-center gap-3">
                            <span onClick={handlePrev} className="p-2 bg-white border border-gray-200 rounded-full shadow cursor-pointer hover:scale-105 transition">
                                <img src="/svg/arrow-left.svg" alt="Prev" className="w-5 h-5 sm:w-6 sm:h-6" />
                            </span>
                            <span onClick={handleNext} className="p-2 bg-white border border-gray-200 rounded-full shadow cursor-pointer hover:scale-105 transition">
                                <img src="/svg/arrow-right.svg" alt="Next" className="w-5 h-5 sm:w-6 sm:h-6" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Slider */}
            <div className="mt-6 sm:mt-7 md:mt-8 overflow-hidden w-full px-5">
                <Slider {...slickSettings} ref={sliderRef} className="w-full">
                    {data.map((item, index) => (
                        <div key={index}
                            className='px-2'
                        >
                            <PackageCard
                                description={item.description}
                                night={item.night}
                                star={item.star}
                                price={item.price}
                            />
                        </div>
                    ))}
                </Slider>

                {/* Custom Dots */}
                <div className="flex mt-6 gap-2 w-full justify-center">
                    {data
                        .slice(pillPage * pillsPerPage, (pillPage + 1) * pillsPerPage)
                        .map((_, index) => {
                            const actualIndex = pillPage * pillsPerPage + index;
                            return (
                                <span
                                    key={actualIndex}
                                    onClick={() => {
                                        setCurrentSlide(actualIndex);
                                        sliderRef.current?.slickGoTo(actualIndex);
                                    }}
                                    className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${currentSlide === actualIndex ? 'w-8 bg-primary' : 'w-3 bg-secondary'}`}
                                />
                            );
                        })}

                </div>
            </div>
        </div>
    );
};



export default function HajjDeals({ pageData }) {
    const widgetData = pageData?.section_3_widget?.[0];
    return (
        <div className="w-full mt-8 sm:mt-12 md:mt-16 md:px-9 flex flex-col lg:flex-row lg:justify-between gap-8">
            <div className="w-full lg:w-[72%]">
                <HajjCards Packagedata={widgetData} />
            </div>

            {/* Illustration (hidden on small screens) */}
            <div className="hidden lg:flex w-full lg:w-[28%] justify-center items-center mt-32">
                <img
                    src='/svg/hajj_element.svg'
                    alt='Illustration of Hajj Journey'
                    className='w-[673.47px] h-[551.75px]'
                />
            </div>
        </div>
    );
}
