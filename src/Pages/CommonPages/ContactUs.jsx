import React, { useState, useEffect } from "react";
import Navbar from "../../Components/CommonComponents/NavBar";
import NeedHelp from "../../Components/CommonComponents/NeedHelp";
import axios from "axios";
import { BASE_URL_IMG, BASE_URL_SVG, endpoints } from "../../Helpers/apiEndpoints";
import { useGlobalData } from "../../Helpers/useGlobalData";
import toast from 'react-hot-toast';
import Loader from "../../Components/CommonComponents/Loader";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

export default function ContactUS() {
    const { globalData } = useGlobalData();
    const [contactData, setContactData] = useState({});
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [passengers, setPassengers] = useState('');
    const [message, setMessage] = useState('');
    const [captcha, setCaptcha] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Helper to find variable by code
    const getVariable = (code) =>
        globalData?.result?.global_variables?.find((v) => v.code === code)
            ?.code_value || "";

    const footerSetting = globalData?.result?.footer_setting;

    const icons = [
        {
            icon: "assets/svgs/contactContact.svg",
            title: "Our Contact Number",
            value: getVariable("[%PHONENUMBER%]"),
        },
        {
            icon: "assets/svgs/emailContact.svg",
            title: "Our Email Address",
            value: getVariable("[%OFFICEEMAIL%]"),
        },
        {
            icon: "assets/svgs/pin.svg",
            title: "Our Office Address",
            value: getVariable("[%OFFICEADDRESS%]"),
        },
    ];
    const SocialMIcons = [
        {
            icon: "assets/svgs/fbContact.svg",
            alt: "fb",
            width: '8'
        },
        {
            icon: "assets/svgs/igContact.svg",
            alt: "ig",
            width: '16'
        },
        {
            icon: "assets/svgs/ytContact.svg",
            alt: "yt",
            width: '20'
        },
    ]

    const sliderSettings = {
        dots: false,
        arrows: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2500,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    // Add social icons only if enabled
    const socialEnabled =
        footerSetting?.social_media_icons?.enable_social_media_icons === "1";
    const socialIcons = socialEnabled
        ? [
            {
                icon: "assets/svgs/socialContact.svg",
                title: "Our Social Media",
                value: footerSetting.social_media_icons, // pass whole object to render later
            },
        ]
        : [];

    const allIcons = [...icons, ...socialIcons];

    useEffect(() => {
        const fetchPageData = async () => {
            try {
                const res = await axios.get(endpoints.getPageUrl("contact-us"));
                // console.log(res)
                if (res.data?.status === 1) {
                    setContactData(res.data.result);
                    // if (res.data.result?.browser_title) {
                    //     document.title = res.data.result.browser_title;
                    // }
                    // // Set Meta Description
                    // const desc = document.querySelector('meta[name="description"]') || document.createElement("meta");
                    // desc.setAttribute("name", "description");
                    // desc.setAttribute("content", res.data.result.meta_description || "");
                    // if (!desc.parentNode) document.head.appendChild(desc);

                    // // Set meta keywords
                    // const keywords = document.querySelector('meta[name="keywords"]') || document.createElement("meta");
                    // keywords.setAttribute("name", "keywords");
                    // keywords.setAttribute("content", res.data.result.meta_keywords);
                    // if (!keywords.parentNode) document.head.appendChild(keywords);

                    // // OG Title
                    // const ogTitle = document.querySelector('meta[property="og:title"]') || document.createElement("meta");
                    // ogTitle.setAttribute("property", "og:title");
                    // ogTitle.setAttribute("content", res.data.result.browser_title);
                    // if (!ogTitle.parentNode) document.head.appendChild(ogTitle);

                    // // OG Description
                    // const ogDescription = document.querySelector('meta[property="og:description"]') || document.createElement("meta");
                    // ogDescription.setAttribute("property", "og:description");
                    // ogDescription.setAttribute("content", res.data.result.meta_description || "");
                    // if (!ogDescription.parentNode) document.head.appendChild(ogDescription);

                    // // OG Image (dynamic from banner_img[0])
                    // const imageUrl = res.data.result.banner_img?.[0]?.url
                    //     ? `${BASE_URL_IMG}/${res.data.result.banner_img[0].url}`
                    //     : '';

                    // const ogImage = document.querySelector('meta[property="og:image"]') || document.createElement("meta");
                    // ogImage.setAttribute("property", "og:image");
                    // ogImage.setAttribute("content", imageUrl);
                    // if (!ogImage.parentNode) document.head.appendChild(ogImage);

                    // // OG URL (current page URL)
                    // const ogUrl = document.querySelector('meta[property="og:url"]') || document.createElement("meta");
                    // ogUrl.setAttribute("property", "og:url");
                    // ogUrl.setAttribute("content", window.location.href);
                    // if (!ogUrl.parentNode) document.head.appendChild(ogUrl);

                    // // OG Type (always set to "Travels & Tours")
                    // const ogType = document.querySelector('meta[property="og:type"]') || document.createElement("meta");
                    // ogType.setAttribute("property", "og:type");
                    // ogType.setAttribute("content", "Travels & Tours");
                    // if (!ogType.parentNode) document.head.appendChild(ogType);

                    // // Canonical Link
                    // let canonicalLink = document.querySelector('link[rel="canonical"]');
                    // if (!canonicalLink) {
                    //     canonicalLink = document.createElement("link");
                    //     canonicalLink.setAttribute("rel", "canonical");
                    //     document.head.appendChild(canonicalLink);
                    // }
                    // canonicalLink.setAttribute("href", window.location.href);
                }
                // console.log("the contact data is:", contactData)
            } catch (err) {
                console.error("Error fetching page data:", err);
            }
        };
        fetchPageData();
    }, [contactData]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isLoading) return; // Prevent double submit

        if (!fullName.trim()) return toast.error("Please enter your full name");
        if (!passengers || passengers <= 0) return toast.error("Please enter number of guests");
        if (!phone) return toast.error("Please enter your phone number");
        if (!fullName.trim()) return toast.error("Please enter your full name");
        if (!email.trim()) return toast.error("Please enter your email address");
        if (!message.trim()) return toast.error("Please enter your message");
        if (parseInt(captcha) !== 13) return toast.error("Captcha incorrect!");

        const payload = {
            name: fullName,
            email,
            phone: phone,
            form_type: "contact",
            contact_detail: {
                passengers,
                message,
            },
        };

        try {
            setIsLoading(true);

            const response = await fetch(`${endpoints.sendEmail}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (data.status === 1 && data.message.includes("Email sent successfully")) {
                toast.success("Enquiry submitted successfully ✅");

                // Reset form
                setFullName('');
                setPassengers('');
                setEmail('');
                setPhone('');
                setMessage('');
                setCaptcha('');
            } else if (data.status === 1 && data.message.includes("no email sent")) {
                toast("Your enquiry was saved, but the email could not be sent ⚠️", { icon: "⚠️" });
            } else {
                toast.error("Something went wrong ❌ Please try again later.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong ❌ Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    if (!contactData) {
        return (
            <div className="flex items-center justify-center min-h-[40vh]">
                <p className="text-lg font-Montserrat">No Data Found</p>
            </div>
        );
    }

    const imageUrl = contactData.banner_img?.[0]?.url
        ? `${BASE_URL_IMG}/${contactData.banner_img[0].url}`
        : '';

    return (
        <>
            <Helmet>
                <title>{contactData.browser_title}</title>
                <meta name="description" content={contactData.meta_description || ""} />
                <meta name="keywords" content={contactData.meta_keywords || ""} />

                {/* Open Graph Tags */}
                <meta property="og:title" content={contactData.browser_title} />
                <meta property="og:description" content={contactData.meta_description || ""} />
                <meta property="og:image" content={imageUrl} />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:type" content="Travels & Tours" />

                {/* Canonical */}
                <link rel="canonical" href={window.location.href} />
            </Helmet>
            <div className=" w-[85%] mx-auto mb-10">
                <Navbar textColor="black" />
            </div>
            <div className="flex flex-col w-full max-w-[90%] lg:max-w-[75%] mx-auto font-Montserrat">

                {/* Cards Section */}
                <div className="hidden sm:grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 my-10 w-full">
                    {allIcons.map((item, idx) => (
                        <div key={idx} className="relative w-full">
                            <div className="relative bg-gray-100 rounded-md pt-16 pb-8 px-6 text-center shadow-sm h-56">
                                {/* Floating icon card */}
                                <motion.div
                                    initial={{ opacity: 0, y: -8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.35 }}
                                    className="absolute -top-12 left-1/2 -translate-x-1/2 w-28 h-28 bg-white rounded-xl shadow-lg grid place-items-center"
                                >
                                    <img
                                        src={`${BASE_URL_SVG}/${item.icon}`}
                                        alt={item.title}
                                        className="w-16 h-16 object-contain"
                                        loading="lazy"
                                    />
                                </motion.div>

                                <h3 className="text-lg font-semibold">{item.title}</h3>

                                {item.title === "Our Social Media" ? (
                                    <div className="flex justify-center flex-wrap gap-4 mt-5">
                                        {SocialMIcons.map((item, index) => (
                                            <div key={index} className="flex flex-col items-center gap-1">
                                                <img
                                                    src={`${BASE_URL_SVG}/${item.icon}`}
                                                    alt={item.alt}
                                                    className={`w-${item.width}`}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="mt-2 text-base font-medium tracking-wide break-words">
                                        {item.value}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="sm:hidden mt-10 overflow-visible">
                    <Slider {...sliderSettings}>
                        {allIcons.map((item, idx) => (
                            <div key={idx} className="px-2">
                                <div className="relative bg-gray-100 rounded-md pt-16 pb-8 px-6 text-center shadow-sm h-56">
                                    {/* Floating icon card */}
                                    <motion.div
                                        initial={{ opacity: 0, y: -8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.35 }}
                                        className="absolute -top-12 left-1/2 -translate-x-1/2 w-28 h-28 bg-white rounded-xl shadow-lg grid place-items-center"
                                    >
                                        <img
                                            src={`${BASE_URL_SVG}/${item.icon}`}
                                            alt={item.title}
                                            className="w-16 h-16 object-contain"
                                            loading="lazy"
                                        />
                                    </motion.div>

                                    <h3 className="text-lg font-semibold">{item.title}</h3>

                                    {item.title === "Our Social Media" ? (
                                        <div className="flex justify-center flex-wrap gap-4 mt-5">
                                            {SocialMIcons.map((item, index) => (
                                                <div key={index} className="flex flex-col items-center gap-1">
                                                    <img
                                                        src={`${BASE_URL_SVG}/${item.icon}`}
                                                        alt={item.alt}
                                                        className={`w-${item.width}`}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="mt-2 text-base font-medium tracking-wide break-words">
                                            {item.value}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>

                {/* Form + Image Section */}
                <div className="flex flex-col lg:flex-row gap-8 w-full mt-10">
                    {/* Form */}
                    <div className="lg:w-3/5 w-full flex flex-col font-Montserrat">
                        <img
                            src="/svgs/crown-black.svg"
                            alt="Crown"
                            className="w-12 sm:w-16 md:w-20 mb-3 sm:mb-4"
                        />
                        <h3 className="text-xl sm:text-2xl">Feel Free to Drop us a Line Below</h3>
                        <h1 className="font-abril text-2xl sm:text-3xl md:text-4xl">Get In Touch</h1>

                        <form onSubmit={handleSubmit}>
                            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-md bg-gray-100 p-5 sm:p-7 my-5">
                                {/* Full Name */}
                                <div className="relative border border-secondary bg-white rounded-2xl px-4 py-2 flex items-center">
                                    <input
                                        type="text"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        placeholder="Full Name*"
                                        className="w-full bg-transparent outline-none text-sm sm:text-base py-2 placeholder:text-base"
                                    />
                                    <img
                                        src="/svgs/Name SVG.svg"
                                        alt="name"
                                        className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5"
                                    />
                                </div>

                                {/* Passengers */}
                                <div className="relative border border-secondary bg-white rounded-2xl px-4 py-2 flex items-center">
                                    <input
                                        type="number"
                                        value={passengers}
                                        min={1}
                                        onChange={(e) => setPassengers(e.target.value)}
                                        placeholder="Passengers*"
                                        className="w-full bg-transparent outline-none text-sm sm:text-base py-2 placeholder:text-base"
                                    />
                                    <img
                                        src="/svgs/Guests SVG.svg"
                                        alt="guests"
                                        className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5"
                                    />
                                </div>

                                {/* Phone */}
                                <div className="relative border border-secondary bg-white rounded-2xl px-4 py-2 flex items-center">
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) =>
                                            setPhone(e.target.value.replace(/\D/g, ""))
                                        }
                                        placeholder="Phone.No*"
                                        className="w-full bg-transparent outline-none text-sm sm:text-base py-2 placeholder:text-base"
                                    />
                                    <img
                                        src="/svgs/Phone Number SVG.svg"
                                        alt="phone"
                                        className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5"
                                    />
                                </div>

                                {/* Email */}
                                <div className="relative border border-secondary bg-white rounded-2xl px-4 py-2 flex items-center">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email*"
                                        className="w-full bg-transparent outline-none text-sm sm:text-base py-2 placeholder:text-base"
                                    />
                                    <img
                                        src="/svgs/Email SVG.svg"
                                        alt="email"
                                        className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5"
                                    />
                                </div>

                                {/* Message */}
                                <div className="relative border border-secondary bg-white rounded-2xl px-4 py-2 flex items-center">
                                    <input
                                        type="text"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Type Your Message..."
                                        className="w-full bg-transparent outline-none text-sm sm:text-base py-2 placeholder:text-base"
                                    />
                                </div>

                                {/* Captcha */}
                                <div className="relative border border-secondary bg-white rounded-2xl px-4 py-2 flex items-center">
                                    <input
                                        type="number"
                                        value={captcha}
                                        onChange={(e) => setCaptcha(e.target.value)}
                                        placeholder="Answer"
                                        className="w-full bg-transparent outline-none text-sm sm:text-base py-2 placeholder:text-base"
                                    />
                                    <span className="bg-white underline text-secondary absolute right-3 top-1/2 -translate-y-1/2">
                                        5+8
                                    </span>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-center -mt-10">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="cursor-pointer flex justify-center items-center gap-2 text-white font-semibold bg-secondary rounded-lg text-lg sm:text-xl px-5 py-2"
                                >
                                    {isLoading ? (
                                        <Loader />
                                    ) : (
                                        <>
                                            <span>Submit</span>
                                            <img
                                                src="/svgs/SubmitArrow.svg"
                                                alt="submit"
                                                className="w-6 h-6 sm:w-7 sm:h-7"
                                            />
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Side Image */}
                    <div className="lg:w-2/5 w-full flex justify-center lg:justify-end mt-25">
                        <img
                            src={`${BASE_URL_IMG}/${contactData.simple_image_url}`}
                            alt={contactData.simple_image_alt}
                            className="w-[424px] h-[308px] max-w-md object-cover rounded-lg"
                        />
                    </div>
                </div>

                <NeedHelp />
            </div>
        </>
    );

}
