import React, { useState, useEffect } from 'react'
import Navbar from '../../Components/CommonComponents/NavBar'
import NeedHelp from '../../Components/CommonComponents/NeedHelp'
import axios from 'axios'
import { BASE_URL_IMG, endpoints } from '../../Helpers/apiEndpoints'
import parse from "html-react-parser";
import { Helmet } from 'react-helmet'
export default function PrivacyPolicy() {
    const [pageContent, setPageContent] = useState({});

    useEffect(() => {
        const fetchPageData = async () => {
            try {
                const res = await axios.get(endpoints.getPageUrl("privacy-policy "));
                // console.log("API full response:", res.data);


                if (res.data?.status === 1) {
                    // console.log("Result object:", res.data?.result);
                    setPageContent(res.data.result);

                    // if (res.data.result?.browser_title) {
                    //     document.title = res.data.result.browser_title;
                    // }

                    // // Set Meta Description
                    // const desc = document.querySelector('meta[name="description"]') || document.createElement("meta");
                    // desc.setAttribute("name", "description");
                    // desc.setAttribute("content", res.data.result.meta_description || "");
                    // if (!desc.parentNode) document.head.appendChild(desc);

                    // // Set meta keywords
                    // const keywords = document.querySelector('meta[name="keywords"]') || document.createElement("meta");
                    // keywords.setAttribute("name", "keywords");
                    // keywords.setAttribute("content", res.data.result.meta_keywords);
                    // if (!keywords.parentNode) document.head.appendChild(keywords);

                    // // OG Title
                    // const ogTitle = document.querySelector('meta[property="og:title"]') || document.createElement("meta");
                    // ogTitle.setAttribute("property", "og:title");
                    // ogTitle.setAttribute("content", res.data.result.browser_title);
                    // if (!ogTitle.parentNode) document.head.appendChild(ogTitle);

                    // // OG Description
                    // const ogDescription = document.querySelector('meta[property="og:description"]') || document.createElement("meta");
                    // ogDescription.setAttribute("property", "og:description");
                    // ogDescription.setAttribute("content", res.data.result.meta_description || "");
                    // if (!ogDescription.parentNode) document.head.appendChild(ogDescription);

                    // // OG Image (dynamic from banner_img[0])
                    // const imageUrl = res.data.result.banner_img?.[0]?.url
                    //     ? `${BASE_URL_IMG}/${res.data.result.banner_img[0].url}`
                    //     : '';

                    // const ogImage = document.querySelector('meta[property="og:image"]') || document.createElement("meta");
                    // ogImage.setAttribute("property", "og:image");
                    // ogImage.setAttribute("content", imageUrl);
                    // if (!ogImage.parentNode) document.head.appendChild(ogImage);

                    // // OG URL (current page URL)
                    // const ogUrl = document.querySelector('meta[property="og:url"]') || document.createElement("meta");
                    // ogUrl.setAttribute("property", "og:url");
                    // ogUrl.setAttribute("content", window.location.href);
                    // if (!ogUrl.parentNode) document.head.appendChild(ogUrl);

                    // // OG Type (always set to "Travels & Tours")
                    // const ogType = document.querySelector('meta[property="og:type"]') || document.createElement("meta");
                    // ogType.setAttribute("property", "og:type");
                    // ogType.setAttribute("content", "Travels & Tours");
                    // if (!ogType.parentNode) document.head.appendChild(ogType);

                    // // Canonical Link
                    // let canonicalLink = document.querySelector('link[rel="canonical"]');
                    // if (!canonicalLink) {
                    //     canonicalLink = document.createElement("link");
                    //     canonicalLink.setAttribute("rel", "canonical");
                    //     document.head.appendChild(canonicalLink);
                    // }
                    // canonicalLink.setAttribute("href", window.location.href);
                }
            } catch (err) {
                console.error("Error fetching page data:", err);
            }
        };

        fetchPageData();
    }, []);

    if (!pageContent) {
        return (
            <div className="flex items-center justify-center min-h-[40vh]">
                <p className="text-lg font-Montserrat">No Data Found</p>
            </div>
        );
    }

    const imageUrl = pageContent.banner_img?.[0]?.url
        ? `${BASE_URL_IMG}/${pageContent.banner_img[0].url}`
        : '';

    return (
        <div className='flex flex-col mt-8 w-full ma-w-[75%] mx-auto'>
            <Helmet>
                <title>{pageContent.browser_title}</title>
                <meta name="description" content={pageContent.meta_description || ""} />
                <meta name="keywords" content={pageContent.meta_keywords || ""} />

                {/* Open Graph Tags */}
                <meta property="og:title" content={pageContent.browser_title} />
                <meta property="og:description" content={pageContent.meta_description || ""} />
                <meta property="og:image" content={imageUrl} />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:type" content="Travels & Tours" />

                {/* Canonical */}
                <link rel="canonical" href={window.location.href} />
            </Helmet>
            <Navbar textColor='black' />
            <div className='max-w-[75%] mx-auto mt-8 parseData'>
                {parse(pageContent?.content ?? "")}
            </div>
            <NeedHelp />
        </div>
    )
}
