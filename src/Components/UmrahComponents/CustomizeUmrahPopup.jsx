import React, { useRef, useState, useEffect } from 'react';
import { toast } from "sonner";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../CSS/datepicker-custom.css';
import { BASE_URL_SVG, endpoints } from '../../Helpers/apiEndpoints';
import { useNavigate } from "@navigation";
import axios from "axios";
import Loader from '../CommonComponents/Loader';

export default function CustomizeUmrahPopup() {
    const navigate = useNavigate();
    const [departureDate, setDepartureDate] = useState(null);
    const [makkahNights, setMakkahNights] = useState('');
    const [medinahNights, setMedinahNights] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [accomodation, setAccomodation] = useState('Select Accomodation');
    const [roomType, setRoomType] = useState('');
    const [mealType, setMealType] = useState('');
    const [distance, setDistance] = useState('');
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [captcha, setCaptcha] = useState('');
    const [message, setMessage] = useState('');
    const [departureAirport, setDepartureAirport] = useState('');
    const [showAirportList, setShowAirportList] = useState('');
    const [airportList, setAirportList] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const datePickerRef = useRef(null);
    const airportRef = useRef(null);
    const [guestOpen, setGuestIsOpen] = useState(false);
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [infants, setInfants] = useState(0);
    const dropdownRef = useRef(null);

    const totalGuests = adults + children + infants;


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setGuestIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        generateCaptcha();
    }, []);
    const generateCaptcha = () => {
        const n1 = Math.floor(Math.random() * 9) + 1; // 1–9
        const n2 = Math.floor(Math.random() * 9) + 1;
        setNum1(n1);
        setNum2(n2);
        setCaptcha("");
    };

    const [userIp, setUserIp] = useState("");
    // console.log("IP", userIp)

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

    const validateForm = () => {
        if (!fullName.trim()) return toast.error("Please enter your name");
        if (!email.trim()) return toast.error("Please enter your email");
        if (!phone.trim()) return toast.error("Please enter your phone number");
        if (!departureAirport.trim())
            return toast.error("Please select a departure airport");
        if (!departureDate) return toast.error("Please select a departure date");
        if (!makkahNights) return toast.error("Please enter nights in Makkah");
        if (!medinahNights) return toast.error("Please enter nights in Madinah");
        if (!accomodation) return toast.error("Please select accomodation");
        if (!roomType) return toast.error("Please select room type");
        if (!mealType) return toast.error("Please select meal type");
        if (!distance) return toast.error("Please select distance");
        if (parseInt(captcha, 10) !== num1 + num2) {
            toast.error("Captcha is incorrect ❌");
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
                subject: "Booking Umrah Package Inquiry",
                message,
                user_ip: userIp,
                date: departureDate,
                Departure_Airport: departureAirport,
                Makkah_Nights: makkahNights,
                Medinah_Nights: medinahNights,
                Accomodation_Type: accomodation,
                Room_Type: roomType,
                Meal_Type: mealType,
                Distance: distance,
                infants: infants,
                children: children,
                adults: adults,
                passenger: totalGuests,
                Message: message,
                page_url: window.location.href, // full URL
            },
        };

        try {
            setIsLoading(true);
            const res = await axios.post(endpoints.sendEmail, payload);
            if (res.status === 200) {
                toast.success("Form submitted successfully ✅");
                navigate("/thank-you")
                generateCaptcha();
                // reset form (optional)
                setFullName("");
                setEmail("");
                setPhone("");
                setDepartureAirport("");
                setDepartureDate(null);
                setMakkahNights("");
                setMedinahNights("");
                setAccomodation("");
                setRoomType("");
                setMealType("");
                setDistance("");
                setMessage("");
            }
        } catch (error) {
            toast.error("Something went wrong, please try again ❌", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const fetchAirports = async () => {
            try {
                const res = await axios.get(endpoints.getAirport);
                if (res.data?.status && Array.isArray(res.data.data)) {
                    setAirportList(res.data.data);
                }
            } catch (err) {
                console.error("Error fetching airports:", err);
            }
        };

        fetchAirports();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (airportRef.current && !airportRef.current.contains(event.target)) {
                setShowAirportList(false);
            }
        };

        // Only add event listener when dropdown is open
        if (showAirportList) {
            // Use a small delay to prevent immediate closure
            setTimeout(() => {
                document.addEventListener("mousedown", handleClickOutside);
            }, 100);
        }

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showAirportList]); // Changed dependency to showAirportList

    // FIXED: Airport selection handler
    const handleAirportSelect = (airportName) => {
        setDepartureAirport(airportName);
        setShowAirportList(false);
    };

    const inputClass =
        "w-full bg-white text-black placeholder-black outline-none placeholder:text-lg";

    const containerClass =
        "relative border gap-x-5 border-primary rounded-xl placeholder:font-Montserrat px-4 py-4 hover:border-secondary flex items-center focus-within:ring-1 focus-within:ring-primary-hover";

    const selectClass =
        "w-full bg-white text-black outline-none appearance-none cursor-pointer placeholder:font-Montserrat placeholder:text-lg";

    const nextStep = () => setCurrentStep((prev) => prev + 1);
    const prevStep = () => setCurrentStep((prev) => prev - 1);

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white px-4 py-6 rounded-xl shadow-md w-full font-Montserrat">
            <div className=" hidden gap-4 md:grid md:grid-cols-2 lg:grid-cols-4">

                {/* Departure Airport */}
                <div className="relative col-span-1" ref={airportRef}>
                    <div
                        className={`${containerClass}`}
                        onClick={() => setShowAirportList(true)}
                    >
                        <input
                            type="text"
                            value={departureAirport}
                            onChange={(e) => setDepartureAirport(e.target.value)}
                            placeholder="Departure Airport"
                            className={inputClass}
                        />
                        <img
                            src={`${BASE_URL_SVG}/assets/svgs/plane.svg`}
                            alt="plane"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none"
                        />
                    </div>

                    {/* Dropdown List */}
                    {showAirportList && (
                        <ul className="absolute z-10 w-full max-h-40 overflow-auto bg-white border rounded shadow-lg mt-1">
                            {airportList.filter((airport) =>
                                airport.name.toLowerCase().includes(departureAirport.toLowerCase())
                            ).length > 0 ? (
                                airportList
                                    .filter((airport) =>
                                        airport.name.toLowerCase().includes(departureAirport.toLowerCase())
                                    )
                                    .map((airport) => (
                                        <li
                                            key={airport.id}
                                            className="px-3 py-2 cursor-pointer hover:bg-gray-300"
                                            onClick={() => {
                                                setDepartureAirport(airport.name);
                                                setShowAirportList(false);
                                            }}
                                            onMouseDown={(e) => {
                                                // Use onMouseDown instead of onClick to prevent event conflicts
                                                e.preventDefault();
                                                e.stopPropagation();
                                                handleAirportSelect(airport.name);
                                            }}
                                        >
                                            {airport.name}
                                        </li>
                                    ))
                            ) : (
                                <li className="px-3 py-2 text-gray-500 italic">No airport available</li>
                            )}
                        </ul>
                    )}

                </div>


                {/* Departure Date */}
                <div
                    onClick={() => setIsOpen(true)}
                    className={`${containerClass} col-span-1`}
                >
                    <DatePicker
                        ref={datePickerRef}
                        selected={departureDate}
                        onChange={(date) => {
                            setDepartureDate(date);
                            setIsOpen(false);
                        }}
                        onClickOutside={() => setIsOpen(false)}
                        open={isOpen}
                        minDate={new Date()}
                        placeholderText="Departure Date"
                        className={inputClass}
                        dateFormat="dd/MM/yyyy"
                    />
                    <img
                        src={`${BASE_URL_SVG}/assets/svgs/Departure Date SVG.svg`}
                        alt="calendar"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none"
                    />
                </div>

                {/* No. Nights Makkah */}
                <div className={`${containerClass} col-span-1`}>
                    <input
                        type="number"
                        value={makkahNights}
                        onKeyPress={(e) => {
                            // Prevent non-numeric characters (except backspace, delete, tab)
                            if (!/[0-9]/.test(e.key) &&
                                !['Backspace', 'Delete', 'Tab', 'Enter'].includes(e.key)) {
                                e.preventDefault();
                            }
                        }}
                        onChange={(e) => setMakkahNights(e.target.value)}
                        placeholder="No.Nights Makkah"
                        className={inputClass}
                        min={1}
                    />
                </div>

                {/* No. Nights Madinah */}
                <div className={`${containerClass} col-span-1`}>
                    <input
                        type="number"
                        value={medinahNights}
                        onKeyPress={(e) => {
                            // Prevent non-numeric characters (except backspace, delete, tab)
                            if (!/[0-9]/.test(e.key) &&
                                !['Backspace', 'Delete', 'Tab', 'Enter'].includes(e.key)) {
                                e.preventDefault();
                            }
                        }}
                        onChange={(e) => setMedinahNights(e.target.value)}
                        placeholder="No.Nights Madinah"
                        className={inputClass}
                        min={1}
                    />
                </div>

                {/* Accomodation */}
                <div className={`${containerClass} col-span-1`}>
                    <select
                        value={accomodation}
                        onChange={(e) => setAccomodation(e.target.value)}
                        className={selectClass}
                    >
                        <option value="" disabled>Select Accomodation</option>
                        <option value="3 star" >3 Star</option>
                        <option value="4 star">4 Star</option>
                        <option value="5 star">5 Star</option>
                        <option value="any">Any</option>
                    </select>
                </div>

                {/* Room Type */}
                <div className={`${containerClass} col-span-1`}>
                    <select
                        value={roomType}
                        onChange={(e) => setRoomType(e.target.value)}
                        className={selectClass}
                    >
                        <option value="" disabled>Room Type</option>
                        <option value="Single">Single</option>
                        <option value="Double">Double</option>
                        <option value="Triple">Triple</option>
                    </select>
                </div>

                {/* Meal Type */}
                <div className={`${containerClass} col-span-1`}>
                    <select
                        value={mealType}
                        onChange={(e) => setMealType(e.target.value)}
                        className={selectClass}
                    >
                        <option value="" disabled>Meal Type</option>
                        <option value="Breakfast">Breakfast</option>
                        <option value="Half Board">Half Board</option>
                        <option value="Full Board">Full Board</option>
                    </select>
                </div>

                {/* Distance From Mosque */}
                <div className={`${containerClass} col-span-1`}>
                    <select
                        value={distance}
                        onChange={(e) => setDistance(e.target.value)}
                        className={selectClass}
                    >
                        <option value="" disabled>Distance From Mosque</option>
                        <option value="Near">Near</option>
                        <option value="Medium">Medium</option>
                        <option value="Far">Far</option>
                    </select>
                </div>

                {/* Passengers */}
                <div className={`${containerClass} col-span-1 relative`} ref={dropdownRef}>
                    {/* Input-like display */}
                    <div
                        onClick={() => {
                            setGuestIsOpen(!guestOpen);
                            setIsOpen(false); // close calendar if open
                        }}
                        className=" px-4 py-2  flex items-center cursor-pointer"
                    >
                        <input
                            type="text"
                            readOnly
                            placeholder="Passengers"
                            value={
                                totalGuests === 0
                                    ? ""
                                    : `${String(adults).padStart(2, "0")} ADT - ${String(children).padStart(
                                        2,
                                        "0"
                                    )} CHD - ${String(infants).padStart(2, "0")} INF`
                            }
                            className={`w-full outline-none bg-transparent ${selectClass}`}
                        />
                    </div>

                    {/* Dropdown */}
                    {guestOpen && (
                        <div className="absolute left-0 top-full mt-2 w-full bg-white rounded-md shadow-lg p-4 space-y-4 z-50">
                            {[
                                { label: "Adult(s)", count: adults, setCount: setAdults, min: 1 },
                                { label: "Child(s)", count: children, setCount: setChildren, min: 0 },
                                { label: "Infant(s)", count: infants, setCount: setInfants, min: 0 },
                            ].map(({ label, count, setCount, min }) => (
                                <div key={label} className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-700">{label}</span>
                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (count > min) setCount(count - 1);
                                            }}
                                        >
                                            <img
                                                src={`${BASE_URL_SVG}/assets/svgs/PassInminus.svg`}
                                                className="w-5 h-5"
                                                alt="minus"
                                            />
                                        </button>
                                        <span className="w-8 text-center font-semibold underline">
                                            {String(count).padStart(2, "0")}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setCount(count + 1);
                                            }}
                                        >
                                            <img
                                                src={`${BASE_URL_SVG}/assets/svgs/PassIncplus.svg`}
                                                className="w-5 h-5"
                                                alt="plus"
                                            />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Full Name */}
                <div className={`${containerClass} col-span-1`}>
                    <input
                        type="text"
                        value={fullName}
                        onKeyPress={(e) => {
                            // Prevent numbers and unwanted characters immediately
                            if (/[0-9!@#$%^&*()_+={}[\]|\\:";'<>?,./]/.test(e.key)) {
                                e.preventDefault();
                            }
                        }}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Name*"
                        className={inputClass}
                    />
                    <img
                        src={`${BASE_URL_SVG}/assets/svgs/Name SVG.svg`}
                        alt="name"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none"
                    />
                </div>

                {/* Phone */}
                <div className={`${containerClass} col-span-1`}>
                    <input
                        type="text"
                        value={phone}
                        onKeyPress={(e) => {
                            // Prevent non-numeric characters (except backspace, delete, tab)
                            if (!/[0-9]/.test(e.key) &&
                                !['Backspace', 'Delete', 'Tab', 'Enter'].includes(e.key)) {
                                e.preventDefault();
                            }
                        }}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Phone.No*"
                        className={inputClass}
                    />
                    <img
                        src={`${BASE_URL_SVG}/assets/svgs/Phone Number SVG.svg`}
                        alt="phone"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none"
                    />
                </div>

                {/* Email */}
                <div className={`${containerClass} col-span-1`}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address*"
                        className={inputClass}
                    />
                    <img
                        src={`${BASE_URL_SVG}/assets/svgs/Email SVG.svg`}
                        alt="email"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none"
                    />
                </div>

                <div className={`${containerClass} col-span-1 sm:col-span-2 lg:col-span-2`}>
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type Your Message..."
                        className={inputClass}
                    />
                    <img
                        src={`${BASE_URL_SVG}/assets/svgs/Email SVG.svg`}
                        alt="email"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none"
                    />
                </div>
                {/* Captcha */}
                <div className={`${containerClass} col-span-1`}>
                    <input
                        type="text"
                        value={captcha}
                        onChange={(e) => setCaptcha(e.target.value)}
                        placeholder="Answer"
                        className={inputClass}
                    />
                    <span
                        className="absolute underline right-3 top-1/2 transform -translate-y-1/2 text-secondary font-semibold"
                    >
                        {num1}+{num2}
                    </span>
                </div>

                {/* Submit Button */}
                <button
                    disabled={isLoading}
                    type="submit"
                    className="flex cursor-pointer justify-center items-center gap-2 text-white font-semibold bg-secondary rounded-lg text-[22px] py-2"
                >
                    {isLoading ? (
                        // Replace this with your Loader component
                        <Loader />
                    ) : (
                        <>
                            <span>Submit</span>
                            <img src={`${BASE_URL_SVG}/assets/svgs/SubmitArrow.svg`} alt="submit" className="w-7 h-7" />
                        </>
                    )}
                </button>
            </div>




            <div className="block md:hidden bg-white p-4 rounded-xl shadow-md font-Montserrat">

                {/* Step Progress */}
                <div className="flex mb-6 space-x-1">
                    {[1, 2, 3, 4, 5].map(step => (
                        <div
                            key={step}
                            className={`flex-1 h-2 rounded ${currentStep >= step ? 'bg-secondary' : 'bg-gray-300'}`}
                        />
                    ))}
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Step 1: Departure Info */}
                    {currentStep === 1 && (
                        <>
                            <div className="relative mb-4" ref={airportRef}>
                                <input
                                    type="text"
                                    placeholder="Departure Airport"
                                    value={departureAirport}
                                    onChange={(e) => { setDepartureAirport(e.target.value); setShowAirportList(true); }}
                                    className={`${inputClass} border border-gray-300 rounded-lg px-4 py-3`}
                                />
                                <img
                                    src={`${BASE_URL_SVG}/assets/svgs/plane.svg`}
                                    alt="plane"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none"
                                />

                                {/* Dropdown */}
                                {showAirportList && (
                                    <ul className="absolute z-20 w-full max-h-40 overflow-auto bg-white border border-gray-300 rounded shadow-lg mt-1">
                                        {airportList.filter(a => a.name.toLowerCase().includes(departureAirport.toLowerCase())).length > 0 ? (
                                            airportList
                                                .filter(a => a.name.toLowerCase().includes(departureAirport.toLowerCase()))
                                                .map(a => (
                                                    <li
                                                        key={a.id}
                                                        className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                                                        onClick={() => { setDepartureAirport(a.name); setShowAirportList(false); }}
                                                    >
                                                        {a.name}
                                                    </li>
                                                ))
                                        ) : (
                                            <li className="px-3 py-2 text-gray-500 italic">No airports found</li>
                                        )}
                                    </ul>
                                )}
                            </div>

                            <div className="relative mb-4">
                                <DatePicker
                                    selected={departureDate}
                                    onChange={(date) => setDepartureDate(date)}
                                    placeholderText="Departure Date"
                                    minDate={new Date()}
                                    className={`${inputClass} border border-gray-300 rounded-lg px-4 py-3 w-full`}
                                    dateFormat="dd/MM/yyyy"
                                />
                                <img
                                    src={`${BASE_URL_SVG}/assets/svgs/Departure Date SVG.svg`}
                                    alt="calendar"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none"
                                />
                            </div>
                        </>
                    )}

                    {/* Step 2: Nights */}
                    {currentStep === 2 && (
                        <>
                            <input
                                type="number"
                                placeholder="No.Nights Makkah"
                                value={makkahNights}
                                inputMode='numeric'
                                onChange={(e) => setMakkahNights(e.target.value)}
                                className={`${inputClass} border border-gray-300 rounded-lg px-4 py-3 mb-4 w-full`}
                                min={1}
                            />
                            <input
                                type="number"
                                placeholder="No.Nights Madinah"
                                value={medinahNights}
                                inputMode='numeric'
                                onChange={(e) => setMedinahNights(e.target.value)}
                                className={`${inputClass} border border-gray-300 rounded-lg px-4 py-3 mb-4 w-full`}
                                min={1}
                            />
                        </>
                    )}

                    {/* Step 3: Accommodation & Room */}
                    {currentStep === 3 && (
                        <>
                            <select value={accomodation} onChange={(e) => setAccomodation(e.target.value)} className={`${selectClass} border border-gray-300 rounded-lg px-4 py-3 mb-4 w-full`}>
                                <option value="">Select Accomodation</option>
                                <option value="3 star">3 Star</option>
                                <option value="4 star">4 Star</option>
                                <option value="5 star">5 Star</option>
                                <option value="any">Any</option>
                            </select>
                            <select value={roomType} onChange={(e) => setRoomType(e.target.value)} className={`${selectClass} border border-gray-300 rounded-lg px-4 py-3 mb-4 w-full`}>
                                <option value="">Room Type</option>
                                <option value="Single">Single</option>
                                <option value="Double">Double</option>
                                <option value="Triple">Triple</option>
                            </select>
                            <select value={mealType} onChange={(e) => setMealType(e.target.value)} className={`${selectClass} border border-gray-300 rounded-lg px-4 py-3 mb-4 w-full`}>
                                <option value="">Meal Type</option>
                                <option value="Breakfast">Breakfast</option>
                                <option value="Half Board">Half Board</option>
                                <option value="Full Board">Full Board</option>
                            </select>
                            <select value={distance} onChange={(e) => setDistance(e.target.value)} className={`${selectClass} border border-gray-300 rounded-lg px-4 py-3 mb-4 w-full`}>
                                <option value="">Distance From Mosque</option>
                                <option value="Near">Near</option>
                                <option value="Medium">Medium</option>
                                <option value="Far">Far</option>
                            </select>
                            <div className={`${selectClass} border border-gray-300 rounded-lg px-4 py-3 mb-4 w-full relative`} ref={dropdownRef}>
                                {/* Input-like display */}
                                <div
                                    onClick={() => {
                                        setGuestIsOpen(!guestOpen);
                                        setIsOpen(false); // close calendar if open
                                    }}
                                    className=" px-2 py-2 flex items-center cursor-pointer"
                                >
                                    <input
                                        type="text"
                                        readOnly
                                        placeholder="Passengers"
                                        value={
                                            totalGuests === 0
                                                ? ""
                                                : `${String(adults).padStart(2, "0")} ADT - ${String(children).padStart(
                                                    2,
                                                    "0"
                                                )} CHD - ${String(infants).padStart(2, "0")} INF`
                                        }
                                        className={`w-full outline-none bg-transparent ${selectClass}`}
                                    />
                                </div>

                                {/* Dropdown */}
                                {guestOpen && (
                                    <div className="absolute left-0 top-full mt-2 w-full bg-white rounded-md shadow-lg p-4 space-y-4 z-50">
                                        {[
                                            { label: "Adult(s)", count: adults, setCount: setAdults, min: 1 },
                                            { label: "Child(s)", count: children, setCount: setChildren, min: 0 },
                                            { label: "Infant(s)", count: infants, setCount: setInfants, min: 0 },
                                        ].map(({ label, count, setCount, min }) => (
                                            <div key={label} className="flex items-center justify-between">
                                                <span className="text-sm font-medium text-gray-700">{label}</span>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            if (count > min) setCount(count - 1);
                                                        }}
                                                    >
                                                        <img
                                                            src={`${BASE_URL_SVG}/assets/svgs/PassInminus.svg`}
                                                            className="w-5 h-5"
                                                            alt="minus"
                                                        />
                                                    </button>
                                                    <span className="w-8 text-center font-semibold underline">
                                                        {String(count).padStart(2, "0")}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setCount(count + 1);
                                                        }}
                                                    >
                                                        <img
                                                            src={`${BASE_URL_SVG}/assets/svgs/PassIncplus.svg`}
                                                            className="w-5 h-5"
                                                            alt="plus"
                                                        />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </>
                    )}

                    {/* Step 4: Contact */}
                    {currentStep === 4 && (
                        <>
                            <input type="text" placeholder="Name*" value={fullName} onChange={(e) => setFullName(e.target.value)} className={`${inputClass} border border-gray-300 rounded-lg px-4 py-3 mb-4 w-full`} />
                            <input type="text" placeholder="Phone.No*" value={phone} onChange={(e) => setPhone(e.target.value)} inputMode='numeric' className={`${inputClass} border border-gray-300 rounded-lg px-4 py-3 mb-4 w-full`} />
                            <input type="email" placeholder="Email Address*" value={email} onChange={(e) => setEmail(e.target.value)} inputMode='email' className={`${inputClass} border border-gray-300 rounded-lg px-4 py-3 mb-4 w-full`} />
                        </>
                    )}

                    {/* Step 5: Message + Captcha */}
                    {currentStep === 5 && (
                        <>
                            <input type="text" placeholder="Type Your Message..." value={message} onChange={(e) => setMessage(e.target.value)} className={`${inputClass} border border-gray-300 rounded-lg px-4 py-3 mb-4 w-full`} />
                            <div className="relative mb-4">
                                <input type="text" placeholder="Captcha Answer" value={captcha} onChange={(e) => setCaptcha(e.target.value)} inputMode='numeric' className={`${inputClass} border border-gray-300 rounded-lg px-4 py-3 w-full`} />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary font-semibold">{num1}+{num2}</span>
                            </div>
                        </>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-6">
                        {currentStep > 1 && <button type="button" onClick={prevStep} className="px-5 py-2 bg-gray-200 rounded-lg">Previous</button>}
                        {currentStep < 5 ? (
                            <button type="button" onClick={nextStep} className="px-5 py-2 bg-secondary text-white rounded-lg">Next</button>
                        ) : (
                            <button type="submit" disabled={isLoading} className="px-5 py-2 bg-secondary text-white rounded-lg flex items-center justify-center gap-2">
                                {isLoading ? <Loader /> : "Submit"}
                            </button>
                        )}
                    </div>
                </form>
            </div>

        </form>
    );
}