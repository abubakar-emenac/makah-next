import React, { useEffect, useRef, useState } from 'react';
import Navbar from './NavBar';
import { BASE_URL_IMG, BASE_URL_SVG, endpoints } from '../../Helpers/apiEndpoints';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../CSS/datepicker-custom.css';
import Loader from './Loader';
import toast from "react-hot-toast";
import axios from 'axios';
import { Helmet } from 'react-helmet';

import { useNavigate } from 'react-router-dom';

const CustomizePackageForm = () => {
    const navigate = useNavigate()

    const staticOrigins = [

        { label: "Leeds (LBA) - United Kingdom", code: "LBA" },
        { label: "London-All (LON) - United Kingdom", code: "LON" },
        { label: "London-Heathrow (LHR) - United Kingdom", code: "LHR" },
        { label: "London-Gatwick (LGW) - United Kingdom", code: "LGW" },
        { label: "Shetland Islands-Lerwick (LWK) - United Kingdom", code: "LWK" },
        { label: "London-City (LCY) - United Kingdom", code: "LCY" },
        { label: "Manchester (MAN) - United Kingdom", code: "MAN" },
        { label: "Isles Of Scilly-St Marys (ISC) - United Kingdom", code: "ISC" },
        { label: "Kirkwall (KOI) - United Kingdom", code: "KOI" },
        { label: "London-Luton (LTN) - United Kingdom", code: "LTN" },
        { label: "London-St Pancras (QQS) - United Kingdom", code: "QQS" },
        { label: "Liverpool (LPL) - United Kingdom", code: "LPL" },
        { label: "Shetland Islands-Sumburgh (LSI) - United Kingdom", code: "LSI" },
        { label: "London-Stansted (STN) - United Kingdom", code: "STN" },
        { label: "Humberside (HUY) - United Kingdom", code: "HUY" },
        { label: "Islay (ILY) - United Kingdom", code: "ILY" },
        { label: "Inverness (INV) - United Kingdom", code: "INV" },
        { label: "Isle Of Man (IOM) - United Kingdom", code: "IOM" },
        { label: "Jersey (JER) - United Kingdom", code: "JER" },
        { label: "Guernsey (GCI) - United Kingdom", code: "GCI" },
        { label: "Glasgow Intl (GLA) - United Kingdom", code: "GLA" },
        { label: "Dundee (DND) - United Kingdom", code: "DND" },
        { label: "Doncaster/Sheffield (DSA) - United Kingdom", code: "DSA" },
        { label: "Edinburgh (EDI) - United Kingdom", code: "EDI" }
    ];

    const [activeTab, setActiveTab] = useState('umrah');
    const [departureDate, setDepartureDate] = useState(null);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [captcha, setCaptcha] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [makkahNights, setMakkahNights] = useState('');
    const [medinahNights, setMedinahNights] = useState('');
    const [pageData, setPageData] = useState({});
    // console.log("CustomiZe", pageData)

    useEffect(() => {
        const fetchPageData = async () => {
            try {
                const res = await axios.get(endpoints.getPageUrl('customize-your-umrah'));
                // console.log('API full response:', res.data);

                if (res.data?.status === 1) {
                    const result = res.data.result;
                    setPageData(result);
                }
            } catch (err) {
                console.error('Error fetching Page Data:', err);
            }
        };

        fetchPageData();
    }, []);

    const imageUrl = pageData && pageData.image_url ? `${BASE_URL_IMG}/${pageData.image_url}` : ""

    useEffect(() => {
        generateCaptcha();
    }, []);

    const generateCaptcha = () => {
        const n1 = Math.floor(Math.random() * 9) + 1;
        const n2 = Math.floor(Math.random() * 9) + 1;
        setNum1(n1);
        setNum2(n2);
        setCaptcha("");
    };

    const [userIp, setUserIp] = useState("");

    useEffect(() => {
        const fetchIp = async () => {
            try {
                const res = await fetch("https://api64.ipify.org?format=json");
                const data = await res.json();
                setUserIp(data.ip);
            } catch (err) {
                console.error("Error fetching IP:", err);
            }
        };

        fetchIp();
    }, []);

    // Airlines Origin DropDown
    const originRef = useRef(null);
    const [origin, setOrigin] = useState("");
    const [originLabel, setOriginLabel] = useState("");
    const [originSuggestions, setOriginSuggestions] = useState([]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            // Origin
            if (originRef.current && !originRef.current.contains(event.target)) {
                if (originSuggestions.length > 0) {
                    setOriginLabel("");
                }
                setOriginSuggestions([]);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [originSuggestions]);

    // Accomodation DropDown
    const AccomodationRef = useRef(null);

    const [isAccomodationOpen, setIsAccomodationOpen] = useState(false);
    const [selectedAccomodation, setSelectedAccomodation] = useState("");

    const AccomodationClasses = ["3 Star", "4 Star", "5 Star", "Any"];

    const handleSelect = (item) => {
        setSelectedAccomodation(item);
        setIsAccomodationOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (AccomodationRef.current && !AccomodationRef.current.contains(event.target)) {
                setIsAccomodationOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // No Of Adults DropDown
    const dropdownRef = useRef(null);

    const [isOpen, setIsOpen] = useState(false);
    const [adults, setAdults] = useState(0);
    const [children, setChildren] = useState(0);
    const [infants, setInfants] = useState(0);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Hajj Type DropDown
    const HajjTypeRef = useRef(null);

    const [isHajjTypeOpen, setIsHajjTypeOpen] = useState(false);
    const [selectedHajjType, setSelectedHajjType] = useState("");

    const HajjTypeClasses = ["Shifting", "Non Shifting", "Any"];

    const handleHajjTypeSelect = (item) => {
        setSelectedHajjType(item);
        setIsHajjTypeOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (HajjTypeRef.current && !HajjTypeRef.current.contains(event.target)) {
                setIsHajjTypeOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Room Type DropDown
    const RoomTypeRef = useRef(null);

    const [isRoomTypeOpen, setIsRoomTypeOpen] = useState(false);
    const [selectedRoomType, setSelectedRoomType] = useState("");

    const RoomTypeClasses = ["Double Room", "Triple Room", "Quint Room"];

    const handleRoomTypeSelect = (item) => {
        setSelectedRoomType(item);
        setIsRoomTypeOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (RoomTypeRef.current && !RoomTypeRef.current.contains(event.target)) {
                setIsRoomTypeOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Meal Type DropDown
    const MealTypeRef = useRef(null);

    const [isMealTypeOpen, setIsMealTypeOpen] = useState(false);
    const [selectedMealType, setSelectedMealType] = useState("");

    const MealTypeClasses = ["Bed & BreakFast", "Half Board", "Full Board", "None"];

    const handleMealTypeSelect = (item) => {
        setSelectedMealType(item);
        setIsMealTypeOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (MealTypeRef.current && !MealTypeRef.current.contains(event.target)) {
                setIsMealTypeOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Distance Type DropDown
    const DistanceTypeRef = useRef(null);

    const [isDistanceTypeOpen, setIsDistanceTypeOpen] = useState(false);
    const [selectedDistanceType, setSelectedDistanceType] = useState("");

    const DistanceTypeClasses = ["Under 05 Minutes Walk", "05-10 Minutes", "15-20 Minutes", "Walk"];

    const handleDistanceTypeSelect = (item) => {
        setSelectedDistanceType(item);
        setIsDistanceTypeOpen(false);
    };

    // Allow only digits
    const handleNumberInput = (e, setter) => {
        const value = e.target.value.replace(/[^0-9]/g, ""); // remove everything except 0–9
        setter(value);
    };


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (DistanceTypeRef.current && !DistanceTypeRef.current.contains(event.target)) {
                setIsDistanceTypeOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const [passengers, setPassengers] = useState(0);

    useEffect(() => {
        setPassengers(adults + children + infants);
    }, [adults, children, infants]);

    const validateForm = () => {
        if (!fullName.trim()) {
            toast.error("Please Enter your Name");
            return false;
        }
        if (!email.trim()) {
            toast.error("Please Enter your Email");
            return false;
        }
        if (!phone.trim()) {
            toast.error("Please Enter your Phone Number");
            return false;
        }
        if (!origin.trim()) {
            toast.error("Please select a Departure Airport");
            return false;
        }
        if (!departureDate) {
            toast.error("Please select a Departure Date");
            return false;
        }
        if (activeTab === "umrah" && !makkahNights) {
            toast.error("Please Enter nights in Makkah");
            return false;
        }
        if (activeTab === "umrah" && !medinahNights) {
            toast.error("Please Enter nights in Madinah");
            return false;
        }

        if (!selectedAccomodation) {
            toast.error("Please select Accomodation Type");
            return false;
        }
        if (activeTab === "umrah" && !selectedRoomType) {
            toast.error("Please select Room Type");
            return false;
        }
        if (activeTab === "umrah" && !selectedMealType) {
            toast.error("Please select Meal Type");
            return false;
        }
        if (activeTab === "umrah" && !selectedDistanceType) {
            toast.error("Please select Distance from Mosque");
            return false;
        }

        if (!passengers) {
            toast.error("Please select Passengers");
            return false;
        }

        if (!captcha) {
            toast.error("Please Enter Captcha");
            return false;
        }

        if (parseInt(captcha, 10) !== num1 + num2) {
            toast.error("Captcha is Incorrect ❌");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLoading) return;

        if (!validateForm()) return;

        const payload = {
            name: fullName,
            email,
            phone,
            form_type: "Package Booking",
            contact_detail: {
                subject: "Customize Form",
                date: departureDate,
                user_ip: userIp,
                Departure_Airport: originLabel,
                Makkah_Nights: makkahNights,
                Medinah_Nights: medinahNights,
                Accomodation_Type: selectedAccomodation,
                Room_Type: selectedRoomType,
                Meal_Type: selectedMealType,
                Distance: selectedDistanceType,
                passenger: passengers,
                Message: message,
                page_url: window.location.href,
            },
        };
        // console.log("Payload", payload)
        try {
            setIsLoading(true);
            const res = await axios.post(endpoints.sendEmail, payload);
            if (res.status === 200) {
                navigate("/thank-you")
                toast.success("Form submitted Successfully");
                generateCaptcha();
                setFullName("");
                setEmail("");
                setPhone("");
                setOrigin("");
                setDepartureDate(null);
                setMakkahNights("");
                setMedinahNights("");
                setSelectedAccomodation("");
                setSelectedRoomType("");
                setSelectedMealType("");
                setSelectedDistanceType("");
                setPassengers(0);
                setMessage("");
            }
        } catch (error) {
            toast.error("Something went wrong, please Try Again", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>{pageData.browser_title}</title>
                <meta name="description" content={pageData.meta_description || ""} />
                <meta name="keywords" content={pageData.meta_keywords || ""} />

                {/* Open Graph Tags */}
                <meta property="og:title" content={pageData.browser_title} />
                <meta property="og:description" content={pageData.meta_description || ""} />
                <meta property="og:image" content={imageUrl} />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:type" content="Travels & Tours" />

                {/* Canonical */}
                <link rel="canonical" href={window.location.href} />
            </Helmet>

            <div className=" w-[85%] mx-auto mb-10 mt-30">
            </div>
            <div className="w-full max-w-[92%] mx-auto mt-10 mb-15">
                <img
                    src={`${BASE_URL_SVG}/assets/svgs/crown-black.svg`}
                    alt="Crown"
                    className="w-12 sm:w-16 md:w-35"
                />
                <div className='flex'>
                    <div className='w-full md:max-w-[70%] mx-auto'>
                        <div className="flex flex-col xl:flex-row justify-between font-Montserrat items-start xl:items-center gap-6">
                            <h1 className="font-abril text-2xl sm:text-3xl md:text-4xl">
                                Customize Your Package
                            </h1>
                            <div className="ml-auto flex items-center gap-2">
                                <button
                                    onClick={() => setActiveTab('umrah')}
                                    className={`h-[48px] w-[180px] border-2 text-[16px] font-medium transition ${activeTab === 'umrah'
                                        ? 'border-[#57A68F] text-[#FFFFFF] bg-[#57A68F]'
                                        : 'border-[#DB9E30] text-[#000000]'
                                        }`}
                                >
                                    Umrah Package
                                </button>
                                <button
                                    onClick={() => setActiveTab('hajj')}
                                    className={`h-[48px] w-[180px] border-2 text-[16px] font-medium transition ${activeTab === 'hajj'
                                        ? 'border-[#57A68F] text-[#FFFFFF] bg-[#57A68F]'
                                        : 'border-[#DB9E30] text-[#000000]'
                                        }`}
                                >
                                    Hajj Package
                                </button>
                            </div>
                        </div>
                        <div className="border-[1.5px] border-gray-400 mt-5 p-5">
                            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-2 gap-y-3">
                                {/* Origin */}
                                <div className="relative col-span-1" ref={originRef}>
                                    <div
                                        className="flex items-center bg-white rounded-xl px-3 py-2 border border-primary w-full"
                                        style={{ height: "52px" }}
                                    >
                                        <input
                                            type="text"
                                            placeholder="Departure Airport"
                                            className="w-full outline-none font-Montserrat font-medium text-[14px] text-gray-600"
                                            value={originLabel}
                                            onFocus={() => setOriginSuggestions(staticOrigins.map(item => item.label))}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setOriginLabel(value);
                                                const filtered = staticOrigins
                                                    .map(item => item.label)
                                                    .filter(label => label.toLowerCase().includes(value.toLowerCase()));
                                                setOriginSuggestions(filtered);
                                            }}
                                        />
                                        <img src={`${BASE_URL_SVG}/assets/svgs/plane.svg`} alt="Departure Airport" className="ml-2 w-5 h-5" />
                                    </div>

                                    {originSuggestions.length > 0 && (
                                        <ul className="absolute z-10 left-0 top-[110%] w-full bg-white border border-gray-300 max-h-62 overflow-y-auto rounded-md shadow-md mt-1">
                                            {originSuggestions.map((item, index) => (
                                                <li
                                                    key={index}
                                                    onClick={() => {
                                                        const match = item.match(/\(([^)]+)\)/);
                                                        const code = match ? match[1] : item;

                                                        setOrigin(code);
                                                        setOriginLabel(item);
                                                        setOriginSuggestions([]);
                                                    }}
                                                    className="px-2 py-2 cursor-pointer font-Montserrat hover:bg-[#57A68F]  text-md hover:font-semibold hover:text-white"
                                                >
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>

                                <div
                                    className="flex items-center bg-white rounded-xl px-3 py-2 border border-primary w-full col-span-1"
                                    style={{ height: "52px" }}
                                >
                                    <DatePicker
                                        placeholderText="Departure Date"
                                        selected={departureDate}
                                        onChange={(date) => setDepartureDate(date)}
                                        className="w-full outline-none font-Montserrat font-medium text-[14px] text-gray-600"
                                        minDate={new Date()}
                                    />
                                    <img src={`${BASE_URL_SVG}/assets/svgs/Departure Date SVG.svg`}
                                        alt="Departure Date" className="ml-auto w-5 h-5" />
                                </div>

                                {activeTab === "umrah" && (
                                    <>
                                        {/* No. Nights Makkah */}
                                        <div
                                            className="flex items-center bg-white rounded-xl px-3 py-2 border border-primary w-full col-span-1"
                                            style={{ height: "52px" }}
                                        >
                                            <input
                                                type="number"
                                                value={makkahNights}
                                                inputMode='numeric'
                                                onKeyPress={(e) => {
                                                    // Prevent non-numeric characters (except backspace, delete, tab)
                                                    if (!/[0-9]/.test(e.key) &&
                                                        !['Backspace', 'Delete', 'Tab', 'Enter'].includes(e.key)) {
                                                        e.preventDefault();
                                                    }
                                                }}
                                                onChange={(e) => setMakkahNights(e.target.value)}
                                                placeholder="No Nights Makkah"
                                                className="w-full outline-none font-Montserrat font-medium text-[14px] text-gray-600"
                                                min={1}
                                            />
                                        </div>

                                        {/* No. Nights Madinah */}
                                        <div
                                            className="flex items-center bg-white rounded-xl px-3 py-2 border border-primary w-full col-span-1"
                                            style={{ height: "52px" }}
                                        >
                                            <input
                                                type="number"
                                                value={medinahNights}
                                                onChange={(e) => setMedinahNights(e.target.value)}
                                                inputMode='numeric'
                                                onKeyPress={(e) => {
                                                    // Prevent non-numeric characters (except backspace, delete, tab)
                                                    if (!/[0-9]/.test(e.key) &&
                                                        !['Backspace', 'Delete', 'Tab', 'Enter'].includes(e.key)) {
                                                        e.preventDefault();
                                                    }
                                                }}
                                                placeholder="No Nights Madinah"
                                                className="w-full outline-none font-Montserrat font-medium text-[14px] text-gray-600"
                                                min={1}
                                            />
                                        </div>
                                    </>
                                )}

                                <div className="relative inline-block w-full col-span-1" ref={AccomodationRef}>
                                    {/* Input Field */}
                                    <div
                                        className="flex items-center bg-white rounded-xl px-3 py-2 border border-primary w-full"
                                        style={{ height: "52px" }}
                                        onClick={() => setIsAccomodationOpen(!isAccomodationOpen)}
                                    >
                                        <input
                                            type="text"
                                            placeholder='Accomodation'
                                            value={selectedAccomodation}
                                            className="w-full outline-none font-Montserrat font-medium text-[14px] text-gray-600"
                                        />
                                        <img
                                            src={`${BASE_URL_SVG}/assets/svgs/Accomodation.svg`}
                                            alt="Accomodation" className="ml-2" />
                                    </div>

                                    {/* Dropdown Menu */}
                                    {isAccomodationOpen && (
                                        <div className="absolute z-10 mt-2 w-full bg-white rounded-md shadow-lg p-2">
                                            {AccomodationClasses?.map((item) => (
                                                <div
                                                    key={item}
                                                    onClick={() => handleSelect(item)}
                                                    className={`px-4 py-1 cursor-pointer hover:font-semibold font-Montserrat hover:bg-[#57A68F] hover:text-white border-b border-gray-300  rounded ${selectedAccomodation === item ? 'bg-[#57A68F] text-white font-semibold' : ''
                                                        }`}
                                                >
                                                    {item}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {activeTab === "umrah" && (
                                    <>
                                        <div className="relative inline-block w-full col-span-1" ref={RoomTypeRef}>
                                            {/* Input Field */}
                                            <div
                                                className="flex items-center bg-white rounded-xl px-3 py-2 border border-primary w-full"
                                                style={{ height: "52px" }}
                                                onClick={() => setIsRoomTypeOpen(!isRoomTypeOpen)}
                                            >
                                                <input
                                                    type="text"
                                                    placeholder='Room Type'
                                                    value={selectedRoomType}
                                                    className="w-full outline-none font-Montserrat font-medium text-[14px] text-gray-600"
                                                />
                                                <img src={`${BASE_URL_SVG}/assets/svgs/Accomodation.svg`}
                                                    alt="Accomodation" className="ml-2" />
                                            </div>

                                            {/* Dropdown Menu */}
                                            {isRoomTypeOpen && (
                                                <div className="absolute z-10 mt-2 w-full bg-white rounded-md shadow-lg p-2">
                                                    {RoomTypeClasses?.map((item) => (
                                                        <div
                                                            key={item}
                                                            onClick={() => handleRoomTypeSelect(item)}
                                                            className={`px-4 py-1 hover:font-semibold cursor-pointer font-Montserrat hover:bg-[#57A68F] hover:text-white border-b border-gray-300 rounded ${selectedRoomType === item ? 'bg-[#57A68F] text-white font-semibold' : ''
                                                                }`}
                                                        >
                                                            {item}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <div className="relative inline-block w-full col-span-1" ref={MealTypeRef}>
                                            {/* Input Field */}
                                            <div
                                                className="flex items-center bg-white rounded-xl px-3 py-2 border border-primary w-full"
                                                style={{ height: "52px" }}
                                                onClick={() => setIsMealTypeOpen(!isMealTypeOpen)}
                                            >
                                                <input
                                                    type="text"
                                                    placeholder='Meal Type'
                                                    value={selectedMealType}
                                                    className="w-full outline-none font-Montserrat font-medium text-[14px] text-gray-600"
                                                />
                                                <img src={`${BASE_URL_SVG}/assets/svgs/Accomodation.svg`}
                                                    alt="Accomodation" className="ml-2" />
                                            </div>

                                            {/* Dropdown Menu */}
                                            {isMealTypeOpen && (
                                                <div className="absolute z-10 mt-2 w-full bg-white rounded-md shadow-lg p-2">
                                                    {MealTypeClasses?.map((item) => (
                                                        <div
                                                            key={item}
                                                            onClick={() => handleMealTypeSelect(item)}
                                                            className={`px-4 py-1 hover:font-semibold cursor-pointer font-Montserrat hover:bg-[#57A68F] hover:text-white border-b border-gray-300 rounded ${selectedMealType === item ? 'bg-[#57A68F] text-white font-semibold' : ''
                                                                }`}
                                                        >
                                                            {item}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <div className="relative inline-block w-full col-span-1" ref={DistanceTypeRef}>
                                            {/* Input Field */}
                                            <div
                                                className="flex items-center bg-white rounded-xl px-3 py-2 border border-primary w-full"
                                                style={{ height: "52px" }}
                                                onClick={() => setIsDistanceTypeOpen(!isDistanceTypeOpen)}
                                            >
                                                <input
                                                    type="text"
                                                    placeholder='Distance'
                                                    value={selectedDistanceType}
                                                    className="w-full outline-none font-Montserrat font-medium text-[14px] text-gray-600"
                                                />
                                                <img src={`${BASE_URL_SVG}/assets/svgs/Accomodation.svg`}
                                                    alt="Accomodation" className="ml-2" />
                                            </div>

                                            {/* Dropdown Menu */}
                                            {isDistanceTypeOpen && (
                                                <div className="absolute z-10 mt-2 w-full bg-white rounded-md shadow-lg p-2">
                                                    {DistanceTypeClasses?.map((item) => (
                                                        <div
                                                            key={item}
                                                            onClick={() => handleDistanceTypeSelect(item)}
                                                            className={`px-4 py-1 hover:font-semibold cursor-pointer font-Montserrat hover:bg-[#57A68F] hover:text-white border-b border-gray-300 rounded ${selectedDistanceType === item ? 'bg-[#57A68F] text-white font-semibold' : ''
                                                                }`}
                                                        >
                                                            {item}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}

                                {/* Adults Type */}
                                <div className="relative inline-block w-full col-span-1" ref={dropdownRef}>
                                    {/* Input field */}
                                    <div
                                        className="flex items-center bg-white rounded-xl px-3 py-2 border border-primary w-full"
                                        style={{ height: "52px" }}
                                        onClick={() => setIsOpen(!isOpen)}
                                    >
                                        <input
                                            type="text"
                                            readOnly
                                            placeholder="Passengers"
                                            value={
                                                adults === 0 && children === 0 && infants === 0
                                                    ? ""
                                                    : `${String(adults).padStart(2, "0")} ADT - ${String(children).padStart(
                                                        2,
                                                        "0"
                                                    )} CHD - ${String(infants).padStart(2, "0")} INF`
                                            }
                                            className="w-full outline-none font-Montserrat font-medium 
                                            text-[14px] text-gray-600"
                                        />
                                        <img src={`${BASE_URL_SVG}/assets/svgs/Accomodation.svg`} className="ml-2" alt="Passengers" />
                                    </div>

                                    {/* Dropdown */}
                                    {isOpen && (
                                        <div className="absolute z-10 mt-2 w-full bg-white rounded-md shadow-lg p-4 space-y-4">
                                            {[
                                                { label: 'Adult(s)', count: adults, setCount: setAdults, min: 1 },
                                                { label: 'Child(s)', count: children, setCount: setChildren, min: 0 },
                                                { label: 'Infant(s)', count: infants, setCount: setInfants, min: 0 },
                                            ].map(({ label, count, setCount, min }) => (
                                                <div key={label} className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2 text-sm font-medium text-gray-700 font-Montserrat">
                                                        {label}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        {/* Decrease */}
                                                        <button
                                                            onClick={() => {
                                                                if (label === 'Adult(s)') {
                                                                    if (adults > 1) {
                                                                        const newAdult = adults - 1;
                                                                        setCount(newAdult);
                                                                    }
                                                                } else {
                                                                    if (count > min) setCount(count - 1);
                                                                }
                                                            }}
                                                        >
                                                            <img src={`${BASE_URL_SVG}/assets/svgs/PassInminus.svg`} className="w-5 h-5" alt="Passengers" />
                                                        </button>

                                                        {/* Count display */}
                                                        <span className="w-8 text-center font-semibold text-gray-700 font-Montserrat" style={{ textDecoration: "underline" }}>
                                                            {String(count).padStart(2, '0')}
                                                        </span>

                                                        {/* Increase */}
                                                        <button
                                                            onClick={() => {

                                                                if (label === 'Adult(s)') {
                                                                    setCount(adults + 1);
                                                                }

                                                                if (label === 'Child(s)') {
                                                                    setCount(children + 1);
                                                                }

                                                                if (label === 'Infant(s)') {
                                                                    setCount(infants + 1);
                                                                }
                                                            }}
                                                        >
                                                            <img src={`${BASE_URL_SVG}/assets/svgs/PassIncplus.svg`} className="w-5 h-5" alt="Passengers" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {activeTab === "hajj" && (
                                    <>
                                        <div className="relative inline-block w-full col-span-1" ref={HajjTypeRef}>
                                            {/* Input Field */}
                                            <div
                                                className="flex items-center bg-white rounded-xl px-3 py-2 border border-primary"
                                                style={{ height: "52px" }}
                                                onClick={() => setIsHajjTypeOpen(!isHajjTypeOpen)}
                                            >
                                                <input
                                                    type="text"
                                                    placeholder='Hajj Type'
                                                    value={selectedHajjType}
                                                    className="w-full outline-none font-Montserrat font-medium text-[14px] text-gray-600"
                                                />
                                                <img src={`${BASE_URL_SVG}/assets/svgs/Accomodation.svg`}
                                                    alt="Accomodation" className="ml-2" />
                                            </div>

                                            {/* Dropdown Menu */}
                                            {isHajjTypeOpen && (
                                                <div className="absolute z-10 mt-2 w-full bg-white rounded-md shadow-lg p-2">
                                                    {HajjTypeClasses?.map((item) => (
                                                        <div
                                                            key={item}
                                                            onClick={() => handleHajjTypeSelect(item)}
                                                            className={`px-4 py-1 hover:font-semibold cursor-pointer font-Montserrat hover:bg-[#57A68F] hover:text-white border-b border-gray-300 rounded ${selectedHajjType === item ? 'bg-[#57A68F] text-white font-semibold' : ''
                                                                }`}
                                                        >
                                                            {item}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}

                                <div
                                    className="flex items-center bg-white rounded-xl px-3 py-2 border border-primary w-full col-span-1"
                                    style={{ height: "52px" }}
                                >
                                    <input
                                        type="text"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        placeholder="Name*"
                                        onKeyPress={(e) => {
                                            // Prevent numbers and unwanted characters immediately
                                            if (/[0-9!@#$%^&*()_+={}[\]|\\:";'<>?,./]/.test(e.key)) {
                                                e.preventDefault();
                                            }
                                        }}
                                        onPaste={(e) => {
                                            // Handle paste events
                                            e.preventDefault();
                                            const paste = (e.clipboardData || window.clipboardData).getData('text');
                                            const nameValue = paste.replace(/[^a-zA-Z\s'-]/g, '');
                                            setFullName(nameValue);
                                        }}
                                        className="w-full outline-none font-Montserrat font-medium text-[14px] text-gray-600"
                                    />
                                    <img
                                        src={`${BASE_URL_SVG}/assets/svgs/Name SVG.svg`}
                                        alt="name"
                                        className="ml-2 w-5 h-5"
                                    />
                                </div>

                                {/* Phone */}
                                <div
                                    className="flex items-center bg-white rounded-xl px-3 py-2 border border-primary w-full col-span-1"
                                    style={{ height: "52px" }}
                                >
                                    <input
                                        type="text"
                                        value={phone}
                                        inputMode='numeric'
                                        onChange={(e) => setPhone(e.target.value)}
                                        onKeyPress={(e) => {
                                            // Prevent non-numeric characters (except backspace, delete, tab)
                                            if (!/[0-9]/.test(e.key) &&
                                                !['Backspace', 'Delete', 'Tab', 'Enter'].includes(e.key)) {
                                                e.preventDefault();
                                            }
                                        }}
                                        placeholder="Phone No*"
                                        className="w-full outline-none font-Montserrat font-medium text-[14px] text-gray-600"
                                    />
                                    <img
                                        src={`${BASE_URL_SVG}/assets/svgs/Phone Number SVG.svg`}
                                        alt="phone"
                                        className="ml-2 w-5 h-5"
                                    />
                                </div>

                                {/* Email */}
                                <div
                                    className="flex items-center bg-white rounded-xl px-3 py-2 border border-primary w-full col-span-1"
                                    style={{ height: "52px" }}
                                >
                                    <input
                                        type="email"
                                        value={email}
                                        inputMode='email'
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email Address*"
                                        className="w-full outline-none font-Montserrat font-medium text-[14px] text-gray-600"
                                    />
                                    <img
                                        src={`${BASE_URL_SVG}/assets/svgs/Email SVG.svg`}
                                        alt="email"
                                        className="ml-2 w-5 h-5"
                                    />
                                </div>

                                <div
                                    className="flex items-center bg-white rounded-xl px-3 py-2 border border-primary w-full col-span-1 md:col-span-2"
                                    style={{ height: "52px" }}
                                >
                                    <input
                                        type="text"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Type Your Message..."
                                        className="w-full outline-none font-Montserrat font-medium text-[14px] text-gray-600"
                                    />
                                </div>

                                {/* Captcha */}
                                <div
                                    className="flex items-center bg-white rounded-xl px-3 py-2 border border-primary w-full col-span-1"
                                    style={{ height: "52px" }}
                                >
                                    <input
                                        type="text"
                                        inputMode='numeric'
                                        value={captcha}
                                        onChange={(e) => setCaptcha(e.target.value)}
                                        placeholder="Answer"
                                        onKeyPress={(e) => {
                                            // Prevent non-numeric characters (except backspace, delete, tab)
                                            if (!/[0-9]/.test(e.key) &&
                                                !['Backspace', 'Delete', 'Tab', 'Enter'].includes(e.key)) {
                                                e.preventDefault();
                                            }
                                        }}
                                        className="w-full outline-none font-Montserrat font-medium text-[14px] text-gray-600"
                                    />
                                    <span
                                        className="text-secondary font-Montserrat"
                                    >
                                        {num1}+{num2}
                                    </span>
                                </div>

                                {/* Submit Button */}
                                <button
                                    disabled={isLoading}
                                    onClick={handleSubmit}
                                    type="submit"
                                    className="col-span-1 flex cursor-pointer justify-center items-center gap-2 text-white font-semibold font-Montserrat bg-secondary rounded-lg text-[22px] py-2 h-[52px]"
                                >
                                    {isLoading ? (
                                        <Loader />
                                    ) : (
                                        <>
                                            <span>Submit</span>
                                            <img src={`${BASE_URL_SVG}/assets/svgs/SubmitArrow.svg`} alt="submit" className="w-7 h-7" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Side Image */}
                    <div className="w-full max-w-[30%] hidden md:flex justify-center items-center">
                        <img
                            src={`${BASE_URL_SVG}/assets/svgs/FormImg.svg`}
                            alt="submit"
                            className="w-full h-full object-contain"
                        />
                    </div>

                </div>
            </div>
        </>
    )
}

export default CustomizePackageForm;
