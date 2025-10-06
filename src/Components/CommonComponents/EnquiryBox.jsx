import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../CSS/datepicker-custom.css';
import { BASE_URL_SVG, endpoints } from '../../Helpers/apiEndpoints'
import Loader from './Loader';
import toast from 'react-hot-toast';

export default function EnquiryBox() {
    const navigate = useNavigate()
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [departureDate, setDepartureDate] = useState(null);
    const [isGuestOpen, setIsGuestOpen] = useState(false);
    const [number, setNumber] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [accommodation, setAccommodation] = useState('');
    const [captcha, setCaptcha] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const datePickerRef = useRef(null);
    const [adults, setAdults] = useState(0);
    const [passengers, setPassengers] = useState(0);
    const [children, setChildren] = useState(0);
    const [infants, setInfants] = useState(0);

    useEffect(() => {
        setPassengers(adults + children + infants);
    }, [adults, children, infants]);


    const [userIp, setUserIp] = useState("");
    // console.log("IP", userIp)

    const generateCaptcha = () => {
        setNum1(Math.floor(Math.random() * 9) + 1); // 1-10
        setNum2(Math.floor(Math.random() * 9) + 1);
        setCaptcha("");
    };

    useEffect(() => {
        generateCaptcha();
    }, []);

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

    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsGuestOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);




    const handleSubmit = async (e) => {
        const totalGuests = adults + children + infants;
        e.preventDefault();

        if (isLoading) return; // Prevent double submit

        if (!departureDate) return toast.error("Please select a departure date");
        if (totalGuests <= 0) return toast.error("Please enter number of guests");
        if (!number) return toast.error("Please enter your phone number");
        if (!fullName.trim()) return toast.error("Please enter your full name");
        if (!email.trim()) return toast.error("Please enter your email address");
        if (!accommodation) return toast.error("Please select accommodation");
        if (parseInt(captcha) !== num1 + num2) {
            toast.error("Captcha incorrect!");
            generateCaptcha(); // regenerate if failed
            return;
        }

        const payload = {
            name: fullName,
            email,
            phone: number,
            formType: "enquiry",
            contact_detail: {
                departureDate: departureDate ? departureDate.toISOString().split("T")[0] : null,
                passengers: passengers,
                adults: adults,
                children: children,
                infants: infants,
                guestAccommodation: accommodation,
                user_ip: userIp,
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
                navigate('/thank-you')
                toast.success("Enquiry submitted successfully ✅");

                // Reset form
                setDepartureDate(null);
                setAdults("")
                setChildren("")
                setInfants("")
                setNumber('');
                setFullName('');
                setEmail('');
                setAccommodation('');
                setCaptcha('');
                generateCaptcha();
            } else if (data.status === 1 && data.message.includes("no email sent")) {
                toast("Your enquiry was saved, but the email could not be sent ⚠️", { icon: "⚠️" });
            } else {
                toast.error("Something went wrong ❌ Please try again later.");
                setCaptcha('');
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong ❌ Please try again later.");
            setCaptcha('');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white px-4 py-6 rounded-xl shadow-md w-full font-Montserrat"
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

                {/* Date Picker */}
                <div
                    onClick={() => setIsOpen(true)}
                    className="relative border z-40 border-primary rounded-md px-4 py-2 hover:border-secondary flex items-center focus-within:ring-1 focus-within:ring-primary-hover"
                >
                    <DatePicker
                        ref={datePickerRef}
                        selected={departureDate}
                        onChange={(date) => {
                            setDepartureDate(date);
                        }}
                        onClickOutside={() => setIsOpen(false)}
                        open={isOpen}
                        placeholderText="Departure Date"
                        className="w-full bg-transparent outline-none text-sm"
                        dateFormat="dd/MM/yyyy"
                        minDate={new Date()}
                        shouldCloseOnSelect={true}
                        popperClassName='z-[999]'
                    />
                    <img
                        src={`${BASE_URL_SVG}/assets/svgs/Departure Date SVG.svg`}
                        alt="calendar"
                        loading="lazy"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none"
                        onClick={() => datePickerRef.current.setFocus()}
                    />
                </div>

                <div className="relative" ref={dropdownRef}>
                    <div
                        className="relative border border-primary rounded-md px-4 py-2 hover:border-secondary flex items-center focus-within:ring-1 focus-within:ring-primary-hover h-[52px]"
                        onClick={() => {
                            setIsGuestOpen(!isGuestOpen);
                            setIsOpen(false); // close calendar if open
                        }}
                    >
                        <input
                            type="text"
                            readOnly
                            placeholder="Guests"
                            value={
                                adults === 0 && children === 0 && infants === 0
                                    ? ""
                                    : `${String(adults).padStart(2, "0")} ADT - ${String(children).padStart(2, "0")} CHD - ${String(infants).padStart(2, "0")} INF`
                            }
                            className="w-full outline-none font-Montserrat font-medium text-[14px] text-gray-600"
                        />
                        <img
                            src={`${BASE_URL_SVG}assets/svgs/Guests SVG.svg`}
                            alt="guests"
                            loading="lazy"
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5"
                        />
                    </div>

                    {isGuestOpen && (
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
                                                loading="lazy"
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
                                                loading="lazy"
                                            />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>


                {/* Phone */}
                <div className="relative border border-primary rounded-md px-4 py-2 hover:border-secondary flex items-center focus-within:ring-1 focus-within:ring-primary-hover">
                    <input
                        type="tel"
                        value={number}
                        onChange={(e) => {
                            const onlyNums = e.target.value.replace(/\D/g, ""); // remove non-digits
                            setNumber(onlyNums);
                        }}
                        placeholder="Phone Number"
                        className="w-full bg-transparent outline-none text-sm"
                    />
                    <img src={`${BASE_URL_SVG}/assets/svgs/Phone Number SVG.svg`} alt="phone" className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none" loading="lazy" />
                </div>

                {/* Full Name */}
                <div className="relative border border-primary rounded-md px-4 py-2 hover:border-secondary flex items-center focus-within:ring-1 focus-within:ring-primary-hover">
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => {
                            // allow only letters (a–z, A–Z) and spaces
                            const value = e.target.value.replace(/[^A-Za-z\s]/g, "");
                            setFullName(value);
                        }}
                        placeholder="Full Name"
                        className="w-full bg-transparent outline-none text-sm"
                    />
                    <img src={`${BASE_URL_SVG}/assets/svgs/Name SVG.svg`} alt="name" className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none" loading="lazy" />
                </div>

                {/* Email */}
                <div className="relative border border-primary rounded-md px-4 py-2 hover:border-secondary flex items-center focus-within:ring-1 focus-within:ring-primary-hover">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full bg-transparent outline-none text-sm"
                    />
                    <img src={`${BASE_URL_SVG}/assets/svgs/Email SVG.svg`} alt="email" className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none" loading="lazy" />
                </div>

                {/* Accommodation (select instead of invalid input) */}
                <div className="relative border border-primary rounded-md px-4 py-2 hover:border-secondary flex items-center focus-within:ring-1 focus-within:ring-primary-hover">
                    <select
                        value={accommodation}
                        onChange={(e) => setAccommodation(e.target.value)}
                        className="w-full bg-transparent outline-none text-sm"
                    >
                        <option disabled value="" className='text-secondary'>Accommodation</option>
                        <option value="3-Star">3 star</option>
                        <option value="4-Star">4 Star</option>
                        <option value="5-Star">5 Star</option>
                        <option value="Any">Any</option>
                    </select>
                </div>

                {/* Captcha */}
                <div className="relative border border-primary rounded-md px-4 py-2 hover:border-secondary flex items-center focus-within:ring-1 focus-within:ring-primary-hover">
                    <input
                        type="number"
                        value={captcha}
                        onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "");
                            setCaptcha(value);
                        }}
                        placeholder="Captcha"
                        className="w-full bg-transparent outline-none text-sm"
                    />
                    <span className="bg-white text-secondary pr-1 absolute right-3 top-1/2 transform -translate-y-1/2 underline selection:disabled:">
                        {num1}+{num2}
                    </span>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="cursor-pointer flex justify-center items-center gap-2 text-white font-semibold bg-secondary rounded-lg text-[22px] px-4 py-2"
                >
                    {isLoading ? (
                        // Replace this with your Loader component
                        <Loader />
                    ) : (
                        <>
                            <span>Submit</span>
                            <img src={`${BASE_URL_SVG}/assets/svgs/SubmitArrow.svg`} alt="submit" className="w-7 h-7" loading="lazy" />
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}
