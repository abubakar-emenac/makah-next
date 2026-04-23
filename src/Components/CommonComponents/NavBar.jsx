
import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useGlobalData } from "../../Helpers/useGlobalData";
import { WEB_URL, BASE_URL_SVG } from "../../Helpers/apiEndpoints";

const Navbar = ({ textColor = "black" }) => {
  const { globalData } = useGlobalData();
  const location = useLocation();
  const [isMounted, setIsMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const settings = globalData?.result?.settings || [];
  const logoSetting = settings.find(
    (item) => item.ref_name === "Website Logo"
  );
  // Fetch phone number from global_variables
  const phoneNumberObj = globalData?.result?.global_variables?.find(
    (item) => item.code === "[%PHONENUMBER%]"
  );
  const phoneNumber = phoneNumberObj?.code_value || "";

  // Fetch WhatsApp number from global_variables
  const whatsappObj = globalData?.result?.global_variables?.find(
    (item) => item.code === "[%WHATSAPP%]"
  );
  const whatsappNumber = whatsappObj?.code_value || "";

  // Construct WhatsApp link
  const whatsappLink = whatsappNumber ? `https://wa.me/${whatsappNumber}` : "#";

  const logo = logoSetting?.contents?.main_logo;
  const darkLogo = logoSetting?.contents?.dark_logo;


  const darkLogoSlugs = [
    "terms-and-conditions",
    "privacy-policy",
    "contact-us",
    "cookies-policy",
    "customise-your-package"
  ];

  const path = location.pathname;

  const forceDarkLogo =
    darkLogoSlugs.includes(path.replace("/", "")) || // static pages
    /^\/hajj\/[^/]+$/.test(path) || // hajj/:slug
    /^\/umrah\/[^/]+$/.test(path);  // umrah/:slug
  // const textColorClass = textColor === "white" ? "text-white" : "text-black";
  const navItems = useMemo(() => {
    if (!globalData?.result?.navigation_bar) return [];

    const allNav = globalData.result.navigation_bar;

    const parents = allNav.filter((item) => item.parent_id === "0");

    return parents.map((parent) => ({
      id: parent.id,
      label: parent.title,
      link: `/${parent.page_url}`,
      hasDropdown: allNav.some((child) => child.parent_id === String(parent.id)),
      dropdown: allNav
        .filter((child) => child.parent_id === String(parent.id))
        .map((child) => ({
          id: child.id,
          label: child.title,
          link: `/${child.page_url}`,
        })),
    }));
  }, [globalData]);

  const toggleDropdown = (label) => {
    setActiveDropdown((prev) => (prev === label ? null : label));
  };

  const handleMobileNavClick = () => {
    setMobileOpen(false);
    setActiveDropdown(null);
  };
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onScroll = () => {
    if (typeof window !== 'undefined') {
      setScrolled(window.scrollY > 50);
    }
  };

  useEffect(() => {
    onScroll(); // Check scroll status immediately on mount
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full font-Montserrat z-[9999] transition-all duration-300 
    ${(scrolled) ? "bg-white shadow-md text-black" : "bg-transparent text-black"}`}
    >

      <div className="w-full max-w-[90%]  sm:max-w-[90%] md:max-w-[85%] lg:max-w-[90%] xl:max-w-[80%] mx-auto px-1 md:px-4 lg:px-8 py-2 md:py-3 flex justify-between items-center">

        {/* LOGO */}
        {/* <Link to={'/'} rel="preload" hre className="text-base sm:text-lg md:text-xl font-bold whitespace-nowrap text-white">
          <img src={`${WEB_URL}/${(scrolled || forceDarkLogo) ? darkLogo : logo}`} decoding="sync" fetchPriority="high" loading="eager" alt="logo" className="lg:w-40 md:w-32 sm:w-28 w-16 " />
        </Link> */}
        <Link to="/" className="flex items-center">
          {!logo && !darkLogo ? (
            // Fallback image (SEO friendly, no blink)
            <img
              src="/svg/logo.png"
              alt="Makkah Travel"
              loading="eager"
              fetchPriority="high"
              className="lg:w-40 md:w-32 sm:w-28 w-16"
            />
          ) : (
            <img
              src={`${WEB_URL}${isMobile || scrolled || forceDarkLogo ? darkLogo : logo}`}
              alt="Makkah Travel"
              className="lg:w-40 md:w-32 sm:w-28 w-16"
              loading="eager"
              fetchPriority="high"
              decoding="sync"
            />
          )}
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden lg:flex items-center gap-4 lg:gap-6 xl:gap-10">
          <div className="flex items-center gap-2 md:gap-4 lg:gap-6 xl:gap-6 text-xs bg-white py-3 px-4 md:text-sm lg:text-base font-medium rounded-md">

            {navItems.map((item) => (
              <div
                key={item.id}
                className="relative group gap-x-7"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={item.link}
                  className="hover:text-green-600 cursor-pointer flex items-center gap-2"
                >
                  {item.label}
                  {item.hasDropdown && <span className="text-[10px]">▾</span>}
                </Link>

                {/* DROPDOWN */}
                {item.hasDropdown && (
                  <div
                    className={`absolute left-1/2 top-full -translate-x-1/2 mt-2 min-w-[200px] max-w-[290px] bg-white text-black rounded-md shadow-lg border transition-all duration-200 ${activeDropdown === item.label ? "opacity-100 visible" : "opacity-0 invisible"
                      }`}
                  >
                    <ul className="py-2 text-xs md:text-sm">
                      {item.dropdown.map((child) => (
                        <li
                          key={child.id}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                          <Link to={child.link} className="block w-full">
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                )}
              </div>
            ))}
          </div>
          <div className="relative rounded-l-3xl rounded-r-lg flex items-center text-xs md:text-sm font-medium ml-4 bg-white">
            <div className="  pl-3 md:pl-4 py-1.5 md:py-[1.5px] flex flex-col items-end">
              <span className="text-yellow-500 leading-tight">Call Now:</span>
              <a href={`tel:${phoneNumber}`} >
                {phoneNumber}
              </a>

            </div>
            <div>
              <img src={`${BASE_URL_SVG}/assets/svgs/phone.svg`} alt="" />
            </div>
            {/* <div className="absolute right-0 translate-x-1/2 top-1/2 -translate-y-1/2 w-10 h-7 md:w-8 md:h-8 rounded-full shadow-md flex items-center justify-center"> */}
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <img
                src={`${BASE_URL_SVG}/assets/svgs/wa.svg`}
                alt="whatsapp"
                className="w-10 h-10 md:w-10 md:h-10"
              />
            </a>
            {/* </div> */}
          </div>
        </div>

        {/* MOBILE HAMBURGER */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden focus:outline-none text-black"
        >

          <svg
            className="w-6 h-6 md:w-7 md:h-7"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Overlay */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.25 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-[998]"
              onClick={handleMobileNavClick}
            />

            {/* Mobile/Tablet Menu Panel */}
            <motion.div
              key="mobile-menu"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 120 }}
              className="fixed top-16 left-1/2 -translate-x-1/2 w-[95%] max-w-lg md:max-w-md bg-white rounded-3xl shadow-2xl z-[9999] flex flex-col px-6 py-6 space-y-4 bg-black"
            >
              {navItems.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * i }}
                >
                  {/* Parent Link */}
                  <div
                    className="flex justify-between items-center py-2 px-3 rounded-lg hover:bg-green-50 transition-all cursor-pointer"
                    onClick={() => item.hasDropdown && toggleDropdown(item.label)}
                  >
                    <Link
                      to={item.link}
                      className="text-base md:text-lg font-semibold"
                      onClick={handleMobileNavClick}
                    >
                      {item.label}
                    </Link>
                    {item.hasDropdown && (
                      <span className="ml-2 text-sm">{activeDropdown === item.label ? "▲" : "▼"}</span>
                    )}
                  </div>

                  {/* Dropdown */}
                  {item.hasDropdown && activeDropdown === item.label && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="pl-6 mt-2 space-y-2 overflow-hidden"
                    >
                      {item.dropdown.map((child) => (
                        <li key={child.id}>
                          <Link
                            to={child.link}
                            onClick={handleMobileNavClick}
                            className="block py-2 px-2 rounded-md hover:bg-green-100 transition-all text-base md:text-[16px]"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </motion.div>
              ))}

              {/* Call Now Section */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="relative flex items-center bg-yellow-100 rounded-2xl shadow-lg p-4 mt-2 hover:scale-105 transition-transform"
              >
                <div className="flex flex-col">
                  <span className="text-yellow-600 font-bold text-sm md:text-base">Call Now:</span>
                  <a href={`tel:${phoneNumber}`} className="text-gray-800 font-medium text-sm md:text-base">{phoneNumber}</a>
                </div>
                <img src={`${BASE_URL_SVG}/assets/svgs/phone.svg`} alt="" className="ml-4 w-6 h-6 md:w-7 md:h-7" />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-green-500 flex items-center justify-center shadow-md hover:bg-green-600 transition-colors">
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                    <img
                      src={`${BASE_URL_SVG}/assets/svgs/wa.svg`}
                      alt="WhatsApp"
                      className="w-5 h-5 md:w-6 md:h-6"
                    />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>


    </nav>
  );
};

export default Navbar;
