import React from 'react';
import errorImg from "../../assets/Error.png";
import logo from "../../assets/Savorly.png";
import { Link } from 'react-router';

const Error = () => {
    return (
        <div className='flex flex-col items-center justify-center ivory-bg px-4 py-6 h-screen overflow-hidden raleway'>
            <div className='flex flex-col items-center text-center justify-center mb-6'>
                <img src={logo} alt="logo" className='w-20 sm:w-24 md:w-28 lg:w-32' />
                <h1 className='green font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl'>Savorly</h1>
            </div>
            <img 
                src={errorImg} 
                alt="Error Image" 
                className='w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl mb-6' 
            />
            <Link to="/">
                <button className='btn btn-wide golden-bg text-white text-lg sm:text-xl md:text-2xl rounded-full py-3 px-6 sm:py-4 md:py-6 btn-hv mb-8'>
                    Home Page
                </button>
            </Link>
        </div>
    );
};

export default Error;
