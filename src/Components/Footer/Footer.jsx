import React from 'react';
import { Link } from 'react-router'; // use 'react-router-dom' not 'react-router'
import { FaFacebook, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import logo from "../../assets/Savorly.png";

const Footer = () => {
    return (
        <footer className="bg-base-200 ivory-bg border-t-2 border-t-amber-600 text-base-content p-6 md:p-10">
            <div className="max-w-6xl mx-auto flex flex-col items-center gap-6 md:gap-8 text-center">

                
                <div className='flex flex-col items-center'>
                    <img src={logo} alt="Savorly Logo" className='w-16 sm:w-20' />
                    <h1 className='green font-extrabold text-2xl sm:text-3xl md:text-4xl'>Savorly</h1>
                </div>

                
                <nav className="flex flex-wrap justify-center items-center gap-2 md:gap-4 text-lg raleway">
                    <Link to="/" className='btn btn-ghost btn-hv text-sm sm:text-base'>Home</Link>
                    <span className='text-amber-600 font-extrabold'>|</span>
                    <Link to="/all-recipes" className='btn btn-ghost btn-hv text-sm sm:text-base'>All Recipes</Link>
                    <span className='text-amber-600 font-extrabold'>|</span>
                    <Link to="/my-recipes" className='btn btn-ghost btn-hv text-sm sm:text-base'>My Recipes</Link>
                    <span className='text-amber-600 font-extrabold'>|</span>
                    <Link to="/add-recipe" className='btn btn-ghost btn-hv text-sm sm:text-base'>Add Recipe</Link>
                </nav>

                
                <div className="flex justify-center gap-4 sm:gap-6">
                    <a href="https://www.facebook.com/faisal.ahmed.58115" target="_blank" rel="noreferrer">
                        <FaFacebook className='text-xl sm:text-2xl text-blue-600 btn-hv' />
                    </a>
                    <a href="https://www.instagram.com/_faisal_ahmed132/" target="_blank" rel="noreferrer">
                        <FaInstagram className='text-xl sm:text-2xl text-pink-500 btn-hv' />
                    </a>
                    <a href="https://www.linkedin.com/in/faisal-ahmed4417/" target="_blank" rel="noreferrer">
                        <FaLinkedin className='text-xl sm:text-2xl text-blue-800 btn-hv' />
                    </a>
                    <a href="https://github.com/faisalahmed3" target="_blank" rel="noreferrer">
                        <FaGithub className='text-xl sm:text-2xl btn-hv' />
                    </a>
                </div>

                
                <aside>
                    <p className='text-sm sm:text-base text-amber-600 lato'>
                        © {new Date().getFullYear()} Savorly — All rights reserved
                    </p>
                </aside>
            </div>
        </footer>
    );
};

export default Footer;
