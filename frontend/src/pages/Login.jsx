
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    BriefcaseBusiness,
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!formData.email || !formData.password) {
            setError("Please enter your email and password.");
            return;
        }

        try {
            setLoading(true);

            await login(formData);

            navigate("/dashboard");
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Invalid email or password."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="app-theme min-h-screen bg-gray-50 flex items-center justify-center p-4">

            <div className="auth-card w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">

                {/* Left section */}
                <div className="auth-hero-panel hidden md:flex flex-col justify-between bg-gradient-to-br from-blue-700 to-indigo-900 text-white p-10">

                    <Link to="/" className="flex items-center gap-2">
                        <BriefcaseBusiness size={30} />
                        <span className="text-2xl font-bold">
                            CareerPilot
                        </span>
                    </Link>

                    <div>
                        <h1 className="text-4xl font-bold leading-tight mb-5">
                            Build your career with confidence.
                        </h1>

                        <p className="text-blue-100 leading-relaxed">
                            Analyze your resume, discover career
                            opportunities, and identify the skills
                            you need to grow.
                        </p>
                    </div>

                    <p className="text-sm text-blue-200">
                        Your career journey starts here.
                    </p>

                </div>

                {/* Right section */}
                <div className="p-7 sm:p-10">

                    <div className="md:hidden flex items-center gap-2 mb-8 text-blue-700">
                        <BriefcaseBusiness size={27} />
                        <span className="text-xl font-bold">
                            CareerPilot
                        </span>
                    </div>

                    <h2 className="text-3xl font-bold text-gray-800">
                        Welcome Back!
                    </h2>

                    <p className="text-gray-500 mt-2 mb-8">
                        Login to continue your career journey.
                    </p>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-5">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>

                            <div className="relative">
                                <Mail
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>

                            <div className="relative">
                                <Lock
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    className="w-full border border-gray-300 rounded-lg pl-10 pr-12 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                                >
                                    {showPassword ? (
                                        <EyeOff size={19} />
                                    ) : (
                                        <Eye size={19} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition"
                        >
                            {loading ? "Logging in..." : "Login"}
                            {!loading && <ArrowRight size={18} />}
                        </button>

                    </form>

                    <p className="text-center text-gray-500 text-sm mt-7">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="text-blue-600 font-semibold hover:underline"
                        >
                            Create Account
                        </Link>
                    </p>

                    <Link
                        to="/"
                        className="block text-center text-sm text-gray-400 hover:text-blue-600 mt-5"
                    >
                        Back to Home
                    </Link>

                </div>
            </div>
        </div>
    );
}

export default Login;
