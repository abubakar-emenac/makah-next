import React, { useState, useEffect } from 'react'
import Navbar from '../../Components/CommonComponents/NavBar'
import NeedHelp from '../../Components/CommonComponents/NeedHelp'
import axios from 'axios'
import { endpoints } from '../../Helpers/apiEndpoints'
import parse from "html-react-parser";
export default function CookiePolicy() {
    const [cpData, setCPData] = useState({});

    useEffect(() => {
        const fetchPageData = async () => {
            try {
                const res = await axios.get(endpoints.getPageUrl("cookies-policy "));
                console.log("API full response:", res.data);


                if (res.data?.status === 1) {
                    console.log("Result object:", res.data?.result);
                    setCPData(res.data.result);

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
            <div className='max-w-[75%] mx-auto mt-8 parseData'>
                {parse(cpData?.content ?? "")}
            </div>
            <NeedHelp />
        </div>
    )
}
