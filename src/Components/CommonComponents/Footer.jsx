// import React from 'react'
// import { Link } from 'react-router-dom';

// export default function Footer() {
//     const logo = [
//         { icon: '/svg/yt.svg', label: 'Youtube' },
//         { icon: '/svg/fb.svg', label: 'Facebook' },
//         { icon: '/svg/ig.svg', label: 'Instagram' },
//     ];

//     return (
//         <footer
//             style={{
//                 backgroundImage: `url('/svg/footerbg.svg')`,
//                 backgroundSize: 'cover',
//                 backgroundPosition: 'center',
//             }}
//             className="text-white py-10 w-full"
//         >
//             <div className="w-full max-w-screen-xl mx-auto space-y-10">

//                 {/* Row 1: Logo + Social Icons */}
//                 <div className="flex flex-row sm:flex-row items-center justify-between px-3">
//                     <div className="font-Montserrat text-[26px]">Makkah Travel</div>
//                     <div className="flex gap-6">
//                         {logo.map((item, index) => (
//                             <div key={index} className="flex flex-col items-center gap-1">
//                                 <img src={item.icon} alt={item.label} className="w-11 sm:w-12" />
//                                 <span className="text-xs">{item.label}</span>
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Row 2: Bank Logos */}
//                 <div className="flex w-full">
//                     <img src="/svg/banks.svg" alt="Bank Logos" className="w-full" />
//                 </div>

//                 {/* Row 3: Quick Links + Our Terms */}
//                 <div className="w-full max-w-[90%] mx-auto flex flex-row md:flex-row justify-between gap-6 px-3">
//                     {/* Quick Links */}
//                     <div className="w-full md:w-1/2 lg:w-1/3">
//                         <h3 className="font-Montserrat text-primary text-2xl font-semibold mb-3">Quick Links</h3>
//                         <ul className="space-y-2 text-sm font-Montserrat">
//                             <li><Link to="/hajj-package" className="hover:underline">Hajj Package</Link></li>
//                             <li><Link to="/umrah-package" className="hover:underline">Umrah Package</Link></li>
//                             <li><Link to="/visas" className="hover:underline">Visas</Link></li>
//                             <li><Link to="/contact-us" className="hover:underline">Contact Us</Link></li>
//                             <li><Link to="/enquiry" className="hover:underline">Send Us Enquiry</Link></li>
//                         </ul>
//                     </div>

//                     {/* Our Terms */}
//                     <div className="w-full md:w-1/2 lg:w-1/3">
//                         <h3 className="font-Montserrat text-primary text-2xl font-semibold mb-3">Our Terms</h3>
//                         <ul className="space-y-2 text-sm font-Montserrat">
//                             <li><Link to="/terms" className="hover:underline">Terms & Conditions</Link></li>
//                             <li><Link to="/privacy" className="hover:underline">Privacy Policy</Link></li>
//                             <li><Link to="/cookies" className="hover:underline">Cookies Policy</Link></li>
//                             <li><Link to="/about-us" className="hover:underline">About Us</Link></li>
//                         </ul>
//                     </div>
//                 </div>


//                 {/* Divider */}
//                 <hr className="border-white" />

//                 <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 px-9">
//                     {/* Call Us */}
//                     <a href="tel:0208000000" className="flex items-start gap-4 hover:underline">
//                         <img src="/svg/Need Help Section (Call) SVG.svg" alt="Call" className="w-10 sm:w-12" />
//                         <div>
//                             <p className="text-primary font-semibold font-Montserrat">CALL US</p>
//                             <p className="font-Montserrat text-lg">(0208) - 000 - 000</p>
//                         </div>
//                     </a>

//                     {/* Write To Us */}
//                     <a href="mailto:info@makkahtravel.co.uk" className="flex items-start gap-4 hover:underline">
//                         <img src="/svg/Need Help Section (Call) SVG.svg" alt="Email" className="w-10 sm:w-12" />
//                         <div>
//                             <p className="text-primary font-semibold font-Montserrat">WRITE TO US</p>
//                             <p className="font-Montserrat text-lg">info@makkahtravel.co.uk</p>
//                         </div>
//                     </a>

//                     {/* Address */}
//                     <a
//                         href="https://www.google.com/maps?q=Suite+No.5,+The+Old+Dispensary,+30+Romford+Road,+Stratford+London,+England,+E15+4BZ,+United+Kingdom"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="hover:underline"
//                     >
//                         <p className="text-primary font-semibold font-Montserrat">ADDRESS</p>
//                         <p className="font-Montserrat text-sm leading-snug">
//                             Suite No.5, The Old Dispensary, 30 Romford Road,<br />
//                             Stratford London, England, E15 4BZ,<br />
//                             United Kingdom
//                         </p>
//                     </a>
//                 </div>

//                 {/* Divider */}
//                 <hr className="border-white" />

//                 {/* Row 5: Bottom Text */}
//                 <div className="space-y-4 text-sm mt-6 px-9">
//                     <p className="font-Montserrat font-semibold text-base">
//                         All rights reserved Flight Booking @ 2010 - 2025
//                     </p>
//                     <p className="font-Montserrat text-xs leading-relaxed">
//                         This website is operated by Travixum Ltd. (Company Number 13555073 and ATOL 12192) T/A registered in England and Wales.
//                         Many of the flights and flight-inclusive Umrah Packages on this website are financially protected by the ATOL scheme. But ATOL protection does not apply to all Umrah packages listed on this website.
//                         <br />
//                         Please ask us to confirm what protection may apply to your booking.
//                         If you do not receive an ATOL Certificate then the booking will not be ATOL protected.
//                         If you do receive an ATOL Certificate but all the parts of your Umrah package are not listed on it, those parts will not be ATOL protected.
//                         <br />
//                         If you have booked a flight only where the ticket is not issued immediately, your flight will be protected under our ATOL.
//                         Please see our booking conditions for more information, or visit
//                         <a href="https://www.atol.org/about-atol/atol-certificates/" target="_blank" rel="noopener noreferrer" className="underline text-primary"> ATOL Certificate Info</a>.
//                     </p>
//                 </div>
//             </div>
//         </footer>
//     );
// }
import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    const logo = [
        { icon: '/svg/yt.svg', label: 'Youtube' },
        { icon: '/svg/fb.svg', label: 'Facebook' },
        { icon: '/svg/ig.svg', label: 'Instagram' },
    ];

    return (
        <footer
            style={{
                backgroundImage: `url('/svg/footerbg.svg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            className="text-white py-10 w-full"
        >
            <div className="w-full max-w-screen-xl mx-auto space-y-10">

                {/* Top Section - Desktop/Laptop */}
                <div className="hidden lg:flex items-start justify-between px-3 gap-8">
                    {/* Logo */}
                    <div className="font-Montserrat text-[26px] flex-shrink-0">
                        Makkah Travel
                    </div>

                    {/* Quick Links */}
                    <div className="flex-1">
                        <h3 className="font-Montserrat text-primary text-xl font-semibold mb-3">Quick Links</h3>
                        <ul className="space-y-2 text-sm font-Montserrat">
                            <li><Link to="/hajj-package" className="hover:underline">Hajj Package</Link></li>
                            <li><Link to="/umrah-package" className="hover:underline">Umrah Package</Link></li>
                            <li><Link to="/visas" className="hover:underline">Visas</Link></li>
                            <li><Link to="/contact-us" className="hover:underline">Contact Us</Link></li>
                            <li><Link to="/enquiry" className="hover:underline">Send Us Enquiry</Link></li>
                        </ul>
                    </div>

                    {/* Terms */}
                    <div className="flex-1">
                        <h3 className="font-Montserrat text-primary text-xl font-semibold mb-3">Our Terms</h3>
                        <ul className="space-y-2 text-sm font-Montserrat">
                            <li><Link to="/terms" className="hover:underline">Terms & Conditions</Link></li>
                            <li><Link to="/privacy" className="hover:underline">Privacy Policy</Link></li>
                            <li><Link to="/cookies" className="hover:underline">Cookies Policy</Link></li>
                            <li><Link to="/about-us" className="hover:underline">About Us</Link></li>
                        </ul>
                    </div>

                    {/* Social Media + Banks */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="flex gap-6">
                            {logo.map((item, index) => (
                                <div key={index} className="flex flex-col items-center gap-1">
                                    <img src={item.icon} alt={item.label} className="w-11" />
                                    <span className="text-xs">{item.label}</span>
                                </div>
                            ))}
                        </div>
                        <div>
                            <img src="/svg/banks.svg" alt="Bank Logos" className="w-full max-w-[200px]" />
                        </div>
                    </div>
                </div>

                {/* Tablet/Mobile version (unchanged) */}
                <div className="lg:hidden space-y-10">
                    {/* Row 1: Logo + Social Icons */}
                    <div className="flex flex-row sm:flex-row items-center justify-between px-3">
                        <div className="font-Montserrat text-[26px]">Makkah Travel</div>
                        <div className="flex gap-6">
                            {logo.map((item, index) => (
                                <div key={index} className="flex flex-col items-center gap-1">
                                    <img src={item.icon} alt={item.label} className="w-11 sm:w-12" />
                                    <span className="text-xs">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Row 2: Bank Logos */}
                    <div className="flex w-full">
                        <img src="/svg/banks.svg" alt="Bank Logos" className="w-full" />
                    </div>

                    {/* Row 3: Quick Links + Our Terms */}
                    <div className="w-full max-w-[90%] mx-auto flex flex-row md:flex-row justify-between gap-6 px-3">
                        {/* Quick Links */}
                        <div className="w-full md:w-1/2">
                            <h3 className="font-Montserrat text-primary text-2xl font-semibold mb-3">Quick Links</h3>
                            <ul className="space-y-2 text-sm font-Montserrat">
                                <li><Link to="/hajj-package" className="hover:underline">Hajj Package</Link></li>
                                <li><Link to="/umrah-package" className="hover:underline">Umrah Package</Link></li>
                                <li><Link to="/visas" className="hover:underline">Visas</Link></li>
                                <li><Link to="/contact-us" className="hover:underline">Contact Us</Link></li>
                                <li><Link to="/enquiry" className="hover:underline">Send Us Enquiry</Link></li>
                            </ul>
                        </div>

                        {/* Our Terms */}
                        <div className="w-full md:w-1/2">
                            <h3 className="font-Montserrat text-primary text-2xl font-semibold mb-3">Our Terms</h3>
                            <ul className="space-y-2 text-sm font-Montserrat">
                                <li><Link to="/terms" className="hover:underline">Terms & Conditions</Link></li>
                                <li><Link to="/privacy" className="hover:underline">Privacy Policy</Link></li>
                                <li><Link to="/cookies" className="hover:underline">Cookies Policy</Link></li>
                                <li><Link to="/about-us" className="hover:underline">About Us</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <hr className="border-white" />

                {/* Contact Info */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 px-9">
                    {/* Call Us */}
                    <a href="tel:0208000000" className="flex items-start gap-4 hover:underline">
                        <img src="/svg/Need Help Section (Call) SVG.svg" alt="Call" className="w-10 sm:w-12" />
                        <div>
                            <p className="text-primary font-semibold font-Montserrat">CALL US</p>
                            <p className="font-Montserrat text-lg">(0208) - 000 - 000</p>
                        </div>
                    </a>

                    {/* Write To Us */}
                    <a href="mailto:info@makkahtravel.co.uk" className="flex items-start gap-4 hover:underline">
                        <img src="/svg/Need Help Section (Call) SVG.svg" alt="Email" className="w-10 sm:w-12" />
                        <div>
                            <p className="text-primary font-semibold font-Montserrat">WRITE TO US</p>
                            <p className="font-Montserrat text-lg">info@makkahtravel.co.uk</p>
                        </div>
                    </a>

                    {/* Address */}
                    <a
                        href="https://www.google.com/maps?q=Suite+No.5,+The+Old+Dispensary,+30+Romford+Road,+Stratford+London,+England,+E15+4BZ,+United+Kingdom"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                    >
                        <p className="text-primary font-semibold font-Montserrat">ADDRESS</p>
                        <p className="font-Montserrat text-sm leading-snug">
                            Suite No.5, The Old Dispensary, 30 Romford Road,<br />
                            Stratford London, England, E15 4BZ,<br />
                            United Kingdom
                        </p>
                    </a>
                </div>

                {/* Divider */}
                <hr className="border-white" />

                {/* Bottom Text */}
                <div className="space-y-4 text-sm mt-6 px-9">
                    <p className="font-Montserrat font-semibold text-base">
                        All rights reserved Flight Booking @ 2010 - 2025
                    </p>
                    <p className="font-Montserrat text-xs leading-relaxed">
                        This website is operated by Travixum Ltd. (Company Number 13555073 and ATOL 12192) T/A registered in England and Wales.
                        Many of the flights and flight-inclusive Umrah Packages on this website are financially protected by the ATOL scheme. But ATOL protection does not apply to all Umrah packages listed on this website.
                        <br />
                        Please ask us to confirm what protection may apply to your booking.
                        If you do not receive an ATOL Certificate then the booking will not be ATOL protected.
                        If you do receive an ATOL Certificate but all the parts of your Umrah package are not listed on it, those parts will not be ATOL protected.
                        <br />
                        If you have booked a flight only where the ticket is not issued immediately, your flight will be protected under our ATOL.
                        Please see our booking conditions for more information, or visit
                        <a href="https://www.atol.org/about-atol/atol-certificates/" target="_blank" rel="noopener noreferrer" className="underline text-primary"> ATOL Certificate Info</a>.
                    </p>
                </div>
            </div>
        </footer>
    );
}
