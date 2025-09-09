import React from 'react';
import { BASE_URL_SVG } from '../../Helpers/apiEndpoints';

export default function NeedHelp() {
    return (
        <div className="w-full px-8 m-10 flex flex-col-reverse lg:flex-row max-w-[82%] mx-auto gap-8">
            {/* Left Section - Mobile Stacked */}
            <div className="w-full lg:w-1/2 flex flex-col gap-8">
                {/* Call Us Now */}
                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <span className="capitalize font-Montserrat font-semibold text-xl sm:text-2xl md:text-3xl">CALL US NOW!</span>
                        <span className="text-primary font-abril text-2xl sm:text-3xl md:text-4xl">0203 - 970 - 0002</span>
                    </div>
                    <img src={`${BASE_URL_SVG}/assets/svgs/Need Help Section (Call) SVG.svg`} alt="" className="w-12 sm:w-16" />
                </div>

                {/* Request a Callback */}
                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <span className="capitalize font-Montserrat font-semibold text-xl sm:text-2xl md:text-3xl">REQUEST A CALL BACK!</span>
                        <span className="text-primary font-abril text-2xl sm:text-3xl md:text-4xl">TOO BUSY TO TALK?</span>
                    </div>
                    <img src={`${BASE_URL_SVG}/assets/svgs/Need Help Section (Call Back) SVG.svg`} alt="" className="w-12 sm:w-16" />
                </div>
            </div>

            {/* Right Section */}
            <div className="w-full lg:w-1/2 flex flex-row lg:items-end">
                <div className="flex flex-col text-start lg:text-end mb-4">
                    <h2 className="text-[28px] sm:text-5xl md:text-6xl font-abril">NEED HELP?</h2>
                    <p className="text-[16px] sm:text-base md:text-lg font-Montserrat mt-2 line-clamp-6">
                        Makkah Travel is here to help you visit religious<br className="hidden sm:block" />
                        places and make Umrah trips that connect with<br className="hidden sm:block" />
                        your soul. We're experts at creating
                    </p>
                </div>
                <img src={`${BASE_URL_SVG}/assets/svgs/Need Help.svg`} alt="" className=" w-44 sm:w-44 lg:max-w-md" />
            </div>
        </div>
    );
}
