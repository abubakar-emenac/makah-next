// import React from 'react'
// import ViewAllButton from './ViewAllButton'

// export default function BlogSection() {
//     return (
//         <div className="w-full max-w-[82%] mx-auto mt-8 sm:mt-12 md:mt-28 px-4 sm:px-6 md:px-9 font-sans mb-10">
//             <div className="w-full lg:w-[48%] mb-15 pl-16 ">
//                 <img src="/svg/crown-black.svg" alt="Crown" className="w-16 sm:w-18 md:w-24 mb-3 sm:mb-4" />
//                 <h3 className="text-[28px] sm:text-[32px] md:text-[36px] font-abril leading-tight mb-3 sm:mb-4">
//                     Our Latest News
//                 </h3>
//                 <p className="font-Montserrat text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed text-black">
//                 Makkah Travel is here to help you visit religious places and make Umrah trips that connect with your soul. We're experts at creating.
//                 </p>
//             </div>
//             <div className='flex gap-4 w-full'>
//                 <div className='flex flex-col justify-center w-1/2 px-4 mx-10'>
//                     <img src="/images/ASSALAAMU-ALEYKA-AYYUHAN-NABIYYU-MUSEUM.png" alt="Blog" className='w-full h-full object-cover' />
//                     <span className='text-black mt-3 font-Montserrat text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed'>December 16, 2025</span>
//                     <h4 className='text-[28px] sm:text-[32px] md:text-[36px] font-abril leading-tight mb-3 sm:mb-4'>Latest Updates - Umrah, Ramadan & Hajj 2025-2026</h4>
//                     <span>Makkah Travel is here to help you visit religious places and make Umrah trips that connect with your soul Makkah Travel is here to help you visit religious places and make Umrah trips that connect with your soul.</span>
//                     <ViewAllButton label="Read More" color="primary" size="sm" />
//                 </div>
//                 <div className='w-1/2 '>2</div>
//             </div>

//         </div>
//     )
// }

import React from 'react';
import ViewAllButton from './ViewAllButton';

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
    ]
    return (
        <div className="w-full max-w-[90%] md:max-w-[82%] mx-auto mt-10 sm:mt-14 md:mt-28 px-4 sm:px-6 font-sans mb-10">
            {/* Heading Section */}
            <div className="w-full md:w-[80%] lg:w-[48%] mb-10 sm:mb-12 md:mb-16 px-0 sm:px-6 md:px-10">
                <img
                    src="/svg/crown-black.svg"
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
            <div className="flex flex-col lg:flex-row gap-8 sm:gap-10 w-full">
                {/* Blog Card 1 */}
                <div className="flex flex-col justify-center w-full lg:w-1/2 px-0 sm:px-4">
                    <img
                        src="/images/ASSALAAMU-ALEYKA-AYYUHAN-NABIYYU-MUSEUM.png"
                        alt="Blog"
                        className="w-full h-64 sm:h-72 md:h-80 lg:h-[360px] object-cover rounded-md"
                    />
                    <span className="text-black mt-4 font-Montserrat text-[14px] sm:text-[15px] md:text-[16px]">
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
                    <div className="mt-2 inline-block">
                        <ViewAllButton label="Read More" color="primary" size="md" />
                    </div>

                </div>
                <div className="w-full lg:w-1/2 flex flex-col rounded-md text-xl">
                    {blog.map((item, index) => (
                        <div key={index} className="w-full max-w-[75%] pt-3 mx-auto lg:ml-10">
                            <div className="w-full max-w-[70%] flex flex-col cursor-pointer">
                                <span className="text-black mt-4 font-Montserrat text-[14px] sm:text-[15px] md:text-[16px]">
                                    {item.date}
                                </span>
                                <span className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[22px] font-Montserrat font-semibold text-black hover:text-primary-hover transition-all">
                                    {item.title}
                                </span>
                                <button className="text-secondary flex gap-2 text-[12px] md:text-[14px] lg:text-[16px] items-center cursor-pointer mt-2">
                                    Read More
                                    <img src="/svg/grayarrow.svg" alt="arrow" />
                                </button>
                                {index < blog.length - 1 && <hr className="mt-5" />}
                            </div>
                        </div>

                    ))}
                    <div className="mt-10 mx-auto lg:ml-10">
                        <ViewAllButton label="Read More" color="primary" size="md" />
                    </div>

                </div>
            </div>
        </div>
    );
}
