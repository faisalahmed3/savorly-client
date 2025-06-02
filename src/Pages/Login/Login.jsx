import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../providers/AuthProvider';

const Login = () => {
    const { login } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        login(email, password)
            .then(() => {
                navigate(from, { replace: true });
            })
            .catch(err => {
                setError(err.message);
            });
    };

    return (
        <div className="hero ivory-bg min-h-screen raleway px-4 py-10 flex items-center justify-center">
            <div className="hero-content flex-col lg:flex-row-reverse w-full max-w-5xl">
                <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
                    <div className="card-body">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold green mb-6 text-center lg:text-left">
                            Login now!
                        </h1>
                        <form onSubmit={handleLogin} className="fieldset">
                            <label className="label green">Email</label>
                            <input type="email" name="email" className="input w-full" placeholder="Email" required />

                            <label className="label green mt-4">Password</label>
                            <input type="password" name="password" className="input w-full" placeholder="Password" required />

                            {error && <p className="text-red-500 mt-2">{error}</p>}

                            <button type="submit" className="btn btn-neutral mt-6 golden-bg text-white w-full btn-hv">
                                Login
                            </button>
                        </form>

                        <p className="text-base md:text-lg mt-6 text-center">
                            Don't have an account? <Link to="/register" className="text-amber-600 font-semibold hover:underline">Register Now!</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
