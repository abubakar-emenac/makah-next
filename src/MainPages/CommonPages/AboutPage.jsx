import React, { useState, useEffect } from 'react'
import WhyChoose from '../../Components/CommonComponents/WhyChoose'
import Testimonials from '../../Components/CommonComponents/Testmonials'
import NeedHelp from '../../Components/CommonComponents/NeedHelp'
import axios from 'axios'
import { endpoints } from '../../Helpers/apiEndpoints'
import parse from "html-react-parser";
import PageScript from '../../Components/CommonComponents/PageScript'
import { BannerSkeleton, Skeleton } from '../../Components/CommonComponents/Skeleton'

export default function AboutPage() {
    const [aboutData, setAboutData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPageData = async () => {
            try {
                setLoading(true);
                const res = await axios.get(endpoints.getPageUrl("about-us"));

                if (res.data?.status === 1) {
                    setAboutData(res.data.result);
                }
            } catch (err) {
                console.error("Error fetching page data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPageData();
    }, []);


    if (loading) {
        return (
            <div className="flex flex-col w-full space-y-10 pt-24 md:pt-32 pb-20">
                <BannerSkeleton />
                <div className="max-w-[1240px] mx-auto px-4 space-y-6">
                    <Skeleton className="h-10 w-1/3" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <div className="pt-10">
                        <Skeleton className="h-[400px] w-full rounded-3xl" />
                    </div>
                </div>
            </div>
        );
    }

    if (!aboutData?.browser_title) {
        return (
            <div className="flex items-center justify-center min-h-[40vh]">
                <p className="text-lg font-Montserrat">No Data Found</p>
            </div>
        );
    }

    return (
        <>
            <PageScript html={aboutData?.script} ownerKey="about" />
            <div className='flex flex-col w-full max-w-[90%] mt-32 lg:max-w-[75%] mx-auto font-Montserrat'>
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
