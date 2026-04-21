"use client";

import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

const mapBreakpoints = (responsive = []) => {
  const out = {};
  responsive.forEach((item) => {
    if (!item?.breakpoint || !item?.settings) return;
    out[item.breakpoint] = {
      slidesPerView: item.settings.slidesToShow ?? 1,
      slidesPerGroup: item.settings.slidesToScroll ?? 1,
    };
  });
  return out;
};

const Slider = forwardRef(function Slider(props, ref) {
  const {
    children,
    slidesToShow = 1,
    slidesToScroll = 1,
    speed = 500,
    infinite = false,
    autoplay = false,
    autoplaySpeed = 3000,
    responsive = [],
    beforeChange,
    className,
  } = props;
  const [swiper, setSwiper] = useState(null);

  const breakpoints = useMemo(() => mapBreakpoints(responsive), [responsive]);
  const slideCount = Array.isArray(children) ? children.length : 1;

  useImperativeHandle(ref, () => ({
    slickNext: () => swiper?.slideNext(),
    slickPrev: () => swiper?.slidePrev(),
    slickGoTo: (index) => swiper?.slideToLoop?.(index) ?? swiper?.slideTo(index),
  }));

  useEffect(() => {
    if (!swiper || !autoplay) return;
    const id = setInterval(() => swiper.slideNext(), autoplaySpeed);
    return () => clearInterval(id);
  }, [autoplay, autoplaySpeed, swiper]);

  return (
    <Swiper
      className={className}
      loop={infinite && slideCount > 1}
      speed={speed}
      slidesPerView={slidesToShow}
      slidesPerGroup={slidesToScroll}
      breakpoints={breakpoints}
      onSwiper={setSwiper}
      onSlideChange={(s) => beforeChange?.(s.previousIndex, s.realIndex)}
    >
      {(Array.isArray(children) ? children : [children]).map((child, i) => (
        <SwiperSlide key={i}>{child}</SwiperSlide>
      ))}
    </Swiper>
  );
});

export default Slider;
