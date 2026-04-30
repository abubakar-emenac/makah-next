import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from "@navigation";
import { BASE_URL_SVG } from '../../Helpers/apiEndpoints';
import { motion, AnimatePresence } from "framer-motion";
import CustomizeUmrahPopup from '../../Components/UmrahComponents/CustomizeUmrahPopup';

export default function NotFound() {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);
  return (
    <div className="w-full flex flex-col">

      <div
        className="relative flex flex-col items-center justify-center text-white py-20"
        style={{ backgroundColor: '#DB9E30' }}
      >
        {/* Clouds */}
        <img
          src={`${BASE_URL_SVG}assets/svgs/cloud.svg`}
          alt="Cloud Top Left"
          className="absolute top-0 left-0 w-32 sm:w-40 lg:w-80"
        />
        <img
          src={`${BASE_URL_SVG}assets/svgs/cloud.svg`}
          alt="Cloud Bottom Left"
          className="absolute bottom-0 left-0 w-32 sm:w-40 lg:w-80"
        />
        <img
          src={`${BASE_URL_SVG}assets/svgs/cloud.svg`}
          alt="Cloud Right Middle"
          className="absolute top-1/2 right-0 transform -translate-y-1/2 w-32 sm:w-40 lg:w-80"
        />

        {/* Top Text */}
        <div className="flex flex-col w-full gap-10">
          <div className="flex flex-col sm:flex-row justify-between w-full max-w-[75%] mx-auto text-[20px] sm:text-[22px] font-Montserrat font-light">
            <div>
              <span className="text-white px-2">Error: Could not find your Query</span>
              <br />
              <span>
                <span
                  onClick={() => setIsOpen(true)}
                  className="text-black underline cursor-pointer px-2">Send Us Your Query</span>
                & we will get back to you
              </span>
            </div>
            <div className="text-end mt-4 sm:mt-0">
              <span className="text-white px-2 font-semibold">Error: 404 page not found</span>
              <br />
              <span>The page you have requested could not be found</span>
            </div>
          </div>

          {/* Lady + 404 + Buttons */}
          <div className="flex flex-col lg:flex-row justify-between items-center w-full max-w-[75%] mx-auto mt-10 gap-6">
            <img src={`${BASE_URL_SVG}assets/svgs/lady.svg`} alt="lady" className="w-44 sm:w-56 hidden lg:block" />

            {/* Center 404 + Buttons */}
            <div className="flex flex-col items-center justify-center gap-6">
              <div className="flex items-center">
                <span className="font-Montserrat text-6xl sm:text-[160px] md:text-[200px] lg:text-[271px] text-white font-bold">4</span>
                <img src={`${BASE_URL_SVG}assets/svgs/moon.svg`} alt="moon" className="w-24 sm:w-36 lg:w-48" />
                <span className="font-Montserrat text-6xl sm:text-[160px] md:text-[200px] lg:text-[271px] text-white font-bold">4</span>
              </div>

              <div className="flex flex-col gap-3 w-full items-center sm:flex-col sm:justify-center">
                <button
                  onClick={() => navigate(-1)}
                  className="flex items-center cursor-pointer gap-2 border border-white bg-secondary px-9 py-3 text-white hover:bg-secondary/10 transition rounded font-Montserrat text-sm sm:text-base">
                  PREVIOUS PAGE
                  <img src={`${BASE_URL_SVG}assets/svgs/mini-arrow.svg`} alt="arrow" className="bg-primary rounded-full p-1" />
                </button>
                <Link
                  to={'/'}
                  className="flex items-center gap-2 border cursor-pointer border-white px-6 py-3 text-white hover:bg-white hover:text-black transition rounded font-Montserrat text-sm sm:text-base">
                  GO TO HOME PAGE
                  <img src={`${BASE_URL_SVG}assets/svgs/mini-arrow.svg`} alt="arrow" className="bg-primary rounded-full p-1" />
                </Link>
              </div>
            </div>

            <img src={`${BASE_URL_SVG}assets/svgs/men.svg`} alt="lady" className="w-44 sm:w-56 hidden lg:block" />
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Popup */}
            <motion.div
              ref={modalRef}
              className="fixed inset-0 z-50 flex justify-center items-center"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="relative bg-white shadow-lg max-w-[80%] w-full ">
                <div className="flex justify-end p-3">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute -top-4 -right-4  rounded-full"
                  >
                    <img src={`${BASE_URL_SVG}/assets/svgs/cross.svg`} alt="crosee" className=' cursor-pointer' />
                  </button>
                </div>
                <CustomizeUmrahPopup />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
