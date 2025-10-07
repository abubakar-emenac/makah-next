import React, { useEffect, useState } from 'react';
import Navbar from './NavBar';
import ViewAllButton from './ViewAllButton';
import { BASE_URL_IMG } from '../../Helpers/apiEndpoints';
import parse from 'html-react-parser'

export default function HeroSection({ pageData }) {
    React.useEffect(() => {
        console.log("HeroSection received data:", pageData);
    }, [pageData]);

    const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 640);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const buttonEnabled = pageData?.button_enable;
    const buttonText = pageData?.button_text;
    const buttonLink = pageData?.button_link;

    let viewAllButtonComponent = null;
    if (buttonEnabled === "1") {
        viewAllButtonComponent = (
            <div className=" md:mt-4 lg:mt-6
       w-full sm:w-[95%] md:w-[95%] lg:max-w-[88%] xl:max-w-[88%]
        mx-auto sm:pb-20">
                <ViewAllButton
                    color="primary"
                    slug={buttonLink}
                    label={buttonText}
                />
            </div>
        );
    }

    return (
        <div className="relative w-full">
            <div
                className="w-full bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url(${BASE_URL_IMG}/${pageData?.image_url})`,
                    backgroundSize: '100% auto',
                    // minHeight:isMobile ? "auto" : "70vh",
                    backgroundPosition: isMobile ? "center 40px" : "top center",
                }}
            >
                {/* CONTENT CONTAINER */}
                <div className="relative
         w-full max-w-[95%] lg:max-w-[88%] xl:max-w-[88%] mx-auto
          flex flex-col justify-center text-center sm:text-left">

                    <div className="flex flex-col pt-14 sm:pt-16 md:pt-20 lg:pt-28">

                        {/* HEADING */}
                        <div className="text-white font-abril leading-tight 
                        text-[18px] sm:text-[30px] md:text-[44px]
                        w-full max-w-[95%] sm:w-[95%] md:w-[95%] lg:max-w-[88%] xl:max-w-[88%] 
                        mx-auto"
                        >
                            <div
                                className=''
                                dangerouslySetInnerHTML={{
                                    __html: pageData?.banner_heading
                                }}
                            />
                        </div>

                        {/* SUBHEADING */}
                        <p
                            className="mt-1 sm:mt-3 text-white font-Montserrat 
                        text-[12px] sm:text-[15px] md:text-[17px] lg:text-[18px] leading-relaxed 
                        w-full max-w-[95%] sm:w-[95%] md:w-[95%] lg:max-w-[88%] xl:max-w-[88%] mx-auto"
                            dangerouslySetInnerHTML={{ __html: pageData.description }}
                        />

                        {viewAllButtonComponent}
                    </div>
                </div>
            </div>
        </div>
    );
}
