import React, { useEffect, useState } from 'react'
import { endpoints } from '../../Helpers/apiEndpoints'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import HeroSection from '../../Components/CommonComponents/HeroSection'
import MonthlyUmrahPackages from '../../Components/UmrahComponents/monthlyUmrahPackages'
import ScrollDetail from '../../Components/CommonComponents/ScrollDetail'

export default function BestUmrahDeals() {
    const { slug } = useParams();
    const [bestUmrahData, setBestUmrahData] = useState({});

    useEffect(() => {
        const fetchPageData = async () => {
            try {
                const res = await axios.get(endpoints.getPageUrl(slug));
                console.log("API full response:", res.data);


                if (res.data?.status === 1) {
                    console.log("Result object:", res.data?.result);
                    setBestUmrahData(res.data.result);

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
        <div className='flex flex-col'>
            <HeroSection pageData={bestUmrahData} />
            <div className='w-full max-w-[75%] mx-auto flex flex-col gap-y-14 m-8'>
                <MonthlyUmrahPackages title='3 STAR UMRAH PACKAGES' subtitle='' />
                <MonthlyUmrahPackages title='4 STAR UMRAH PACKAGES' subtitle='' />
                <MonthlyUmrahPackages title='5 STAR UMRAH PACKAGES' subtitle='' />
            </div>
            <div className="w-full max-w-[75%] mx-auto m-8">
                <ScrollDetail pageData={bestUmrahData} />
            </div>
        </div>
    )
}
