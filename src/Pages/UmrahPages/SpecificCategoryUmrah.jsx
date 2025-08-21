import React, { useState } from 'react';
import HeroSection from '../../Components/CommonComponents/HeroSection';
import data from '../../data/dummyData.json';
import PackageCard from '../../Components/CommonComponents/PackageCard';
import ViewAllButton from '../../Components/CommonComponents/ViewAllButton';
import ScrollDetail from '../../Components/CommonComponents/ScrollDetail';
import FAQSection from '../../Components/CommonComponents/FAQSection';

export default function SpecificCategoryUmrah() {
    const [visibleCount, setVisibleCount] = useState(9);

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + 9);
    };
    const description = '<h1><span style="color:hsl(312,81%,25%);">Search Your Desired Holidays</span>&nbsp;&nbsp;<br><span style="color:hsl(287,61%,26%);">Cheap Holidays 2025-26</span></h1><p class="w-full mt-3 mb-4 text-sm sm:text-base text-gray-700"><span style="color:hsl(0,0%,0%);">Travelers always look for comfort on their air trips to the places. Travelers always look for comfort on their air trips to the customers over their budgets. Travelers always look for comfort on their air trips to the customers over their budgets.</span></p>';


    return (
        <div className='flex flex-col mb-4'>
            <HeroSection />

            <div className='w-full max-w-[90%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-[75%] mx-auto pt-8'>
                {/* Header */}
                <div className="w-full lg:w-[45%] flex flex-col justify-start">
                    <img src="/svg/crown-black.svg" alt="Crown" className="w-16 sm:w-18 md:w-20 mb-3 sm:mb-4" />
                    <h2 className="text-[28px] sm:text-[32px] md:text-[36px] font-abril leading-tight mb-3 sm:mb-4">
                        Ramadan Umrah Deals
                    </h2>
                </div>

                {/* Package Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-rows-2 lg:grid-cols-3 gap-6 mt-10">
                    {data.slice(0, visibleCount).map((pkg) => (
                        <PackageCard
                            description={pkg.description}
                            night={pkg.night}
                            star={pkg.star}
                            price={pkg.price}
                        />
                    ))}
                </div>

                {/* Load More Button */}
                {visibleCount < data.length && (
                    <div className="w-full flex justify-center mt-10">
                        <ViewAllButton
                            label="Load More Packages"
                            onClick={handleLoadMore}
                            color="primary"
                            size="md"
                        />

                    </div>
                )}
            </div>
            <div className="w-full max-w-[75%] mx-auto">
                <ScrollDetail description={description} />
            </div>
            <FAQSection />
        </div>
    );
}
