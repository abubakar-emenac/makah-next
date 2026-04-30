import { Link, useNavigate } from "@navigation";
import { BASE_URL_SVG } from '../../Helpers/apiEndpoints';

export default function ThankYou() {
    const navigate = useNavigate();

    return (
        <div className="w-full flex flex-col">

            <div
                className="relative flex flex-col items-center justify-center text-white pt-20 overflow-hidden h-auto"
                style={{ backgroundColor: '#DB9E30' }}
            >
                {/* Clouds */}
                <img
                    src={`${BASE_URL_SVG}assets/svgs/cloud.svg`}
                    alt="Cloud Top Left"
                    className="absolute top-0 left-0 w-20 sm:w-32 lg:w-60"
                />
                <img
                    src={`${BASE_URL_SVG}assets/svgs/cloud.svg`}
                    alt="Cloud Bottom Left"
                    className="absolute bottom-0 left-0 w-20 sm:w-32 lg:w-60"
                />
                <img
                    src={`${BASE_URL_SVG}assets/svgs/cloud.svg`}
                    alt="Cloud Right Middle"
                    className="absolute top-1/2 right-0 -translate-y-1/2 w-20 sm:w-32 lg:w-60"
                />

                {/* Top Text */}
                <div className="w-full mx-auto flex flex-col items-center  text-center relative gap-6  sm:gap-10 z-10">
                    {/* Info Text */}
                    <div className="text-[14px] sm:text-lg md:text-xl font-Montserrat font-light leading-relaxed">
                        <p>We have received your enquiry</p>
                        <p>
                            One of our agents will get back to you within{' '}
                            <span className="text-black font-medium">24 hours</span>
                        </p>
                    </div>

                    {/* Background THANK YOU */}
                    <h1 className="absolute leading-[1.2] flex items-center font-Montserrat justify-center text-[80px]  sm:text-[120px] md:text-[160px] lg:text-[220px] font-bold text-white z-0 mt-7 sm:mt-5">
                        THANK YOU
                    </h1>

                    {/* Foreground Illustration + Button */}
                    <div className="relative z-10 flex items-center gap-0 sm:gap-6 mt-5">
                        <img
                            src={`${BASE_URL_SVG}assets/svgs/thankyou.svg`}
                            alt="Thank You Illustration"
                            className="w-48 sm:w- md:w-[510px] md:h-[455px] lg:w-[610px] lg:h-[555px]"
                        />

                        <Link
                            to={'/'}
                            className="flex cursor-pointer items-center gap-2 border border-white bg-secondary px-6 py-3 text-white hover:bg-secondary/90 transition rounded font-Montserrat text-sm sm:text-base"
                        >
                            GO TO HOME PAGE
                            <img
                                src={`${BASE_URL_SVG}assets/svgs/mini-arrow.svg`}
                                alt="arrow"
                                className="bg-primary rounded-full p-1"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
