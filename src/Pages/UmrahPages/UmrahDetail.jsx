import React from 'react'
import Navbar from '../../Components/CommonComponents/NavBar'
import ImageGallery from '../CommonPages/ImageGallery'

export default function UmrahDetail() {
    return (
        <div className='flex flex-col w-full max-w-[75%] mx-auto'>
            <Navbar />
            <div className='flex flex-col w-full'>
                <div className='flex justify-between items-center'>
                    <div className='flex flex-col w-full max-w-[55%]'>
                        <img src="/svg/filledStar.svg" alt="" className='w-8' />
                        <h1 className='font-Montserrat font-bold text-2xl'>4 Star 10 Nights December Umrah Package 4 Star 10 Nights December Umrah Package</h1>
                    </div>
                    <div className="hidden lg:block w-px h-16 bg-secondary" />
                    <div className="text-center flex items-end gap-1">
                        <span className="text-[12px] md:text-[14px] mb-[6px]">from</span>
                        <span className="text-[32px] md:text-[40px] text-primary font-bold font-abril">£1200</span>
                        <span className="text-[30px] font-bold text-primary font-abril">.00</span>
                        <span className="text-[12px] md:text-[14px] mb-[6px]">/pp</span>
                    </div>

                </div>


                <div className='flex w-full mt-5 justify-between'>
                    {/* slider */}
                    <div className='w-full max-w-2/3'>
                        <ImageGallery />
                    </div>


                    <div className='flex flex-col w-full max-w-[30%]'>
                        <div className='flex flex-col justify-between gap-y-6 items-end w-full'>
                            {[
                                {
                                    nights: '05',
                                    title: 'Makkah Hotel Nights',
                                    subtitle: 'Makarem Ajeyad Hotel',
                                },
                                {
                                    nights: '05',
                                    title: 'Madinah Hotel Nights',
                                    subtitle: 'Makarem Ajeyad Hotel',
                                },
                            ].map((item, idx) => (
                                <div
                                    key={idx}
                                    className='flex items-center justify-end w-full gap-x-4'
                                >
                                    {/* Number */}
                                    <div className='w-12 text-center'>
                                        <span className='text-secondary font-Montserrat text-3xl font-semibold'>
                                            {item.nights}
                                        </span>
                                    </div>

                                    {/* Divider */}
                                    <div className='hidden lg:block w-[2px] h-12 bg-secondary' />

                                    {/* Text */}
                                    <div className='flex flex-col text-end font-Montserrat overflow-hidden'>
                                        <h3 className='text-2xl whitespace-nowrap overflow-hidden text-ellipsis'>
                                            {item.title}
                                        </h3>
                                        <span className='text-secondary whitespace-nowrap overflow-hidden text-ellipsis'>
                                            {item.subtitle}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>


                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
