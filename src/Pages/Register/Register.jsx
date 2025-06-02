import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../providers/AuthProvider';
import { updateProfile } from 'firebase/auth';

const Register = () => {
    const { register } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;

        try {
            const result = await register(email, password);
            const user = result.user;

            await updateProfile(user, {
                displayName: name,
                photoURL: photo
            });

            
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="hero ivory-bg min-h-screen raleway px-4 py-10 flex items-center justify-center">
            <div className="hero-content flex-col lg:flex-row-reverse w-full max-w-5xl">
                <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
                    <div className="card-body">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold green mb-6 text-center lg:text-left">
                            Register now!
                        </h1>
                        <form onSubmit={handleRegister}>
                            <label className="label green">Name</label>
                            <input type="text" name="name" className="input w-full" placeholder="Your Name" required />

                            <label className="label green">Photo URL</label>
                            <input
                                type="text"
                                name="photo"
                                className="input w-full"
                                placeholder="Enter Your Photo URL"
                                defaultValue="https://i.ibb.co/5hfH60nw/shutterstock-2480850611.jpg"
                                required
                            />
                            

                            <label className="label green">Email</label>
                            <input type="email" name="email" className="input w-full" placeholder="Email" required />

                            <label className="label green mt-4">Password</label>
                            <input type="password" name="password" className="input w-full" placeholder="Password" required />

                            {error && <p className="text-red-500 mt-2">{error}</p>}

                            <button type="submit" className="btn btn-neutral mt-6 golden-bg text-white w-full btn-hv">
                                Register
                            </button>
                        </form>

                        <p className="text-base md:text-lg mt-6 text-center">
                            Already have an account?{' '}
                            <Link to="/login" className="text-amber-600 font-semibold hover:underline">
                                Login Now!
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
