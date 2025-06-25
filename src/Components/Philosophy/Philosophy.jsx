import React from 'react';
import { GiHeartBeats, GiHerbsBundle, GiKnifeThrust } from "react-icons/gi";

const Philosophy = () => {
    return (
        <div className="px-4 sm:px-8 md:px-12 lg:px-20 py-16 ">
            <h1 className="raleway text-center text-3xl sm:text-4xl md:text-5xl font-bold green mb-4">
                The Savorly Way
            </h1>
            <div className="w-24 h-1 bg-amber-600 mx-auto mb-10 rounded-full"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                    {
                        icon: <GiKnifeThrust className="text-5xl sm:text-6xl text-amber-600 transition-transform duration-300 group-hover:rotate-6" />,
                        title: "Simplicity",
                        desc: "Our recipes are made for real kitchens and real people—no fluff, no fuss.",
                    },
                    {
                        icon: <GiHerbsBundle className="text-5xl sm:text-6xl text-amber-600 transition-transform duration-300 group-hover:rotate-6" />,
                        title: "Freshness",
                        desc: "We focus on wholesome ingredients and recipes that highlight natural flavors.",
                    },
                    {
                        icon: <GiHeartBeats className="text-5xl sm:text-6xl text-amber-600 transition-transform duration-300 group-hover:rotate-6" />,
                        title: "Passion",
                        desc: "Cooking isn’t just a task—it’s love, shared on every plate.",
                    },
                ].map((item, i) => (
                    <div
                        key={i}
                        className="group border-amber-600 border-4 rounded-3xl p-6 sm:p-7 md:p-9 text-center flex flex-col items-center gap-4  shadow-2xl hover:shadow-amber-700 transition-all duration-300"
                    >
                        {item.icon}
                        <h2 className="raleway text-xl sm:text-2xl md:text-3xl font-bold">
                            {item.title}
                        </h2>
                        <p className="text-base sm:text-lg lato text-gray-700">
                            {item.desc}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Philosophy;
