import React, { useState, useEffect } from 'react'
import WhyChoose from '../../Components/CommonComponents/WhyChoose'
import Testimonials from '../../Components/CommonComponents/Testmonials'
import Navbar from '../../Components/CommonComponents/NavBar'
import NeedHelp from '../../Components/CommonComponents/NeedHelp'
import axios from 'axios'
import { endpoints } from '../../Helpers/apiEndpoints'
import parse from "html-react-parser";
import PageScript from '../../Components/CommonComponents/PageScript'
export default function AboutPage() {
    const [aboutData, setAboutData] = useState({});

    useEffect(() => {
        const fetchPageData = async () => {
            try {
                const res = await axios.get(endpoints.getPageUrl("about-us"));

                if (res.data?.status === 1) {
                    setAboutData(res.data.result);

                }
            } catch (err) {
                console.error("Error fetching page data:", err);
            }
        };

        fetchPageData();
    }, []);


    if (!aboutData) {
        return (
            <div className="flex items-center justify-center min-h-[40vh]">
                <p className="text-lg font-Montserrat">No Data Found</p>
            </div>
        );
    }

    return (
        <>
            <div className='flex flex-col w-full max-w-[90%] mt-32 lg:max-w-[75%] mx-auto font-Montserrat'>
                <PageScript html={aboutData?.script} ownerKey="about" />
                <Navbar textColor='black' />
                <div className='parseData'>
                    {parse(aboutData?.content ?? "")}
                </div>
            </div>
            <WhyChoose pageData={aboutData} />
            {aboutData?.ourclientsays_widget?.length > 0 && (
                <Testimonials pageData={aboutData} />
            )}
            <NeedHelp />
        </>
    )
}
