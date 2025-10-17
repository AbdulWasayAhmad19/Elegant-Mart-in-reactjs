import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        remember: false,
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Login data:", formData);
        alert("Login submitted! (You can integrate backend later)");
    };

    return (
        <main className="flex justify-center items-center min-h-screen px-4 py-12 my-10">
            <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8 pop-out">
                {/* Logo + Heading */}
                <div className="text-center mb-6">
                    <img
                        src="/Images/martlogo.jpg"
                        alt="Elegant Mart Logo"
                        className="w-28 mx-auto mb-4"
                    />
                    <h2 className="text-2xl font-bold text-[#dc3545]">Welcome Back</h2>
                    <p className="text-gray-600 mt-1">Login to continue your shopping</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email */}
                    <div className="relative">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="peer w-full px-4 pt-5 pb-2 border rounded-lg focus:ring-2 focus:ring-[#dc3545] outline-none"
                            placeholder=" " // keep a single space so peer-placeholder-shown works
                        />
                        <label
                            htmlFor="email"
                            className="absolute left-4 top-2 text-gray-500 text-sm transition-all 
      peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
      peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#dc3545]
      peer-valid:top-0 peer-valid:text-xs peer-valid:text-[#dc3545]"
                        >
                            Email Address
                        </label>
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="peer w-full px-4 pt-5 pb-2 border rounded-lg focus:ring-2 focus:ring-[#dc3545] outline-none"
                            placeholder=" "
                        />
                        <label
                            htmlFor="password"
                            className="absolute left-4 top-2 text-gray-500 text-sm transition-all 
      peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
      peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#dc3545]
      peer-valid:top-0 peer-valid:text-xs peer-valid:text-[#dc3545]"
                        >
                            Password
                        </label>
                    </div>

                    {/* Remember Me + Forgot */}
                    <div className="flex justify-between items-center text-sm">
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name="remember"
                                checked={formData.remember}
                                onChange={handleChange}
                                className="rounded text-[#dc3545] focus:ring-[#dc3545]"
                            />
                            <span>Remember Me</span>
                        </label>
                        <Link to="#" className="text-[#dc3545] hover:underline">
                            Forgot Password?
                        </Link>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-[#dc3545] text-white py-3 rounded-lg font-medium hover:bg-white hover:text-[#dc3545] hover:border hover:border-[#dc3545] transition"
                    >
                        Login
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="px-2 text-gray-400 text-sm">OR</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                {/* Social Login */}
                <div className="flex gap-3 justify-center">
                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                        <img
                            src="https://img.icons8.com/color/24/google-logo.png"
                            alt="Google"
                        />
                        <span className="text-sm">Google</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                        <img
                            src="https://img.icons8.com/ios-filled/24/1877F2/facebook-new.png"
                            alt="Facebook"
                        />
                        <span className="text-sm">Facebook</span>
                    </button>
                </div>

                {/* Signup Link */}
                <p className="text-center text-sm mt-6">
                    Don’t have an account?{" "}
                    <Link
                        to="/signup"
                        className="text-[#dc3545] hover:underline font-medium"
                    >
                        Sign Up
                    </Link>
                </p>
            </div>
        </main>
    );
}
