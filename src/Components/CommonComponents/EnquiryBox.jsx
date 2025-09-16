// import React, { useRef, useState } from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import '../../CSS/datepicker-custom.css'

// export default function EnquiryBox() {
//     const [departureDate, setDepartureDate] = useState(null);
//     const [guestCount, setGuestCount] = useState('');
//     const [number, setNumber] = useState('');
//     const [fullName, setFullName] = useState('');
//     const [email, setEmail] = useState('');
//     const [accomodation, setAccomodation] = useState('');
//     const [captcha, setCaptcha] = useState('');
//     const [isOpen, setIsOpen] = useState(false);
//     const datePickerRef = useRef(null);

//     return (
//         <div className="bg-white px-4 py-6 rounded-xl shadow-md w-full">
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//                 {/* Date Picker Field */}
//                 <div
//                     onClick={() => setIsOpen(true)}
//                     className="relative border border-primary rounded-md px-4 py-2 hover:border-secondary flex items-center focus-within:ring-1 focus-within:ring-primary-hover"
//                 >
//                     {/* <DatePicker
//                         ref={datePickerRef}
//                         selected={departureDate}
//                         onChange={(date) => {
//                             setDepartureDate(date);
//                             datePickerRef.current?.setOpen(false); // ← force close
//                         }}
//                         placeholderText="Departure Date"
//                         className="w-full bg-transparent outline-none text-sm"
//                         shouldCloseOnSelect={true}
//                     /> */}
//                     <DatePicker
//                         ref={datePickerRef}

//                         selected={departureDate}
//                         onChange={(date) => {
//                             setDepartureDate(date);
//                             setIsOpen(false);
//                         }}
//                         onClickOutside={() => setIsOpen(false)} // ✅ close when clicking outside
//                         open={isOpen}
//                         placeholderText="Departure Date"
//                         className="w-full bg-transparent outline-none text-sm"
//                         dateFormat="dd/MM/yyyy"

//                     />

//                     <img
//                         src="/svgs/Departure Date SVG.svg"
//                         alt="calendar"
//                         className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none"
//                         onClick={() => datePickerRef.current.setFocus()}
//                     />
//                 </div>

//                 {/* Guests */}
//                 <div className="relative border border-primary rounded-md px-4 py-2 hover:border-secondary flex items-center focus-within:ring-1 focus-within:ring-primary-hover">
//                     <input
//                         type="number"
//                         value={guestCount}
//                         min={1}
//                         onChange={(e) => setGuestCount(e.target.value)}
//                         placeholder="Guests"
//                         className="w-full bg-transparent outline-none text-sm"
//                     />
//                     <img
//                         src="/svgs/Guests SVG.svg"
//                         alt="guests"
//                         className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none"
//                     />
//                 </div>

//                 {/* Phone Number */}
//                 <div className="relative border border-primary rounded-md px-4 py-2 hover:border-secondary flex items-center focus-within:ring-1 focus-within:ring-primary-hover">
//                     <input
//                         type="tel"
//                         value={number}
//                         onChange={(e) => setNumber(e.target.value)}
//                         placeholder="Phone Number"
//                         className="w-full bg-transparent outline-none text-sm"
//                     />
//                     <img
//                         src="/svgs/Phone Number SVG.svg"
//                         alt="phone"
//                         className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none"
//                     />
//                 </div>

//                 {/* Full Name */}
//                 <div className="relative border border-primary rounded-md px-4 py-2 hover:border-secondary flex items-center focus-within:ring-1 focus-within:ring-primary-hover">
//                     <input
//                         type="text"
//                         value={fullName}
//                         onChange={(e) => setFullName(e.target.value)}
//                         placeholder="Full Name"
//                         className="w-full bg-transparent outline-none text-sm"
//                     />
//                     <img
//                         src="/svgs/Name SVG.svg"
//                         alt="name"
//                         className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none"
//                     />
//                 </div>
//                 <div className="relative border border-primary rounded-md px-4 py-2 hover:border-secondary flex items-center focus-within:ring-1 focus-within:ring-primary-hover">
//                     <input
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         placeholder="Email"
//                         className="w-full bg-transparent outline-none text-sm"
//                     />
//                     <img
//                         src="/svgs/Email SVG.svg"
//                         alt="name"
//                         className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none"
//                     />
//                 </div>
//                 <div className="relative border border-primary rounded-md px-4 py-2 hover:border-secondary flex items-center focus-within:ring-1 focus-within:ring-primary-hover">
//                     <input
//                         type='option'
//                         value={accomodation}
//                         onChange={(e) => setAccomodation(e.target.value)}
//                         placeholder="Accomodation"
//                         className="w-full bg-transparent outline-none text-sm"
//                     />
//                     <img
//                         src="/svgs/Email SVG.svg"
//                         alt="name"
//                         className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none"
//                     />
//                 </div>
//                 <div className="relative border border-primary rounded-md px-4 py-2 hover:border-secondary flex items-center focus-within:ring-1 focus-within:ring-primary-hover">
//                     <input
//                         type="number"
//                         value={captcha}
//                         onChange={(e) => setCaptcha(e.target.value)}
//                         placeholder="Captcha"
//                         className="w-full bg-transparent outline-none text-sm"
//                     />
//                     <span
//                         className="bg-white text-secondary pr-1 absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none"
//                     >
//                         5+8
//                     </span>
//                 </div>
//                 <button type='submit' className='flex justify-center cursor-pointer items-center gap-2 text-white font-semibold bg-secondary rounded-lg text-[22px]' >
//                     <span>Submit</span>
//                     <img src="/svgs/SubmitArrow.svg" alt="" className='w-7 h-7' />
//                 </button>
//             </div>
//         </div>
//     );
// }


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
    const [guestCount, setGuestCount] = useState('');
    const [number, setNumber] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [accommodation, setAccommodation] = useState('');
    const [captcha, setCaptcha] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const datePickerRef = useRef(null);

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isLoading) return; // Prevent double submit

        if (!departureDate) return toast.error("Please select a departure date");
        if (!guestCount || guestCount <= 0) return toast.error("Please enter number of guests");
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
                guestCount,
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
                setGuestCount('');
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
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong ❌ Please try again later.");
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
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none"
                        onClick={() => datePickerRef.current.setFocus()}
                    />
                </div>

                {/* Guests */}
                <div className="relative border border-primary rounded-md px-4 py-2 hover:border-secondary flex items-center focus-within:ring-1 focus-within:ring-primary-hover">
                    <input
                        type="number"
                        value={guestCount}
                        min={1}
                        onChange={(e) => setGuestCount(e.target.value)}
                        placeholder="Guests"
                        className="w-full bg-transparent outline-none text-sm"
                    />
                    <img src={`${BASE_URL_SVG}/assets/svgs/Guests SVG.svg`} alt="guests" className="absolute right-4 bg-white top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none" />
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
                    <img src={`${BASE_URL_SVG}/assets/svgs/Phone Number SVG.svg`} alt="phone" className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none" />
                </div>

                {/* Full Name */}
                <div className="relative border border-primary rounded-md px-4 py-2 hover:border-secondary flex items-center focus-within:ring-1 focus-within:ring-primary-hover">
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Full Name"
                        className="w-full bg-transparent outline-none text-sm"
                    />
                    <img src={`${BASE_URL_SVG}/assets/svgs/Name SVG.svg`} alt="name" className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none" />
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
                    <img src={`${BASE_URL_SVG}/assets/svgs/Email SVG.svg`} alt="email" className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none" />
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
                        onChange={(e) => setCaptcha(e.target.value)}
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
                            <img src={`${BASE_URL_SVG}/assets/svgs/SubmitArrow.svg`} alt="submit" className="w-7 h-7" />
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}
