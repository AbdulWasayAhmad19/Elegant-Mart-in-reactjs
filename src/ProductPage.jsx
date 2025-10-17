
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "./context/CartContext"; // ✅ import your CartContext
import { useWishlist } from "./context/WishlistContext"; // ✅ optional if you want wishlist too

function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);

    const { addToCart } = useCart(); // ✅ from context
    const { addToWishlist, removeFromWishlist, wishlist } = useWishlist(); // optional

    useEffect(() => {
        setLoading(true);
        fetch("/database.json")
            .then((res) => res.json())
            .then((data) => {
                const allProducts = data.products;
                const found = allProducts.find((p) => p.id === parseInt(id));
                setProduct(found);
                setRelatedProducts(
                    allProducts.filter(
                        (p) => p.category === found?.category && p.id !== found?.id
                    )
                );
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error loading product:", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="p-10 text-center">Loading...</div>;
    if (!product)
        return <div className="p-10 text-center text-red-600">Product not found</div>;

    return (
        <main className="pt-36 pb-16 px-4 sm:px-6 lg:px-20 bg-gray-50 min-h-screen">
            {/* Breadcrumb */}
            <div className="text-xs sm:text-sm text-gray-600 mb-6">
                <Link to="/" className="hover:underline">Home</Link> &gt;{" "}
                <Link to="#" className="hover:underline">{product.category}</Link> &gt;{" "}
                <span className="text-[#dc3545] font-semibold">{product.name}</span>
            </div>

            {/* Product Section */}
            <div className="bg-white rounded-xl shadow-md p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left: Image */}
                <div className="flex justify-center items-center">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-64 h-52 sm:w-80 sm:h-60 object-contain rounded-lg"
                    />
                </div>

                {/* Right: Info */}
                <div className="space-y-5">
                    <h1 className="text-2xl sm:text-3xl font-bold">{product.name}</h1>
                    <p className="text-gray-500 text-sm">Category: {product.category}</p>
                    <p className="text-gray-500 text-sm">Unit: {product.unit}</p>

                    <div className="flex items-center gap-3">
                        <span className="text-2xl font-semibold text-[#dc3545]">
                            Rs {product.price}
                        </span>
                    </div>

                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                        {product.description || "No additional description available."}
                    </p>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-3">
                        <label className="font-medium">Quantity:</label>
                        <input
                            type="number"
                            value={quantity}
                            min="1"
                            onChange={(e) => setQuantity(e.target.value)}
                            className="w-20 text-center border border-gray-300 rounded-lg p-2 focus:border-[#dc3545] outline-none"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        {/* 🛒 ADD TO CART */}
                        <button
                            onClick={() => {
                                const productWithQty = { ...product, quantity: Number(quantity) };
                                addToCart(productWithQty); // ✅ works exactly like in HomePage
                            }}
                            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#dc3545] text-white font-medium hover:bg-white hover:text-[#dc3545] hover:border hover:border-[#dc3545] transition"
                        >
                            🛒 Add to Cart
                        </button>

                        {/* ❤️ Wishlist */}
                        <button
                            onClick={() => {
                                const isInWishlist = wishlist.some(
                                    (item) => item.id === product.id
                                );
                                if (isInWishlist) removeFromWishlist(product.id);
                                else addToWishlist(product);
                            }}
                            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition ${wishlist.some(
                                (item) => item.id === product.id
                            )
                                ? "bg-[#dc3545] text-white hover:bg-white hover:text-[#dc3545] hover:border hover:border-[#dc3545]"
                                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                                }`}
                        >
                            ❤️ Wishlist
                        </button>
                    </div>
                </div>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <section className="mt-12">
                    <h2 className="text-lg sm:text-xl font-bold mb-6">Related Products</h2>

                    <div className="flex overflow-x-auto gap-4 rounded-lg bg-white p-4 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        {relatedProducts.map((item) => (
                            <div
                                key={item.id}
                                className="group flex-none w-56 sm:w-64 md:w-64 bg-white border border-gray-200 rounded-xl p-4 shadow hover:border-[#dc3545] transition relative"
                            >
                                <Link to={`/product/${item.id}`}>
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-36 sm:h-40 object-contain rounded-lg"
                                    />
                                    <p className="text-center mt-2 font-medium">{item.name}</p>
                                    <p className="my-1 text-gray-500 text-xs">{item.unit}</p>
                                </Link>

                                <div className="flex justify-between items-center">
                                    <span className="font-semibold">Rs {item.price}</span>

                                    <div className="flex items-center gap-3">
                                        {/* ❤️ Wishlist Icon */}
                                        <button
                                            onClick={() => {
                                                const isInWishlist = wishlist.some(
                                                    (w) => w.id === item.id
                                                );
                                                if (isInWishlist) {
                                                    removeFromWishlist(item.id);
                                                } else {
                                                    addToWishlist(item);
                                                }
                                            }}
                                            className={`transition ${wishlist.some((w) => w.id === item.id)
                                                    ? "text-[#dc3545]"
                                                    : "text-gray-400 hover:text-[#dc3545]"
                                                }`}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill={
                                                    wishlist.some((w) => w.id === item.id)
                                                        ? "#dc3545"
                                                        : "none"
                                                }
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.8}
                                                stroke="currentColor"
                                                className="w-5 h-5 hover:scale-110 transition-transform"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M21 8.25c0-2.485-2.02-4.5-4.5-4.5-1.74 0-3.223.99-4 2.445A4.491 4.491 0 008.5 3.75C6.02 3.75 4 5.765 4 8.25c0 7.22 8 11.25 8 11.25s8-4.03 8-11.25z"
                                                />
                                            </svg>
                                        </button>

                                        {/* 🛒 Add to Cart Icon */}
                                        <button onClick={() => addToCart(item)}>
                                            <img
                                                src="/Images/add-to-cart.png"
                                                alt="Add to Cart"
                                                className="w-6 opacity-70 group-hover:opacity-100 hover:scale-110 transition-transform"
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

        </main>
    );
}

export default ProductPage;
