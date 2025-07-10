import React from 'react';
import ViewAllButton from './ViewAllButton';

export default function CustomizeYourPackage() {
    return (
        <div className="relative w-full mt-16 h-[400px] sm:h-[450px] md:h-[500px]">
            {/* Background Image */}
            <div className="absolute top-0 left-0 w-full lg:w-[55%] h-full z-0">
                <img
                    src="/images/iStock-872424158.png"
                    alt="Customize Umrah Package"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Overlay Content */}
            <div
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-secondary w-full lg:w-[55%] z-10 p-6 sm:p-10 lg:p-14 flex flex-col justify-center items-end">
                <div className="text-right w-full max-w-xl">
                    <h3 className="text-white font-Montserrat text-[32px] sm:text-[48px] mb-1">Customize</h3>
                    <h2 className="text-[32px] sm:text-[68px] md:text-[86px] text-white font-abril mb-4 leading-snug">
                        Your Package
                    </h2>
                    <p className="text-[15px] sm:text-[16px] font-Montserrat leading-relaxed mb-6 text-white">
                        Makkah Travel is here to help you visit religious places and make Umrah trips that
                        connect with your soul. Let us help you build your journey your way.
                    </p>
                    <ViewAllButton label="Start Customization" color="primary" size="md" />
                </div>
            </div>

        </div>
    );
}
