import React from 'react';

const ContactInfo = () => {

    const Data = [
        {
            id: 1,
            title: "Our Contact Number",
            value: "(0208) - 000 -",
            icon: "/svg/Cntct.svg",
        },
        {
            id: 2,
            title: "Our Email Address",
            value: "info@makkahtravel.co.uk",
            icon: "/svg/Email.svg",
        },
        {
            id: 3,
            title: "Our Office Address",
            value: "Suite No.5 , The Old Dispensary , 30 Romford Road , Stratford London, England, E15 4BZ, United Kingdom",
            icon: "/svg/Location.svg",
        },
        {
            id: 4,
            title: "Our Social Media",
            value: "Suite No.5 , The Old Dispensary , 30 Romford Road , Stratford London, England, E15 4BZ, United Kingdom",
            icon: "/svg/Location.svg",
        },
    ];

    return (
        <div className="border-t">
            <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-24">
                <div className="relative flex flex-col items-center">
                    <div className="relative bg-white shadow-lg rounded-md w-[136px] h-[75px] 
  flex items-center justify-center z-10">
                        <div className="absolute -top-[60%] left-1/2 transform -translate-x-1/2">
                            <img
                                src="/svg/Cntct.svg"
                                alt="Cntct"
                            />
                        </div>
                    </div>

                    <div className="bg-gray-100 shadow-md rounded-md flex flex-col items-center justify-center 
  w-full text-center h-[170px] font-Montserrat -mt-8">
                        <p className="font-semibold text-[14px]">
                            Our Contact Number
                        </p>
                        <p className="text-[16px]">
                            (0208) - 000 -
                        </p>
                    </div>
                </div>

                <div className="relative flex flex-col items-center">
                    <div className="relative bg-white shadow-lg rounded-md w-[136px] h-[75px] 
  flex items-center justify-center z-10">
                        <div className="absolute -top-[30%] left-1/2 transform -translate-x-1/2">
                            <img
                                src="/svg/Email.svg"
                                alt="Email"
                            />
                        </div>
                    </div>

                    <div className="bg-gray-100 shadow-md rounded-md flex flex-col items-center justify-center 
  w-full text-center h-[170px] font-Montserrat -mt-8">
                        <p className="font-semibold text-[14px]">
                            Our Email Address
                        </p>
                        <p className="text-[16px]">
                            info@makkahtravel.co.uk
                        </p>
                    </div>
                </div>

                <div className="relative flex flex-col items-center">
                    <div className="relative bg-white shadow-lg rounded-md w-[136px] h-[75px] 
  flex items-center justify-center z-10">
                        <div className="absolute -top-[60%] left-1/2 transform -translate-x-1/2">
                            <img
                                src="/svg/location.svg"
                                alt="location"
                            />
                        </div>
                    </div>

                    <div className="bg-gray-100 shadow-md rounded-md flex flex-col items-center justify-center 
  w-full text-center h-[170px] font-Montserrat -mt-8 px-4">
                        <p className="font-semibold text-[14px] mt-10">
                            Our Office Address
                        </p>
                        <p className="text-[15px]">
                            Suite No.5 , The Old Dispensary , 30 Romford Road , Stratford London, England, E15 4BZ
                        </p>
                    </div>
                </div>

                <div className="relative flex flex-col items-center">
                    <div className="relative bg-white shadow-lg rounded-md w-[136px] h-[75px] 
  flex items-center justify-center z-10">
                        <div className="absolute -top-[60%] left-1/2 transform -translate-x-1/2">
                            <img
                                src="/svg/Media.svg"
                                alt="Media"
                            />
                        </div>
                    </div>

                    <div className="bg-gray-100 shadow-md rounded-md flex flex-col items-center justify-center 
  w-full text-center h-[170px] font-Montserrat -mt-8 px-4">
                        <p className="font-semibold text-[14px] mt-7">
                            Our Social Media
                        </p>
                        <div className='flex gap-6 mt-2'>
                            <img
                                src="/svg/fac.svg"
                                alt="Media"
                            />
                            <img
                                src="/svg/Insta.svg"
                                alt="Media"
                            />
                            <img
                                src="/svg/You.svg"
                                alt="Media"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactInfo;
