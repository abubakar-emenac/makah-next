import React, { useRef, useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../CSS/datepicker-custom.css';

export default function CustomizeUmrahPopup() {
    const [departureDate, setDepartureDate] = useState(null);
    const [departureAirport, setDepartureAirport] = useState('');
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
    const [captcha, setCaptcha] = useState('');
    const [message, setMessage] = useState('');
    const [showAirportList, setShowAirportList] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const datePickerRef = useRef(null);
    const airportRef = useRef(null);

    const airportList = [
        "JFK - John F. Kennedy International",
        "LAX - Los Angeles International",
        "DXB - Dubai International",
        "LHR - London Heathrow",
        "CDG - Paris Charles de Gaulle",
        // Add more airports here
    ];

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
        "w-full bg-white text-black placeholder-black outline-none text-sm";

    const containerClass =
        "relative border border-primary rounded-md px-4 py-2 hover:border-secondary flex items-center focus-within:ring-1 focus-within:ring-primary-hover";

    const selectClass =
        "w-full bg-white text-black outline-none text-sm appearance-none cursor-pointer";

    return (
        <div className="bg-white px-4 py-6 rounded-xl shadow-md w-full font-Montserrat">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

                {/* Departure Airport */}
                <div className="relative" ref={airportRef}>
                    <div
                        className={containerClass}
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
                            src="/svgs/plane.svg"
                            alt="plane"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none"
                        />
                    </div>

                    {/* Dropdown List */}
                    {showAirportList && (
                        <ul className="absolute z-10 w-full max-h-40 overflow-auto bg-white border rounded shadow-lg mt-1">
                            {airportList
                                .filter((airport) =>
                                    airport.toLowerCase().includes(departureAirport.toLowerCase())
                                )
                                .map((airport, idx) => (
                                    <li
                                        key={idx}
                                        className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                                        onClick={() => {
                                            setDepartureAirport(airport);
                                            setShowAirportList(false);
                                        }}
                                    >
                                        {airport}
                                    </li>
                                ))}
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
                        src="/svgs/Departure Date SVG.svg"
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
                        src="/svgs/Name SVG.svg"
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
                        src="/svgs/Phone SVG.svg"
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
                        src="/svgs/Email SVG.svg"
                        alt="email"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none"
                    />
                </div>

                <div className={containerClass}>
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type Your Message..."
                        className={inputClass}
                    />
                    <img
                        src="/svgs/Email SVG.svg"
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
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary font-semibold"
                    >
                        1+6
                    </span>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="flex justify-center items-center gap-2 text-white font-semibold bg-secondary rounded-lg text-[22px] py-2"
                >
                    <span>Submit</span>
                    <img src="/svgs/SubmitArrow.svg" alt="" className="w-7 h-7" />
                </button>
            </div>
        </div>
    );
}