import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import { Outlet } from 'react-router';

const Home = () => {
    return (
        <div>
            <Navbar />
            <div className="pt-20">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Home;
