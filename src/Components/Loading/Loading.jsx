import React from 'react';
import Lottie from 'lottie-react';
import cookingAnimation from '../../assets/cooking.json';

const Loading = () => {
    return (
        <div className="flex flex-col justify-center items-center min-h-[60vh] ivory-bg px-4">
            <div className="w-60 sm:w-72 md:w-80 mb-4">
                <Lottie animationData={cookingAnimation} loop={true} />
            </div>
        </div>
    );
};

export default Loading;
