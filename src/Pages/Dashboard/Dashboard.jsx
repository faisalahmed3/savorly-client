import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { GiCookingPot, GiSaltShaker } from 'react-icons/gi';
import { Link } from 'react-router';
import Loading from '../../Components/Loading/Loading';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState({ totalItems: 0, myItems: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const allRes = await fetch('https://savorly-sever.vercel.app/recipes');
                const allData = await allRes.json();

                let myData = [];
                if (user?.email) {
                    const myRes = await fetch(`https://savorly-sever.vercel.app/my-recipes?email=${user.email}`);
                    myData = await myRes.json();
                }

                setStats({
                    totalItems: allData.length,
                    myItems: myData.length
                });
            } catch (err) {
                console.error("Failed to fetch stats", err);
            } finally {
                setLoading(false);
            }
        };

        if (user?.email) {
            fetchStats();
        }
    }, [user]);

    if (loading) {
        return (
            <Loading></Loading>
        );
    }

    return (
        <div className="ivory-bg py-16 px-4 sm:px-8 md:px-12 lg:px-20 min-h-screen">
            {/* Header */}
            <div className="text-center mb-14">
                <h1 className="raleway text-4xl sm:text-5xl font-bold green mb-2">
                    Hey {user.displayName || "Chef"}! 👨‍🍳
                </h1>
                <p className="lato text-lg text-gray-600">
                    Let’s see what’s cooking in your kitchen!
                </p>
                <div className="w-24 h-1 bg-amber-600 mx-auto mt-4 rounded-full"></div>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* Profile */}
                <div className="bg-white border-4 border-amber-600 rounded-3xl p-8 shadow-2xl hover:shadow-amber-700 transition-all duration-300 transform hover:-translate-y-1 text-center">
                    <img
                        src={user?.photoURL || `https://i.pravatar.cc/150?u=${user?.email}`}
                        alt="User"
                        className="w-28 h-28 mx-auto rounded-full border-4 border-green-600 object-cover shadow-lg mb-4"
                    />
                    <h2 className="raleway text-2xl font-bold text-gray-800 mb-1">
                        {user?.displayName || "Anonymous Chef"}
                    </h2>
                    <p className="text-gray-700 lato">
                        <strong>Email:</strong> {user?.email}
                    </p>
                </div>

                {/* Total Recipes */}
                <Link to="/all-recipes">
                    <div className="bg-white border-4 border-amber-600 rounded-3xl p-8 shadow-2xl hover:shadow-yellow-600 transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center text-center group">
                        <GiCookingPot className="text-6xl text-amber-600 mb-4 group-hover:rotate-6 transition-transform duration-300" />
                        <h3 className="raleway text-xl font-bold text-gray-800 mb-1">
                            Total Recipes
                        </h3>
                        <p className="text-5xl font-extrabold green">{stats.totalItems}</p>
                        <span className="lato text-gray-500 mt-2">Shared by all users</span>
                    </div>
                </Link>

                {/* My Recipes */}
                <Link to="/my-recipes">
                    <div className="bg-white border-4 border-green-600 rounded-3xl p-8 shadow-2xl hover:shadow-green-700 transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center text-center group">
                        <GiSaltShaker className="text-6xl text-green-600 mb-4 group-hover:rotate-6 transition-transform duration-300" />
                        <h3 className="raleway text-xl font-bold text-gray-800 mb-1">
                            My Recipes
                        </h3>
                        <p className="text-5xl font-extrabold green">{stats.myItems}</p>
                        <span className="lato text-gray-500 mt-2">Crafted with love by you</span>
                    </div>
                </Link>
            </div>

            <div className='flex items-center justify-center mt-5 md:mt-8 lg:mt-12'>
                <Link to="/">
                    <button className='btn btn-wide golden-bg text-white text-lg sm:text-xl md:text-2xl rounded-full py-3 px-6 sm:py-4 md:py-6 btn-hv mb-8'>
                        Home Page
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;
