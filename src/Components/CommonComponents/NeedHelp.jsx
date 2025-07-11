import React from 'react'

export default function NeedHelp() {
    return (
        <div className='mt-16 w-full max-w-[75%] flex mx-auto justify-between'>
            <div className=' left-wala w-full max-w-[40%] '>
                <div className='flex flex-col my-5'>
                    <div className='flex justify-between items-center w-full'>
                        <div className='flex flex-col'>
                            <span className='capitalize font-Montserrat font-semibold text-[22px]'>CALL US NOW!</span>
                            <span className='text-primary font-abril text-[32px] '>0203 - 970 - 0002</span>
                        </div>
                        <img src="/svg/Need Help Section (Call) SVG.svg" alt="" className='w-16' />
                    </div>
                </div>
                <div className='flex flex-col my-5'>
                    <div className='flex justify-between items-center w-full'>
                        <div className='flex flex-col'>
                            <span className='capitalize font-Montserrat font-semibold text-[22px]'>REQUEST A CALL BACK!</span>
                            <span className='text-primary font-abril text-[32px] '>TOO BUSY TO TALK?</span>
                        </div>
                        <img src="/svg/Need Help Section (Call Back) SVG.svg" alt="" className='w-16' />
                    </div>
                </div>
            </div>
            <div className='right-wala max-w-[59%] flex justify-end '>
                <div className='flex flex-col mt-5'>
                    <h2 className='text-[68px] font-abril text-end'>NEED HELP?</h2>
                    <p className='text-black font-Montserrat text-end w-full'>Makkah Travel is here to help you visit religious <br />places and make Umrah trips that connect with <br /> your soul. We're experts at creating</p>
                </div>
                <div>
                    <img src="/svg/Need Help.svg" alt="" />
                </div>
            </div>
        </div>
    )
}
