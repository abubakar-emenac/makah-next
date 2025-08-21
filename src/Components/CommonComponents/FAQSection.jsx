import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function FAQSection({ pageData }) {
    const [openId, setOpenId] = useState(1);
    const faqs = pageData?.faqs ?? [];
    return (
        <>
            <div className="w-full max-w-[82%] mx-auto mt-8 sm:mt-12 md:mt-20 px-4 sm:px-6 md:px-9 font-sans mb-20 relative">
                <div className="w-full lg:w-[48%] mb-12 sm:mb-16">
                    <img src="/svg/crown-black.svg" alt="Crown" className="w-16 sm:w-18 md:w-24 mb-3 sm:mb-4" />
                    <h2 className="text-[28px] sm:text-[32px] md:text-[36px] font-abril leading-tight mb-3 sm:mb-4">
                        What Our Clients Say
                    </h2>
                    <p className="font-Montserrat text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed text-black">
                        Makkah Travel is here to help you visit religious places and make Umrah trips that connect with your soul.
                    </p>
                </div>
                <div className="w-full flex flex-col lg:flex-row gap-8">
                    {/* Left side */}
                    <div className="lg:w-1/2 flex flex-col justify-center">
                        <div className="w-full flex justify-center">
                            <img
                                src="/svg/faq-illustration.svg"
                                alt="FAQ Illustration"
                                className="w-full"
                            />
                        </div>
                    </div>

                    {/* Right side */}
                    <div className="lg:w-[40%] h-[500px] overflow-y-auto custom-scrollbar pr-2 pl-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="border-b py-4 font-Montserrat">
                                <button
                                    className="flex justify-between items-center w-full text-left cursor-pointer"
                                    onClick={() => setOpenId(openId === index ? null : index)}
                                >
                                    {openId === index ? (
                                        <img src="/svg/chevronUp.svg" alt="up" className="rotate-180" />
                                    ) : (
                                        <img src="/svg/chevronDown.svg" alt="down" />
                                    )}
                                    <h3 className="font-semibold text-black text-[18px] text-end">
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
                    </div>
                </div>
        </div>
        </>
    );
}
