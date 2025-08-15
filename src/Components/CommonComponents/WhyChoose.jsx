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
        <div className="w-full max-w-[90%] sm:max-w-[85%] md:max-w-[75%] mx-auto mt-6 sm:mt-10 md:mt-16 px-4 sm:px-6 md:px-9">
            {/* Header */}
            <div className="w-full lg:w-[45%] flex flex-col justify-start">
                <img src="/svg/crown-black.svg" alt="Crown" className="w-20 sm:w-16 md:w-20 mb-3 sm:mb-4" />
                <h2 className="text-[24px] sm:text-[30px] md:text-[36px] font-abril leading-tight mb-3 sm:mb-4">
                    Why Choose Makkah Travel
                </h2>
                <span className="font-Montserrat text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed text-start text-black max-w-md">
                    Makkah Travel is here to help you visit religious places and make Umrah trips that connect with your soul. We're experts at creating meaningful journeys.
                </span>
            </div>

            {/* Card Grid */}
            <div className="mt-12 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
                {data.map((item, index) => (
                    <div key={index} className="flex flex-col items-center text-center px-2 sm:px-0">
                        {/* Icon */}
                        <div className="min-h-[80px] flex items-center justify-center mb-1">
                            <img src={item.icon} alt={item.title} className="w-28 sm:w-28 h-auto" />
                        </div>

                        {/* Title */}
                        <div className="min-h-[50px] flex items-start justify-center mb-1 max-w-40">
                            <h3 className="text-[18px] sm:text-[20px] font-abril leading-tight line-clamp-3 ">
                                {item.title}
                            </h3>
                        </div>

                        {/* Description */}
                        <div className="min-h-[90px] w-full max-w-5/6">
                            <span className="text-[16px] sm:text-[14px] font-Montserrat text-center text-black leading-relaxed">
                                {item.description}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
}
