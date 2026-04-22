// SmoothScrollProvider.jsx
import { useEffect } from "react";
import LocomotiveScroll from "locomotive-scroll";



export default function SmoothScrollProvider({ children }) {
  useEffect(() => {
    const scrollEl = document.querySelector("[data-scroll-container]");

    const scroll = new LocomotiveScroll({
      el: scrollEl,
      smooth: false,
      multiplier: 5, // scroll speed // optional class on elements
    });

    return () => {
      if (scroll) scroll.destroy();
    };
  }, []);

  return <div data-scroll-container>{children}</div>;
}
