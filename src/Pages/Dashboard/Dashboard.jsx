import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { GiCookingPot, GiSaltShaker, GiLemon } from 'react-icons/gi';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState({ totalItems: 0, myItems: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const allRes = await fetch('http://localhost:3000/recipes');
                const allData = await allRes.json();

                let myData = [];
                if (user?.email) {
                    const myRes = await fetch(`http://localhost:3000/my-recipes?email=${user.email}`);
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
        return <p className="text-center text-lg text-amber-600 py-10">Loading dashboard data...</p>;
    }

    return (
        <div className="px-4 sm:px-8 md:px-16 lg:px-20 py-12 ivory-bg min-h-screen">
            {/* Welcome Message */}
            <h1 className="raleway text-3xl sm:text-4xl md:text-5xl font-bold green text-center mb-4">
                Welcome, {user.displayName || "Chef"}! 👨‍🍳
            </h1>
            <p className="text-center lato text-gray-600 text-lg mb-12">
                Your personalized recipe dashboard at a glance.
            </p>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
                <div className="border-l-8 border-amber-600 bg-white rounded-3xl p-6 shadow-lg">
                    <h2 className="text-xl font-bold raleway text-gray-800">Total Recipes</h2>
                    <p className="text-4xl font-extrabold green mt-2">{stats.totalItems}</p>
                </div>
                <div className="border-l-8 border-green-600 bg-white rounded-3xl p-6 shadow-lg">
                    <h2 className="text-xl font-bold raleway text-gray-800">My Recipes</h2>
                    <p className="text-4xl font-extrabold green mt-2">{stats.myItems}</p>
                </div>
                <div className="border-l-8 border-yellow-500 bg-white rounded-3xl p-6 shadow-lg">
                    <h2 className="text-xl font-bold raleway text-gray-800">Favorites</h2>
                    <p className="text-4xl font-extrabold green mt-2">--</p>
                </div>
            </div>

            {/* You can keep the User Info and Recent Activity section unchanged */}
        </div>
    );
};

export default Dashboard;
