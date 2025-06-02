import React from 'react';

const People = () => {
    return (
        <div className="py-10 px-4 sm:px-8 md:px-16 lg:px-20">
            <h1 className="raleway text-center text-3xl sm:text-4xl md:text-5xl font-bold green mb-10">
                What People Say!!!
            </h1>

            {/* Responsive layout: horizontal scroll on small, flex-wrap on md+ */}
            <div className="flex flex-wrap md:justify-center gap-6 overflow-x-auto md:overflow-visible">
                {[
                    {
                        text: "Savorly completely changed the way I cook at home. The recipes are easy to follow and always a hit with my family!",
                        name: "— Priya R.",
                    },
                    {
                        text: "I love how fresh and creative the dishes are. Savorly makes me actually look forward to cooking every night!",
                        name: "— Mark D.",
                    },
                    {
                        text: "From quick lunches to fancy dinners, Savorly helps me cook with confidence every single time.",
                        name: "— Rachel M.",
                    },
                    {
                        text: "I never knew healthy cooking could taste this good. Savorly makes it fun and flavorful!",
                        name: "— Leo A.",
                    },
                    {
                        text: "The design is beautiful, the recipes are reliable, and the results are always delicious. What more could you ask for?",
                        name: "— Fatima Y.",
                    },
                ].map((review, index) => (
                    <div
                        key={index}
                        className="min-w-[280px] md:min-w-[300px] max-w-sm border-2 border-amber-600 p-6 sm:p-7 md:p-9 rounded-3xl shadow-2xl bg-white flex-shrink-0"
                    >
                        <p className="lato text-base sm:text-lg md:text-xl border-b-2 sm:border-b-4 border-amber-600 pb-4 sm:pb-6">
                            {review.text}
                        </p>
                        <h1 className="font-bold text-xl sm:text-2xl md:text-3xl mt-4 raleway">
                            {review.name}
                        </h1>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default People;
