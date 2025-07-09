import React, { useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function EnquiryBox() {
    const [departureDate, setDepartureDate] = useState(null);
    const [guestCount, setGuestCount] = useState('');
    const [number, setNumber] = useState('');
    const [fullName, setFullName] = useState('');
    const datePickerRef = useRef(null);

    return (
        <div className="bg-white px-4 py-6 rounded-xl shadow-md w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {/* Date Picker Field */}
                <div
                    onClick={() => datePickerRef.current.setFocus()}
                    className="relative border border-primary rounded-md px-4 py-2 flex items-center focus-within:ring-1 focus-within:ring-primary-hover"
                >
                    <DatePicker
                        ref={datePickerRef}
                        selected={departureDate}
                        onChange={(date) => setDepartureDate(date)}
                        placeholderText="Departure Date"
                        className="w-full bg-transparent outline-none text-sm"
                    />
                    <img
                        src="/svg/Departure Date SVG.svg"
                        alt="calendar"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none"
                    />
                </div>

                {/* Guests */}
                <div className="relative border border-primary rounded-md px-4 py-2 flex items-center focus-within:ring-1 focus-within:ring-primary-hover">
                    <input
                        type="number"
                        value={guestCount}
                        onChange={(e) => setGuestCount(e.target.value)}
                        placeholder="Guests"
                        className="w-full bg-transparent outline-none text-sm"
                    />
                    <img
                        src="/svg/Guests SVG.svg"
                        alt="guests"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none"
                    />
                </div>

                {/* Phone Number */}
                <div className="relative border border-primary rounded-md px-4 py-2 flex items-center focus-within:ring-1 focus-within:ring-primary-hover">
                    <input
                        type="tel"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        placeholder="Phone Number"
                        className="w-full bg-transparent outline-none text-sm"
                    />
                    <img
                        src="/svg/Phone Number SVG.svg"
                        alt="phone"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none"
                    />
                </div>

                {/* Full Name */}
                <div className="relative border border-primary rounded-md px-4 py-2 flex items-center focus-within:ring-1 focus-within:ring-primary-hover">
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Full Name"
                        className="w-full bg-transparent outline-none text-sm"
                    />
                    <img
                        src="/svg/Name SVG.svg"
                        alt="name"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none"
                    />
                </div>
            </div>
        </div>
    );
}
