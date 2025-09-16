import React, { useState, useEffect } from 'react';
import { BASE_URL_SVG } from '../../Helpers/apiEndpoints';
import { useGlobalData } from "../../Helpers/useGlobalData";

export default function NeedHelp() {
    const { globalData } = useGlobalData();
    const [hoveredIcon1, setHoveredIcon1] = useState(null);
    const [hoveredIcon2, setHoveredIcon2] = useState(null);
    const phoneNumberObj = globalData?.result?.global_variables?.find(
        (item) => item.code === "[%PHONENUMBER%]"
    );
    const phoneNumber = phoneNumberObj?.code_value || "";

    useEffect(() => {
        // Preload all hover images
        const preloadImages = [
            "/svg/Need Help Section (Call) SVG.svg",
            "/svg/Need Help (Call Us).svg"
        ];

        preloadImages.forEach((src) => {
            const img = new Image();
            img.src = src;
        });
    }, []);

    return (
        <div className="w-full px-6 md:px-10 my-10 flex flex-col-reverse lg:flex-row max-w-[75%] mx-auto gap-10">
            {/* Left Section */}
            <div className="w-full lg:w-1/2 flex flex-col gap-8">
                {/* Call Us Now */}
                <div className="flex items-center justify-between">
                    <a href={`tel:${phoneNumber}`} className="flex flex-col">
                        <span className="capitalize font-Montserrat font-semibold text-lg sm:text-xl md:text-2xl">
                            CALL US NOW!
                        </span>
                        <span className="text-primary font-abril text-xl sm:text-2xl md:text-4xl">
                            {phoneNumber}
                        </span>
                    </a>
                    {/* <img
                        src={`${BASE_URL_SVG}/assets/svgs/Need Help Section (Call) SVG.svg`}
                        alt="Call Icon"
                        className="w-10 sm:w-14 md:w-16"
                    /> */}
                    <a href={`tel:${phoneNumber}`}>
                    <img
                        src={
                            hoveredIcon1 === "call"
                                ? `/svg/Need Help (Call Us).svg`
                                : `${BASE_URL_SVG}/assets/svgs/Need Help Section (Call) SVG.svg`
                        }
                        alt="Call Icon"
                        className={`w-10 sm:w-14 md:w-16 transition-transform duration-1000 ease-in-out `}
                        onMouseEnter={() => setHoveredIcon1("call")}
                        onMouseLeave={() => setHoveredIcon1(null)}
                        loading='eager'
                    />
                    </a>
                </div>

                {/* Request a Callback */}
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="capitalize font-Montserrat font-semibold text-lg sm:text-xl md:text-2xl">
                            REQUEST A CALL BACK!
                        </span>
                        <span className="text-primary font-abril text-xl sm:text-2xl md:text-4xl">
                            TOO BUSY TO TALK?
                        </span>
                    </div>
                    {/* <img
                        src={`${BASE_URL_SVG}/assets/svgs/Need Help Section (Call Back) SVG.svg`}
                        alt="Callback Icon"
                        className="w-10 sm:w-14 md:w-16"
                    /> */}
                    <img
                        src={
                            hoveredIcon2 === "callBack"
                                ? `/svg/Need Help Section (Call) SVG.svg`
                                : `${BASE_URL_SVG}/assets/svgs/Need Help Section (Call Back) SVG.svg`
                        }
                        alt="Call Icon"
                        className={`w-10 sm:w-14 md:w-16 transition-transform duration-1000 ease-in-out `}
                        onMouseEnter={() => setHoveredIcon2("callBack")}
                        onMouseLeave={() => setHoveredIcon2(null)}
                        loading='eager'
                    />
                </div>
            </div>

            {/* Right Section */}
            <div className="w-full lg:w-1/2 flex flex-col lg:flex-row items-center lg:items-start gap-8">
                {/* Text */}
                <div className="flex flex-col text-start justify-start lg:text-right mb-6 lg:mb-0 lg:flex-1">
                    <h2 className="text-[22px] sm:text-4xl md:text-5xl lg:text-6xl font-abril">
                        NEED HELP?
                    </h2>
                    <p className="text-[14px] sm:text-base md:text-lg font-Montserrat mt-3 leading-relaxed max-w-xl lg:ml-auto">
                        Makkah Travel is here to help you visit religious places
                        and make Umrah trips that connect with your soul.
                    </p>
                </div>

                {/* Image (only visible on desktop ≥1280px) */}
                <div className="hidden xl:flex flex-shrink-0 justify-center lg:justify-end">
                    <img
                        src={`${BASE_URL_SVG}/assets/svgs/Need Help.svg`}
                        alt="Need Help"
                        className="w-40 lg:w-52 xl:w-60 max-w-full object-contain"
                    />
                </div>
            </div>



        </div>
    );
}
