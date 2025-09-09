import React, { useState, useEffect, useRef } from 'react'
import Navbar from '../../Components/CommonComponents/NavBar'
import { motion, AnimatePresence } from "framer-motion";
import CustomizeUmrahPopup from '../../Components/UmrahComponents/CustomizeUmrahPopup';
import ImageGallery from '../CommonPages/ImageGallery'
import ImageSlider from '../../Components/CommonComponents/ImageSlider'
import Testmonials from '../../Components/CommonComponents/Testmonials'
import MonthlyUmrahPackages from '../../Components/UmrahComponents/monthlyUmrahPackages'
import NeedHelp from '../../Components/CommonComponents/NeedHelp'
import { useParams, useLocation } from 'react-router-dom'
import { endpoints, BASE_URL_IMG, BASE_URL_SVG } from '../../Helpers/apiEndpoints'
import parse from "html-react-parser";
import axios from 'axios'


export default function UmrahDetail() {
    const { slug } = useParams();
    const location = useLocation();
    const [packageData, setPackageData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const modalRef = useRef(null);
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


    console.log("Render caused by:", {
        slug,
        pathname: location.pathname,
        key: location.key
    });
    useEffect(() => {
        console.log("Route changed to:", location.pathname);
    }, [location.pathname]);
    console.log("The slug of package is", slug)
    console.log("The current package data is:", packageData);
    useEffect(() => {
        const fetchPageData = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await axios.get(endpoints.umrahByslug(slug));
                if (res.data?.status === 1) {
                    console.log("Result object:", res.data?.result);
                    setPackageData(res.data.result);

                    if (res.data.result?.browser_title) {
                        document.title = res.data.result.browser_title;
                    }
                }
                else {
                    setError("Failed to load package data");
                }
            } catch (err) {

                console.error("Error fetching page data:", err);
                setError("Failed to load package data");
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
            info: '(0208) - 000 - 000',
            icon: '/svgs/callNow.svg'
        },
        {
            id: 2,
            title: 'Send Email!',
            info: 'info@makkahtravel.co.uk',
            icon: '/svgs/sendMail.svg'
        },
        {
            id: 3,
            title: 'WhatsApp Chat!',
            info: '(0208) - 000 - 000',
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
        { key: 'flight', icon: '/svgs/flight.svg', label: 'Flight' },
        { key: 'accomodation', icon: '/svgs/hotel.svg', label: 'Hotel' },
        { key: 'visa', icon: '/svgs/visa.svg', label: 'Visa' },
        { key: 'transfer', icon: '/svgs/transport.svg', label: 'Transport' },
        { key: 'breakfast', icon: '/svgs/dinner.svg', label: 'Half-Board' },
    ];
    const activeIcons = icon.filter(item => services[item.key] === 1);
    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div>Loading...</div>
            </div>
        );
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
            <div className="flex justify-center items-center h-64">
                <div>Package not found.</div>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <div className="flex flex-col w-full max-w-[97%] md:max-w-[85%] lg:max-w-[80%] mx-auto px-4">

                {/* Package Title + Price */}
                <div className="flex flex-col md:flex-row flex-wrap justify-between items-start md:items-center gap-4 mt-4">
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

                    <div className="flex flex-col w-full lg:w-1/3">
                        {/* Nights Info */}
                        <div className="flex flex-col justify-between gap-y-6 items-end w-full">
                            {[
                                {
                                    nights: packageData?.makkah_night, title: 'Makkah Hotel Nights', subtitle:
                                        packageData?.makkah_hotel?.name
                                },
                                {
                                    nights: packageData?.madinah_night, title: 'Madinah Hotel Nights', subtitle:
                                        packageData?.madinah_hotel?.name
                                },
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center justify-end w-full gap-x-6">
                                    <div className="w-12 text-center">
                                        <span className="text-secondary font-Montserrat text-2xl md:text-3xl font-semibold">
                                            {item.nights}
                                        </span>
                                    </div>
                                    <div className="hidden lg:block w-[2px] h-12 bg-secondary" />
                                    <div className="flex flex-col text-end font-Montserrat overflow-hidden">
                                        <h3 className="text-base sm:text-lg md:text-2xl whitespace-normal md:whitespace-nowrap">
                                            {item.title}
                                        </h3>
                                        <span className="text-secondary text-xs sm:text-sm md:text-base whitespace-normal md:whitespace-nowrap">
                                            {item.subtitle}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col mt-7 gap-y-4 w-full items-end">
                            {button.map((btn) => (
                                <div key={btn.id} className="flex flex-col sm:flex-row items-center gap-2 justify-end">
                                    <button
                                        className="flex flex-col cursor-pointer text-end w-full sm:w-[330px] px-4 sm:px-8 py-2 bg-primary text-white font-abril text-base sm:text-lg leading-tight">
                                        {btn.title}
                                        <br />
                                        {btn.info}
                                    </button>
                                    <div className="bg-white p-2 rounded-full shadow-sm flex items-center justify-center">
                                        <img src={`${BASE_URL_SVG}/assets/${btn.icon}`} alt={btn.title} className="w-8 sm:w-10 h-8 sm:h-10 object-contain" />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Certifications */}
                        <div className="flex flex-wrap justify-center lg:justify-end items-center mt-9 gap-x-8 gap-y-4">
                            <img src={`${BASE_URL_SVG}/assets/svgs/atol.svg`} alt="" className="w-20" />
                            <div className="hidden lg:block w-[2px] h-12 bg-black" />
                            <img src={`${BASE_URL_SVG}/assets/svgs/iata.svg`} alt="" className="w-20" />
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
                            className="w-full border border-secondary text-primary font-semibold text-2xl font-Montserrat flex justify-between items-center py-4 pl-7 pr-5 cursor-pointer">
                            Book This Package
                            <img src={`${BASE_URL_SVG}/assets/svgs/arrow-bg-gray.svg`} alt="button" />
                        </button>

                        <button
                            className="w-full text-2xl text-white font-semibold font-Montserrat flex justify-between items-center bg-primary p-4 cursor-pointer">
                            Customize My Package
                            <img src={`${BASE_URL_SVG}/assets/svgs/arrow-bg-white.svg`} alt="button" />
                        </button>
                    </div>

                </div>

                {/* Hotel Details */}
                <div className="my-12 flex flex-col gap-12">
                    <h2 className="text-2xl md:text-3xl font-Montserrat font-semibold">HOTEL DETAILS:</h2>

                    {/* First Hotel */}
                    <div className="flex flex-col lg:flex-row justify-end items-center lg:items-start">
                        <div className="flex flex-col w-full lg:w-[42%] order-2 lg:order-1 bg-[#F4F4F4] mt-14 pr-5">
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

                            <h2 className="text-xl sm:text-2xl lg:text-3xl font-abril text-end">
                                {packageData?.makkah_hotel?.name}</h2>
                            <span className="text-secondary font-Montserrat text-end">Hotel in Makkah</span>
                            <p className="font-Montserrat py-1.5 text-end text-sm sm:text-base" dangerouslySetInnerHTML={{
                                __html: packageData?.makkah_hotel?.description || ""
                            }}>
                            </p>
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
                        <div className="flex flex-col w-full lg:w-[42%] bg-[#F4F4F4] mt-14 pl-5">
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
                            <h2 className="text-xl sm:text-2xl lg:text-3xl font-abril text-start">
                                {packageData?.madinah_hotel?.name}</h2>
                            <span className="text-secondary font-Montserrat text-start">Hotel in Madinah</span>
                            <p className="font-Montserrat py-1.5 text-start text-sm sm:text-base " dangerouslySetInnerHTML={{
                                __html: packageData?.madinah_hotel?.description || ""
                            }}>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Testmonials />

            {packageData?.section_2_widget && packageData.section_2_widget.length > 0 && (
                <div className="w-full md:max-w-[85%] lg:max-w-[80%] mx-auto my-5 md:px-4">
                    <MonthlyUmrahPackages pageData={packageData} />
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
                                <CustomizeUmrahPopup />
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

        </div>
    )



}