import React from 'react';
import logo from "../../assets/Savorly.png";
import Top from '../../Components/Top/Top';
import People from '../../Components/People/People';
import Tips from '../../Components/Tips/Tips';
import biryani from '../../assets/biryani.png';
import jalebi from '../../assets/jalebi.png';
import tikka from '../../assets/tikka.png';
import laddoo from '../../assets/laddoo.png';
import Philosophy from '../../Components/Philosophy/Philosophy';

const Hero = () => {
    return (
        <div className='ivory-bg pb-16'>
            <div className="relative ivory-bg px-4 sm:px-10 md:px-20">
                
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center pointer-events-none px-2">
                    <img src={logo} alt="Savorly Logo" className="w-32 sm:w-40 md:w-64 mb-2 pointer-events-auto" />
                    <h1 className="green font-extrabold text-4xl sm:text-5xl md:text-7xl lg:text-8xl pointer-events-auto">
                        Savorly
                    </h1>
                    <p className="lato green text-lg sm:text-xl md:text-2xl lg:text-3xl mt-2 pointer-events-auto">
                        Where Every Dish Tells a Story.
                    </p>
                </div>
                
                <div className="carousel w-full opacity-60 h-[300px] sm:h-[400px] md:h-[600px] lg:h-[700px]">
                    {[
                        { id: "slide1", src: biryani, alt: "Biryani", next: "slide2", prev: "slide4" },
                        { id: "slide2", src: tikka, alt: "Tikka", next: "slide3", prev: "slide1" },
                        { id: "slide3", src: jalebi, alt: "Jalebi", next: "slide4", prev: "slide2" },
                        { id: "slide4", src: laddoo, alt: "Laddoo", next: "slide1", prev: "slide3" },
                    ].map(({ id, src, alt, next, prev }) => (
                        <div key={id} id={id} className="carousel-item relative w-full h-full">
                            <img src={src} alt={alt} className="w-full h-full object-cover" />
                            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between z-30">
                                <a href={`#${prev}`} className="btn btn-circle bg-white/80 hover:bg-white">❮</a>
                                <a href={`#${next}`} className="btn btn-circle bg-white/80 hover:bg-white">❯</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            
            <Top></Top>
            <Philosophy></Philosophy>
            <People></People>
            <Tips></Tips>
        </div>
    );
};

export default Hero;
