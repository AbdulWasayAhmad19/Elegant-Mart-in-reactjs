import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useWishlist } from "./context/WishlistContext";
import { useCart } from "./context/CartContext";

export default function CategoryPage() {
    const { categoryName } = useParams();
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();

    // 🧠 Fetch all products
    useEffect(() => {
        fetch("/database.json")
            .then((res) => res.json())
            .then((data) => setProducts(data.products || []))
            .catch((err) => console.error("Error loading products:", err));
    }, []);

    // 🧩 Filter by category name
    useEffect(() => {
        if (products.length > 0) {
            const cleanCategory = decodeURIComponent(categoryName)
                .trim()
                .toLowerCase();

            const filtered = products.filter((item) =>
                item.category?.trim().toLowerCase() === cleanCategory
            );

            setFilteredProducts(filtered);
        }
    }, [categoryName, products]);

    // 🕳️ Empty State
    if (filteredProducts.length === 0) {
        return (
            <main className="flex flex-col justify-center items-center min-h-[60vh] text-center px-4">
                <h2 className="text-2xl md:text-3xl font-bold mb-3 capitalize">
                    {decodeURIComponent(categoryName)}
                </h2>
                <p className="text-gray-500 mb-6">
                    No products found in this category.
                </p>
                <Link
                    to="/"
                    className="bg-[#dc3545] text-white px-6 py-2 rounded-lg hover:bg-white hover:text-[#dc3545] border border-[#dc3545] transition"
                >
                    Back to Home
                </Link>
            </main>
        );
    }

    // 🏬 Main Layout
    return (
        <main className="bg-[#f9f9f9] min-h-screen pt-24 pb-10">
            <div className="mx-2 md:mx-10 bg-white rounded-lg p-5 md:p-10 shadow-sm">
                {/* Header */}
                <h1 className="text-2xl md:text-3xl font-bold text-[#dc3545] mb-6 text-center capitalize">
                    {decodeURIComponent(categoryName)}
                </h1>

                {/* Product Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
                    {filteredProducts.map((product) => {
                        const isInWishlist = wishlist.some((item) => item.id === product.id);

                        return (
                            <div
                                key={product.id}
                                className="group bg-white border border-gray-200 rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-md hover:border-[#dc3545] transition-all relative"
                            >
                                {/* 🥬 Clickable Image + Info */}
                                <div
                                    className="cursor-pointer"
                                    onClick={() => navigate(`/product/${product.id}`)}
                                >
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-36 sm:h-44 md:h-48 object-contain rounded-md mb-2 sm:mb-3 transition-transform duration-200 group-hover:scale-105"
                                    />
                                    <p className="text-center mt-1 font-semibold text-sm sm:text-base md:text-lg text-gray-800 hover:text-[#dc3545] transition">
                                        {product.name}
                                    </p>
                                    <p className="text-center text-gray-500 text-xs sm:text-sm mb-2 sm:mb-3">
                                        {product.size || product.unit}
                                    </p>
                                </div>

                                {/* 💰 Price + Icons */}
                                <div className="flex justify-between items-center mt-1">
                                    <span className="font-bold text-sm sm:text-base text-gray-800">
                                        Rs {product.price}
                                    </span>

                                    <div className="flex items-center gap-2 sm:gap-3">
                                        {/* ❤️ Wishlist Icon */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (isInWishlist) removeFromWishlist(product.id);
                                                else addToWishlist(product);
                                            }}
                                            className={`transition ${isInWishlist
                                                    ? "text-[#dc3545]"
                                                    : "text-gray-400 hover:text-[#dc3545]"
                                                }`}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill={isInWishlist ? "#dc3545" : "none"}
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.8}
                                                stroke="currentColor"
                                                className="w-5 h-5 sm:w-6 sm:h-6 hover:scale-110 transition-transform"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M21 8.25c0-2.485-2.02-4.5-4.5-4.5-1.74 0-3.223.99-4 2.445A4.491 4.491 0 008.5 3.75C6.02 3.75 4 5.765 4 8.25c0 7.22 8 11.25 8 11.25s8-4.03 8-11.25z"
                                                />
                                            </svg>
                                        </button>

                                        {/* 🛒 Add to Cart Icon */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                addToCart(product);
                                            }}
                                        >
                                            <img
                                                src="/Images/add-to-cart.png"
                                                className="w-5 sm:w-6 hover:scale-110 transition-transform"
                                                alt="Add to cart"
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </main>
    );
}
