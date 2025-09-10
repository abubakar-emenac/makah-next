// import React from 'react';
// import ViewAllButton from './ViewAllButton';

// export default function CustomizeYourPackage() {
//     return (
//         <div className="relative w-full mt-16 flex flex-col lg:flex-row overflow-hidden">
//             {/* Left Image - Extended Width */}
//             <div className="
//     w-full
//     xs:w-full
//     sm:w-full
//     md:w-full
//     lg:w-[60%]
//     xl:w-[65%]
//     2xl:w-[68%]
//     h-[250px]
//     xs:h-[280px]
//     sm:h-[350px]
//     md:h-[450px]
//     lg:h-[500px]
//     xl:h-[550px]
//     2xl:h-[600px]
//     relative
//     overflow-hidden
// ">
//                 <img
//                     src="/images/iStock-872424158.png"
//                     alt="Customize Umrah Package"
//                     className="
//             w-full h-full object-cover
//             transition-transform duration-300
//             hover:scale-105
//             object-center
//         "
//                     loading="lazy"
//                 />
//             </div>

//             {/* Right Section with bg color - Reduced Height & Z-Index */}
//             <div className="
//         flex items-center justify-end bg-secondary
//         w-full lg:w-[50%] xl:w-[45%]
//         px-6 sm:px-10 lg:px-8 xl:px-12
//         py-4 sm:py-6 lg:py-6 xl:py-8
//         relative lg:absolute lg:right-0 lg:top-1/2 lg:transform lg:-translate-y-1/2
//         z-20
//         lg:h-[380px] xl:h-[480px]
//         lg:shadow-2xl
//     ">
//                 <div className="text-right w-full max-w-xl lg:max-w-lg xl:max-w-xl">
//                     <h3 className="
//                 text-white font-Montserrat
//                 text-[20px] sm:text-[24px] md:text-[28px] lg:text-[24px] xl:text-[32px]
//                 mb-1
//             ">
//                         Customize
//                     </h3>
//                     <h2 className="
//                 text-white font-abril
//                 text-[28px] sm:text-[36px] md:text-[48px] lg:text-[40px] xl:text-[56px]
//                 leading-tight lg:leading-snug
//                 mb-2 lg:mb-3
//             ">
//                         Your Package
//                     </h2>
//                     <p className="
//                 text-white font-Montserrat
//                 text-[13px] sm:text-[14px] lg:text-[13px] xl:text-[15px]
//                 leading-relaxed
//                 mb-3 lg:mb-4
//                 lg:line-clamp-3 xl:line-clamp-none
//             ">
//                         Makkah Travel is here to help you visit religious places and make Umrah trips that
//                         connect with your soul. Let us help you build your journey your way.
//                     </p>
//                     <ViewAllButton label="Start Customization" color="primary" size="md" />
//                 </div>
//             </div>
//         </div>

//     );
// }

// import React from 'react';
// import ViewAllButton from './ViewAllButton';
// import { BASE_URL_IMG } from '../../Helpers/apiEndpoints';

// export default function CustomizeYourPackage({ pageData }) {
//     if (!pageData) return null;
//     const cleanedUrl = pageData.simple_image_url
//         ? `${BASE_URL_IMG}/${pageData.simple_image_url}`
//         : "/images/iStock-872424158.png";
//     return (
//         <div className="relative w-full mt-16 flex flex-col lg:flex-row overflow-hidden">
//             {/* Left Image - Hidden on mobile */}
//             <div className="
//                 hidden
//                 lg:block
//                 lg:w-[60%] xl:w-[65%] 2xl:w-[68%]
//                 lg:h-[500px] xl:h-[550px] 2xl:h-[600px]
//                 relative overflow-hidden
//             ">
//                 <img
//                     src={cleanedUrl}
//                     alt="Customize Umrah Package"
//                     className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 object-center"
//                     loading="lazy"
//                 />
//             </div>

//             {/* Right Section */}
//             <div className="
//                 flex flex-col items-center justify-center
//                 bg-secondary
//                 w-full lg:w-[50%] xl:w-[45%]
//                 px-6 sm:px-10 lg:px-8 xl:px-12
//                 py-8 sm:py-10 lg:py-6 xl:py-8
//                 z-20
//                 lg:h-[380px] xl:h-[480px]
//                 lg:shadow-2xl
//                 text-center lg:text-right
//             ">
//                 <div className="w-full max-w-xl lg:max-w-lg xl:max-w-xl">
//                     <h2 className="text-white font-Montserrat text-[36px] sm:text-[24px] md:text-[28px] lg:text-[24px] xl:text-[32px] mb-1">
//                         Customize
//                     </h2>
//                     <h2 className="text-white font-abril text-[50px] sm:text-[36px] md:text-[48px] lg:text-[40px] xl:text-[56px] leading-tight lg:leading-snug mb-2 lg:mb-3">
//                         Your Package
//                     </h2>
//                     <p className="text-white font-Montserrat text-[14px] sm:text-[14px] lg:text-[13px] xl:text-[15px] leading-relaxed mb-4 lg:mb-4">
//                         Makkah Travel is here to help you visit religious places and make Umrah trips that connect with your soul Makkah Travel is here to help you visit religious places and make Umrah trips that connect with your soul.
//                     </p>
//                     <ViewAllButton label="Start Customization" color="primary" size="md" />
//                 </div>
//             </div>
//         </div>
//     );
// }


import React from 'react';
import ViewAllButton from './ViewAllButton';
import { BASE_URL_IMG } from '../../Helpers/apiEndpoints';
import parse from 'html-react-parser'
import { Link } from 'react-router-dom';

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
                    alt="Customize Umrah Package"
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 object-center"
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
            ">
                <div className="w-full max-w-xl lg:max-w-lg xl:max-w-xl">
                    <h2 className='flex flex-col'>
                        <span className="text-white font-Montserrat text-[36px] sm:text-[24px] md:text-[28px] lg:text-[24px] xl:text-[32px] mb-1">
                        Customize
                        </span>
                        <span className="text-white font-abril text-[50px] sm:text-[36px] md:text-[48px] lg:text-[40px] xl:text-[56px] leading-tight lg:leading-snug mb-2 lg:mb-3">
                        Your Package
                        </span>
                    </h2>
                    <p className="text-white font-Montserrat text-[14px] sm:text-[14px] lg:text-[13px] xl:text-[15px] leading-relaxed mb-4 lg:mb-4">
                        {parse(pageData?.simple_description || "")}
                    </p>
                    <Link to='/customize-form'>
                    <ViewAllButton label="Start Customization" color="primary" size="md" />
                    </Link>
                </div>
            </div>
        </div>
    );
}