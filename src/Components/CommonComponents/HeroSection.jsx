import React from 'react';
import Navbar from './NavBar';
import ViewAllButton from './ViewAllButton';
import EnquiryBox from './EnquiryBox';

export default function HeroSection() {
    return (
        <div
            className="flex flex-col w-full"
            style={{
                backgroundImage: `url('/svg/HeroBg.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="w-full max-w-[80%] mx-auto mt-5 px-4 sm:px-6">
                <Navbar />

                <div className="flex flex-col text-white text-[32px] sm:text-[40px] md:text-[48px] mt-10 sm:mt-16 md:mt-20 w-full sm:w-[90%] md:w-[77%] mx-auto font-abril leading-tight">
                    <h1>Trusted Islamic</h1>
                    <h1>Travel Agency in UK</h1>
                </div>

                <div className="flex flex-col text-white text-[14px] sm:text-[16px] md:text-[18px] mt-4 sm:mt-5 md:mt-6 w-full sm:w-[90%] md:w-[77%] mx-auto font-Montserrat leading-relaxed">
                    <span>
                        Go on a faith-filled journey without breaking the bank.
                        <br />
                        Makkah Travel offers the best deals on Umrah so that you
                        <br />
                        can have a hassle-free and unforgettable journey.
                    </span>
                </div>

                <div className="mt-8 sm:mt-10 md:mt-12 w-full sm:w-[90%] md:w-[77%] mx-auto">
                    <ViewAllButton color="primary" slug="/" />
                </div>

                <div className="mt-12 sm:mt-16 md:mt-20 w-full sm:w-[90%] md:w-[77%] mx-auto mb-10 sm:mb-12 md:mb-14">
                    <EnquiryBox />
                </div>
            </div>
        </div>
    );
}
