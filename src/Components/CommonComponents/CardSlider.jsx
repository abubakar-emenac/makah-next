import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import ViewAllButton from './ViewAllButton';
import PackageCard from './PackageCard';
import data from '../../data/dummyData.json';

// Import CSS for react-slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CARDS_PER_SLIDE = 3;

export default function CardSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  // Create slides of 3 cards each
  const slides = [];
  for (let i = 0; i < data.length; i += CARDS_PER_SLIDE) {
    slides.push(data.slice(i, i + CARDS_PER_SLIDE));
  }

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };


  const slickSettings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // We handle autoplay manually
    autoplaySpeed: 3000,
    arrows: false,
    beforeChange: (current, next) => setCurrentSlide(next),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div
      className="w-full flex bg-no-repeat bg-left items-center"
      style={{
        backgroundImage: `
            url('/svg/orange-overlay.svg'),
            url('/images/iStock-1001687846.png')
          `,
        backgroundSize: 'clamp(250px, 40vw, 500px), clamp(250px, 40vw, 500px)',
        backgroundRepeat: 'no-repeat, no-repeat',
        backgroundPosition: 'left, left',
      }}
    >
      <div className="w-full flex flex-col md:flex-row items-start sm:w-[90%] md:w-[85%] ml-6 sm:ml-10 md:ml-12 mt-10 sm:mt-12 md:mt-14 gap-8">
        {/* <div className="w-full md:w-[33%] ">
          <div className="flex flex-col text-white text-[28px] sm:text-[36px] md:text-[40px] font-abril leading-tight">
            <img src="/svg/crown.svg" alt="Crown" className="w-14 sm:w-20 md:w-24 mb-4" />
            <h2>Our Best Umrah</h2>
            <h2>Deals 2025–2026</h2>
          </div>

          <span className="block text-white text-[14px] mt-6 font-Montserrat leading-relaxed">
            Makkah Travel is here to help you visit
            <br />
            religious places and make Umrah trips
            <br />
            that connect with your soul. We're experts
            <br />
            at creating meaningful journeys, so it isn't
            <br />
            just a trip but a transformative experience.
          </span>

          <div className="mt-8 flex items-center gap-3">
            <ViewAllButton color="secondary" slug="/" size="sm" />
            <span
              onClick={handlePrev}
              className="bg-white cursor-pointer rounded-full p-2 shadow-md hover:scale-105 transition"
              aria-label="Previous Slide"
            >
              <img src="/svg/arrow-left.svg" alt="Left Arrow" className="w-5 h-5 sm:w-6 sm:h-6" />
            </span>
            <span
              onClick={handleNext}
              className="bg-white cursor-pointer rounded-full p-2 shadow-md hover:scale-105 transition"
              aria-label="Next Slide"
            >
              <img src="/svg/arrow-right.svg" alt="Right Arrow" className="w-5 h-5 sm:w-6 sm:h-6" />
            </span>
          </div>
        </div> */}
        <div className="w-full md:w-[33%] flex items-center">
          <div className="flex flex-col justify-center">
            <div className="flex flex-col text-white text-[28px] sm:text-[36px] md:text-[40px] font-abril leading-tight">
              <img src="/svg/crown.svg" alt="Crown" className="w-14 sm:w-20 md:w-24 mb-4" />
              <h2>Our Best Umrah</h2>
              <h2>Deals 2025–2026</h2>
            </div>

            <span className="block text-white text-[14px] mt-6 font-Montserrat leading-relaxed">
              Makkah Travel is here to help you visit
              <br />
              religious places and make Umrah trips
              <br />
              that connect with your soul. We're experts
              <br />
              at creating meaningful journeys, so it isn't
              <br />
              just a trip but a transformative experience.
            </span>

            <div className="mt-8 flex items-center gap-3">
              <ViewAllButton color="secondary" slug="/" size="sm" />
              <span
                onClick={handlePrev}
                className="bg-white cursor-pointer rounded-full p-2 shadow-md hover:scale-105 transition"
                aria-label="Previous Slide"
              >
                <img src="/svg/arrow-left.svg" alt="Left Arrow" className="w-5 h-5 sm:w-6 sm:h-6" />
              </span>
              <span
                onClick={handleNext}
                className="bg-white cursor-pointer rounded-full p-2 shadow-md hover:scale-105 transition"
                aria-label="Next Slide"
              >
                <img src="/svg/arrow-right.svg" alt="Right Arrow" className="w-5 h-5 sm:w-6 sm:h-6" />
              </span>
            </div>
          </div>
        </div>


        {/* Cards Column with React Slick */}
        <div className="w-full flex flex-col items-center overflow-hidden">
          <Slider {...slickSettings} ref={sliderRef} className="w-full">
            {slides.map((slide, index) => (
              <div key={index} className="w-full">
                <div className="flex justify-between px-1">
                  {slide.map((item, i) => (
                    <div key={i} className="w-full sm:w-1/2 lg:w-1/3 px-2">
                      <PackageCard
                        description={item.description}
                        night={item.night}
                        star={item.star}
                        price={item.price}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </Slider>

          {/* Pagination Dots (Pills) */}
          <div className="flex mt-6 gap-2">
            {slides.map((_, index) => (
              <span
                key={index}
                onClick={() => {
                  setCurrentSlide(index);
                  if (sliderRef.current) {
                    sliderRef.current.slickGoTo(index);
                  }
                }}
                className={`h-2 cursor-pointer rounded-full transition-all duration-300 ${
                  currentSlide === index ? 'w-20 bg-primary h-1' : 'w-10 bg-secondary h-1'
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

