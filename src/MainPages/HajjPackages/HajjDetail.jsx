import React, { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from "framer-motion";
import dynamic from 'next/dynamic';
import { useParams, useLocation, Link } from "@navigation"
import { api } from "../../utils/api"
import { BASE_URL_SVG } from '../../Helpers/apiEndpoints'
import parse from "html-react-parser";
import NotFound from '../CommonPages/NotFound'
import { useGlobalData } from "../../Helpers/useGlobalData";
import PageScript from '../../Components/CommonComponents/PageScript';
import { PackageDetailSkeleton } from '../../Components/CommonComponents/Skeleton';

const ImageGallery = dynamic(() => import('../CommonPages/ImageGallery'));
const ImageSlider = dynamic(() => import('../../Components/CommonComponents/ImageSlider'), { ssr: false });
const Testmonials = dynamic(() => import('../../Components/CommonComponents/Testmonials'), { ssr: false });
const NeedHelp = dynamic(() => import('../../Components/CommonComponents/NeedHelp'));
const CustomizeHajjPopup = dynamic(() => import('../../Components/HajjComponents/CustomizeHajjPopup'));
const RelevantPackages = dynamic(() => import('../../Components/CommonComponents/RelevantPackages'), { ssr: false });

export default function HajjDetail() {
    const { globalData } = useGlobalData();
    const [hoverBtn1, setHoverBtn1] = useState(false);
    const [hoverBtn2, setHoverBtn2] = useState(false);
    const { slug } = useParams();
    const location = useLocation();
    const detailSlugRef = useRef("");
    if (!detailSlugRef.current) {
        if (slug) {
            detailSlugRef.current = slug;
        } else {
            const pathParts = (location?.pathname || "").split("/").filter(Boolean);
            detailSlugRef.current = decodeURIComponent(pathParts[pathParts.length - 1] || "");
        }
    }
    const detailSlug = detailSlugRef.current;
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
            if (!detailSlug) {
                setPackageData(null);
                setLoading(false);
                return;
            }
            setLoading(true);
            setError(null);
            try {
                const data = await api.getHajjBySlug(detailSlug);
                if (data?.status === 1) {
                    setPackageData(data.result);
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
    }, [detailSlug]);


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
        return <PackageDetailSkeleton />;
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

    return (
        <div>
            <PageScript html={packageData?.script} ownerKey={detailSlug} />
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