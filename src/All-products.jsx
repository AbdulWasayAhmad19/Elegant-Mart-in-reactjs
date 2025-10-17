
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "./context/WishlistContext";
import { useCart } from "./context/CartContext";

function AllProducts() {
    const [products, setProducts] = useState([]);
    const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();

    // ✅ Fetch data from database.json
    useEffect(() => {
        fetch("/database.json")
            .then((res) => res.json())
            .then((data) => setProducts(data.products))
            .catch((err) => console.error("Error loading products:", err));
    }, []);

    return (
        <main className="bg-[#f9f9f9] min-h-screen pt-24 pb-10">
            <div className="mx-2 md:mx-10 bg-white rounded-lg p-5 md:p-10">
                {/* Page Header */}
                <h1 className="text-2xl md:text-3xl font-bold text-[#dc3545] mb-6 text-center">
                    All Products
                </h1>

                {/* Product Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="group flex-none w-56 sm:w-64 md:w-64 bg-white border border-gray-200 rounded-xl p-4 shadow hover:border-[#dc3545] transition relative"
                        >
                            {/* 🥬 Clickable Image + Info */}
                            <Link to={`/product/${product.id}`}>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-44 sm:h-52 object-contain rounded-lg mb-3 transition-transform duration-200 group-hover:scale-105"
                                />
                                <p className="text-center mt-2 font-semibold text-base sm:text-lg hover:text-[#dc3545] transition">
                                    {product.name}
                                </p>
                                <p className="text-center text-gray-500 text-sm mb-3">
                                    {product.size || product.unit}
                                </p>
                            </Link>

                            {/* 💰 Price + Icons */}
                            <div className="flex justify-between items-center mt-2">
                                <span className="font-bold text-lg text-gray-800">
                                    Rs {product.price}
                                </span>

                                <div className="flex items-center gap-3">
                                    {/* ❤️ Wishlist Icon */}
                                    <button
                                        onClick={() => {
                                            const isInWishlist = wishlist.some(
                                                (item) => item.id === product.id
                                            );
                                            if (isInWishlist) {
                                                removeFromWishlist(product.id);
                                            } else {
                                                addToWishlist(product);
                                            }
                                        }}
                                        className={`transition ${wishlist.some((item) => item.id === product.id)
                                            ? "text-[#dc3545]"
                                            : "text-gray-400 hover:text-[#dc3545]"
                                            }`}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill={
                                                wishlist.some((item) => item.id === product.id)
                                                    ? "#dc3545"
                                                    : "none"
                                            }
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.8}
                                            stroke="currentColor"
                                            className="w-6 h-6 hover:scale-110 transition-transform"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M21 8.25c0-2.485-2.02-4.5-4.5-4.5-1.74 0-3.223.99-4 2.445A4.491 4.491 0 008.5 3.75C6.02 3.75 4 5.765 4 8.25c0 7.22 8 11.25 8 11.25s8-4.03 8-11.25z"
                                            />
                                        </svg>
                                    </button>

                                    {/* 🛒 Add to Cart Icon */}
                                    <button onClick={() => addToCart(product)}>
                                        <img
                                            src="/Images/add-to-cart.png"
                                            className="w-7 hover:scale-110 transition-transform"
                                            alt="Add to cart"
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}

export default AllProducts;
