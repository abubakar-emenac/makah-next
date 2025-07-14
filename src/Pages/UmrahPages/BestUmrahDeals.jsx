import React from 'react'
import HeroSection from '../../Components/CommonComponents/HeroSection'
import MonthlyUmrahPackages from '../../Components/UmrahComponents/monthlyUmrahPackages'
import ScrollDetail from '../../Components/CommonComponents/ScrollDetail'

export default function BestUmrahDeals() {
    const description =
        '<h1><span style="color:hsl(312,81%,25%);">Search Your Desired Holidays</span>&nbsp;&nbsp;<br><span style="color:hsl(287,61%,26%);">Cheap Holidays 2025-26</span></h1><p class="w-full mt-3 mb-4 text-sm sm:text-base text-gray-700"><span style="color:hsl(0,0%,0%);">Travelers always look for comfort on their air trips to the places. Travelers always look for comfort on their air trips to the customers over their budgets. Travelers always look for comfort on their air trips to the customers over their budgets.</span></p>'


    return (
        <div className='flex flex-col'>
            <HeroSection />
            <div className='w-full max-w-[75%] mx-auto flex flex-col gap-y-14 m-8'>
                <MonthlyUmrahPackages title='3 STAR UMRAH PACKAGES' subtitle='' />
                <MonthlyUmrahPackages title='4 STAR UMRAH PACKAGES' subtitle='' />
                <MonthlyUmrahPackages title='5 STAR UMRAH PACKAGES' subtitle='' />
            </div>
            <div className="w-full max-w-[75%] mx-auto m-8">
                <ScrollDetail description={description} />
            </div>
        </div>
    )
}
