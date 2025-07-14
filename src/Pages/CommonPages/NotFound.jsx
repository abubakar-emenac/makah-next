import React from 'react';
import Navbar from '../../Components/CommonComponents/NavBar';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-col">
      <Navbar textColor="black" />

      <div
        className="relative flex flex-col items-center justify-center text-white py-20"
        style={{ backgroundColor: '#DB9E30' }}
      >
        {/* Clouds */}
        <img
          src="/svg/cloud.svg"
          alt="Cloud Top Left"
          className="absolute top-0 left-0 w-32 sm:w-40 lg:w-80"
        />
        <img
          src="/svg/cloud.svg"
          alt="Cloud Bottom Left"
          className="absolute bottom-0 left-0 w-32 sm:w-40 lg:w-80"
        />
        <img
          src="/svg/cloud.svg"
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
                <span className="text-black underline cursor-pointer px-2">Send Us Your Query</span>
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
            <img src="/svg/lady.svg" alt="lady" className="w-44 sm:w-56 hidden lg:block" />

            {/* Center 404 + Buttons */}
            <div className="flex flex-col items-center justify-center gap-6">
              <div className="flex items-center">
                <span className="font-Montserrat text-6xl sm:text-[160px] md:text-[200px] lg:text-[271px] text-white font-bold">4</span>
                <img src="/svg/moon.svg" alt="moon" className="w-24 sm:w-36 lg:w-48" />
                <span className="font-Montserrat text-6xl sm:text-[160px] md:text-[200px] lg:text-[271px] text-white font-bold">4</span>
              </div>

              <div className="flex flex-col gap-3 w-full items-center sm:flex-row sm:justify-center">
                <button 
                onClick={() => navigate(-1)}
                className="flex items-center cursor-pointer gap-2 border border-white bg-secondary px-6 py-3 text-white hover:bg-secondary/10 transition rounded font-Montserrat text-sm sm:text-base">
                  PREVIOUS PAGE
                  <img src="/svg/mini-arrow.svg" alt="arrow" className="bg-primary rounded-full p-1" />
                </button>
                <button 
                onClick={() => navigate('/')}
                className="flex items-center gap-2 border cursor-pointer border-white px-6 py-3 text-white hover:bg-white hover:text-black transition rounded font-Montserrat text-sm sm:text-base">
                  GO TO HOME PAGE
                  <img src="/svg/mini-arrow.svg" alt="arrow" className="bg-primary rounded-full p-1" />
                </button>
              </div>
            </div>

            <img src="/svg/men.svg" alt="lady" className="w-44 sm:w-56 hidden lg:block" />
          </div>
        </div>
      </div>
    </div>
  );
}
