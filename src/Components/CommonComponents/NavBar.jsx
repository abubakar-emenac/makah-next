
import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useGlobalData } from "../../Helpers/useGlobalData";
import { WEB_URL, BASE_URL_SVG } from "../../Helpers/apiEndpoints";

const Navbar = ({ textColor = "black" }) => {
  const { globalData } = useGlobalData();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
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
  const textColorClass = textColor === "white" ? "text-white" : "text-black";
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

  return (
    <nav className={`sticky top-0 left-0 w-full font-Montserrat pl-9 z-50 ${textColorClass}`}>
      <div className="w-full max-w-[90%] sm:max-w-[95%] md:max-w-[88%] lg:max-w-[85%] xl:max-w-[70%] mx-auto px-3 md:px-6 lg:px-8 py-2 md:py-3 flex justify-between items-center">

        {/* LOGO */}
        <Link to={'/'} className="text-base sm:text-lg md:text-xl font-bold whitespace-nowrap text-white">
          <img src={`${WEB_URL}/${logo}`} alt="logo" className="w-40" />
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-10">
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
          <div className="relative rounded-l-3xl flex items-center text-xs md:text-sm font-medium ml-4 bg-white">
            <div className="  pl-3 md:pl-4 py-1.5 md:py-[2px] flex flex-col items-end">
              <span className="text-yellow-500 leading-tight">Call Now:</span>
              <span className="text-gray-800">{phoneNumber}</span>
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
          className="md:hidden focus:outline-none text-black"
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

      {/* MOBILE NAV */}
      {mobileOpen && (
        <div className="md:hidden bg-white text-gray-800 px-4 pb-5 space-y-2 shadow-md absolute top-full left-0 w-full z-[9999]">
          {navItems.map((item) => (
            <div key={item.id} className="text-sm font-medium">
              <div
                className="py-2 flex justify-between items-center cursor-pointer border-b"
                onClick={() => item.hasDropdown && toggleDropdown(item.label)}
              >
                <span>{item.label}</span>
                {item.hasDropdown && (
                  <span className="text-xs">
                    {activeDropdown === item.label ? "▲" : "▼"}
                  </span>
                )}
              </div>

              {/* MOBILE DROPDOWN */}
              {item.hasDropdown && activeDropdown === item.label && (
                <ul className="pl-4 pb-2 text-sm">
                  {item.dropdown.map((child) => (
                    <li
                      key={child.id}
                      className="py-2 border-b hover:text-green-700"
                    >
                      <Link to={child.link} onClick={handleMobileNavClick}>
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {/* CALL NOW */}
          <div className="relative flex items-center text-xs md:text-sm font-medium ml-4">
            <div className="bg-white rounded-l-3xl pl-3 md:pl-4 pr-10 md:pr-12 py-1.5 md:py-[2px] flex flex-col items-end shadow-md">
              <span className="text-yellow-500 leading-tight">Call Now:</span>
              <span className="text-gray-800">{phoneNumber}</span>
            </div>
            <div>
              <img src="/svgs/phone.svg" alt="" />
            </div>
            <div className="absolute right-0 translate-x-1/2 top-1/2 -translate-y-1/2 w-7 h-7 md:w-8 md:h-8 bg-white rounded-full shadow-md flex items-center justify-center">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <img
                  src={`${BASE_URL_SVG}/assets/svgs/wa.svg`}
                  alt="whatsapp"
                  className="w-4 h-4 md:w-5 md:h-5"
                />
              </a>
            </div>
          </div>

        </div>
      )}
    </nav>
  );
};

export default Navbar;
