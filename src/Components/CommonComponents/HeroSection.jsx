// // import React from 'react';
// // import Navbar from './NavBar';
// // import ViewAllButton from './ViewAllButton';
// // import EnquiryBox from './EnquiryBox';

// // export default function HeroSection() {
// //     return (
// //         <div
// //             className="flex flex-col w-full"
// //             style={{
// //                 backgroundImage: `url('/svg/HeroBg.png')`,
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
//                 backgroundImage: `url('/svg/HeroBg.png')`,
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
            <div className="w-full max-w-[80%] px-4 sm:px-6 mx-auto mt-5 sm:mt-6 md:mt-8">
                {/* Navbar */}
                <Navbar />

                {/* Headings */}
                <div className="mt-10 sm:mt-14 md:mt-20 text-white font-abril leading-tight 
                                text-[32px] sm:text-[38px] md:text-[48px] 
                                w-full sm:w-[90%] md:w-[77%] mx-auto">
                    <h1>Trusted Islamic</h1>
                    <h1>Travel Agency in UK</h1>
                </div>

                {/* Subheading paragraph */}
                <div className="mt-4 sm:mt-5 md:mt-6 text-white font-Montserrat 
                                text-[14px] sm:text-[16px] md:text-[18px] leading-relaxed 
                                w-full sm:w-[90%] md:w-[77%] mx-auto">
                    <p>
                        Go on a faith-filled journey without breaking the bank.
                        <br />
                        Makkah Travel offers the best deals on Umrah so that you
                        <br />
                        can have a hassle-free and unforgettable journey.
                    </p>
                </div>

                {/* Button */}
                <div className="mt-8 sm:mt-10 md:mt-12 w-full sm:w-[90%] md:w-[77%] mx-auto">
                    <ViewAllButton color="primary" slug="/" />
                </div>

                {/* Enquiry Box */}
                <div className="mt-12 sm:mt-14 md:mt-20 w-full sm:w-[90%] md:w-[77%] mx-auto mb-10 sm:mb-12 md:mb-14">
                    <EnquiryBox />
                </div>
            </div>
        </div>
    );
}
