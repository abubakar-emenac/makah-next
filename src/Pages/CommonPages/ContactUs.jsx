import React, { useState, useEffect } from 'react'
import WhyChoose from '../../Components/CommonComponents/WhyChoose'
import Testimonials from '../../Components/CommonComponents/Testmonials'
import Navbar from '../../Components/CommonComponents/NavBar'
import NeedHelp from '../../Components/CommonComponents/NeedHelp'
import axios from 'axios'
import { endpoints } from '../../Helpers/apiEndpoints'

export default function AboutPage() {
    const [homeData, setHomeData] = useState({});

    useEffect(() => {
        const fetchPageData = async () => {
            try {
                const res = await axios.get(endpoints.getPageUrl("contact-us"));
                console.log("API full response:", res.data);


                if (res.data?.status === 1) {
                    console.log("Result object:", res.data?.result);
                    setHomeData(res.data.result);

                    if (res.data.result?.browser_title) {
                        document.title = res.data.result.browser_title;
                    }
                }
            } catch (err) {
                console.error("Error fetching page data:", err);
            }
        };

        fetchPageData();
    }, []);
    return (
        <div className='flex flex-col mt-8 w-full ma-w-[75%] mx-auto'>
            <Navbar textColor='black' />
            Contact Us
            <WhyChoose />
            <Testimonials />
            <NeedHelp />
        </div>
    )
}
