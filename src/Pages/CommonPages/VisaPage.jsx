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
import { endpoints } from '../../Helpers/apiEndpoints';
import ScrollDetail from '../../Components/CommonComponents/ScrollDetail';
import parse from 'html-react-parser';

export default function VisaPage() {
    const [visaPageData, setVisaPageData] = useState({});
    const [contentImages, setContentImages] = useState([]);
    const [cleanContentHtml, setCleanContentHtml] = useState('');

    useEffect(() => {
        const fetchPageData = async () => {
            try {
                const res = await axios.get(endpoints.getPageUrl('hajj-and-umrah-visa'));
                console.log('API full response:', res.data);

                if (res.data?.status === 1) {
                    const result = res.data.result;
                    console.log('Result object:', result);

                    setVisaPageData(result);

                    if (result?.browser_title) {
                        document.title = result.browser_title;
                    }

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

    return (
        <>
            <HeroSection pageData={visaPageData} />

            <div className="flex flex-col mt-8 w-full max-w-[75%] mx-auto px-4">
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
                                        className="w-full sm:w-[48%] lg:w-[49%] object-cover rounded-lg shadow"
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

            <NeedHelp />
        </>
    );
}
