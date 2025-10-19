import { useCart } from "./context/CartContext";
import { useState, useEffect } from "react";
import { useWishlist } from "./context/WishlistContext";
import { Link } from "react-router-dom";

function HomePage() {
    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();

    const [slideIndex, setSlideIndex] = useState(0);
    const [database, setDatabase] = useState(null);
    const [products, setProducts] = useState([]);

    // 🌐 Fetch the database.json from public folder
    useEffect(() => {
        fetch("/database.json")
            .then((res) => res.json())
            .then((data) => {
                setDatabase(data);
                setProducts(data.products || []);
            })
            .catch((err) => console.error("Error loading products:", err));
    }, []);

    // 🎞️ Slideshow effect
    useEffect(() => {
        if (!database?.slideshow) return;
        const timer = setInterval(() => {
            setSlideIndex((prev) => (prev + 1) % database.slideshow.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [database]);

    if (!database) {
        return <div className="pt-24 text-center text-lg">Loading...</div>;
    }

    return (
        <main className="bg-[#f9f9f9] min-h-screen pt-24">
            {/* SLIDESHOW */}
            <div className="overflow-hidden relative md:mx-10">
                <div className="flex justify-end bg-white px-4 py-2 md:hidden">
                    <Link to="/all-products" className="text-[#dc3545] font-semibold">
                        All Products
                    </Link>
                </div>

                <div className="slideshow w-full rounded-lg relative h-[250px] md:h-[400px] ">
                    {database.slideshow?.map((slide, i) => (
                        <img
                            key={i}
                            src={slide.src}
                            alt={slide.alt}
                            className={`rounded-lg absolute inset-0 w-full h-full transition-opacity duration-700 ${i === slideIndex ? "opacity-100" : "opacity-0"
                                } object-contain md:object-cover `}
                        />
                    ))}
                </div>
            </div>

            {/* 🛍️ SHOP BY CATEGORY */}
            <div
                className="rounded-lg mx-2 md:mx-10 bg-white flex overflow-x-auto scroll-smooth p-5 md:p-10 gap-2 
    [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
                {database.categories?.map((cat, i) => (
                    <Link
                        key={i}
                        to={`/category/${cat.name.toLowerCase()}`} // ✅ Navigate to CategoryPage
                        className="group flex-none cursor-pointer w-40 md:w-52"
                    >
                        <div className="w-40 h-40 md:w-52 md:h-52 overflow-hidden rounded-lg border border-white border-[3px] group-hover:border-[#dc3545] transition-transform duration-200">
                            <img
                                src={cat.image}
                                alt={cat.name}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                        <p className="text-center mt-2 font-medium group-hover:text-[#dc3545] transition">
                            {cat.name}
                        </p>
                    </Link>
                ))}
            </div>

            {/* 🧺 CATEGORY SECTIONS */}
            {database.categories?.map((category, index) => {
                const categoryProducts = products.filter(
                    (p) => p.category === category.name
                );

                if (categoryProducts.length === 0) return null;

                return (
                    <section key={index} className="mb-12">
                        {/* 🖼️ Category Banner */}
                        <div className="mx-2 md:mx-10">
                            <img
                                src={category.banner}
                                alt={category.name}
                                className="rounded-lg w-full transition-transform duration-300"
                            />
                        </div>

                        {/* 🛍️ Products for this Category */}
                        <div
                            className="rounded-lg my-6 md:my-10 bg-white mx-2 md:mx-10 flex overflow-x-auto scroll-smooth p-6 md:p-10 gap-3
                            [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                        >
                            {categoryProducts.map((product, i) => (
                                <div
                                    key={i}
                                    className="group flex-none w-40 sm:w-48 md:w-56 bg-white border border-gray-200 rounded-xl p-3 shadow-sm hover:shadow-md hover:border-[#dc3545] transition-all relative"
                                >
                                    <Link to={`/product/${product.id}`}>
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-36 sm:h-40 object-contain rounded-md mb-2 transition-transform duration-200 group-hover:scale-105"
                                        />
                                        <p className="text-center mt-1 font-semibold text-sm sm:text-base text-gray-800 hover:text-[#dc3545] transition">
                                            {product.name}
                                        </p>
                                        <p className="text-center text-gray-500 text-xs sm:text-sm mb-2">
                                            {product.unit}
                                        </p>
                                    </Link>

                                    <div className="flex justify-between items-center mt-1">
                                        <span className="font-bold text-sm sm:text-base text-gray-800">
                                            Rs {product.price || "N/A"}
                                        </span>

                                        <div className="flex items-center gap-2 sm:gap-3">
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
                                                        wishlist.some(
                                                            (item) => item.id === product.id
                                                        )
                                                            ? "#dc3545"
                                                            : "none"
                                                    }
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
                                            <button onClick={() => addToCart(product)}>
                                                <img
                                                    src="/Images/add-to-cart.png"
                                                    className="w-5 sm:w-6 hover:scale-110 transition-transform"
                                                    alt="Add to cart"
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                );
            })}
        </main>
    );
}

export default HomePage;
