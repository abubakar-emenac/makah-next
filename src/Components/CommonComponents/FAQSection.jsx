// import { useState } from "react";
// import { ChevronDown, ChevronUp } from "lucide-react";
// import { BASE_URL_IMG } from "../../Helpers/apiEndpoints";

// export default function FAQSection({ pageData }) {
//     const [openId, setOpenId] = useState(1);
//     const faqs = pageData?.faqs ?? [];
//     const faqImageSrc = pageData?.faq_image_url;
//     const faqImageAlt = pageData?.faq_image_alt;
//     const faqHeading = pageData?.faqs_heading;
//     const faqSubheading = pageData?.faqs_subheading;
//     const fullImageUrl = faqImageSrc ? `${BASE_URL_IMG}/${faqImageSrc}` : null;
//     return (
//         <>
//             <div className="w-full max-w-[82%] mx-auto mt-8 sm:mt-12 md:mt-20 px-4 sm:px-6 md:px-9 font-sans mb-20 relative">
//                 <div className="w-full lg:w-[48%] mb-12 sm:mb-16">
//                     <img src="/svgs/crown-black.svg" alt="Crown" className="w-16 sm:w-18 md:w-24 mb-3 sm:mb-4" />
//                     <h2 className="text-[28px] sm:text-[32px] md:text-[36px] font-abril leading-tight mb-3 sm:mb-4">
//                         {faqHeading}
//                     </h2>
//                     <p className="font-Montserrat text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed text-black">
//                         {faqSubheading}
//                     </p>
//                 </div>
//                 <div className="w-full flex flex-col lg:flex-row gap-8">
//                     {/* Left side */}
//                     <div className="lg:w-1/2 flex flex-col justify-center">
//                         <div className="w-full flex justify-center">
//                             <img
//                                 src={fullImageUrl}
//                                 alt={faqImageAlt}
//                                 className="w-full"
//                             />
//                         </div>
//                     </div>

//                     {/* Right side */}
//                     <div className="lg:w-[40%] h-[500px] overflow-y-auto custom-scrollbar pr-2 pl-4">
//                         {faqs.map((faq, index) => (
//                             <div key={index} className="border-b py-4 font-Montserrat">
//                                 <button
//                                     className="flex justify-between items-center w-full text-left cursor-pointer"
//                                     onClick={() => setOpenId(openId === index ? null : index)}
//                                 >
//                                     {openId === index ? (
//                                         <img src="/svgs/chevronUp.svg" alt="up" className="rotate-180" />
//                                     ) : (
//                                         <img src="/svgs/chevronDown.svg" alt="down" />
//                                     )}
//                                     <h3 className="font-semibold text-black text-[18px] text-end">
//                                         {faq.question}
//                                     </h3>
//                                 </button>
//                                 {openId === index && (
//                                     <div
//                                         className="mt-3 text-[16px] pl-11"
//                                         dangerouslySetInnerHTML={{ __html: faq.answer }}
//                                     />
//                                 )}
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//         </div>
//         </>
//     );
// }

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { BASE_URL_IMG, BASE_URL_SVG } from "../../Helpers/apiEndpoints";
import "../../CSS/FAQSection.css"; 

export default function FAQSection({ pageData }) {
    const [openId, setOpenId] = useState(0);
    const faqs = pageData?.faqs ?? [];
    const faqImageSrc = pageData?.faq_image_url;
    const faqImageAlt = pageData?.faq_image_alt;
    const faqHeading = pageData?.faqs_heading;
    const faqSubheading = pageData?.faqs_subheading;
    const fullImageUrl = faqImageSrc ? `${BASE_URL_IMG}/${faqImageSrc}` : null;

    return (
        <div className="w-full max-w-[78%] mx-auto mt-8 sm:mt-12 md:mt-20 px-4 sm:px-6 md:px-9 font-sans mb-20">
            <div className="w-full flex flex-col lg:flex-row gap-8">

                {/* Left side: Heading, Subheading, and Image */}
                <div className="lg:w-[45%] flex flex-col">
                    <div className="mb-8"> {/* Container for heading and subheading */}
                        <img src={`${BASE_URL_SVG}/assets/svgs/crown-black.svg`} alt="Crown" className="w-16 sm:w-18 md:w-24 mb-3 sm:mb-4" />
                        <h2 className="text-[28px] sm:text-[32px] md:text-[36px] font-abril leading-tight mb-3 sm:mb-4">
                            {faqHeading}
                        </h2>
                        <p className="font-Montserrat text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed text-black">
                            {faqSubheading}
                        </p>
                    </div>
                    <div className="w-full flex justify-center">
                        <img
                            src={fullImageUrl}
                            alt={faqImageAlt}
                            className="w-full"
                        />
                    </div>
                </div>

                {/* Right side: FAQs with custom scrollbar */}
                {/* <div className="lg:w-[55%] faq-scroll-container mt-16 max-h-[500px]">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border-b py-4 font-Montserrat">
                            <button
                                className="flex justify-between items-center w-full cursor-pointer"
                                onClick={() => setOpenId(openId === index ? null : index)}
                            >
                                {openId === index ? (
                                    <img src={`${BASE_URL_SVG}/assets/svgs/chevronUp.svg`} alt="up" className="rotate-180" />
                                ) : (
                                        <img src={`${BASE_URL_SVG}/assets/svgs/chevronDown.svg`} alt="down" />
                                )}
                                <h3 className="font-semibold text-black text-[18px] text-start">
                                    {faq.question}
                                </h3>
                            </button>
                            {openId === index && (
                                <div
                                    className="mt-3 text-[16px] pl-11"
                                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                                />
                            )}
                        </div>
                    ))}
                </div> */}




                {/* <div className="lg:w-[55%] faq-scroll-container mt-16 max-h-[490px]">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border-b py-4 font-Montserrat">
                            <button
                                className="flex justify-between items-center w-full text-left cursor-pointer"
                                onClick={() => setOpenId(openId === index ? null : index)}
                            >
                                <h3 className="font-semibold text-black text-[18px]">
                                    {faq.question}
                                </h3>
                                {openId === index ? (
                                    <img
                                        src={`${BASE_URL_SVG}/assets/svgs/chevronUp.svg`}
                                        alt="up"
                                        className="w-3 h-3 transition-transform duration-200 rotate-180"
                                    />
                                ) : (
                                    <img
                                        src={`${BASE_URL_SVG}/assets/svgs/chevronDown.svg`}
                                        alt="down"
                                        className="w-3 h-3 transition-transform duration-200"
                                    />
                                )}
                            </button>

                            {openId === index && (
                                <div
                                    className="mt-3 text-[16px] pl-1 sm:pl-4"
                                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                                />
                            )}
                        </div>
                    ))}
                </div> */}

                <div className="lg:w-[55%] faq-scroll-container mt-16 max-h-[490px]">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border-b py-4 font-Montserrat">
                            <button
                                className="flex justify-between items-center w-full text-left cursor-pointer"
                                onClick={() => setOpenId(openId === index ? null : index)}
                            >
                                <h3 className="font-semibold text-black text-[18px]">
                                    {faq.question}
                                </h3>
                                <img
                                    src={`${BASE_URL_SVG}/assets/svgs/${openId === index ? "chevronUp.svg" : "chevronDown.svg"
                                        }`}
                                    alt={openId === index ? "up" : "down"}
                                    className={`w-3 h-3 transition-transform duration-300 ${openId === index ? "rotate-180" : ""
                                        }`}
                                />
                            </button>

                            {/* Animated answer */}
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${openId === index ? "max-h-96 opacity-100 mt-3" : "max-h-0 opacity-0"
                                    }`}
                            >
                                <div
                                    className="text-[16px] pl-1 sm:pl-4"
                                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                                />
                            </div>
                        </div>
                    ))}
                </div>


            </div>
        </div>
    );
}