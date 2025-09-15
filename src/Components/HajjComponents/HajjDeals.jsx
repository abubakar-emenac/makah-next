// import React, { useRef, useState, useEffect } from 'react';
// import ViewAllButton from '../CommonComponents/ViewAllButton';
// import HajjCard from './HajjCard';
// import Slider from 'react-slick';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import axios from 'axios'
// import { endpoints } from '../../Helpers/apiEndpoints';
// import PackageCard from '../CommonComponents/PackageCard';

// const HajjCards = ({ Packagedata, packages }) => {
//     const sliderRef = useRef(null);
//     const [currentSlide, setCurrentSlide] = useState(0);

//     const handleNext = () => sliderRef.current?.slickNext();
//     const handlePrev = () => sliderRef.current?.slickPrev();
//     const pillsPerPage = 5;
//     const [pillPage, setPillPage] = useState(0);

//     const cardData = Packagedata

//     // const slickSettings = {
//     //     dots: false,
//     //     infinite: true,
//     //     speed: 700,
//     //     slidesToShow: 1,
//     //     slidesToScroll: 1,
//     //     autoplay: false,
//     //     arrows: false,
//     //     beforeChange: (current, next) => {
//     //         setCurrentSlide(next);
//     //         const newPillPage = Math.floor(next / pillsPerPage);
//     //         setPillPage(newPillPage);
//     //     },
//     //     responsive: [
//     //         {
//     //             breakpoint: 768,
//     //             settings: {
//     //                 slidesToShow: 1,
//     //                 slidesToScroll: 1,
//     //             }
//     //         },
//     //         {
//     //             breakpoint: 1024,
//     //             settings: {
//     //                 slidesToShow: 3,
//     //                 slidesToScroll: 1,
//     //             }
//     //         },
//     //         {
//     //             breakpoint: 1440,
//     //             settings: {
//     //                 slidesToShow: 4,
//     //                 slidesToScroll: 1,
//     //             }
//     //         }
//     //     ]
//     // };
//     const slickSettings = {
//         dots: false,
//         infinite: true,
//         speed: 700,
//         slidesToShow: 3, // desktop default
//         slidesToScroll: 1,
//         autoplay: false,
//         arrows: false,
//         beforeChange: (current, next) => {
//             setCurrentSlide(next);
//             const newPillPage = Math.floor(next / pillsPerPage);
//             setPillPage(newPillPage);
//         },
//         responsive: [
//             {
//                 breakpoint: 1440, // ≤ 1440px
//                 settings: {
//                     slidesToShow: 4,
//                     slidesToScroll: 1,
//                 }
//             },
//             {
//                 breakpoint: 1024, // ≤ 1024px
//                 settings: {
//                     slidesToShow: 3,
//                     slidesToScroll: 1,
//                 }
//             },
//             {
//                 breakpoint: 768, // ≤ 768px
//                 settings: {
//                     slidesToShow: 1,
//                     slidesToScroll: 1,
//                 }
//             }
//         ]
//     };

//     return (
//         <div className="w-full">
//             {/* Header */}
//             <div className="flex flex-col sm:flex-row lg:flex-row items-start px-7 lg:items-center justify-between gap-6 lg:gap-0">
//                 <div className="w-full lg:w-[45%]">
//                     <img src="/svgs/crown-black.svg" alt="Crown" className="w-16 mb-3" />
//                     <h2 className="text-[24px] sm:text-[32px] md:text-[36px] font-abril mb-3 leading-tight">
//                         {cardData.heading}
//                     </h2>
//                     <p className="text-[14px] sm:text-[15px] md:text-[16px] font-Montserrat max-w-md leading-relaxed">
//                         {cardData.subheading}
//                     </p>
//                 </div>

//                 <div className="w-full lg:w-[45%] flex justify-start lg:justify-end mt-4 lg:mt-0">
//                     <div className="flex items-center gap-3 flex-wrap">
//                         <ViewAllButton color="primary" slug={cardData.button_link} size="md" label={cardData.button_text} />
//                         <div className="flex items-center gap-3">
//                             <span onClick={handlePrev} className="p-2 bg-white border border-gray-200 rounded-full shadow cursor-pointer hover:scale-105 transition">
//                                 <img src="/svgs/arrow-left.svg" alt="Prev" className="w-5 h-5 sm:w-6 sm:h-6" />
//                             </span>
//                             <span onClick={handleNext} className="p-2 bg-white border border-gray-200 rounded-full shadow cursor-pointer hover:scale-105 transition">
//                                 <img src="/svgs/arrow-right.svg" alt="Next" className="w-5 h-5 sm:w-6 sm:h-6" />
//                             </span>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Slider */}
//             <div className="mt-6 sm:mt-7 md:mt-8 overflow-hidden w-full px-5">
//                 <Slider {...slickSettings} ref={sliderRef} className="w-full">
//                     {packages.map((item, index) => (
//                         <div key={index}
//                             className='px-2'
//                         >
//                             <PackageCard pkg={item} />

//                         </div>
//                     ))}
//                 </Slider>

//                 {/* Custom Dots */}
//                 <div className="flex mt-6 gap-2 w-full justify-center">
//                     {packages
//                         .slice(pillPage * pillsPerPage, (pillPage + 1) * pillsPerPage)
//                         .map((_, index) => {
//                             const actualIndex = pillPage * pillsPerPage + index;
//                             return (
//                                 <span
//                                     key={actualIndex}
//                                     onClick={() => {
//                                         setCurrentSlide(actualIndex);
//                                         sliderRef.current?.slickGoTo(actualIndex);
//                                     }}
//                                     className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${currentSlide === actualIndex ? 'w-8 bg-primary' : 'w-3 bg-secondary'}`}
//                                 />
//                             );
//                         })}

//                 </div>
//             </div>
//         </div>
//     );
// };



// export default function HajjDeals({ pageData }) {
//     const [packages, setPackages] = useState([]);
//     const widgetData = pageData?.section_3_widget?.[0];
//     useEffect(() => {
//         const fetchPackages = async () => {
//             try {
//                 let response;

//                 if (widgetData?.hajj_type !== undefined) {
//                     if (widgetData?.hajj_package_ids) {
//                         response = await axios.get(
//                             endpoints.hajjById(widgetData.hajj_package_ids)
//                         );
//                     } else if (widgetData?.hajj_type) {
//                         response = await axios.get(
//                             endpoints.hajjByType(widgetData.hajj_type)
//                         );
//                     } else {
//                         response = await axios.get(endpoints.getHajj);
//                     }
//                 } else if (widgetData?.umrah_type !== undefined) {
//                     if (widgetData?.umrah_package_ids) {
//                         response = await axios.get(
//                             endpoints.umrahById(widgetData.umrah_package_ids)
//                         );
//                     } else if (widgetData?.umrah_type) {
//                         response = await axios.get(
//                             endpoints.umrahByType(widgetData.umrah_type)
//                         );
//                     } else {
//                         response = await axios.get(endpoints.getUmrah);
//                     }
//                 } else {
//                     response = await axios.get(endpoints.getHajj);
//                 }

//                 setPackages(response.data?.result?.data || []);
//             } catch (error) {
//                 console.error("Error fetching packages:", error);
//             }
//         };

//         fetchPackages();
//     }, [widgetData]);

//     return (
//         <div className="w-full mt-8 sm:mt-12 md:mt-16 md:px-9 flex flex-col lg:flex-row lg:justify-between gap-8">
//             <div className="w-full lg:w-[72%]">
//                 <HajjCards Packagedata={widgetData} packages={packages} />
//             </div>

//             {/* Illustration (hidden on small screens) */}
//             <div className="hidden lg:flex w-full lg:w-[28%] justify-center items-center mt-32">
//                 <img
//                     src='/svgs/hajj_element.svg'
//                     alt='Illustration of Hajj Journey'
//                     className='w-[673.47px] h-[551.75px]'
//                 />
//             </div>
//         </div>
//     );
// }


import React, { useRef, useState, useEffect } from 'react';
import ViewAllButton from '../CommonComponents/ViewAllButton';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import { BASE_URL_SVG, endpoints } from '../../Helpers/apiEndpoints';
import PackageCard from '../CommonComponents/PackageCard';

const HajjCards = ({ Packagedata, packages, loading, c_type }) => {
    const sliderRef = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [pillPage, setPillPage] = useState(0);
    const pillsPerPage = 5;

    const handleNext = () => sliderRef.current?.slickNext();
    const handlePrev = () => sliderRef.current?.slickPrev();

    const slickSettings = {
        dots: false,
        infinite: true,
        speed: 700,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        arrows: false,
        beforeChange: (current, next) => {
            setCurrentSlide(next);
            const newPillPage = Math.floor(next / pillsPerPage);
            setPillPage(newPillPage);
        },
        responsive: [
            { breakpoint: 1480, settings: { slidesToShow: 2.5, slidesToScroll: 1 } },
            { breakpoint: 1440, settings: { slidesToShow: 2, slidesToScroll: 1 } },
            { breakpoint: 1280, settings: { slidesToShow: 2, slidesToScroll: 1 } },
            { breakpoint: 1024, settings: { slidesToShow: 2.3, slidesToScroll: 1 } },
            { breakpoint: 800, settings: { slidesToShow: 2, slidesToScroll: 1 } },
            { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
            { breakpoint: 720, settings: { slidesToShow: 1.5, slidesToScroll: 1 } },
            { breakpoint: 680, settings: { slidesToShow: 1.5, slidesToScroll: 1 } },
            { breakpoint: 640, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ]
    };

    return (
        <div className="w-full">
            {/* Header */}
            <div className="flex flex-col sm:flex-row lg:flex-row items-start px-7 lg:items-center justify-between gap-6 lg:gap-0">
                <div className="w-full lg:w-[45%]">
                    <img src={`${BASE_URL_SVG}/assets/svgs/crown-black.svg`} alt="Crown" className="w-16 mb-3" />
                    <h2 className="text-[24px] sm:text-[32px] md:text-[36px] font-abril mb-3 leading-tight">
                        {Packagedata?.heading}
                    </h2>
                    <p className="text-[14px] sm:text-[15px] md:text-[16px] font-Montserrat max-w-md leading-relaxed">
                        {Packagedata?.subheading}
                    </p>
                </div>

                <div className="w-full lg:w-[45%] flex justify-start lg:justify-end mt-4 lg:mt-0">
                    <div className="flex items-center gap-3 flex-wrap">
                        <ViewAllButton color="primary" slug={Packagedata?.button_link} size="md" label={Packagedata?.button_text} />
                        <div className="flex items-center gap-3">
                            <span onClick={handlePrev} className="p-2 bg-white border border-gray-200 rounded-full shadow cursor-pointer hover:scale-105 transition">
                                <img src={`${BASE_URL_SVG}/assets/svgs/arrow-left.svg`} alt="Prev" className="w-5 h-5 sm:w-6 sm:h-6" />
                            </span>
                            <span onClick={handleNext} className="p-2 bg-white border border-gray-200 rounded-full shadow cursor-pointer hover:scale-105 transition">
                                <img src={`${BASE_URL_SVG}/assets/svgs/arrow-right.svg`} alt="Next" className="w-5 h-5 sm:w-6 sm:h-6" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Slider / Skeleton */}
            <div className="mt-6 sm:mt-7 md:mt-8 overflow-hidden w-full px-2">
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[...Array(3)].map((_, idx) => (
                            <div key={idx} className="animate-pulse bg-gray-200 rounded-lg h-[220px] w-full" />
                        ))}
                    </div>
                ) : (
                    <Slider {...slickSettings} ref={sliderRef} className="w-full">
                        {packages.map((item, index) => (
                            <div key={index} className="px-2">
                                <PackageCard pkg={item} p_type={c_type} />
                            </div>
                        ))}
                    </Slider>
                )}
                {/* Custom Dots */}
                {!loading && packages.length > 0 && (
                    <div className="flex mt-6 gap-2 w-full justify-center">
                        {packages
                            .slice(pillPage * pillsPerPage, (pillPage + 1) * pillsPerPage)
                            .map((_, index) => {
                                const actualIndex = pillPage * pillsPerPage + index;
                                return (
                                    <span
                                        key={index}
                                        onClick={() => {
                                            setCurrentSlide(index);
                                            sliderRef.current?.slickGoTo(actualIndex);
                                        }}
                                        className={`h-1 cursor-pointer rounded-full transition-all duration-300 ${currentSlide === index
                                            ? "w-20 bg-primary h-1"
                                            : "w-10 bg-secondary h-1"
                                            }`}
                                    />
                                );
                            })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default function HajjDeals({ pageData }) {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [type, setType] = useState();

    const widgetData = pageData?.section_3_widget?.[0];

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                setLoading(true);
                let response;

                // ✅ Prioritize Hajj first
                if (widgetData?.hajj_type !== undefined) {
                    setType("hajj")
                    if (widgetData?.hajj_package_ids) {
                        response = await axios.get(endpoints.hajjById(widgetData.hajj_package_ids));
                    } else if (widgetData?.star && Number(widgetData.star) > 0) {
                        const stars = Number(widgetData.star);
                        const type = Number(widgetData.umrah_type);
                        console.log("➡️ Calling Umrah by Stars:", stars, "Type:", type);
                        response = await axios.get(endpoints.hajjByStar(stars, type));
                    }
                    else if (widgetData?.hajj_type) {
                        response = await axios.get(endpoints.hajjByType(widgetData.hajj_type));
                    } else {
                        response = await axios.get(endpoints.getHajj);
                    }
                } else if (widgetData?.umrah_type !== undefined) {
                    setType("umrah")
                    if (widgetData?.umrah_package_ids) {
                        response = await axios.get(endpoints.umrahById(widgetData.umrah_package_ids));
                    } else if (widgetData?.star && Number(widgetData.star) > 0) {
                        const stars = Number(widgetData.star);
                        const type = Number(widgetData.umrah_type);
                        console.log("➡️ Calling Umrah by Stars:", stars, "Type:", type);
                        response = await axios.get(endpoints.umrahByStar(stars, type));
                    }
                    else if (widgetData?.umrah_type) {
                        response = await axios.get(endpoints.umrahByType(widgetData.umrah_type));
                    } else {
                        response = await axios.get(endpoints.getUmrah);
                    }
                } else {
                    response = await axios.get(endpoints.getHajj);
                }

                setPackages(response.data?.result?.data || []);
            } catch (error) {
                console.error("Error fetching packages:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPackages();
    }, [widgetData]);

    // ❌ Don’t show section if no packages
    if (!loading && packages.length === 0) return null;

    return (
        <div className="w-full mt-8 sm:mt-12 md:mt-16 md:px-5 flex flex-col lg:flex-row lg:justify-between ">
            <div className="w-full lg:w-[72%]">
                <HajjCards Packagedata={widgetData} packages={packages} loading={loading} c_type={type} />
            </div>
            {/* Illustration (hidden on small screens) */}
            <div className="hidden lg:flex w-full lg:w-[28%] justify-center items-center mt-32">
                <img
                    src={`${BASE_URL_SVG}/assets/svgs/hajj_element.svg`}
                    alt='Illustration of Hajj Journey'
                    className='w-[673.47px] h-[551.75px]'
                />
            </div>
        </div>
    );
}
