import React, { useRef, useState, useEffect } from 'react';
import toast from "react-hot-toast";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../CSS/datepicker-custom.css';
import { BASE_URL_SVG, endpoints } from '../../Helpers/apiEndpoints';
import axios from "axios";
import Loader from '../CommonComponents/Loader';

export default function CustomizeUmrahPopup() {
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
    const [passengers, setPassengers] = useState('');
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [captcha, setCaptcha] = useState('');
    const [message, setMessage] = useState('');
    const [departureAirport, setDepartureAirport] = useState('');
    const [showAirportList, setShowAirportList] = useState('');
    const [airportList, setAirportList] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const datePickerRef = useRef(null);
    const airportRef = useRef(null);

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
        if (!passengers) return toast.error("Please select passengers");
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
                date: departureDate,
                Departure_Airport: departureAirport,
                Makkah_Nights: makkahNights,
                Medinah_Nights: medinahNights,
                Accomodation_Type: accomodation,
                Room_Type: roomType,
                Meal_Type: mealType,
                Distance: distance,
                passenger: passengers,
                Message: message,
                page_url: window.location.href, // full URL
            },
        };

        try {
            setIsLoading(true);
            const res = await axios.post(endpoints.sendEmail, payload);
            if (res.status === 200) {
                toast.success("Form submitted successfully ✅");
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
                setPassengers("");
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
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [airportRef]);


    const inputClass =
        "w-full bg-white text-black placeholder-black outline-none placeholder:text-lg";

    const containerClass =
        "relative border gap-x-5 border-primary rounded-xl placeholder:font-Montserrat px-4 py-4 hover:border-secondary flex items-center focus-within:ring-1 focus-within:ring-primary-hover";

    const selectClass =
        "w-full bg-white text-black outline-none appearance-none cursor-pointer placeholder:font-Montserrat placeholder:text-lg";

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white px-4 py-6 rounded-xl shadow-md w-full font-Montserrat">
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                {/* Departure Airport */}
                <div className="relative" ref={airportRef}>
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
                    className={containerClass}
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
                <div className={containerClass}>
                    <input
                        type="number"
                        value={makkahNights}
                        onChange={(e) => setMakkahNights(e.target.value)}
                        placeholder="No.Nights Makkah"
                        className={inputClass}
                        min={1}
                    />
                </div>

                {/* No. Nights Madinah */}
                <div className={containerClass}>
                    <input
                        type="number"
                        value={medinahNights}
                        onChange={(e) => setMedinahNights(e.target.value)}
                        placeholder="No.Nights Madinah"
                        className={inputClass}
                        min={1}
                    />
                </div>

                {/* Accomodation */}
                <div className={containerClass}>
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
                <div className={containerClass}>
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
                <div className={containerClass}>
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
                <div className={containerClass}>
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
                <div className={containerClass}>
                    <select
                        value={passengers}
                        onChange={(e) => setPassengers(e.target.value)}
                        className={selectClass}
                    >
                        <option value="" disabled>Passengers</option>
                        <option value="1 Adult">1 Adult</option>
                        <option value="2 Adults">2 Adults</option>
                        <option value="3 Adults">3 Adults</option>
                    </select>
                </div>

                {/* Full Name */}
                <div className={containerClass}>
                    <input
                        type="text"
                        value={fullName}
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
                <div className={containerClass}>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Phone.No*"
                        className={inputClass}
                    />
                    <img
                        src={`${BASE_URL_SVG}/assets/svgs/Phone SVG.svg`}
                        alt="phone"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none"
                    />
                </div>

                {/* Email */}
                <div className={containerClass}>
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

                <div className={`${containerClass} col-span-2`}>
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
                <div className={containerClass}>
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
        </form>
    );
}