import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "./context/CartContext";
import martLogo from "./assets/Images/martlogo.jpg";
function Navbar() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isSearchOpen, setSearchOpen] = useState(false);
    const [isDeliverOpen, setDeliverOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [icons, setIcons] = useState({});
    const { cart } = useCart();

    // ✅ Fetch both categories and icons dynamically from database.json
    useEffect(() => {
        fetch("/database.json")
            .then((res) => res.json())
            .then((data) => {
                setCategories(data.categories || []);
                setIcons(data.icons || {});
            })
            .catch((err) => console.error("Error loading database:", err));
    }, []);

    return (
        <>
            {/* ✅ Navbar Header */}
            <header className="bg-[#dc3545] text-white shadow-md fixed top-0 left-0 w-full z-50">
                <div className="flex justify-between items-center px-4 py-3">
                    {/* Left: Logo + Deliver To */}
                    <div className="flex items-center space-x-2">
                        {icons.martlogo && (
                            <img
                                src={icons.martlogo}
                                alt="Elegant Mart Logo"
                                className="h-10 md:h-12 w-auto"
                            />
                        )}

                        <button
                            onClick={() => setDeliverOpen(true)}
                            className="flex items-center space-x-1 hover:opacity-80 focus:outline-none"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                className="w-5 h-5 text-white"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12 2.25c-3.728 0-6.75 2.94-6.75 6.563 0 4.335 6.75 12.937 6.75 12.937s6.75-8.602 6.75-12.937c0-3.623-3.022-6.563-6.75-6.563zm0 8.438a1.875 1.875 0 1 1 0-3.75 1.875 1.875 0 0 1 0 3.75z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <div className="flex flex-col leading-tight">
                                <span className="text-sm">Deliver to ▼</span>
                                <span className="text-xs text-gray-200 truncate w-28 md:w-32">
                                    560 block f Johar town, La...
                                </span>
                            </div>
                        </button>
                    </div>

                    {/* Right: Login/Profile (Mobile only) */}
                    <div className="md:hidden">
                        <Link to="/login">
                            {icons.profile && (
                                <img
                                    src={icons.profile}
                                    alt="Profile"
                                    className="w-9 h-9 rounded-full hover:opacity-80"
                                />
                            )}
                        </Link>
                    </div>

                    {/* Middle: Search bar (desktop only) */}
                    <div className="hidden md:flex items-center flex-1 justify-center mx-4">
                        <div className="relative w-3/5">
                            <input
                                type="text"
                                placeholder="Search for products..."
                                className="w-full py-2 pl-10 pr-4 rounded-full bg-white focus:outline-none text-gray-800"
                            />
                            <div
                                className="absolute left-3 top-2 text-gray-500 cursor-pointer hover:text-[#dc3545] transition-colors"
                                onClick={() => setSidebarOpen(true)}
                            >
                                &#9776;
                            </div>
                        </div>

                        {/* Wishlist Icon beside search bar */}
                        <Link
                            to="/wishlist"
                            className="ml-4 flex items-center justify-center bg-white rounded-full w-10 h-10 hover:bg-gray-100 transition"
                        >
                            {icons.wishlist && (
                                <img
                                    src={icons.wishlist}
                                    alt="Wishlist"
                                    className="w-6 h-6 object-contain"
                                />
                            )}
                        </Link>
                    </div>

                    {/* Right side: All Products, Cart, Login */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link
                            to="/all-products"
                            className="text-white font-semibold hover:text-gray-200"
                        >
                            All Products
                        </Link>

                        <Link to="/cart" className="relative">
                            {icons.cart && (
                                <img
                                    src={icons.cart}
                                    alt="Cart"
                                    className="w-10 h-10 rounded-full object-cover border border-gray-300"
                                />
                            )}
                            {cart.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-[#dc3545] text-white text-xs rounded-full px-1.5">
                                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                                </span>
                            )}
                        </Link>

                        <Link to="/login">
                            {icons.profile && (
                                <img
                                    src={icons.profile}
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full hover:opacity-80"
                                />
                            )}
                        </Link>
                    </div>
                </div>
            </header>

            {/* ✅ Compact Mobile Bottom Navbar */}
            <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/80 backdrop-blur-lg border-t border-gray-200 flex justify-around items-center py-2 md:hidden z-50">
                {/* Categories */}
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="flex flex-col items-center text-gray-600 hover:text-[#dc3545] transition-colors"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 mb-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                    <span className="text-[10px] leading-tight">Categories</span>
                </button>

                {/* Home */}
                <Link
                    to="/"
                    className="flex flex-col items-center text-gray-600 hover:text-[#dc3545] transition-colors"
                >
                    {icons.home && (
                        <img src={icons.home} className="w-5 h-5 mb-0.5" alt="Home" />
                    )}
                    <span className="text-[10px] leading-tight">Home</span>
                </Link>

                {/* Search */}
                <button
                    onClick={() => setSearchOpen(true)}
                    className="flex flex-col items-center text-gray-600 hover:text-[#dc3545] transition-colors"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 mb-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                        />
                    </svg>
                    <span className="text-[10px] leading-tight">Search</span>
                </button>

                {/* Wishlist */}
                <Link
                    to="/wishlist"
                    className="flex flex-col items-center text-gray-600 hover:text-[#dc3545] transition-colors"
                >
                    {icons.wishlist && (
                        <img
                            src={icons.wishlist}
                            alt="Wishlist"
                            className="w-5 h-5 mb-0.5 object-contain"
                        />
                    )}
                    <span className="text-[10px] leading-tight">Wishlist</span>
                </Link>

                {/* Cart */}
                <Link
                    to="/cart"
                    className="flex flex-col items-center text-gray-600 hover:text-[#dc3545] transition-colors relative"
                >
                    {icons.cart && (
                        <img src={icons.cart} alt="Cart" className="w-5 h-5 mb-0.5" />
                    )}
                    <span className="text-[10px] leading-tight">Cart</span>
                    {cart.length > 0 && (
                        <span className="absolute top-0 right-2 bg-[#dc3545] text-white text-[9px] px-1 py-0.5 rounded-full">
                            {cart.reduce((sum, item) => sum + item.quantity, 0)}
                        </span>
                    )}
                </Link>
            </nav>

            {/* ✅ Overlay for Sidebar */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* ✅ Sidebar (Dynamic Categories) */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-800">Categories</h2>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="text-gray-600 text-2xl hover:text-[#dc3545]"
                    >
                        &times;
                    </button>
                </div>

                <ul className="p-4 space-y-4 text-gray-700">
                    {categories.length > 0 ? (
                        categories.map((cat) => (
                            <li key={cat.id}>
                                <Link
                                    to={`/category/${encodeURIComponent(cat.name.toLowerCase())}`}
                                    className="block hover:text-[#dc3545] font-medium"
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    {cat.name}
                                </Link>
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-500 text-sm">Loading categories...</p>
                    )}
                </ul>
            </div>



            {/* ✅ Search Panel (Mobile) */}
            {isSearchOpen && (
                <>
                    {/* Overlay */}
                    <div
                        className="fixed inset-0 bg-black/50 z-40"
                        onClick={() => setSearchOpen(false)}
                    ></div>

                    {/* Bottom Sheet Popup */}
                    <div
                        className="fixed bottom-0 left-0 w-full bg-white rounded-t-2xl shadow-2xl z-50 animate-slide-up p-5"
                        style={{
                            height: "50vh", // half of screen height
                        }}
                    >
                        {/* Drag Handle */}
                        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4"></div>

                        {/* Heading */}
                        <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                            Search Products
                        </h2>

                        {/* Search Input */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search for products..."
                                className="w-full border border-gray-300 rounded-full py-2 pl-10 pr-4 focus:ring-2 focus:ring-[#dc3545] outline-none"
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 text-gray-500 absolute left-3 top-2.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                                />
                            </svg>
                        </div>

                        {/* Optional — example suggestion list */}
                        <ul className="mt-5 space-y-3 text-gray-700 overflow-y-auto max-h-40">
                            <li className="hover:text-[#dc3545] cursor-pointer">Milk</li>
                            <li className="hover:text-[#dc3545] cursor-pointer">Bread</li>
                            <li className="hover:text-[#dc3545] cursor-pointer">Eggs</li>
                            <li className="hover:text-[#dc3545] cursor-pointer">Fruits</li>
                        </ul>

                        {/* Close Button */}
                        <button
                            onClick={() => setSearchOpen(false)}
                            className="absolute top-3 right-4 text-2xl text-gray-500 hover:text-[#dc3545]"
                        >
                            &times;
                        </button>
                    </div>
                </>
            )}


        </>
    );
}

export default Navbar;
