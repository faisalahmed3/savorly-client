import React, { useContext } from 'react';
import { Link } from 'react-router';
import logo from "../../assets/Savorly.png";
import { AuthContext } from '../../providers/AuthProvider';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout()
            .then(() => {
                console.log("Logged out successfully");
            })
            .catch(err => console.error(err));
    };

    // If no user, route to login, else route to intended page
    const getLink = (page) => {
        if (user) return page;
        return '/login';
    };

    return (
        <div className="fixed top-0 left-0 w-full z-[200] bg-base-100 drop-shadow-2xl raleway ivory-bg px-4 md:px-10 lg:px-20 transition-all duration-300 hover:bg-amber-50 hover:shadow-xl">


            <div className="navbar flex justify-between items-center">

                {/* Navbar Start */}
                <div className="flex items-center gap-2">
                    <div className="dropdown lg:hidden relative ">
                        <label tabIndex={0} className="btn btn-ghost p-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[100] p-2 shadow bg-base-100 rounded-box w-52">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/all-recipes">All Recipes</Link></li>
                            <li><Link to={getLink("/my-recipes")}>My Recipes</Link></li>
                            <li><Link to={getLink("/add-recipe")}>Add Recipe</Link></li>
                        </ul>
                    </div>

                    <img src={logo} alt="logo" className="w-8 sm:w-10 md:w-12" />
                    <h1 className="green font-extrabold text-xl sm:text-2xl md:text-3xl">Savorly</h1>
                </div>

                {/* Navbar Center */}
                <div className="hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 text-sm lg:text-lg font-semibold">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/all-recipes">All Recipes</Link></li>
                        <li><Link to={getLink("/my-recipes")}>My Recipes</Link></li>
                        <li><Link to={getLink("/add-recipe")}>Add Recipe</Link></li>
                    </ul>
                </div>

                {/* Navbar End */}
                <div className="flex gap-1 sm:gap-2 items-center">
                    {!user && (
                        <>
                            <Link to="/login" className="btn golden-bg text-white text-xs sm:text-sm md:text-base btn-hv px-2 sm:px-4">Login</Link>
                            <Link to="/register" className="btn golden-bg text-white text-xs sm:text-sm md:text-base btn-hv px-2 sm:px-4">Register</Link>
                        </>
                    )}

                    {user && (
                        <>
                            {user.photoURL ? (
                                <Link to="/dashboard"><img src={user.photoURL} alt="User" className="w-10 h-10 rounded-full object-cover" title={user.displayName || "User"} /></Link>
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold">
                                    {user.email[0].toUpperCase()}
                                </div>
                            )}
                            <button
                                onClick={handleLogout}
                                className="btn golden-bg text-white text-xs sm:text-sm md:text-base btn-hv px-2 sm:px-4"
                            >
                                Log Out
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
