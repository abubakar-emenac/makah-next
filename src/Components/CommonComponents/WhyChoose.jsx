import React from 'react';

export default function WhyChoose() {
    const data = [
        {
            icon: '/svg/wc1.svg',
            title: 'Free Cancelation',
            description: 'Makkah Travel is here to help you visit religious places and make Umrah trips that connect'
        },
        {
            icon: '/svg/wc2.svg',
            title: 'Cheap to luxury umrah deals',
            description: 'Makkah Travel is here to help you visit religious places and make Umrah trips that connect '
        },
        {
            icon: '/svg/wc3.svg',
            title: 'Guidance At Every Step',
            description: 'Makkah Travel is here to help you visit religious places and make Umrah trips that connect '
        },
        {
            icon: '/svg/wc4.svg',
            title: '10,000 + Satisfied Customers',
            description: 'Makkah Travel is here to help you visit religious places and make Umrah trips that connect '
        }
    ];

    return (
        <div className="w-full max-w-[75%] mx-auto mt-8 sm:mt-12 md:mt-16 px-4 sm:px-6 md:px-9">
            {/* Header */}
            <div className="w-full lg:w-[45%] flex flex-col justify-start">
                <img src="/svg/crown-black.svg" alt="Crown" className="w-16 sm:w-18 md:w-20 mb-3 sm:mb-4" />
                <h2 className="text-[28px] sm:text-[32px] md:text-[36px] font-abril leading-tight mb-3 sm:mb-4">
                    Why Choose Makkah Travel
                </h2>
                <span className="font-Montserrat text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed text-black max-w-md">
                    Makkah Travel is here to help you visit religious places and make Umrah trips that connect with your soul. We're experts at creating meaningful journeys.
                </span>
            </div>

            <div className="mt-16 cursor-pointer grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {data.map((item, index) => (
                    <div key={index} className="flex flex-col items-center text-center">
                        {/* Icon with fixed height */}
                        <div className="h-[100px] flex items-center justify-center mb-3">
                            <img src={item.icon} alt={item.title} className="w-28 h-auto" />
                        </div>

                        {/* Title: force all to align by fixing height & using flex */}
                        <div className="h-[60px] flex items-start justify-center">
                            <h3 className="text-[22px] font-abril leading-tight line-clamp-2">
                                {item.title}
                            </h3>
                        </div>

                        {/* Description with fixed height */}
                        <div className="h-[100px]">
                            <span className="text-[14px] font-Montserrat text-black leading-relaxed">
                                {item.description}
                            </span>
                        </div>
                    </div>
                ))}
            </div>


        </div>
    );
}
