import React, { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from "framer-motion";
import ImageGallery from '../CommonPages/ImageGallery'
import ImageSlider from '../../Components/CommonComponents/ImageSlider'
import Testmonials from '../../Components/CommonComponents/Testmonials'
import NeedHelp from '../../Components/CommonComponents/NeedHelp'
import { useParams, useLocation, Link } from 'react-router-dom'
import { endpoints, BASE_URL_IMG, BASE_URL_SVG } from '../../Helpers/apiEndpoints'
import parse from "html-react-parser";
import axios from 'axios'
import NotFound from '../CommonPages/NotFound'
import CustomizeHajjPopup from '../../Components/HajjComponents/CustomizeHajjPopup';
import { Helmet } from 'react-helmet'
import { useGlobalData } from "../../Helpers/useGlobalData";
import RelevantPackages from '../../Components/CommonComponents/RelevantPackages';

const FullPageLoader = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
        </div>
    );
};


export default function HajjDetail() {
    const { globalData } = useGlobalData();
    const [hoverBtn1, setHoverBtn1] = useState(false);
    const [hoverBtn2, setHoverBtn2] = useState(false);
    const { slug } = useParams();
    const location = useLocation();
    const [packageData, setPackageData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const makkahDescription = packageData?.makkah_hotel?.description || "";
    const madinahDescription = packageData?.madinah_hotel?.description || "";
    const isMakkahLong = makkahDescription.length > 300;
    const isMadinahLong = madinahDescription.length > 300;
    const [descModalOpen, setDescModalOpen] = useState(false);
    const [descTitle, setDescTitle] = useState("");
    const [descContent, setDescContent] = useState("");

    // const shortMakkah = isMakkahLong ? makkahDescription.slice(0, 350) + "...Read more" : makkahDescription;
    // const shortMadinah = isMadinahLong ? madinahDescription.slice(0, 350) + "...Read more" : madinahDescription;
    const modalRef = useRef(null);


    const getVariable = (code) =>
        globalData?.result?.global_variables?.find((v) => v.code === code)
            ?.code_value || "";

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);
    useEffect(() => {
    }, [location.pathname]);
    useEffect(() => {
        const fetchPageData = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await axios.get(endpoints.hajjByslug(slug));
                if (res.data?.status === 1) {
                    // console.log("Result object:", res.data?.result);
                    setPackageData(res.data.result);

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
                    // const imageUrl = res.data.result.image_url
                    //     ? `${BASE_URL_IMG}/${res.data.result.image_url}`
                    //     : '';
                    // // console.log(imageUrl)
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
                else {
                    return (
                        <NotFound />
                    )

                }
            } catch (err) {

                console.error("Error fetching page data:", err);
                return (
                    <NotFound />
                )
            } finally {
                setLoading(false);
            }
        };

        fetchPageData();
    }, [slug]);


    const button = [
        {
            id: 1,
            title: 'Call Now!',
            info: getVariable("[%PHONENUMBER%]"),
            icon: '/svgs/callNow.svg'
        },
        {
            id: 2,
            title: 'Send Email!',
            info: getVariable("[%OFFICEEMAIL%]"),
            icon: '/svgs/sendMail.svg'
        },
        {
            id: 3,
            title: 'WhatsApp Chat!',
            info: getVariable("[%WHATSAPP%]"),
            icon: '/svgs/whatsappMsg.svg'
        }
    ];
    const services = {
        flight: packageData?.flight,
        accomodation: packageData?.accomodation,
        visa: packageData?.visa,
        transfer: packageData?.transfer,
        breakfast: packageData?.breakfast,
    };

    const icon = [
        { key: 'flight', icon: '/svgs/flightd.svg', label: 'Flight' },
        { key: 'visa', icon: '/svgs/visa.svg', label: 'Visa' },
        { key: 'transfer', icon: '/svgs/transport.svg', label: 'Transport' },
        { key: 'accomodation', icon: '/svgs/hotel.svg', label: 'Hotel' },
        { key: 'breakfast', icon: '/svgs/dinner.svg', label: 'Half-Board' },
    ];
    const activeIcons = icon.filter(item => services[item.key] === 1);
    if (loading) {
        return <FullPageLoader />;
    }
    if (error) {
        return (
            <div className="flex justify-center items-center h-64">
                <div>{error}</div>
            </div>
        );
    }

    if (!packageData) {
        return (
            <NotFound />
        )
    }

    const imageUrl = packageData.image_url ? `${BASE_URL_IMG}/${packageData.image_url}` : ""

    return (
        <div>
            <Helmet>
                <title>{packageData.browser_title}</title>
                <script >
                    {packageData.script}
                </script>
                <meta name="description" content={packageData.meta_description || ""} />
                <meta name="keywords" content={packageData.meta_keywords || ""} />

                {/* Open Graph Tags */}
                <meta property="og:title" content={packageData.browser_title} />
                <meta property="og:description" content={packageData.meta_description || ""} />
                <meta property="og:image" content={imageUrl} />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:type" content="Travels & Tours" />
                <script >
                    {packageData.script}
                </script>

                {/* Canonical */}
                <link rel="canonical" href={window.location.href} />
            </Helmet>
            <div className="flex mt-20 flex-col w-full max-w-[95%] md:max-w-[85%] lg:max-w-[80%] mx-auto px-4">

                {/* Package Title + Price */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-4">
                    <div className="w-full md:w-3/4 lg:w-[55%]">
                        {/* <img src="/svgs/filledStar.svg" alt="" className="w-6 sm:w-7 lg:w-8" /> */}
                        <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <img
                                    key={index}
                                    src={`${BASE_URL_SVG}/assets/svgs/filledStar.svg`}
                                    alt="star"
                                    className={`w-6 sm:w-7 lg:w-8 ${index >= Number(packageData?.package_star) ? 'opacity-30' : ''}`}
                                />
                            ))}
                        </div>
                        <h1 className="font-Montserrat font-bold text-xl sm:text-2xl lg:text-4xl leading-tight">
                            {packageData?.title}
                        </h1>
                    </div>
                    <div className="hidden lg:block w-px h-16 bg-secondary" />
                    <div className="text-center flex items-end gap-1">
                        <span className="text-xs md:text-sm mb-[6px]">from</span>
                        <span className="text-2xl md:text-4xl text-primary font-bold font-abril">£{packageData?.price}</span>
                        <span className="text-xl md:text-3xl font-bold text-primary font-abril">.00</span>
                        <span className="text-xs md:text-sm mb-[6px]">/pp</span>
                    </div>
                </div>

                {/* Image Gallery + Hotel Nights */}
                <div className="flex flex-col lg:flex-row w-full mt-5 gap-6">
                    <div className="w-full lg:w-2/3">

                        <ImageGallery images={packageData?.images || []} />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-col w-full lg:w-1/3 gap-6">
                        {/* Nights Info */}
                        <div className="flex flex-col gap-y-6 w-[84%] ml-auto">
                            {[
                                {
                                    nights: packageData?.makkah_night,
                                    title: "Makkah Hotel Nights",
                                    subtitle: packageData?.makkah_hotel?.name,
                                },
                                {
                                    nights: packageData?.madinah_night,
                                    title: "Madinah Hotel Nights",
                                    subtitle: packageData?.madinah_hotel?.name,
                                }
                            ].map((item, idx) => (
                                <div
                                    key={idx}
                                    className="
                                            grid grid-cols-[1fr_2fr] 
                                            lg:grid-cols-[1fr_2px_2fr] 
                                            items-end gap-x-2
                                        "
                                >
                                    {/* Nights */}
                                    <div className="w-12 text-center">
                                        <span className="text-secondary font-Montserrat text-xl sm:text-2xl md:text-3xl font-semibold">
                                            {item.nights}
                                        </span>
                                    </div>

                                    {/* Vertical line (only on lg+) */}
                                    <div className="hidden lg:block h-full bg-secondary" />

                                    {/* Hotel info */}
                                    <div className="flex flex-col font-Montserrat overflow-hidden text-start sm:text-left lg:text-right">
                                        <h3 className="text-sm sm:text-base md:text-xl">{item.title}</h3>
                                        <span className="text-secondary text-xs sm:text-sm md:text-base">
                                            {item.subtitle}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>


                        {/* Action Buttons */}
                        <div className="flex flex-col mt-0 lg:mt-7 gap-y-4 w-full items-stretch lg:items-end">
                            {button.map((btn) => (
                                <div
                                    key={btn.id}
                                    className="flex sm:flex-row items-center w-full sm:w-auto"
                                >
                                    <a
                                        href={
                                            btn.id === 1
                                                ? `tel:${btn.info.replace(/[^+\d]/g, "")}`
                                                : btn.id === 2
                                                    ? `mailto:${btn.info}`
                                                    : btn.id === 3
                                                        ? `https://wa.me/${btn.info.replace(/[^+\d]/g, "")}`
                                                        : "#"
                                        }
                                        target={btn.id === 3 ? "_blank" : "_self"} // open WhatsApp in new tab
                                        rel="noopener noreferrer"
                                        className="flex-1 sm:w-[250px] md:w-[280px] lg:w-[330px] px-4 sm:px-6 md:px-8 py-2 bg-primary text-white font-abril text-sm sm:text-base md:text-lg leading-tight text-center sm:text-left lg:text-right"
                                    >
                                        {btn.title}
                                        <br />
                                        <span className="font-Montserrat">{btn.info}</span>
                                    </a>
                                    <div className="bg-white p-2 shadow-sm flex items-center justify-center">
                                        <img
                                            src={`${BASE_URL_SVG}/assets/${btn.icon}`}
                                            alt={btn.title}
                                            className="w-9 sm:w-8 md:w-10 h-7 sm:h-8 md:h-14 object-contain"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Certifications */}
                        <div className="flex flex-wrap justify-center sm:justify-start lg:justify-end items-center mt-0 lg:mt-9 gap-x-6 gap-y-4">
                            <img
                                src={`${BASE_URL_SVG}/assets/svgs/atol.svg`}
                                alt="ATOL"
                                className="w-16 sm:w-20"
                            />
                            <div className="hidden lg:block w-[2px] h-12 bg-black" />
                            <img
                                src={`${BASE_URL_SVG}/assets/svgs/iata.svg`}
                                alt="IATA"
                                className="w-16 sm:w-20"
                            />
                        </div>
                    </div>
                </div>

                {/* Package Details */}
                <div className="flex flex-col w-full mt-8">
                    <h2 className="text-2xl md:text-3xl font-Montserrat font-semibold">PACKAGE DETAILS</h2>
                    <div className="w-full flex flex-wrap justify-center md:justify-between items-center gap-4 mt-6">
                        {activeIcons.map((item) => (
                            <React.Fragment key={item.key}>
                                <div className="flex flex-col items-center gap-2 font-Montserrat">
                                    <div className="w-14 h-14 flex items-center justify-center rounded">
                                        <img src={`${BASE_URL_SVG}/assets/${item.icon}`} alt={item.label}
                                            className="w-10 sm:w-12 h-10 sm:h-12 object-contain" />
                                    </div>
                                    <span className="text-xs sm:text-sm text-center text-[#222]">
                                        {item.label}
                                    </span>
                                </div>
                                {item.key !== activeIcons.length - 1 && (
                                    <div className="hidden md:block h-10 w-px bg-secondary mx-4 mb-2" />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
                <div className="w-full flex flex-col lg:flex-row justify-between gap-6 mt-10">
                    {/* Left (2/3 width on lg+, full width on mobile) */}
                    <div className="w-full lg:w-3/4 font-Montserrat text-[16px]">
                        {packageData?.description && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 bg-[rgba(219,158,48,0.08)] p-7">
                                {parse(packageData.description)}
                            </div>
                        )}
                    </div>

                    {/* Right (1/3 width on lg+, full width on mobile) */}
                    <div className="w-full lg:w-[23%] flex flex-col items-end gap-y-4">
                        <button
                            onClick={() => setIsOpen(true)}
                            onMouseEnter={() => setHoverBtn1(true)}
                            onMouseLeave={() => setHoverBtn1(false)}
                            className="w-full border border-secondary text-start hover:border-primary text-primary hover:border-0 hover:bg-primary hover:text-white font-semibold text-xl font-Montserrat flex justify-between items-start py-4 pl-3 pr-5 cursor-pointer transition-all duration-300 ease-in-out">
                            Book This Package
                            <img src={
                                hoverBtn1
                                    ? `${BASE_URL_SVG}/assets/svgs/arrow-bg-white.svg`
                                    : `${BASE_URL_SVG}/assets/svgs/arrow-bg-gray.svg`
                            } alt="button" />
                        </button>

                        <Link
                            to={"/customise-your-package"}
                            onMouseEnter={() => setHoverBtn2(true)}
                            onMouseLeave={() => setHoverBtn2(false)}
                            className="w-full text-xl border border-secondary hover:border-primary text-primary hover:border-0 hover:bg-primary hover:text-white font-semibold font-Montserrat flex justify-between items-center  p-4 pl-3 cursor-pointer transition-all duration-300 ease-in-out">
                            Customise My Package
                            <img src={
                                hoverBtn2
                                    ? `${BASE_URL_SVG}/assets/svgs/arrow-bg-white.svg`
                                    : `${BASE_URL_SVG}/assets/svgs/arrow-bg-gray.svg`
                            } alt="button" />
                        </Link>
                    </div>

                </div>

                {/* Hotel Details */}
                <div className="my-12 flex flex-col gap-12">
                    <h2 className="text-2xl md:text-3xl font-Montserrat font-semibold">HOTEL DETAILS:</h2>

                    {/* First Hotel */}
                    <div className="flex flex-col lg:flex-row justify-end items-center lg:items-start">
                        <div className="flex flex-col w-full lg:w-[42%] order-2 lg:order-1 mx-2 pt-5 bg-[#F4F4F4] mt-14 pl-5 pr-5 max-h-[250px] min-h-[250px]">
                            <div className="flex justify-end gap-1">
                                {Array.from({ length: Number(packageData?.makkah_hotel?.hotel_star || 0) }).map((_, idx) => (
                                    <img
                                        key={idx}
                                        src={`${BASE_URL_SVG}/assets/svgs/filledStar.svg`}
                                        alt="Star"
                                        className="w-6 sm:w-7"
                                    />
                                ))}
                            </div>

                            <h3 className="text-xl sm:text-2xl lg:text-3xl font-abril text-end">
                                {packageData?.makkah_hotel?.name}</h3>
                            <span className="text-secondary font-Montserrat text-end">Hotel in Makkah</span>
                            <div className="font-Montserrat py-1.5 text-end text-sm sm:text-base">
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: isMakkahLong
                                            ? makkahDescription.slice(0, 250) + "..."
                                            : makkahDescription,
                                    }}
                                />
                                {isMakkahLong && (
                                    <button
                                        onClick={() => {
                                            setDescTitle(packageData?.makkah_hotel?.name || "Makkah Hotel");
                                            setDescContent(makkahDescription);
                                            setDescModalOpen(true);
                                        }}
                                        className="text-primary underline inline ml-1"
                                    >
                                        Read More
                                    </button>
                                )}
                            </div>

                        </div>
                        <div className="order-1 lg:order-2 w-full lg:w-auto">
                            <ImageSlider images={packageData?.makkah_hotel?.images || []} />
                        </div>
                    </div>

                    {/* Second Hotel */}
                    <div className="flex flex-col lg:flex-row items-center lg:items-start">
                        <div className="w-full lg:w-auto">

                            <ImageSlider images={packageData?.madinah_hotel?.images || []} />
                        </div>
                        <div className="flex flex-col w-full lg:w-[42%] mx-2 pt-5 bg-[#F4F4F4] mt-14 pl-5 pr-5 max-h-[250px] min-h-[250px]">
                            <div className="flex gap-1">
                                {Array.from({ length: Number(packageData?.madinah_hotel?.hotel_star || 0) }).map((_, idx) => (
                                    <img
                                        key={idx}
                                        src={`${BASE_URL_SVG}/assets/svgs/filledStar.svg`}
                                        alt="Star"
                                        className="w-6 sm:w-7"
                                    />
                                ))}
                            </div>
                            <h3 className="text-xl sm:text-2xl lg:text-3xl font-abril text-start">
                                {packageData?.madinah_hotel?.name}</h3>
                            <span className="text-secondary font-Montserrat text-start">Hotel in Madinah</span>
                            <div className="font-Montserrat py-1.5 text-end text-sm sm:text-base">
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: isMadinahLong
                                            ? madinahDescription.slice(0, 250) + "..."
                                            : madinahDescription,
                                    }}
                                />
                                {isMadinahLong && (
                                    <button
                                        onClick={() => {
                                            setDescTitle(packageData?.madinah_hotel?.name || "Madinah Hotel");
                                            setDescContent(madinahDescription);
                                            setDescModalOpen(true);
                                        }}
                                        className="text-primary underline inline ml-1"
                                    >
                                        Read More
                                    </button>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </div>


            {packageData?.ourclientsays_widget?.length > 0 && (
                <Testmonials pageData={packageData} />
            )}

            {packageData?.section_2_widget?.some(
                (widget) => widget && Object.keys(widget).length > 0
            ) && (
                    <div className="w-full md:max-w-[85%] lg:max-w-[80%] mx-auto my-5 md:px-4">
                        <RelevantPackages pageData={packageData} />
                    </div>
                )}


            <NeedHelp />
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            className="fixed inset-0 bg-black/50 z-40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        />

                        {/* Popup */}
                        <motion.div
                            ref={modalRef}
                            className="fixed inset-0 z-50 flex justify-center items-center"
                            initial={{ opacity: 0, scale: 0.8, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 50 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            <div className="relative bg-white shadow-lg max-w-[80%] w-full ">
                                <div className="flex justify-end p-3">
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="absolute -top-4 -right-4  rounded-full"
                                    >
                                        <img src={`${BASE_URL_SVG}/assets/svgs/cross.svg`} alt="crosee" className=' cursor-pointer' />
                                    </button>
                                </div>
                                <CustomizeHajjPopup />
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {descModalOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            className="fixed inset-0 bg-black/50 z-40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        />

                        {/* Popup */}
                        <motion.div
                            className="fixed inset-0 z-50 flex justify-center items-center"
                            initial={{ opacity: 0, scale: 0.8, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 50 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            <div className="relative bg-white shadow-lg max-w-[600px] w-full p-6 rounded-lg overflow-y-auto max-h-[80vh]">
                                {/* Close Button */}
                                <button
                                    onClick={() => setDescModalOpen(false)}
                                    className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-100"
                                >
                                    <img src={`${BASE_URL_SVG}/assets/svgs/cross.svg`} alt="close" className="w-5 h-5" />
                                </button>

                                <h2 className="text-xl font-Montserrat font-semibold mb-4">{descTitle}</h2>
                                <div
                                    className="text-sm sm:text-base font-Montserrat leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: descContent }}
                                />
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

        </div>
    )



}