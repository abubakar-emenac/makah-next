// // import React from 'react';
// // import Navbar from './NavBar';
// // import ViewAllButton from './ViewAllButton';
// // import EnquiryBox from './EnquiryBox';

// // export default function HeroSection() {
// //     return (
// //         <div
// //             className="flex flex-col w-full"
// //             style={{
// //                 backgroundImage: `url('/svgs/HeroBg.png')`,
// //                 backgroundSize: 'cover',
// //                 backgroundPosition: 'center',
// //             }}
// //         >
// //             <div className="w-full max-w-[80%] mx-auto mt-5 px-4 sm:px-6">
// //                 <Navbar />

// //                 <div className="flex flex-col text-white text-[32px] sm:text-[40px] md:text-[48px] mt-10 sm:mt-16 md:mt-20 w-full sm:w-[90%] md:w-[77%] mx-auto font-abril leading-tight">
// //                     <h1>Trusted Islamic</h1>
// //                     <h1>Travel Agency in UK</h1>
// //                 </div>

// //                 <div className="flex flex-col text-white text-[14px] sm:text-[16px] md:text-[18px] mt-4 sm:mt-5 md:mt-6 w-full sm:w-[90%] md:w-[77%] mx-auto font-Montserrat leading-relaxed">
// //                     <span>
// //                         Go on a faith-filled journey without breaking the bank.
// //                         <br />
// //                         Makkah Travel offers the best deals on Umrah so that you
// //                         <br />
// //                         can have a hassle-free and unforgettable journey.
// //                     </span>
// //                 </div>

// //                 <div className="mt-8 sm:mt-10 md:mt-12 w-full sm:w-[90%] md:w-[77%] mx-auto">
// //                     <ViewAllButton color="primary" slug="/" />
// //                 </div>

// //                 <div className="mt-12 sm:mt-16 md:mt-20 w-full sm:w-[90%] md:w-[77%] mx-auto mb-10 sm:mb-12 md:mb-14">
// //                     <EnquiryBox />
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // }

// import React from 'react';
// import Navbar from './NavBar';
// import ViewAllButton from './ViewAllButton';
// import EnquiryBox from './EnquiryBox';

// export default function HeroSection() {
//     return (
//         <div
//             className="flex flex-col w-full"
//             style={{
//                 backgroundImage: `url('/svgs/HeroBg.png')`,
//                 backgroundSize: 'cover',
//                 backgroundPosition: 'center',
//             }}
//         >
//             <div className="w-full px-4 sm:px-6 max-w-full sm:max-w-[90%] md:max-w-[80%] mx-auto mt-4 sm:mt-6 md:mt-8">
//                 {/* Mobile-only navbar */}
//                 <Navbar />

//                 {/* Headings */}
//                 <div className="mt-8 sm:mt-12 md:mt-16 text-white font-abril leading-tight text-[38px] sm:text-[38px] md:text-[44px] w-full sm:w-[95%] md:w-[80%] mx-auto">
//                     <h1>Trusted Islamic</h1>
//                     <h1>Travel Agency in UK</h1>
//                 </div>

//                 {/* Subheading paragraph */}
//                 <div className="mt-4 sm:mt-5 md:mt-6 text-white font-Montserrat text-[14px] sm:text-[16px] md:text-[18px] leading-relaxed w-full sm:w-[95%] md:w-[80%] mx-auto">
//                     <p>
//                         Go on a faith-filled journey without breaking the bank.
//                         <br />
//                         Makkah Travel offers the best deals on Umrah so that you
//                         <br />
//                         can have a hassle-free and unforgettable journey.
//                     </p>
//                 </div>

//                 {/* Button */}
//                 <div className="mt-8 sm:mt-10 md:mt-12 w-full sm:w-[95%] md:w-[80%] mx-auto">
//                     <ViewAllButton color="primary" slug="/" />
//                 </div>

//                 {/* Enquiry Box */}
//                 <div className="mt-10 sm:mt-14 md:mt-16 w-full sm:w-[95%] md:w-[80%] mx-auto mb-10 sm:mb-12 md:mb-14">
//                     <EnquiryBox />
//                 </div>
//             </div>
//         </div>
//     );
// }

// import React from 'react';
// import Navbar from './NavBar';
// import ViewAllButton from './ViewAllButton';
// import EnquiryBox from './EnquiryBox';
// import { BASE_URL_IMG } from '../../Helpers/apiEndpoints';

// export default function HeroSection({ pageData }) {
//     React.useEffect(() => {
//         console.log("HeroSection received data:", pageData);
//     }, [pageData]);

//     return (
//         <div
//             className="flex flex-col w-full"
//             style={{
//                 backgroundImage: `url(${BASE_URL_IMG}/${pageData?.image_url})`,
//                 backgroundSize: 'cover',
//                 backgroundPosition: 'center',
//             }}
//         >
//             <div className="w-full max-w-[80%] px-4 sm:px-6 mx-auto mt-5 sm:mt-6 md:mt-8">
//                 {/* Navbar */}
//                 <Navbar />

//                 {/* Headings */}
//                 <div className="mt-10 sm:mt-14 md:mt-20 text-white font-abril leading-tight
//                                 text-[32px] sm:text-[38px] md:text-[48px]
//                                 w-full sm:w-[90%] md:w-[77%] mx-auto">
//                     <h1>{pageData?.banner_heading}</h1>
//                 </div>

//                 {/* Subheading paragraph */}
//                 <div className="mt-4 sm:mt-5 md:mt-6 text-white font-Montserrat
//                                 text-[14px] sm:text-[16px] md:text-[18px] leading-relaxed
//                                 w-full sm:w-[90%] md:w-[77%] mx-auto">
//                     <p
//                         dangerouslySetInnerHTML={{ __html: pageData.description }}
//                     >
//                     </p>
//                 </div>

//                 {/* Button */}
//                 <div className="mt-8 sm:mt-10 md:mt-12 w-full sm:w-[90%] md:w-[77%] mx-auto">
//                     <ViewAllButton color="primary" slug={pageData.button_link} label={pageData.button_text} />
//                 </div>

//                 {/* Enquiry Box */}
//                 <div className="mt-12 sm:mt-14 md:mt-20 w-full sm:w-[90%] md:w-[77%] mx-auto mb-10 sm:mb-12 md:mb-14">
//                     <EnquiryBox />
//                 </div>
//             </div>
//         </div>
//     );
// }


// import React from 'react';
// import Navbar from './NavBar';
// import ViewAllButton from './ViewAllButton';
// import EnquiryBox from './EnquiryBox';
// import { BASE_URL_IMG } from '../../Helpers/apiEndpoints';

// export default function HeroSection({ pageData }) {
//     React.useEffect(() => {
//         console.log("HeroSection received data:", pageData);
//     }, [pageData]);

//     return (
//         <div
//             className="flex flex-col w-full"
//             style={{
//                 backgroundImage: `url(${BASE_URL_IMG}/${pageData?.image_url})`,
//                 backgroundSize: 'cover',
//                 backgroundPosition: 'center',
//             }}
//         >
//             {/* CONTAINER */}
//             <div className="w-full max-w-[98%] sm:max-w-[95%] md:max-w-[90%] lg:max-w-[85%] xl:max-w-[75%] mx-auto px-3 sm:px-4 md:px-6 mt-4 sm:mt-6 md:mt-8">

//                 {/* NAVBAR */}
//                 <Navbar />

//                 {/* HEADINGS */}
//                 <div
//                     className="mt-8 sm:mt-12 md:mt-16 text-white font-abril leading-tight
//                      text-[26px] sm:text-[34px] md:text-[44px] lg:text-[52px]
//                      w-full sm:w-[95%] md:w-[85%] mx-auto"
//                 >
//                     <h1>{pageData?.banner_heading}</h1>
//                 </div>

//                 {/* SUBHEADING */}
//                 <div
//                     className="mt-3 sm:mt-5 md:mt-6 text-white font-Montserrat
//                      text-[13px] sm:text-[15px] md:text-[17px] lg:text-[18px] leading-relaxed
//                      w-full sm:w-[95%] md:w-[85%] mx-auto"
//                 >
//                     <p dangerouslySetInnerHTML={{ __html: pageData.description }}></p>
//                 </div>

//                 {/* BUTTON */}
//                 <div className="mt-6 sm:mt-8 md:mt-10 w-full sm:w-[95%] md:w-[85%] mx-auto">
//                     <ViewAllButton
//                         color="primary"
//                         slug={pageData.button_link}
//                         label={pageData.button_text}
//                     />
//                 </div>

//                 {/* ENQUIRY BOX */}
//                 <div className="mt-10 sm:mt-12 md:mt-16 w-full sm:w-[95%] md:w-[85%] mx-auto mb-8 sm:mb-10 md:mb-12">
//                     <EnquiryBox />
//                 </div>
//             </div>
//         </div>
//     );
// }

import React from 'react';
import Navbar from './NavBar';
import ViewAllButton from './ViewAllButton';
import EnquiryBox from './EnquiryBox';
import { BASE_URL_IMG } from '../../Helpers/apiEndpoints';

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
            <div className="mt-6 sm:mt-8 md:mt-10 w-full sm:w-[95%] md:w-[85%] mx-auto">
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
            className="flex flex-col w-full"
            style={{
                backgroundImage: `url(${BASE_URL_IMG}/${pageData?.image_url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >

            <Navbar />

            {/* CONTENT CONTAINER - This container now holds the rest of the hero content */}
            <div className="w-full max-w-[98%] sm:max-w-[95%] md:max-w-[90%] lg:max-w-[85%] xl:max-w-[75%] mx-auto px-3 sm:px-4 md:px-6 mt-4 sm:mt-6 md:mt-8">

                {/* HEADINGS */}
                <div
                    className="mt-8 sm:mt-12 md:mt-16 text-white font-abril leading-tight 
                    text-[26px] sm:text-[34px] md:text-[44px] lg:text-[52px] 
                    w-full sm:w-[95%] md:w-[85%] mx-auto"
                >
                    <h1>{pageData?.banner_heading}</h1>
                </div>

                {/* SUBHEADING */}
                <div
                    className="mt-3 sm:mt-5 md:mt-6 text-white font-Montserrat 
                    text-[13px] sm:text-[15px] md:text-[17px] lg:text-[18px] leading-relaxed 
                    w-full sm:w-[95%] md:w-[85%] mx-auto"
                >
                    <p dangerouslySetInnerHTML={{ __html: pageData.description }}></p>
                </div>

                {viewAllButtonComponent}
                {/* ENQUIRY BOX */}
                <div className="mt-10 sm:mt-12 md:mt-16 w-full sm:w-[95%] md:w-[85%] mx-auto mb-8 sm:mb-10 md:mb-12">
                    <EnquiryBox />
                </div>
            </div>
        </div>
    );
}