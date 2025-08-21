import React, { useState } from 'react';
import HeroSection from '../../Components/CommonComponents/HeroSection';
import PackageCard from '../../Components/CommonComponents/PackageCard';
import ViewAllButton from '../../Components/CommonComponents/ViewAllButton';
import data from '../../data/dummyData.json';
import FAQSection from '../../Components/CommonComponents/FAQSection';

const UmrahStarSection = ({ star, packages }) => {
    const [visibleCount, setVisibleCount] = useState(9);
    const handleLoadMore = () => setVisibleCount(prev => prev + 9);

    const filtered = packages.filter(pkg => pkg.star === star);
    const visiblePackages = filtered.slice(0, visibleCount);

    const starLabel = star === "03" ? "3 Star" : star === "04" ? "4 Star" : "5 Star";

    return (
        <div className="w-full mt-14">
            {/* Heading */}
            <div className="w-full lg:w-[45%] flex flex-col justify-start mb-6">
                <img src="/svg/crown-black.svg" alt="Crown" className="w-16 sm:w-18 md:w-20 mb-3 sm:mb-4" />
                <h2 className="text-[28px] sm:text-[32px] md:text-[36px] font-abril leading-tight mb-3 sm:mb-4">
                    {starLabel} Umrah Packages
                </h2>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {visiblePackages.map(pkg => (
                    <PackageCard key={pkg.id}
                        description={pkg.description}
                        star={pkg.star}
                        price={pkg.price}
                        night={pkg.night}
                    />
                ))}
            </div>

            {/* Load More Button */}
            {visibleCount < filtered.length && (
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
    );
};

export default function UmrahPackageStar() {
    return (
        <div className='flex flex-col w-full'>
            <HeroSection />
            <div className='flex flex-col my-8 w-full max-w-[75%] mx-auto'>
                <UmrahStarSection star="03" packages={data} />
            </div>
            <FAQSection />
        </div>
    );
}
