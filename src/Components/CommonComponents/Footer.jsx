// import React from 'react'
// import { Link } from 'react-router-dom';

// export default function Footer() {
//     const logo = [
//         { icon: '/svgs/yt.svg', label: 'Youtube' },
//         { icon: '/svgs/fb.svg', label: 'Facebook' },
//         { icon: '/svgs/ig.svg', label: 'Instagram' },
//     ];

//     return (
//         <footer
//             style={{
//                 backgroundImage: `url('/svgs/footerbg.svg')`,
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
//                     <img src="/svgs/banks.svg" alt="Bank Logos" className="w-full" />
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
//                         <img src="/svgs/Need Help Section (Call) SVG.svg" alt="Call" className="w-10 sm:w-12" />
//                         <div>
//                             <p className="text-primary font-semibold font-Montserrat">CALL US</p>
//                             <p className="font-Montserrat text-lg">(0208) - 000 - 000</p>
//                         </div>
//                     </a>

//                     {/* Write To Us */}
//                     <a href="mailto:info@makkahtravel.co.uk" className="flex items-start gap-4 hover:underline">
//                         <img src="/svgs/Need Help Section (Call) SVG.svg" alt="Email" className="w-10 sm:w-12" />
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
import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalData } from "../../Helpers/useGlobalData";
import { BASE_URL_SVG, WEB_URL } from '../../Helpers/apiEndpoints';
import { label } from 'framer-motion/client';
export default function Footer() {
    const { globalData } = useGlobalData();

    const currentYear = new Date().getFullYear();
    const [hovered, setHovered] = useState(false);
    const settings = globalData?.result?.settings || [];
    const logoSetting = settings.find(
        (item) => item.ref_name === "Website Logo"
    );
    const logo = logoSetting?.contents?.footer_logo;

    const hoveredicons = [
        { label: "facebook", icon: "/svg/fb1.svg" },
        { label: "Instagram", icon: "/svg/ig1.svg" }
    ];

    // Preload hover images (hook at the top)
    useEffect(() => {
        hoveredicons.forEach(h => {
            const img = new Image();
            img.src = h.icon;
        });
    }, []); 

    const footerItems = useMemo(() => {
        if (!globalData?.result?.footer_setting) return null;

        const footerSetting = globalData.result.footer_setting;
        const footerLogo = globalData.result.settings;
        const contents = footerSetting.contents;
        const socialMedia = footerSetting.social_media_icons;



        // Extract social media icons data
        const socialIcons = [];

        if (socialMedia.enable_social_media_icons === "1") {
            // Loop through available social media icons (assuming up to 3 for now)
            for (let i = 1; i <= 3; i++) {
                const iconKey = `social_media_icons_${i}`;
                const labelKey = `social_media_icons_input_${i}`;
                const altKey = `social_media_icons_alt_input_${i}`;
                const linkKey = `social_media_icons_link_input_${i}`;

                if (socialMedia[iconKey]) {
                    socialIcons.push({
                        icon: socialMedia[iconKey],
                        label: socialMedia[labelKey] || `Social ${i}`,
                        alt: socialMedia[altKey] || socialMedia[labelKey] || `Social Media ${i}`,
                        link: socialMedia[linkKey] || "#"
                    });
                }
            }
        }
        const updatedContents = {
            ...contents,
            footer_copyright_content: contents.footer_copyright_content
                ? contents.footer_copyright_content.replace('{YEAR}', currentYear)
                : `All rights reserved Emenac Travel © 2010 - ${currentYear}`
        };

        return {
            logo: footerSetting.logo,
            socialIcons,
            contents: updatedContents
        };
    }, [globalData, currentYear]);

    if (!footerItems) {
        return null; // or a loader/skeleton
    }



    return (
        <footer
            style={{
                backgroundImage: `url(${BASE_URL_SVG}/assets/svgs/footerbg.svg)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            className="text-white py-10 w-full"
        >
            <div className="w-full max-w-screen-xl mx-auto space-y-10">
                {/* Top Section - Desktop/Laptop */}
                <div className="hidden lg:grid grid-cols-4 items-start px-3 gap-8">
                    {/* Logo */}
                    <Link to={'/'} className="font-Montserrat text-[26px] w-28 sm:w-30 md:w-38 lg:w-48 h-10">
                        {footerItems.logo ? (
                            <img
                                src={`${WEB_URL}/${logo}`}
                                alt="Makkah Travel"
                                className="object-contain w-auto"
                            />
                        ) : (
                            "Makkah Travel"
                        )}
                    </Link>

                    {/* Quick Links */}
                    <div>
                        <span className="font-Montserrat text-primary text-xl font-semibold mb-3">
                            {footerItems.contents.link_1_heading || "Quick Links"}
                        </span>
                        <div
                            className="text-sm font-Montserrat"
                            dangerouslySetInnerHTML={{ __html: footerItems.contents.link_1_content }}
                        />
                    </div>

                    {/* Terms */}
                    <div>
                        <span className="font-Montserrat text-primary text-xl font-semibold mb-3">
                            {footerItems.contents.link_2_heading || "Our Terms"}
                        </span>
                        <div
                            className="text-sm font-Montserrat"
                            dangerouslySetInnerHTML={{ __html: footerItems.contents.link_2_content }}
                        />
                    </div>

                    {/* Social Media + Banks */}
                    <div className="flex flex-col items-center gap-4">
                        {/* <div className="flex gap-6">
                            {footerItems.socialIcons.map((item, index) => (
                                <div key={index} className="flex flex-col items-center gap-1">
                                    <a
                                        key={index}
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex flex-col items-center gap-1 hover:opacity-80 transition"
                                    >
                                        <img
                                            src={`${BASE_URL_SVG}/${item.icon}`}
                                            alt={item.alt}
                                            className="w-11 sm:w-12 object-contain"
                                        />
                                    </a>
                                    <span className="text-xs">{item.label}</span>
                                </div>
                            ))}
                        </div> */}
                        <div className="flex gap-6">
                            {footerItems.socialIcons.map((item, index) => {


                                // Find matching hover icon by label
                                const hoverMatch = hoveredicons.find(h => h.label === item.label);

                                return (
                                    <div key={index} className="flex flex-col items-center gap-1">
                                        <a
                                            href={item.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex flex-col items-center gap-1 transition"
                                            onMouseEnter={() => setHovered(true)}
                                            onMouseLeave={() => setHovered(false)}
                                        >
                                            <img
                                                src={hovered && hoverMatch ? `${hoverMatch.icon}` : `${BASE_URL_SVG}${item.icon}`}
                                                alt={item.alt}
                                                className="w-11 sm:w-12 object-contain transition-all duration-300"
                                            />
                                        </a>
                                        <span className="text-xs">{item.label}</span>
                                    </div>
                                );
                            })}
                        </div>

                        <div>
                            <img
                                src={`${BASE_URL_SVG}/assets/svgs/banks.svg`}
                                alt="Bank Logos"
                                className="w-full max-w-[200px]"
                            />
                        </div>
                    </div>
                </div>


                {/* Tablet/Mobile version */}
                <div className="lg:hidden space-y-10">
                    {/* Row 1: Logo + Social Icons */}
                    <div className="flex flex-row sm:flex-row items-center justify-between px-3">
                        <Link to={'/'} className="font-Montserrat text-[26px] w-32 sm:w-30 md:w-38 lg:w-48 h-10">
                            {footerItems.logo ? (
                                <img
                                    src={`${WEB_URL}/${logo}`}
                                    alt="Makkah Travel"
                                    className="object-contain w-auto"
                                />
                            ) : (
                                "Makkah Travel"
                            )}
                        </Link>
                        <div className="flex gap-6">
                            {footerItems.socialIcons.map((item, index) => (
                                <div key={index} className="flex flex-col items-center gap-1">
                                    <a
                                        key={index}
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex flex-col items-center gap-1 hover:opacity-80 transition"
                                    >
                                        <img src={`${BASE_URL_SVG}/${item.icon}`} alt={item.alt} className="w-11 sm:w-12" />
                                    </a>
                                    <span className="text-xs">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Row 2: Bank Logos */}
                    <div className="flex w-full">
                        <img src={`${BASE_URL_SVG}/assets/svgs/banks.svg`} alt="Bank Logos" className="w-full" />
                    </div>

                    {/* Row 3: Quick Links + Our Terms */}
                    <div className="w-full max-w-[90%] mx-auto flex flex-row md:flex-row justify-between gap-6 px-3">
                        {/* Quick Links */}
                        <div className="w-full md:w-1/2">
                            <span className="font-Montserrat text-primary text-2xl font-semibold mb-3">
                                {footerItems.contents.link_1_heading || "Quick Links"}
                            </span>
                            <div
                                className="text-sm font-Montserrat"
                                dangerouslySetInnerHTML={{ __html: footerItems.contents.link_1_content }}
                            />
                        </div>

                        {/* Our Terms */}
                        <div className="w-full md:w-1/2">
                            <span className="font-Montserrat text-primary text-2xl font-semibold mb-3">
                                {footerItems.contents.link_2_heading || "Our Terms"}
                            </span>
                            <div
                                className="text-sm font-Montserrat"
                                dangerouslySetInnerHTML={{ __html: footerItems.contents.link_2_content }}
                            />
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <hr className="border-white" />

                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-9">
                    {/* Call Us */}
                    <a
                        href={`tel:${footerItems.contents.footer_phone || '0207-043-4343'}`}
                        className="flex items-start gap-4 hover:underline"
                    >
                        <img
                            src={`${BASE_URL_SVG}/assets/svgs/Need Help Section (Call) SVG.svg`}
                            alt="Call"
                            className="w-10 sm:w-12"
                        />
                        <div>
                            <p className="text-primary font-semibold font-Montserrat">CALL US</p>
                            <p className="font-Montserrat text-lg">
                                {footerItems.contents.footer_phone || '(0208) - 000 - 000'}
                            </p>
                        </div>
                    </a>

                    {/* Write To Us */}
                    <a
                        href={`mailto:${footerItems.contents.footer_email || 'info@makkahtravel.co.uk'}`}
                        className="flex items-start gap-4 hover:underline"
                    >
                        <img
                            src={`${BASE_URL_SVG}/assets/svgs/emailf.svg`}
                            alt="Email"
                            className="w-10 sm:w-12"
                        />
                        <div>
                            <p className="text-primary font-semibold font-Montserrat">WRITE TO US</p>
                            <p className="font-Montserrat text-lg">
                                {footerItems.contents.footer_email || 'info@makkahtravel.co.uk'}
                            </p>
                        </div>
                    </a>

                    {/* Address */}
                    <a
                        href={`https://www.google.com/maps?q=${encodeURIComponent(
                            footerItems.contents.footer_address ||
                            'Suite No.5, The Old Dispensary, 30 Romford Road, Stratford London, England, E15 4BZ, United Kingdom'
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-4 hover:underline"
                    >
                        <img
                            src={`${BASE_URL_SVG}/assets/svgs/pinf.svg`}
                            alt="Pin"
                            className="w-10 sm:w-12"
                        />
                        <div>
                            <p className="text-primary font-semibold font-Montserrat">ADDRESS</p>
                            <p className="font-Montserrat text-sm leading-snug">
                                {footerItems.contents.footer_address ||
                                    `Suite No.5, The Old Dispensary, 30 Romford Road,
                Stratford London, England, E15 4BZ,
                United Kingdom`}
                            </p>
                        </div>
                    </a>
                </div>


                {/* Divider */}
                <hr className="border-white" />

                {/* Bottom Text */}
                <div className="space-y-4 text-sm mt-6 px-9">
                    <a target='_blank' href="//www.dmca.com/Protection/Status.aspx?ID=3d8e8532-bb1c-4b76-b59f-b8fab6f914a8" title="DMCA.com Protection Status" className="dmca-badge"> <img src ="https://images.dmca.com/Badges/dmca_protected_sml_120n.png?ID=3d8e8532-bb1c-4b76-b59f-b8fab6f914a8"  alt="DMCA.com Protection Status" /></a>  
                    <p className="font-Montserrat font-semibold text-base mt-6 ">
                        {footerItems.contents.footer_copyright_content || 'All rights reserved Flight Booking @ 2010 - 2025'}
                    </p>
                    <p className="font-Montserrat text-xs leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: footerItems.contents.footer_below_copyright_text }}
                    >
                    </p>
                </div>
            </div>
        </footer>
    );
}