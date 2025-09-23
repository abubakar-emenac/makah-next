import React from 'react';
import Navbar from './NavBar';
import ViewAllButton from './ViewAllButton';
import { BASE_URL_IMG } from '../../Helpers/apiEndpoints';
import parse from 'html-react-parser'

export default function HeroSection({ pageData }) {
    React.useEffect(() => {
        console.log("HeroSection received data:", pageData);
    }, [pageData]);

    const buttonEnabled = pageData?.button_enable;
    const buttonText = pageData?.button_text;
    const buttonLink = pageData?.button_link;

    let viewAllButtonComponent = null;
    if (buttonEnabled === "1") {
        viewAllButtonComponent = (
            <div className="mt-4 sm:mt-6 md:mt-8 w-full sm:w-[95%] md:w-[85%] mx-auto">
                <ViewAllButton
                    color="primary"
                    slug={buttonLink}
                    label={buttonText}
                />
            </div>
        );
    }

    return (
        <div
            className="flex flex-col w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] relative"
            style={{
                backgroundImage: `url(${BASE_URL_IMG}/${pageData?.image_url})`,
                backgroundSize: 'center',
                backgroundPosition: 'center',
            }}
        >

            {/* CONTENT CONTAINER */}
            <div className="w-full max-w-[90%] lg:max-w-[80%] mx-auto px-4 sm:px-6 md:px-8 h-full flex flex-col justify-center">

                {/* HEADING */}
                <h1 className="text-white font-abril leading-tight 
                    text-[22px] sm:text-[30px] md:text-[38px] lg:text-[44px] 
                    drop-shadow-lg"
                >
                    <h1
                        className='ml-10 md:ml-24'
                        dangerouslySetInnerHTML={{
                            __html: pageData?.banner_heading
                        }}
                    />
                </h1>

                {/* SUBHEADING */}
                <p
                    className="mt-2 sm:mt-3 md:mt-4 text-white font-Montserrat 
                    text-[12px] sm:text-[14px] md:text-[16px] lg:text-[17px] 
                    leading-relaxed drop-shadow-md"
                    dangerouslySetInnerHTML={{ __html: pageData.description }}
                />

                {viewAllButtonComponent}
            </div>
        </div>
    );
}
