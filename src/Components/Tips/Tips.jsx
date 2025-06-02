import React from 'react';
import { GiCookingPot, GiSaltShaker, GiLemon, GiKnifeFork } from "react-icons/gi";

const Tips = () => {
    return (
        <div className='mb-16 px-4 sm:px-8 md:px-12 lg:px-20 ivory-bg'>
            <h1 className='raleway text-center text-3xl sm:text-4xl md:text-5xl font-bold green mb-10'>
                Quick Tips to Cook Like a Pro
            </h1>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ivory-bg'>
                <div className='border-amber-600 border-4 rounded-3xl p-6 sm:p-7 md:p-9 text-center flex flex-col justify-center items-center gap-4'>
                    <GiCookingPot className='text-5xl sm:text-6xl text-amber-600' />
                    <h2 className='text-xl sm:text-2xl md:text-3xl font-bold raleway'>
                        Always Preheat Your Pan
                    </h2>
                    <p className='text-base sm:text-lg lato'>
                        Helps lock in flavor and gives a perfect sear.
                    </p>
                </div>
                <div className='border-amber-600 border-4 rounded-3xl p-6 sm:p-7 md:p-9 text-center flex flex-col justify-center items-center gap-4'>
                    <GiSaltShaker className='text-5xl sm:text-6xl text-amber-600' />
                    <h2 className='text-xl sm:text-2xl md:text-3xl font-bold raleway'>
                        Season As You Go
                    </h2>
                    <p className='text-base sm:text-lg lato'>
                        Don’t wait till the end—build flavor step by step.
                    </p>
                </div>
                <div className='border-amber-600 border-4 rounded-3xl p-6 sm:p-7 md:p-9 text-center flex flex-col justify-center items-center gap-4'>
                    <GiLemon className='text-5xl sm:text-6xl text-amber-600' />
                    <h2 className='text-xl sm:text-2xl md:text-3xl font-bold raleway'>
                        Balance Your Flavors
                    </h2>
                    <p className='text-base sm:text-lg lato'>
                        A squeeze of lemon or a dash of vinegar can brighten almost any dish.
                    </p>
                </div>
                <div className='border-amber-600 border-4 rounded-3xl p-6 sm:p-7 md:p-9 text-center flex flex-col justify-center items-center gap-4'>
                    <GiKnifeFork className='text-5xl sm:text-6xl text-amber-600' />
                    <h2 className='text-xl sm:text-2xl md:text-3xl font-bold raleway'>
                        Let Garlic Rest After Chopping
                    </h2>
                    <p className='text-base sm:text-lg lato'>
                        Waiting 10 minutes before cooking preserves its natural health benefits.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Tips;
