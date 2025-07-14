import React from 'react'
import { Link } from 'react-router-dom';

export default function Footer() {
    const logo = [
        {
            icon: '/svg/yt.svg',
            label: 'Youtube'
        },
        {
            icon: '/svg/fb.svg',
            label: 'Facebook'
        },
        {
            icon: '/svg/ig.svg',
            label: 'Instagram'
        },

    ]
    return (
        <div
            style={{
                backgroundImage: `url('/svg/footerbg.svg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            className="text-white py-10 w-full"
        >
            <div className=' max-w-[75%] mx-auto w-full'>
                <div className='logo flex justify-between w-full'>
                    <div className='font-Montserrat text-3xl max-w-[20%]'>Makkah Travel</div>
                    <div className='w-full max-w-[12%]'>
                        <h3 className='font-Montserrat text-primary text-2xl font-semibold'>Quick Links</h3>
                        <ul className='font-Montserrat pt-1'>
                            <li>
                                <Link to="/hajj-package" className="hover:underline">
                                    Hajj Package
                                </Link>
                            </li>
                            <li>
                                <Link to="/umrah-package" className="hover:underline">
                                    Umrah Package
                                </Link>
                            </li>
                            <li>
                                <Link to="/visas" className="hover:underline">
                                    Visas
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact-us" className="hover:underline">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/enquiry" className="hover:underline">
                                    Send Us Enquiry
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className='w-full max-w-[12%]'>
                        <h3 className='font-Montserrat text-primary text-2xl font-semibold'>Our Terms</h3>
                        <ul className='font-Montserrat pt-1'>
                            <li>
                                <Link to="/hajj-package" className="hover:underline">
                                    Terms & Conditions
                                </Link>
                            </li>
                            <li>
                                <Link to="/umrah-package" className="hover:underline">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/visas" className="hover:underline">
                                    Cookies Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact-us" className="hover:underline">
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className='flex flex-col gap-y-7 w-full max-w-[25%]'>
                        <div className='flex justify-end gap-x-10 items-center'>
                            {logo.map((item, index) => (
                                <div key={index} className="flex items-center flex-col justify-between gap-2">
                                    <img src={item.icon} alt={item.label} className="w-16" />
                                    <span>{item.label}</span>
                                </div>
                            ))}
                        </div>
                        <div>
                            <img src="/svg/banks.svg" alt="" className='' />
                        </div>
                    </div>
                </div>

                <div className="contact mt-16">
                    <hr />

                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center my-5 gap-y-5 lg:gap-y-0 lg:gap-x-10">

                        {/* Call Us */}
                        <a href="tel:0208000000" className="flex items-start gap-x-4 hover:underline">
                            <img src="/svg/Need Help Section (Call) SVG.svg" alt="Call Icon" className="w-12" />
                            <div>
                                <p className="text-primary font-semibold font-Montserrat">CALL US</p>
                                <p className="font-Montserrat text-xl">(0208) - 000 - 000</p>
                            </div>
                        </a>

                        {/* Divider */}
                        <div className="hidden lg:block w-px h-16 bg-white" />

                        {/* Write to Us */}
                        <a href="mailto:info@makkahtravel.co.uk" className="flex items-start gap-x-4 hover:underline">
                            <img src="/svg/Need Help Section (Call) SVG.svg" alt="Email Icon" className="w-12" />
                            <div>
                                <p className="text-primary font-semibold font-Montserrat">WRITE TO US</p>
                                <p className="font-Montserrat text-xl">info@makkahtravel.co.uk</p>
                            </div>
                        </a>


                        {/* Divider */}
                        <div className="hidden lg:block w-px h-16 bg-white" />

                        {/* Address */}
                        <a
                            href="https://www.google.com/maps?q=Suite+No.5,+The+Old+Dispensary,+30+Romford+Road,+Stratford+London,+England,+E15+4BZ,+United+Kingdom"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                        >
                            <p className="text-primary font-semibold font-Montserrat">ADDRESS</p>
                            <p className="font-Montserrat">
                                Suite No.5, The Old Dispensary, 30 Romford Road<br />
                                Stratford London, England, E15 4BZ,<br />
                                United Kingdom
                            </p>
                        </a>
                    </div>

                    <hr />
                </div>


                <div className='rights mt-10'>
                    <div className='font-Montserrat font-semibold text-2xl'>All rights reserved Flight Booking @ 2010 - 2025</div>
                    <div className='font-Montserrat py-2'>This website is operated by Travixum Ltd. (Company Number 13555073 and ATOL 12192) T/A registered in England and Wales. Many of the flights and flight-inclusive Umrah Packages on this website are financially protected by the ATOL scheme. But ATOL protection does not apply to all Umrah packages listed on this website. Please ask us to confirm what protection may apply to your booking. If you do not receive an ATOL Certificate then the booking will not be ATOL protected. If you do receive an ATOL Certificate but all the parts of your Umrah package are not listed on it, those parts will not be ATOL protected. If you have booked a flight only where the ticket is not issued immediately, your flight will be protected under our ATOL. Please see our booking conditions for information, or for more information about financial protection and the ATOL Certificate go to https://www.atol.org/about-atol/atol-certificates/</div>
                </div>
            </div>
        </div>


    )
}
