import React, { useState, useEffect } from 'react';
import WhyChoose from '../../Components/CommonComponents/WhyChoose';
import HeroSection from '../../Components/CommonComponents/HeroSection';
import Testimonials from '../../Components/CommonComponents/Testmonials';
import NeedHelp from '../../Components/CommonComponents/NeedHelp';
import axios from 'axios';
import { endpoints } from '../../Helpers/apiEndpoints';
import ScrollDetail from '../../Components/CommonComponents/ScrollDetail';
import parse from 'html-react-parser';
import PageScript from '../../Components/CommonComponents/PageScript';
import { BannerSkeleton, SliderSkeleton, Skeleton } from '../../Components/CommonComponents/Skeleton';

export default function VisaPage() {
    const [visaPageData, setVisaPageData] = useState({});
    const [contentImages, setContentImages] = useState([]);
    const [cleanContentHtml, setCleanContentHtml] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPageData = async () => {
            try {
                setLoading(true);
                const res = await axios.get(endpoints.getPageUrl('hajj-and-umrah-visa'));

                if (res.data?.status === 1) {
                    const result = res.data.result;
                    setVisaPageData(result);
               
                    if (result?.content) {
                        const parser = new DOMParser();
                        const doc = parser.parseFromString(result.content, 'text/html');

                        const figureImages = Array.from(doc.querySelectorAll('figure img'));
                        const imgUrls = figureImages.map((img) => img.getAttribute('src') || '');

                        figureImages.forEach((img) => {
                            img.closest('figure')?.remove();
                        });

                        setContentImages(imgUrls);
                        setCleanContentHtml(doc.body.innerHTML);
                    }
                }
            } catch (err) {
                console.error('Error fetching page data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPageData();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col w-full space-y-10 pt-24 md:pt-32">
                <BannerSkeleton />
                <div className="flex flex-col w-full max-w-[94%] md:max-w-[75%] mx-auto px-4 space-y-12 pb-20">
                    <div className="flex flex-col md:flex-row gap-6 mt-10">
                        <Skeleton className="h-64 flex-1 rounded-2xl" />
                        <Skeleton className="h-64 flex-1 rounded-2xl" />
                    </div>
                    <div className="space-y-6">
                        <Skeleton className="h-10 w-1/3 rounded" />
                        <div className="space-y-3">
                            <Skeleton className="h-4 w-full rounded" />
                            <Skeleton className="h-4 w-full rounded" />
                            <Skeleton className="h-4 w-full rounded" />
                            <Skeleton className="h-4 w-3/4 rounded" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <PageScript html={visaPageData?.script} ownerKey="visa" />
            <HeroSection pageData={visaPageData} />

            <div className="flex flex-col mt-8 w-full max-w-[94%] md:max-w-[75%] mx-auto px-4">
                {(contentImages.length > 0 || cleanContentHtml) && (
                    <div className="w-full flex flex-col gap-6 font-Montserrat mt-10">
                        {contentImages.length > 0 && (
                            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 justify-center">
                                {contentImages.map((src, i) => (
                                    <img
                                        key={i}
                                        src={src}
                                        alt={`content-image-${i}`}
                                        className={`
                                            w-full sm:w-[48%] lg:w-[49%] object-fill rounded-lg shadow
                                            ${i > 0 ? 'hidden sm:block' : ''}
                                          `}
                                    />
                                ))}
                            </div>
                        )}

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
