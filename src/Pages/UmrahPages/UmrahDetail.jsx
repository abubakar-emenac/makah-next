// import React from 'react'
// import Navbar from '../../Components/CommonComponents/NavBar'
// import ImageGallery from '../CommonPages/ImageGallery'
// import ImageSlider from '../../Components/CommonComponents/ImageSlider'
// import Testmonials from '../../Components/CommonComponents/Testmonials'
// import MonthlyUmrahPackages from '../../Components/UmrahComponents/monthlyUmrahPackages'
// import NeedHelp from '../../Components/CommonComponents/NeedHelp'

// export default function UmrahDetail() {
//     const button = [
//         {
//             title: 'Call Now!',
//             info: '(0208) - 000 - 000',
//             icon: '/svg/callNow.svg'
//         },
//         {
//             title: 'Send Email!',
//             info: 'info@makkahtravel.co.uk',
//             icon: '/svg/sendMail.svg'
//         },
//         {
//             title: 'WhatsApp Chat!',
//             info: '(0208) - 000 - 000',
//             icon: '/svg/whatsappMsg.svg'
//         }
//     ]
//     const icon = [
//         {
//             icon: '/svg/flight.svg',
//             label: 'Flight'
//         },
//         {
//             icon: '/svg/hotel.svg',
//             label: 'Hotel'
//         },
//         {
//             icon: '/svg/visa.svg',
//             label: 'Visa'
//         },
//         {
//             icon: '/svg/transport.svg',
//             label: 'Transport'
//         },
//         {
//             icon: '/svg/dinner.svg',
//             label: 'Half-Board'
//         },
//     ]
//     return (
//         <div>
//         <div className='flex flex-col w-full max-w-[75%] mx-auto'>
//             <Navbar />
//             <div className='flex flex-col w-full'>
//                 <div className='flex justify-between items-center'>
//                         <div className="w-full md:w-3/4 lg:w-[55%]">
//                         <img src="/svg/filledStar.svg" alt="" className='w-8' />
//                         <h1 className='font-Montserrat font-bold text-2xl'>4 Star 10 Nights December Umrah Package 4 Star 10 Nights December Umrah Package</h1>
//                     </div>
//                     <div className="hidden lg:block w-px h-16 bg-secondary" />
//                     <div className="text-center flex items-end gap-1">
//                         <span className="text-[12px] md:text-[14px] mb-[6px]">from</span>
//                         <span className="text-[32px] md:text-[40px] text-primary font-bold font-abril">£1200</span>
//                         <span className="text-[30px] font-bold text-primary font-abril">.00</span>
//                         <span className="text-[12px] md:text-[14px] mb-[6px]">/pp</span>
//                     </div>

//                 </div>


//                 <div className='flex w-full mt-5 justify-between'>
//                     {/* slider */}
//                     <div className='w-full max-w-2/3'>
//                         <ImageGallery />
//                     </div>


//                     <div className='flex flex-col w-full max-w-[30%]'>
//                         <div className='flex flex-col justify-between gap-y-6 items-end w-full'>
//                             {[
//                                 {
//                                     nights: '05',
//                                     title: 'Makkah Hotel Nights',
//                                     subtitle: 'Makarem Ajeyad Hotel',
//                                 },
//                                 {
//                                     nights: '05',
//                                     title: 'Madinah Hotel Nights',
//                                     subtitle: 'Makarem Ajeyad Hotel',
//                                 },
//                             ].map((item, idx) => (
//                                 <div
//                                     key={idx}
//                                     className='flex items-center justify-end w-full gap-x-10'
//                                 >
//                                     {/* Number */}
//                                     <div className='w-12 text-center'>
//                                         <span className='text-secondary font-Montserrat text-3xl font-semibold'>
//                                             {item.nights}
//                                         </span>
//                                     </div>

//                                     {/* Divider */}
//                                     <div className='hidden lg:block w-[2px] h-12 bg-secondary' />

//                                     {/* Text */}
//                                     <div className='flex flex-col text-end font-Montserrat overflow-hidden'>
//                                         <h3 className='text-2xl whitespace-nowrap overflow-hidden text-ellipsis'>
//                                             {item.title}
//                                         </h3>
//                                         <span className='text-secondary whitespace-nowrap overflow-hidden text-ellipsis'>
//                                             {item.subtitle}
//                                         </span>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>

//                             <div className='flex flex-col mt-7 gap-y-4 w-full items-end'>
//                                 {button.map((btn, i) => (
//                                     <div key={i} className='flex items-center gap-2'>
//                                         <button
//                                             className='flex flex-col cursor-pointer text-end w-[330px] px-8 py-1 bg-primary text-white font-abril text-lg leading-tight'
//                                         >
//                                             {btn.title}
//                                             <br />
//                                             {btn.info}
//                                         </button>
//                                         <div className='bg-white p-2 rounded-full shadow-sm flex items-center justify-center'>
//                                             <img src={btn.icon} alt={btn.title} className='w-10 h-10 object-contain' />
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>



//                             <div className='flex w-full justify-end items-center mt-9 gap-x-8'>
//                                 <img src="/svg/atol.svg" alt="" />
//                                 <div className='hidden lg:block w-[2px] h-12 bg-black' />
//                                 <img src="/svg/iata.svg" alt="" />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className='flex flex-col w-full'>
//                     <h2 className='text-3xl font-Montserrat font-semibold'>PACKAGE DETAILS </h2>
//                     <div className="w-full flex justify-between items-center mt-6">
//                         {icon.map((item, i) => (
//                             <React.Fragment key={i}>
//                                 {/* Icon Box */}
//                                 <div className="flex flex-col items-center gap-2 font-Montserrat">
//                                     <div className="w-14 h-14 flex items-center justify-center rounded">
//                                         <img src={item.icon} alt={item.label} className="w-12 h-12 object-contain items-end" />
//                                     </div>
//                                     <span className="text-xs text-center text-[#222]">{item.label}</span>
//                                 </div>

//                                 {/* Vertical Divider - only between items */}
//                                 {i !== icon.length - 1 && (
//                                     <div className="h-10 w-px bg-secondary mx-4 mb-2" />
//                                 )}
//                             </React.Fragment>
//                         ))}
//                     </div>





//                 </div>
//                 <div className='my-12 flex flex-col'>
//                     <h2 className='text-3xl font-Montserrat font-semibold'>HOTEL DETAILS: </h2>
//                     <div className='w-full flex justify-end my-3'>
//                         <div className='flex flex-col my-12 w-full max-w-[42%] mx-3'>
//                             <div className="flex justify-end">
//                                 <img src="/svg/filledStar.svg" alt="" className='w-7' />
//                             </div>
//                             <h2 className='text-3xl font-abril text-end'>Hotel Makeram Ajyad</h2>
//                             <span className='text-secondary font-Montserrat text-end'>Hotel in Makkah</span>
//                             <p className='font-Montserrat py-1.5 text-end'>
//                                 This hotel half Km is away from the Masjid E Haram and offer the 24/7 room services with the delicious food on-site restaurant. The rooms are well-decorated and furnished with luxury facilities such as minibar and separate washroom. They offer the traditional dishes of Arab like Shawarma and grilled chicken to the customers. There is no complimentary breakfast and no shuttle services are available at this 4-star hotel.
//                             </p>
//                         </div>
//                         <div>
//                             <ImageSlider />
//                         </div>
//                     </div>
//                     <div className='w-full flex'>
//                         <div>
//                             <ImageSlider />
//                         </div>
//                         <div className='flex flex-col my-12 w-full max-w-[42%] mx-3'>

//                             <div className="flex">
//                                 <img src="/svg/filledStar.svg" alt="" className='w-7' />
//                             </div>
//                             <h2 className='text-3xl font-abril text-start'>Hotel Makeram Ajyad</h2>
//                             <span className='text-secondary font-Montserrat text-start'>Hotel in Makkah</span>
//                             <p className='font-Montserrat py-1.5 text-start'>
//                                 This hotel half Km is away from the Masjid E Haram and offer the 24/7 room services with the delicious food on-site restaurant. The rooms are well-decorated and furnished with luxury facilities such as minibar and separate washroom. They offer the traditional dishes of Arab like Shawarma and grilled chicken to the customers. There is no complimentary breakfast and no shuttle services are available at this 4-star hotel.
//                             </p>
//                         </div>

//                     </div>

//                 </div>

//             </div>
//             <Testmonials />
//             <div className='w-full max-w-[75%] mx-auto my-5'>
//                 <MonthlyUmrahPackages title='More Relevant Packages' subtitle='Makkah Travel is here to help you visit religious places and make Umrah trips that connect with your soul. We are experts at creating.' button='off' carperrow={3} />
//             </div>

//             <NeedHelp />

//         </div>
//     )
// }

import React from 'react'
import Navbar from '../../Components/CommonComponents/NavBar'
import ImageGallery from '../CommonPages/ImageGallery'
import ImageSlider from '../../Components/CommonComponents/ImageSlider'
import Testmonials from '../../Components/CommonComponents/Testmonials'
import MonthlyUmrahPackages from '../../Components/UmrahComponents/monthlyUmrahPackages'
import NeedHelp from '../../Components/CommonComponents/NeedHelp'
import CustomizeUmrahPopup from '../../Components/UmrahComponents/CustomizeUmrahPopup'

export default function UmrahDetail() {
    const button = [
        {
            title: 'Call Now!',
            info: '(0208) - 000 - 000',
            icon: '/svg/callNow.svg'
        },
        {
            title: 'Send Email!',
            info: 'info@makkahtravel.co.uk',
            icon: '/svg/sendMail.svg'
        },
        {
            title: 'WhatsApp Chat!',
            info: '(0208) - 000 - 000',
            icon: '/svg/whatsappMsg.svg'
        }
    ]
    const icon = [
        { icon: '/svg/flight.svg', label: 'Flight' },
        { icon: '/svg/hotel.svg', label: 'Hotel' },
        { icon: '/svg/visa.svg', label: 'Visa' },
        { icon: '/svg/transport.svg', label: 'Transport' },
        { icon: '/svg/dinner.svg', label: 'Half-Board' },
    ]
    const includes = [
        "Umrah Visa", "3 Nights in Makkah 3 Star Hotel", "All Packages Are Based On Quad Sharing", "Direct Flights Can Be Arranged On Special Request", "Return Flights", "2 Nights in Madinah 3 Star Hotel", "Ground Transfers Can Be Included On Extra Cost"
    ]

    return (
        <div>
            <div className="flex flex-col w-full max-w-[95%] md:max-w-[85%] lg:max-w-[80%] mx-auto px-4">
                <Navbar />

                {/* Package Title + Price */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-4">
                    <div className="w-full md:w-3/4 lg:w-[55%]">
                        <img src="/svg/filledStar.svg" alt="" className="w-6 sm:w-7 lg:w-8" />
                        <h1 className="font-Montserrat font-bold text-xl sm:text-2xl lg:text-4xl leading-tight">
                            4 Star 10 Nights December Umrah Package 4 Star 10 Nights December Umrah Package
                        </h1>
                    </div>
                    <div className="hidden lg:block w-px h-16 bg-secondary" />
                    <div className="text-center flex items-end gap-1">
                        <span className="text-xs md:text-sm mb-[6px]">from</span>
                        <span className="text-2xl md:text-4xl text-primary font-bold font-abril">£1200</span>
                        <span className="text-xl md:text-3xl font-bold text-primary font-abril">.00</span>
                        <span className="text-xs md:text-sm mb-[6px]">/pp</span>
                    </div>
                </div>

                {/* Image Gallery + Hotel Nights */}
                <div className="flex flex-col lg:flex-row w-full mt-5 gap-6">
                    <div className="w-full lg:w-2/3">
                        <ImageGallery />
                    </div>

                    <div className="flex flex-col w-full lg:w-1/3">
                        {/* Nights Info */}
                        <div className="flex flex-col justify-between gap-y-6 items-end w-full">
                            {[
                                { nights: '05', title: 'Makkah Hotel Nights', subtitle: 'Makarem Ajeyad Hotel' },
                                { nights: '05', title: 'Madinah Hotel Nights', subtitle: 'Makarem Ajeyad Hotel' },
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center justify-end w-full gap-x-6">
                                    <div className="w-12 text-center">
                                        <span className="text-secondary font-Montserrat text-2xl md:text-3xl font-semibold">
                                            {item.nights}
                                        </span>
                                    </div>
                                    <div className="hidden lg:block w-[2px] h-12 bg-secondary" />
                                    <div className="flex flex-col text-end font-Montserrat overflow-hidden">
                                        <h3 className="text-lg md:text-2xl whitespace-nowrap overflow-hidden text-ellipsis">
                                            {item.title}
                                        </h3>
                                        <span className="text-secondary text-sm md:text-base whitespace-nowrap overflow-hidden text-ellipsis">
                                            {item.subtitle}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col mt-7 gap-y-4 w-full items-end">
                            {button.map((btn, i) => (
                                <div key={i} className="flex flex-col sm:flex-row items-center gap-2 justify-end">
                                    <button className="flex flex-col cursor-pointer text-end w-full sm:w-[330px] px-4 sm:px-8 py-2 bg-primary text-white font-abril text-base sm:text-lg leading-tight">
                                        {btn.title}
                                        <br />
                                        {btn.info}
                                    </button>
                                    <div className="bg-white p-2 rounded-full shadow-sm flex items-center justify-center">
                                        <img src={btn.icon} alt={btn.title} className="w-8 sm:w-10 h-8 sm:h-10 object-contain" />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Certifications */}
                        <div className="flex flex-wrap justify-center lg:justify-end items-center mt-9 gap-x-8 gap-y-4">
                            <img src="/svg/atol.svg" alt="" className="w-20" />
                            <div className="hidden lg:block w-[2px] h-12 bg-black" />
                            <img src="/svg/iata.svg" alt="" className="w-20" />
                        </div>
                    </div>
                </div>

                {/* Package Details */}
                <div className="flex flex-col w-full mt-8">
                    <h2 className="text-2xl md:text-3xl font-Montserrat font-semibold">PACKAGE DETAILS</h2>
                    <div className="w-full flex flex-wrap justify-center md:justify-between items-center gap-4 mt-6">
                        {icon.map((item, i) => (
                            <React.Fragment key={i}>
                                <div className="flex flex-col items-center gap-2 font-Montserrat">
                                    <div className="w-14 h-14 flex items-center justify-center rounded">
                                        <img src={item.icon} alt={item.label} className="w-10 sm:w-12 h-10 sm:h-12 object-contain" />
                                    </div>
                                    <span className="text-xs sm:text-sm text-center text-[#222]">{item.label}</span>
                                </div>
                                {i !== icon.length - 1 && <div className="hidden md:block h-10 w-px bg-secondary mx-4 mb-2" />}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
                <div className="w-full flex flex-col lg:flex-row justify-between gap-6 mt-10">
                    {/* Left (2/3 width on lg+, full width on mobile) */}
                    <div className="w-full lg:w-3/4 font-Montserrat text-[16px]">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 bg-[rgba(219,158,48,0.08)] p-7">
                            {includes.slice(0, 8).map((item, idx) => (
                                <div key={idx} className="flex items-start">
                                    <img
                                        src="/svg/bullet.svg"
                                        alt=""
                                        className="w-4 h-4 mt-1 mr-3 shrink-0"
                                    />
                                    <span className="text-sm leading-snug">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right (1/3 width on lg+, full width on mobile) */}
                    <div className="w-full lg:w-[23%] flex flex-col items-end gap-y-4">
                        <button className="w-full border border-secondary text-primary font-semibold text-2xl font-Montserrat flex justify-between items-center py-4 pl-7 pr-5 cursor-pointer">
                            Book This Package
                            <img src="/svg/arrow-bg-gray.svg" alt="button" />
                        </button>

                        <button className="w-full text-2xl text-white font-semibold font-Montserrat flex justify-between items-center bg-primary p-4 cursor-pointer">
                            Customize My Package
                            <img src="/svg/arrow-bg-white.svg" alt="button" />
                        </button>
                    </div>

                </div>

                {/* Hotel Details */}
                <div className="my-12 flex flex-col gap-12">
                    <h2 className="text-2xl md:text-3xl font-Montserrat font-semibold">HOTEL DETAILS:</h2>

                    {/* First Hotel */}
                    <div className="flex flex-col lg:flex-row justify-end items-center lg:items-start">
                        <div className="flex flex-col w-full lg:w-[42%] order-2 lg:order-1 bg-[#F4F4F4] mt-14 pr-5">
                            <div className="flex justify-end">
                                <img src="/svg/filledStar.svg" alt="" className="w-6 sm:w-7" />
                            </div>
                            <h2 className="text-xl sm:text-2xl lg:text-3xl font-abril text-end">Hotel Makeram Ajyad</h2>
                            <span className="text-secondary font-Montserrat text-end">Hotel in Makkah</span>
                            <p className="font-Montserrat py-1.5 text-end text-sm sm:text-base">
                                This hotel half Km is away from the Masjid E Haram and offer the 24/7 room services with the delicious food on-site restaurant. The rooms are well-decorated and furnished with luxury facilities such as minibar and separate washroom. They offer the traditional dishes of Arab like Shawarma and grilled chicken to the customers. There is no complimentary breakfast and no shuttle services are available at this 4-star hotel.
                            </p>
                        </div>
                        <div className="order-1 lg:order-2 w-full lg:w-auto">
                            <ImageSlider />
                        </div>
                    </div>

                    {/* Second Hotel */}
                    <div className="flex flex-col lg:flex-row items-center lg:items-start">
                        <div className="w-full lg:w-auto">
                            <ImageSlider />
                        </div>
                        <div className="flex flex-col w-full lg:w-[42%] bg-[#F4F4F4] mt-14 pl-5">
                            <div className="flex">
                                <img src="/svg/filledStar.svg" alt="" className="w-6 sm:w-7" />
                            </div>
                            <h2 className="text-xl sm:text-2xl lg:text-3xl font-abril text-start">Hotel Makeram Ajyad</h2>
                            <span className="text-secondary font-Montserrat text-start">Hotel in Makkah</span>
                            <p className="font-Montserrat py-1.5 text-start text-sm sm:text-base ">
                                This hotel half Km is away from the Masjid E Haram and offer the 24/7 room services with the delicious food on-site restaurant. The rooms are well-decorated and furnished with luxury facilities such as minibar and separate washroom. They offer the traditional dishes of Arab like Shawarma and grilled chicken to the customers. There is no complimentary breakfast and no shuttle services are available at this 4-star hotel.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Testmonials />

            <div className="w-full  md:max-w-[85%] lg:max-w-[80%] mx-auto my-5 md:px-4">
                <MonthlyUmrahPackages
                    title="More Relevant Packages"
                    subtitle="Makkah Travel is here to help you visit religious places..."
                    button="off"
                    carperrow={3}
                />
            </div>

            <NeedHelp />
            {/* <CustomizeUmrahPopup /> */}
        </div>
    )
}
