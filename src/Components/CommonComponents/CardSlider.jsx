// import React, { useState, useRef } from 'react';
// import Slider from 'react-slick';
// import ViewAllButton from './ViewAllButton';
// import PackageCard from './PackageCard';
// import data from '../../data/dummyData.json';

// // Import CSS for react-slick
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const CARDS_PER_SLIDE = 3;

// export default function CardSlider({ pageData }) {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const sliderRef = useRef(null);
//   const widgetData = pageData?.section_1_widget?.[0];

//   // Create slides of 3 cards each
//   const slides = [];
//   for (let i = 0; i < data.length; i += CARDS_PER_SLIDE) {
//     slides.push(data.slice(i, i + CARDS_PER_SLIDE));
//   }

//   const handleNext = () => {
//     if (sliderRef.current) {
//       sliderRef.current.slickNext();
//     }
//   };

//   const handlePrev = () => {
//     if (sliderRef.current) {
//       sliderRef.current.slickPrev();
//     }
//   };


//   const slickSettings = {
//     dots: false,
//     infinite: true,
//     speed: 700,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     arrows: false,
//     beforeChange: (current, next) => setCurrentSlide(next),
//     responsive: [
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         }
//       }
//     ]
//   };

//   return (
//     <div
//       className="w-full flex bg-no-repeat bg-left items-center"
//       style={{
//         backgroundImage: `
//             url('/svgs/orange-overlay.svg'),
//             url('/images/iStock-1001687846.png')
//           `,
//         backgroundSize: 'clamp(250px, 40vw, 500px), clamp(250px, 40vw, 500px)',
//         backgroundRepeat: 'no-repeat, no-repeat',
//         backgroundPosition: 'left, left',
//       }}
//     >
//       <div className="w-full flex flex-col md:flex-row items-start sm:w-[90%] md:w-[85%] ml-6 sm:ml-10 md:ml-12 mt-10 sm:mt-12 md:mt-14 gap-8">
//         {/* <div className="w-full md:w-[33%] ">
//           <div className="flex flex-col text-white text-[28px] sm:text-[36px] md:text-[40px] font-abril leading-tight">
//             <img src="/svgs/crown.svg" alt="Crown" className="w-14 sm:w-20 md:w-24 mb-4" />
//             <h2>Our Best Umrah</h2>
//             <h2>Deals 2025–2026</h2>
//           </div>

//           <span className="block text-white text-[14px] mt-6 font-Montserrat leading-relaxed">
//             Makkah Travel is here to help you visit
//             <br />
//             religious places and make Umrah trips
//             <br />
//             that connect with your soul. We're experts
//             <br />
//             at creating meaningful journeys, so it isn't
//             <br />
//             just a trip but a transformative experience.
//           </span>

//           <div className="mt-8 flex items-center gap-3">
//             <ViewAllButton color="secondary" slug="/" size="sm" />
//             <span
//               onClick={handlePrev}
//               className="bg-white cursor-pointer rounded-full p-2 shadow-md hover:scale-105 transition"
//               aria-label="Previous Slide"
//             >
//               <img src="/svgs/arrow-left.svg" alt="Left Arrow" className="w-5 h-5 sm:w-6 sm:h-6" />
//             </span>
//             <span
//               onClick={handleNext}
//               className="bg-white cursor-pointer rounded-full p-2 shadow-md hover:scale-105 transition"
//               aria-label="Next Slide"
//             >
//               <img src="/svgs/arrow-right.svg" alt="Right Arrow" className="w-5 h-5 sm:w-6 sm:h-6" />
//             </span>
//           </div>
//         </div> */}
//         <div className="w-full md:w-[33%] flex items-center">
//           <div className="flex flex-col justify-center">
//             <div className="flex flex-col text-white text-[28px] sm:text-[36px] md:text-[40px] font-abril leading-tight">
//               <img src="/svgs/crown.svg" alt="Crown" className="w-14 sm:w-20 md:w-24 mb-4" />
//               <h2>{widgetData.heading}</h2>
//             </div>

//             <span className="block text-white text-[14px] mt-6 font-Montserrat leading-relaxed">
//               {widgetData.subheading}
//             </span>

//             <div className="mt-8 flex items-center gap-3">
//               <ViewAllButton color="secondary" slug={widgetData.button_link} size="sm" label={widgetData.button_text} />
//               <span
//                 onClick={handlePrev}
//                 className="bg-white cursor-pointer rounded-full p-2 shadow-md hover:scale-105 transition"
//                 aria-label="Previous Slide"
//               >
//                 <img src="/svgs/arrow-left.svg" alt="Left Arrow" className="w-5 h-5 sm:w-6 sm:h-6" />
//               </span>
//               <span
//                 onClick={handleNext}
//                 className="bg-white cursor-pointer rounded-full p-2 shadow-md hover:scale-105 transition"
//                 aria-label="Next Slide"
//               >
//                 <img src="/svgs/arrow-right.svg" alt="Right Arrow" className="w-5 h-5 sm:w-6 sm:h-6" />
//               </span>
//             </div>
//           </div>
//         </div>


//         {/* Cards Column with React Slick */}
//         <div className="w-full flex flex-col items-center overflow-hidden">
//           <Slider {...slickSettings} ref={sliderRef} className="w-full">
//             {slides.map((slide, index) => (
//               <div key={index} className="w-full">
//                 <div className="flex justify-between px-1">
//                   {slide.map((item, i) => (
//                     <div key={i} className="w-full sm:w-1/2 lg:w-1/3 px-2">
//                       <PackageCard
//                         description={item.description}
//                         night={item.night}
//                         star={item.star}
//                         price={item.price}
//                       />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </Slider>

//           {/* Pagination Dots (Pills) */}
//           <div className="flex mt-6 gap-2">
//             {slides.map((_, index) => (
//               <span
//                 key={index}
//                 onClick={() => {
//                   setCurrentSlide(index);
//                   if (sliderRef.current) {
//                     sliderRef.current.slickGoTo(index);
//                   }
//                 }}
//                 className={`h-2 cursor-pointer rounded-full transition-all duration-300 ${
//                   currentSlide === index ? 'w-20 bg-primary h-1' : 'w-10 bg-secondary h-1'
//                   }`}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState, useRef } from 'react';
// import Slider from 'react-slick';
// import ViewAllButton from './ViewAllButton';
// import PackageCard from './PackageCard';
// import data from '../../data/dummyData.json';

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// export default function CardSlider() {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const sliderRef = useRef(null);

//   const handleNext = () => {
//     sliderRef.current?.slickNext();
//   };

//   const handlePrev = () => {
//     sliderRef.current?.slickPrev();
//   };

//   const slickSettings = {
//     dots: false,
//     infinite: true,
//     speed: 700,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     arrows: false,
//     beforeChange: (_, next) => setCurrentSlide(next),
//     responsive: [
//       {
//         breakpoint: 1024, // tablet & small desktop
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 640, // mobile
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 720, // mobile
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   };

//   // chunk cards: each slide contains 1 on mobile, 2 on tablet, 3 on desktop
//   const slides = [];
//   const chunkSize = 1; // mobile-first (handled visually per breakpoint)
//   for (let i = 0; i < data.length; i += chunkSize) {
//     slides.push(data.slice(i, i + chunkSize));
//   }

//   return (
//     <div className="w-full bg-cover bg-no-repeat bg-left-top"
//       style={{
//         backgroundImage: `
//           url('/svgs/orange-overlay.svg'),
//           url('/images/iStock-1001687846.png')
//         `,
//         backgroundSize: 'contain, contain',
//         backgroundRepeat: 'no-repeat, no-repeat',
//         backgroundPosition: 'top, top',
//       }}
//     >
//       {/* Top orange content section */}
//       <div className="w-full flex flex-col  px-4 pt-10 pb-6 sm:px-6 md:px-12 md:pt-14 md:pb-10">
//         <img src="/svgs/crown.svg" alt="Crown" className="w-24 sm:w-24 md:w-24 mb-4" />
//         <div className="text-white text-[32px] sm:text-[32px] md:text-[40px] font-abril text-start leading-tight">
//           <h2>Our Best Umrah</h2>
//           <h2>Deals 2025–2026</h2>
//         </div>
//         <p className="text-white text-[16px] sm:text-[16px] mt-4 font-Montserrat text-start leading-relaxed max-w-xl">
//           Makkah Travel is here to help you visit religious places and make Umrah trips that connect with your soul. We're experts at creating meaningful journeys, so it isn't just a trip but a transformative experience.
//         </p>

//         {/* Buttons */}
//         <div className="mt-6 flex items-center gap-3">
//           <ViewAllButton color="secondary" slug="/" size="sm" />
//           <button onClick={handlePrev} className="bg-white p-2 rounded-full shadow hover:scale-105 transition">
//             <img src="/svgs/arrow-left.svg" alt="Previous" className="w-5 h-5" />
//           </button>
//           <button onClick={handleNext} className="bg-white p-2 rounded-full shadow hover:scale-105 transition">
//             <img src="/svgs/arrow-right.svg" alt="Next" className="w-5 h-5" />
//           </button>
//         </div>
//       </div>

//       {/* Card Slider Section */}
//       <div className="mt-6 sm:mt-10 md:mt-10 px-4 sm:px-3 md:px-2">
//         <Slider {...slickSettings} ref={sliderRef}>
//           {slides.map((slide, index) => (
//             <div key={index}>
//               <div className="flex flex-wrap justify-center sm:justify-between gap-4 sm:gap-6">
//                 {slide.map((item, i) => (
//                   <div
//                     key={i}
//                     className="w-full sm:w-[90%] md:w-full transition-all duration-300"
//                   >
//                     <PackageCard
//                       description={item.description}
//                       night={item.night}
//                       star={item.star}
//                       price={item.price}
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </Slider>

//         {/* Pills */}
//         <div className="mt-6 overflow-x-auto whitespace-nowrap flex gap-2 justify-start px-2 sm:justify-center scrollbar-hide">
//           {slides.map((_, index) => (
//             <span
//               key={index}
//               onClick={() => {
//                 setCurrentSlide(index);
//                 sliderRef.current?.slickGoTo(index);
//               }}
//               className={`inline-block h-1 rounded-full cursor-pointer transition-all duration-300 ${currentSlide === index ? 'w-20 bg-primary' : 'w-10 bg-secondary'
//                 }`}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import ViewAllButton from './ViewAllButton';
import PackageCard from './PackageCard';
import { BASE_URL_SVG, endpoints } from '../../Helpers/apiEndpoints';
import axios from 'axios';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CARDS_PER_SLIDE = 3;

export default function CardSlider({ pageData }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [type, setType] = useState();
  const [packages, setPackages] = useState([]);
  const sliderRef = useRef(null);

  const widgetData = pageData?.section_1_widget?.[0];

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        let response;
        if (widgetData?.umrah_type !== undefined) {
          setType("umrah")
          if (widgetData?.umrah_package_ids) {
            response = await axios.get(
              endpoints.umrahById(widgetData.umrah_package_ids)
            );
          } else if (widgetData?.star && Number(widgetData.star) > 0) {
            const stars = Number(widgetData.star);
            const type = Number(widgetData.umrah_type);
            console.log("➡️ Calling Umrah by Stars:", stars, "Type:", type);
            response = await axios.get(endpoints.umrahByStar(stars, type));
          }
          else if (widgetData?.umrah_type) {
            response = await axios.get(
              endpoints.umrahByType(widgetData.umrah_type)
            );
          } else {
            response = await axios.get(endpoints.getUmrah);
          }
        }
        else if (widgetData?.hajj_type !== undefined) {
          setType("hajj")
          if (widgetData?.hajj_package_ids) {
            response = await axios.get(
              endpoints.hajjById(widgetData.hajj_package_ids)
            );
          } else if (widgetData?.star && Number(widgetData.star) > 0) {
            const stars = Number(widgetData.star);
            const type = Number(widgetData.umrah_type);
            console.log("➡️ Calling hajj by Stars:", stars, "Type:", type);
            response = await axios.get(endpoints.hajjByStar(stars, type));
          }
          else if (widgetData?.hajj_type) {
            response = await axios.get(
              endpoints.hajjByType(widgetData.hajj_type)
            );
          } else {
            response = await axios.get(endpoints.getHajj);
          }
        }
        else {
          response = await axios.get(endpoints.getUmrah);
        }

        setPackages(response.data?.result?.data || []);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    fetchPackages();
  }, [widgetData]);

  const slides = [];
  for (let i = 0; i < packages.length; i += CARDS_PER_SLIDE) {
    slides.push(packages.slice(i, i + CARDS_PER_SLIDE));
  }

  const handleNext = () => sliderRef.current?.slickNext();
  const handlePrev = () => sliderRef.current?.slickPrev();

  const slickSettings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    beforeChange: (_, next) => setCurrentSlide(next),
    responsive: [
      {
        breakpoint: 1280, // ≤ 1280px
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 1024, // ≤ 1024px
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768, // ≤ 768px
        settings: {
          slidesToShow: 1.7,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480, // ≤ 480px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ],
  };
  return (
    <div className="w-full flex bg-no-repeat bg-left items-center"
      style={{
        backgroundImage: `
          url(${BASE_URL_SVG}/assets/svgs/orange-overlay.svg),
          url('/images/iStock-1001687846.png')
        `,
        backgroundSize: 'clamp(250px, 40vw, 500px), clamp(250px, 40vw, 500px)',
        backgroundRepeat: 'no-repeat, no-repeat',
        backgroundPosition: 'left, left',
      }}
    >
      <div className="w-full flex flex-col md:flex-row items-start sm:w-[90%] md:w-[85%] ml-6 sm:ml-10 md:ml-12 mt-10 sm:mt-12 md:mt-14 gap-8">

        <div className="w-full md:w-[33%] flex items-center">
          <div className="flex flex-col justify-center">
            <div className="flex flex-col text-white text-[28px] sm:text-[36px] md:text-[40px] font-abril leading-tight">
              <img src={`${BASE_URL_SVG}/assets/svgs/crown.svg`} alt="Crown" className="w-14 sm:w-20 md:w-24 mb-4" />
              <h2>{widgetData?.heading}</h2>
            </div>

            <span className="block text-white text-[14px] mt-6 font-Montserrat leading-relaxed">
              {widgetData?.subheading}
            </span>

            <div className="mt-8 flex items-center gap-3">
              <ViewAllButton
                color="secondary"
                slug={widgetData?.button_link}
                size="sm"
                label={widgetData?.button_text}
              />
              <span onClick={handlePrev} className="bg-white cursor-pointer rounded-full p-2 shadow-md">
                <img src={`${BASE_URL_SVG}/assets/svgs/arrow-left.svg`} alt="Left Arrow" className="w-5 h-5 sm:w-6 sm:h-6" />
              </span>
              <span onClick={handleNext} className="bg-white cursor-pointer rounded-full p-2 shadow-md">
                <img src={`${BASE_URL_SVG}/assets/svgs/arrow-right.svg`} alt="Right Arrow" className="w-5 h-5 sm:w-6 sm:h-6" />
              </span>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col items-center overflow-hidden">
          <Slider {...slickSettings} ref={sliderRef} className="w-full">
            {slides.map((slide, index) => (
              <div key={index} className="w-full">
                <div className="flex justify-between px-1">
                  {slide.map((item, i) => (
                    <div key={i} className="w-full sm:w-1/2 lg:w-1/3 px-2">
                      <PackageCard pkg={item} p_type={type} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </Slider>

          {/* Pagination Dots */}
          <div className="flex mt-6 gap-2">
            {slides.map((_, index) => (
              <span
                key={index}
                onClick={() => {
                  setCurrentSlide(index);
                  sliderRef.current?.slickGoTo(index);
                }}
                className={`h-2 cursor-pointer rounded-full transition-all duration-300 ${currentSlide === index ? 'w-20 bg-primary h-1' : 'w-10 bg-secondary h-1'
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
