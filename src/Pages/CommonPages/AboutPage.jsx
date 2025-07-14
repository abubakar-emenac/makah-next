import React from 'react'
import WhyChoose from '../../Components/CommonComponents/WhyChoose'
import Testimonials from '../../Components/CommonComponents/Testmonials'
import Navbar from '../../Components/CommonComponents/NavBar'
import NeedHelp from '../../Components/CommonComponents/NeedHelp'

export default function AboutPage() {
    return (
        <div className='flex flex-col mt-8 w-full ma-w-[75%] mx-auto'>
            <Navbar textColor='black' />
            About us
            <WhyChoose />
            <Testimonials />
            <NeedHelp />
        </div>
    )
}
