import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import ViewAllButton from './ViewAllButton';
import PackageCard from './PackageCard';
import { BASE_URL_SVG, endpoints } from '../../Helpers/apiEndpoints';
import axios from 'axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CardSlider({ pageData }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [type, setType] = useState();
  const [packages, setPackages] = useState([]);
  const sliderRef = useRef(null);

  const widgetData = pageData?.section_1_widget?.[0];
  const CARDS_PER_SLIDE = 1;

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
    slidesToShow: 3,  // how many visible
    slidesToScroll: 1, // always move 1
    arrows: false,
    beforeChange: (_, next) => setCurrentSlide(next),
    responsive: [
      {
        breakpoint: 1280,
        settings: { slidesToShow: 2, slidesToScroll: 1 }
      },
      {
        breakpoint: 1380,
        settings: { slidesToShow: 3, slidesToScroll: 1 }
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 1, slidesToScroll: 1 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1, slidesToScroll: 1 }
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, slidesToScroll: 1 }
      }
    ],
  };

  return (
    <div className="w-full flex flex-col md:flex-row bg-white">
      {/* 🔶 Orange Section */}
      <div className="w-full md:w-2/5 lg:w-1/4 bg-[#dfa844] flex items-center justify-center px-6 py-10">
        <div className="flex flex-col justify-center text-center md:text-left">
          <img
            src={`${BASE_URL_SVG}/assets/svgs/crown.svg`}
            alt="Crown"
            className="w-14 sm:w-20 md:w-24 mb-4 mx-auto md:mx-0"
            loading="lazy"
          />
          <h2 className="text-white text-[28px] sm:text-[36px] md:text-[40px] font-abril leading-tight">
            {widgetData?.heading}
          </h2>
          <span className="block text-white text-[14px] mt-6 font-Montserrat leading-relaxed">
            {widgetData?.subheading}
          </span>
          <div className="mt-8 flex items-center justify-center md:justify-start gap-3">
            <ViewAllButton
              color="secondary"
              slug={widgetData?.button_link}
              size="md"
              label={widgetData?.button_text}
            />
            <span
              onClick={handlePrev}
              className="bg-white cursor-pointer rounded-full p-2 shadow-md"
            >
              <img src={`${BASE_URL_SVG}/assets/svgs/arrow-right.svg`} alt="Left Arrow" className="w-5 h-5 sm:w-6 sm:h-6 rotate-180" loading="lazy" />
            </span>
            <span
              onClick={handleNext}
              className="bg-white cursor-pointer rounded-full p-2 shadow-md"
            >
              <img
                src={`${BASE_URL_SVG}/assets/svgs/arrow-right.svg`}
                alt="Right Arrow"
                className="w-5 h-5 sm:w-6 sm:h-6"
                loading="lazy"
              />
            </span>
          </div>
        </div>
      </div>

      {/* 🎴 Slider Section */}
      <div className="w-full md:w-3/5 lg:w-3/4 flex flex-col items-center px-4 py-10 -mt-14 md:mt-0 md:-ml-10 relative z-20">
        <Slider {...slickSettings} ref={sliderRef} className="w-full">
          {packages.map((item, i) => (
            <div key={i} className="px-2">
              <PackageCard pkg={item} p_type={type} />
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
              className={`h-1 cursor-pointer rounded-full transition-all duration-300 ${currentSlide === index
                ? "w-20 bg-primary h-1"
                : "w-10 bg-secondary h-1"
                }`}
            />
          ))}
        </div>
      </div>
    </div>

  );
}
