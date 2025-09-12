import React, { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { useLocation } from "react-router-dom";

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);
  const { pathname } = useLocation();

  // show/hide on scroll
  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // scroll to top when route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {visible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-[9999] bg-primary hover:bg-primary-hover text-white p-3 rounded-full shadow-lg transition-opacity duration-300"
        >
          <ChevronUp size={24} />
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;
