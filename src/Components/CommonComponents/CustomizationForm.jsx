import React, { useState } from "react";
import Navbar from "./NavBar";
import { BASE_URL_SVG } from "../../Helpers/apiEndpoints";

export default function CustomizationForm({
    rightImageUrl,
    initialPackageType = "Umrah",
}) {
    const [packageType, setPackageType] = useState(initialPackageType);

    const handleTypeChange = (type) => {
        setPackageType(type);
    };

    return (
        <div className="w-full max-w-[75%] bg-white py-10 px-4 mx-auto">
            <Navbar/>
            <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
                {/* Left Section: Form */}
                <div className="w-full flex flex-col">
                    

                    {/* Package Type Buttons */}
                    <div className="mb-6 flex gap-4">
                        <img src={`${BASE_URL_SVG}/assets/svgs/crown-black.svg`} />
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-abril text-black mb-6 flex items-center gap-2">
                        Customize Your Package
                    </h1>
                        <button
                            onClick={() => handleTypeChange("Umrah")}
                            className={`px-6 py-2 rounded-md font-medium ${packageType === "Umrah"
                                    ? "bg-green-600 text-white"
                                    : "border border-green-600 text-green-600 bg-white"
                                }`}
                        >
                            Umrah Package
                        </button>
                        <button
                            onClick={() => handleTypeChange("Hajj")}
                            className={`px-6 py-2 rounded-md font-medium ${packageType === "Hajj"
                                    ? "bg-green-600 text-white"
                                    : "border border-green-600 text-green-600 bg-white"
                                }`}
                        >
                            Hajj Package
                        </button>
                    </div>

                    {/* Form */}
                    <div className="bg-white rounded-lg shadow-md p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                            "Departure Airport",
                            "Departure Date",
                            "No. Nights Makkah",
                            "No. Nights Madinah",
                            "Accommodation",
                            "Room Type",
                            "Meal Type",
                            "Distance From Mosque",
                            "Passengers",
                            "Name*",
                            "Phone No*",
                            "Email Address*",
                            "Type Your Message...",
                            "Answer",
                        ].map((placeholder, idx) => (
                            <input
                                key={idx}
                                placeholder={placeholder}
                                className={`border border-gray-300 px-4 py-2 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${idx === 12 ? "col-span-full" : ""
                                    }`}
                            />
                        ))}
                        <button className="col-span-full sm:col-span-2 lg:col-span-1 bg-green-600 text-white px-6 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-green-700 transition">
                            SUBMIT
                            <img src={`${BASE_URL_SVG}/assets/svgs/arrow-right.svg`} alt="Submit Arrow" className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Right Section: Image */}
                <div className="w-full lg:w-[35%] flex justify-center lg:justify-end">
                    <img
                        src={rightImageUrl}
                        alt="Illustration"
                        className="max-w-xs sm:max-w-sm md:max-w-md w-full object-contain"
                    />
                </div>
            </div>
        </div>
    );
}
