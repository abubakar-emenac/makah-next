import React from 'react';
import { BASE_URL_SVG } from '../../Helpers/apiEndpoints';
import { useGlobalData } from "../../Helpers/useGlobalData";

export default function NeedHelp() {
    const { globalData } = useGlobalData();
    const phoneNumberObj = globalData?.result?.global_variables?.find(
        (item) => item.code === "[%PHONENUMBER%]"
    );
    const phoneNumber = phoneNumberObj?.code_value || "";

    return (
        <div className="w-full px-6 md:px-10 my-10 flex flex-col-reverse lg:flex-row max-w-[82%] mx-auto gap-10">
            {/* Left Section */}
            <div className="w-full lg:w-1/2 flex flex-col gap-8">
                {/* Call Us Now */}
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="capitalize font-Montserrat font-semibold text-lg sm:text-xl md:text-2xl">
                            CALL US NOW!
                        </span>
                        <span className="text-primary font-abril text-xl sm:text-2xl md:text-4xl">
                            {phoneNumber}
                        </span>
                    </div>
                    <img
                        src={`${BASE_URL_SVG}/assets/svgs/Need Help Section (Call) SVG.svg`}
                        alt="Call Icon"
                        className="w-10 sm:w-14 md:w-16"
                    />
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
                    <img
                        src={`${BASE_URL_SVG}/assets/svgs/Need Help Section (Call Back) SVG.svg`}
                        alt="Callback Icon"
                        className="w-10 sm:w-14 md:w-16"
                    />
                </div>
            </div>

            {/* Right Section */}
            <div className="w-full lg:w-1/2 flex flex-col lg:flex-row items-center lg:items-end gap-8">
                {/* Text */}
                <div className="flex flex-col text-center lg:text-right mb-6 lg:mb-0 lg:flex-1">
                    <h2 className="text-[22px] sm:text-4xl md:text-5xl lg:text-6xl font-abril">
                        NEED HELP?
                    </h2>
                    <p className="text-[14px] sm:text-base md:text-lg font-Montserrat mt-3 leading-relaxed max-w-xl lg:ml-auto">
                        Makkah Travel is here to help you visit religious places
                        and make Umrah trips that connect with your soul. We're
                        experts at creating meaningful journeys.
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
