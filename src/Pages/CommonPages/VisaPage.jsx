// import React, { useState, useEffect } from 'react'
// import WhyChoose from '../../Components/CommonComponents/WhyChoose'
// import HeroSection from '../../Components/CommonComponents/HeroSection'
// import Testimonials from '../../Components/CommonComponents/Testmonials'
// import Navbar from '../../Components/CommonComponents/NavBar'
// import NeedHelp from '../../Components/CommonComponents/NeedHelp'
// import axios from 'axios'
// import { endpoints } from '../../Helpers/apiEndpoints'
// import ScrollDetail from '../../Components/CommonComponents/ScrollDetail'

// export default function VisaPage() {
//     const [visaPageData, setVisaPageData] = useState({});

//     useEffect(() => {
//         const fetchPageData = async () => {
//             try {
//                 const res = await axios.get(endpoints.getPageUrl("hajj-and-umrah-visa"));
//                 console.log("API full response:", res.data);


//                 if (res.data?.status === 1) {
//                     console.log("Result object:", res.data?.result);
//                     setVisaPageData(res.data.result);

//                     if (res.data.result?.browser_title) {
//                         document.title = res.data.result.browser_title;
//                     }
//                 }
//             } catch (err) {
//                 console.error("Error fetching page data:", err);
//             }
//         };

//         fetchPageData();
//     }, []);
//     return (
//         <>
//             <HeroSection pageData={visaPageData} />
//             <div className='flex flex-col mt-8 w-full ma-w-[75%] mx-auto'>

//                 {visaPageData?.scroll_description?.trim() && (
//                     <ScrollDetail pageData={visaPageData} />
//                 )}
//                 <NeedHelp />
//             </div>
//         </>
//     )
// }

import React, { useState, useEffect } from 'react';
import WhyChoose from '../../Components/CommonComponents/WhyChoose';
import HeroSection from '../../Components/CommonComponents/HeroSection';
import Testimonials from '../../Components/CommonComponents/Testmonials';
import Navbar from '../../Components/CommonComponents/NavBar';
import NeedHelp from '../../Components/CommonComponents/NeedHelp';
import axios from 'axios';
import { BASE_URL_IMG, endpoints } from '../../Helpers/apiEndpoints';
import ScrollDetail from '../../Components/CommonComponents/ScrollDetail';
import parse from 'html-react-parser';
import { Helmet } from 'react-helmet';

export default function VisaPage() {
    const [visaPageData, setVisaPageData] = useState({});
    const [contentImages, setContentImages] = useState([]);
    const [cleanContentHtml, setCleanContentHtml] = useState('');
    // console.log('visaPageData', visaPageData);

    useEffect(() => {
        const fetchPageData = async () => {
            try {
                const res = await axios.get(endpoints.getPageUrl('hajj-and-umrah-visa'));
                // console.log('API full response:', res.data);

                if (res.data?.status === 1) {
                    const result = res.data.result;
                    // console.log('Result object:', result);

                    setVisaPageData(result);
               
                    // Handle content key
                    if (result?.content) {
                        const parser = new DOMParser();
                        const doc = parser.parseFromString(result.content, 'text/html');

                        // Extract images from figure
                        const figureImages = Array.from(doc.querySelectorAll('figure img'));
                        const imgUrls = figureImages.map((img) => img.getAttribute('src') || '');

                        // Remove figure tags
                        figureImages.forEach((img) => {
                            img.closest('figure')?.remove();
                        });

                        setContentImages(imgUrls);
                        setCleanContentHtml(doc.body.innerHTML);
                    }
                }
            } catch (err) {
                console.error('Error fetching page data:', err);
            }
        };

        fetchPageData();
    }, []);
    useEffect(() => {
        if (!visaPageData?.script) return;

        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = visaPageData.script;

        const scripts = tempDiv.querySelectorAll("script");

        scripts.forEach((oldScript) => {
            const newScript = document.createElement("script");
            if (oldScript.type) newScript.type = oldScript.type;
            if (oldScript.src) newScript.src = oldScript.src;
            else if (oldScript.textContent) newScript.text = oldScript.textContent;
            document.head.appendChild(newScript);
        });

        return () => {
            scripts.forEach((oldScript) => {
                const existing = [...document.head.querySelectorAll("script")].find(
                    (s) => s.innerHTML === oldScript.innerHTML || s.src === oldScript.src
                );
                if (existing) existing.remove();
            });
        };
    }, [visaPageData])

    const imageUrl = visaPageData && visaPageData.image_url ? `${BASE_URL_IMG}/${visaPageData.image_url}` : ""

    return (
        <>
            <Helmet>
                <title>{visaPageData.browser_title}</title>
                <meta name="description" content={visaPageData.meta_description || ""} />
                <meta name="keywords" content={visaPageData.meta_keywords || ""} />

                {/* Open Graph Tags */}
                <meta property="og:title" content={visaPageData.browser_title} />
                <meta property="og:description" content={visaPageData.meta_description || ""} />
                <meta property="og:image" content={imageUrl} />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:type" content="Travels & Tours" />

                {/* Canonical */}
                <link rel="canonical" href={window.location.href} />
            </Helmet>

            <HeroSection pageData={visaPageData} />

            <div className="flex flex-col mt-8 w-full max-w-[94%] md:max-w-[75%] mx-auto px-4">
                {/* Scroll Description */}

                {/* Content Section */}
                {(contentImages.length > 0 || cleanContentHtml) && (
                    <div className="w-full flex flex-col gap-6 font-Montserrat mt-10">
                        {/* Images on top */}
                        {contentImages.length > 0 && (
                            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 justify-center">
                                {contentImages.map((src, i) => (
                                    <img
                                        key={i}
                                        src={src}
                                        alt={`content-image-${i}`}
                                        // className="w-full sm:w-[48%] lg:w-[49%] object-fill rounded-lg shadow"
                                        className={`
                                            w-full sm:w-[48%] lg:w-[49%] object-fill rounded-lg shadow
                                            ${i > 0 ? 'hidden sm:block' : ''}
                                          `}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Remaining HTML */}
                        {cleanContentHtml && (
                            <div className="prose max-w-none parseData">{parse(cleanContentHtml)}</div>
                        )}
                    </div>
                )}
            </div>
            {visaPageData?.scroll_description?.trim() && (
                <ScrollDetail pageData={visaPageData} />
            )}
            <div className="flex flex-col mt-8 w-full">
            <NeedHelp />
            </div>
        </>
    );
}
