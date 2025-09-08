import React from 'react';
import ViewAllButton from './ViewAllButton';
import { BASE_URL_SVG } from '../../Helpers/apiEndpoints';

export default function BlogSection() {
    const blog = [
        {
            date: "December 16, 2025",
            title: "Why Performing Umrah During Ramadan is Extra Special"
        },
        {
            date: "August 09, 2025",
            title: "Why Performing Umrah During Ramadan is Extra Special"
        },
        {
            date: "September 20, 2025",
            title: "Why Performing Umrah During Ramadan is Extra Special"
        }
    ];

    return (
        <div className="w-full px-4 sm:px-6 md:px-10 mx-auto mt-10 sm:mt-14 md:mt-28 font-sans max-w-[90%] md:max-w-[82%] mb-10">
            {/* Heading Section */}
            <div className="w-full mb-10 sm:mb-12 md:mb-16">
                <img
                    src={`${BASE_URL_SVG}/assets/svgs/crown-black.svg`}
                    alt="Crown"
                    className="w-12 sm:w-16 md:w-20 mb-3 sm:mb-4"
                />
                <h3 className="text-[26px] sm:text-[32px] md:text-[36px] font-abril leading-tight mb-3 sm:mb-4">
                    Our Latest News
                </h3>
                <p className="font-Montserrat text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed text-black">
                    Makkah Travel is here to help you visit religious places and make Umrah trips that connect
                    with your soul. We're experts at creating.
                </p>
            </div>

            {/* Blog Cards */}
            <div className="flex flex-col lg:flex-row gap-10">
                {/* Blog Card Left */}
                <div className="w-full lg:w-1/2">
                    <img
                        src="/images/ASSALAAMU-ALEYKA-AYYUHAN-NABIYYU-MUSEUM.png"
                        alt="Blog"
                        className="w-full h-64 sm:h-72 md:h-80 lg:h-[360px] object-cover rounded-md"
                    />
                    <span className="text-black mt-4 block font-Montserrat text-[14px] sm:text-[15px] md:text-[16px]">
                        December 16, 2025
                    </span>
                    <h4 className="text-[22px] sm:text-[28px] md:text-[32px] font-abril leading-tight mt-2 mb-3">
                        Latest Updates - Umrah, Ramadan & Hajj 2025-2026
                    </h4>
                    <p className="text-[14px] sm:text-[15px] md:text-[16px] font-Montserrat leading-relaxed text-black mb-4">
                        Makkah Travel is here to help you visit religious places and make Umrah trips that
                        connect with your soul. Makkah Travel is here to help you visit religious places and
                        make Umrah trips that connect with your soul.
                    </p>
                    <div className="mt-2">
                        <ViewAllButton label="Read More" color="primary" size="md" />
                    </div>
                </div>

                {/* Blog List Right */}
                <div className="w-full lg:w-1/2 flex flex-col px-4">
                    {blog.map((item, index) => (
                        <div key={index} className="w-full pt-3">
                            <div className="cursor-pointer">
                                <span className="text-black font-Montserrat text-[14px] sm:text-[15px] md:text-[16px]">
                                    {item.date}
                                </span>
                                <h5 className="text-[18px] sm:text-[20px] md:text-[18px] lg:text-[22px] font-Montserrat font-semibold text-black hover:text-primary-hover transition-all">
                                    {item.title}
                                </h5>
                                <button className="text-secondary flex gap-2 text-[12px] md:text-[14px] lg:text-[16px] items-center mt-2">
                                    Read More
                                    <img src={`${BASE_URL_SVG}/assets/svgs/grayarrow.svg`} alt="arrow" />
                                </button>
                                {index < blog.length - 1 && <hr className="m-5 w-20 mx-auto" />}
                            </div>
                        </div>
                    ))}

                    <div className="mt-10">
                        <ViewAllButton label="Read More" color="primary" size="md" />
                    </div>
                </div>
            </div>
        </div>
    );
}
