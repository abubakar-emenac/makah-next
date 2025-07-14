import React, { useState } from "react";
import { Link } from "react-router-dom";


const Navbar = ({ textColor = "black" }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const umrahDropdown = [
    "Umrah 2025", "February Umrah", "Ramadan Umrah", "March Umrah",
    "Easter Umrah", "April Umrah", "London Umrah", "Birmingham Umrah",
    "Manchester Umrah", "December Umrah",
  ];

  const hajjDropdown = [
    "Hajj 2025", "Economy Hajj", "Shifting Hajj", "Non-shifting Hajj", "VIP Hajj Packages",
  ];

  const textColorClass = textColor === "white" ? "text-white" : "text-black";
  const navItems = [
    { label: "Umrah Package", hasDropdown: true, dropdown: umrahDropdown, link: '/umrah/best-umrah-packages' },
    { label: "Hajj Packages", hasDropdown: true, dropdown: hajjDropdown, link: '/umrah/best-umrah-packages' },
    { label: "Contact Us", link: '/umrah/best-umrah-packages' },
    { label: "Visas", link: '/umrah/best-umrah-packages' },
  ];

  const toggleDropdown = (label) => {
    setActiveDropdown(prev => (prev === label ? null : label));
  };

  const handleMobileNavClick = () => {
    setMobileOpen(false);
    setActiveDropdown(null);
  };


  return (
    <nav className={`w-full relative z-50 font-Montserrat ${textColorClass}`}>
      <div className="m-full  lg:max-w-[80%] lg:mx-auto px-4 lg:px-8 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-lg font-semibold whitespace-nowrap text-white">
          Makkah Travel Logo
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6">
          {/* Shared Nav Pill */}
          <div className="relative bg-white text-black rounded-md px-6 py-4 shadow-md flex gap-6 text-sm font-medium leading-none items-center">
            {navItems.map((item, index) => (
              <div
                key={index}
                className="relative group mx-3"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link to={item.link} className="hover:text-green-700 cursor-pointer">
                  {item.label}
                  {item.hasDropdown && " ▾"}
                </Link>


                {/* Desktop Dropdown */}
                {item.hasDropdown && (
                  <div
                    className={`absolute -left-3.5 top-full mt-2 w-40
                      
                      bg-white text-black rounded-md shadow-md border border-yellow-300 z-50 transition-all duration-200 ${activeDropdown === item.label
                        ? "opacity-100 visible"
                        : "opacity-0 invisible"
                      }`}
                  >
                    <ul className="py-2 text-xs">
                      {item.dropdown.map((option, i) => (
                        <li
                          key={i}
                          className="px-4 py-1 hover:text-green-700 cursor-pointer"
                        >
                          <Link
                            to={`${item.link}/${option.toLowerCase().replace(/\s+/g, '-')}`}
                            onClick={handleMobileNavClick}
                            className=" cursor-pointer hover:text-green-700 block"
                          >
                            {option}
                          </Link>

                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Call Now Button + WhatsApp SVG */}
          <div className="relative flex items-center text-sm font-medium">
            {/* Text pill */}
            <div className="bg-white rounded-l-3xl pl-4 pr-12 py-2 flex flex-col items-end shadow-md">
              <span className="text-yellow-500 leading-tight">Call Now:</span>
              <span className="text-gray-800">0203 - 970 - 0002</span>
            </div>

            {/* WhatsApp icon floated outside pill */}
            <div className="absolute right-0 translate-x-1/2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center p-[2px]">
              <img src="/svg/wa.svg" alt="" />
            </div>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="lg:hidden bg-white text-gray-800 px-4 pb-4 space-y-3">
          {navItems.map((item, index) => (
            <div key={index} className="text-sm font-medium">
              <div
                className="py-2 flex justify-between items-center cursor-pointer border-b"
                onClick={() => item.hasDropdown && toggleDropdown(item.label)}
              >
                <span>{item.label}</span>
                {item.hasDropdown && (
                  <span>{activeDropdown === item.label ? "▲" : "▼"}</span>
                )}
              </div>

              {/* Mobile Dropdown */}
              {item.hasDropdown && activeDropdown === item.label && (
                <ul className="pl-4 pb-2 text-xs">
                  {item.dropdown.map((option, i) => (
                    <li
                      key={i}
                      className="py-2 border-b cursor-pointer hover:text-green-700"
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {/* Call Now Mobile Section */}
          <div className="flex items-center justify-between pt-2 text-sm font-medium">
            <div className="flex flex-col">
              <span className="text-yellow-500">Call Now:</span>
              <span className="text-gray-800">0203 - 970 - 0002</span>
            </div>
            <div className="w-6 h-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="w-full h-full"
              >
                <path
                  fill="#25D366"
                  d="M16 .396C7.17.396 0 7.565 0 16.396c0 2.879.755 5.688 2.184 8.15L.163 31.838a1.016 1.016 0 0 0 1.316 1.316l7.292-2.021A15.939 15.939 0 0 0 16 32.396c8.83 0 16-7.169 16-16S24.83.396 16 .396z"
                />
                <path
                  fill="#FFF"
                  d="M24.078 20.647c-.369.969-2.137 1.914-2.961 1.961-.761.046-1.707.065-2.746-.173-4.814-1.144-8.02-6.096-8.269-6.393-.248-.296-1.977-2.634-1.977-5.037 0-2.403 1.274-3.576 1.726-4.071a1.902 1.902 0 0 1 1.431-.671c.184-.003.362-.006.522.008.482.043.723.05 1.042.805.395.93 1.34 3.22 1.451 3.452.111.233.184.503.03.802-.154.299-.231.484-.451.75-.219.266-.464.598-.663.802-.22.223-.449.466-.191.91.258.445 1.146 1.889 2.461 3.058 1.69 1.53 3.115 2.005 3.56 2.232.444.226.702.19.963-.114.26-.304 1.108-1.304 1.406-1.749.298-.445.591-.371.994-.223.403.149 2.55 1.199 2.987 1.417.437.218.728.329.834.512.106.182.106 1.057-.263 2.025z"
                />
              </svg>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
