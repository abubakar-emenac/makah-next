import React, { useState, useEffect } from 'react'
import NeedHelp from '../../Components/CommonComponents/NeedHelp'
import axios from 'axios'
import { endpoints } from '../../Helpers/apiEndpoints'
import parse from "html-react-parser";
import PageScript from '../../Components/CommonComponents/PageScript'
import { BannerSkeleton, Skeleton } from '../../Components/CommonComponents/Skeleton'

export default function CookiePolicy() {
    const [cpData, setCPData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPageData = async () => {
            try {
                setLoading(true);
                const res = await axios.get(endpoints.getPageUrl("cookies-policy"));
                if (res.data?.status === 1) {
                    setCPData(res.data.result);
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
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                </div>
            </div>
        );
    }

    if (!cpData?.browser_title) {
        return (
            <div className="flex items-center justify-center min-h-[40vh]">
                <p className="text-lg font-Montserrat">No Data Found</p>
            </div>
        );
    }

    return (
        <div className='flex flex-col mt-8 w-full ma-w-[75%] mx-auto'>
            <PageScript html={cpData?.script} ownerKey="cookies-policy" />
            <div className='max-w-[90%] md:max-w-[75%] mx-auto mt-16 parseData'>
                {parse(cpData?.content ?? "")}
            </div>
            <NeedHelp />
        </div>
    )
}
