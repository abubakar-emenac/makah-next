import React from 'react';
import ViewAllButton from './ViewAllButton';
import { BASE_URL_IMG, BASE_URL_SVG } from '../../Helpers/apiEndpoints';
import parse from 'html-react-parser'


export default function CustomizeYourPackage({ pageData }) {
    if (!pageData) return null;
    const cleanedUrl = pageData.simple_image_url
        ? `${BASE_URL_IMG}/${pageData.simple_image_url}`
        : "/images/iStock-872424158.png";
    return (
        <div className="relative w-full mt-16 flex flex-col lg:flex-row overflow-hidden">
            {/* Left Image - Hidden on mobile */}
            <div className="
                hidden
                lg:block
                lg:w-[60%] xl:w-[65%] 2xl:w-[68%]
                lg:h-[500px] xl:h-[550px] 2xl:h-[600px]
                relative overflow-hidden
            ">
                <img
                    src={cleanedUrl}
                    alt={pageData.simple_image_alt}
                    className="w-full h-full object-fill transition-transform duration-300 hover:scale-105 object-center"
                    loading="lazy"
                />
            </div>

            {/* Right Section - Overlaps with Z-Index and wider width */}
            <div className="flex flex-col items-center justify-center bg-secondary mt-12
                w-full lg:w-[55%] xl:w-[50%] 2xl:w-[45%]
                px-6 sm:px-10 lg:px-8 xl:px-12 
                py-8 sm:py-10 lg:py-6 xl:py-8
                lg:h-[380px] xl:h-[480px]
                lg:shadow-2xl
                text-center lg:text-right
                relative z-10 lg:-ml-12 xl:-ml-20 2xl:-ml-28
            "
                style={{
                    backgroundImage: `linear-gradient(rgba(87, 166, 143, 0.8), rgba(87, 166, 143, 0.8)), url(${BASE_URL_SVG}assets/svgs/customization-bg.png)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="w-full max-w-xl lg:max-w-lg xl:max-w-xl">
                    <h2 className='flex flex-col'>
                        <span className="text-white font-Montserrat text-[38px] md:text-[38px] lg:text-[46px] mb-1">
                            CUSTOMISE &nbsp;
                        </span>
                        <span className="text-white font-abril text-[70px] md:text-[78px] lg:text-[89px] leading-tight lg:leading-snug mb-2 lg:mb-3">
                            Your Package
                        </span>
                    </h2>
                    <p className="text-white font-Montserrat text-[14px] sm:text-[14px] lg:text-[13px] xl:text-[15px] leading-relaxed mb-4 lg:mb-4">
                        {parse(pageData?.simple_description || "")}
                    </p>
                    <ViewAllButton label="Start Customisation" color="primary" size="md" slug={"customise-your-package"} />

                </div>
            </div>
        </div>
    );
}