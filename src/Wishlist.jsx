import React, { useEffect, useState } from "react";
import { useWishlist } from "./context/WishlistContext";
import { useCart } from "./context/CartContext";

function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const [database, setDatabase] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  // ✅ Fetch data from local database.json
  useEffect(() => {
    fetch("/database.json")
      .then((res) => res.json())
      .then((data) => {
        setDatabase(data);
        // You can choose related products however you want — here we just pick the first 8
        setRelatedProducts(data.products.slice(0, 8));
      })
      .catch((err) => console.error("Error loading database.json:", err));
  }, []);

  // ⏳ Loading state
  if (!database) {
    return (
      <div className="mt-28 text-center text-gray-500">
        Loading wishlist...
      </div>
    );
  }

  // 🛍️ Empty Wishlist
  if (wishlist.length === 0) {
    return (
      <div className="mt-28 flex flex-col items-center justify-center text-gray-600 px-4 min-h-[60vh]">
        <img
          src={database.icons?.wishlist || "/Images/wishlist.svg"}
          alt="Empty wishlist"
          className="w-56 h-56 object-contain mb-4"
        />
        <p className="text-lg">Your wishlist is empty.</p>
      </div>
    );
  }

  // 💖 Wishlist Page
  return (
    <div className="mt-28 mb-0 px-4 md:px-10 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-[#dc3545]">❤️ My Wishlist</h2>

      {/* Wishlist Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-12">
        {wishlist.map((product) => (
          <div
            key={product.id}
            className="group bg-white border border-gray-200 rounded-xl p-4 shadow hover:border-[#dc3545] transition relative"
          >
            {/* Remove from Wishlist */}
            <button
              onClick={() => removeFromWishlist(product.id)}
              className="absolute top-3 right-3 text-gray-400 hover:text-[#dc3545] transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Product Image */}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 sm:h-52 object-contain rounded-lg mb-3"
            />

            {/* Product Info */}
            <p className="text-center mt-2 font-semibold text-base sm:text-lg">{product.name}</p>
            <p className="text-center text-gray-500 text-sm mb-3">{product.unit}</p>

            {/* Price + Add to Cart */}
            <div className="flex justify-between items-center">
              <span className="font-bold text-lg text-gray-800">Rs {product.price}</span>
              <button
                onClick={() =>
                  addToCart({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    unit: product.unit,
                    image: product.image,
                    quantity: 1,
                  })
                }
              >
                <img
                  src={database.icons?.cart || "/Images/add-to-cart.png"}
                  alt="Add to cart"
                  className="w-7 hover:scale-110 transition-transform"
                />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Related Products */}
      <div className="mt-10 pb-10">
        <h3 className="text-xl font-semibold mb-4 text-[#dc3545]">Related Products</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {relatedProducts.map((item) => (
            <div
              key={item.id}
              className="group bg-white border border-gray-200 rounded-xl p-4 shadow hover:border-[#dc3545] transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 sm:h-48 object-contain mb-3 rounded-lg"
              />
              <p className="text-center mt-1 font-semibold text-base sm:text-lg">{item.name}</p>
              <p className="text-center text-gray-500 text-sm mb-3">{item.unit}</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg text-gray-800">Rs {item.price}</span>
                <button onClick={() => addToCart({ ...item, quantity: 1 })}>
                  <img
                    src={database.icons?.cart || "/Images/add-to-cart.png"}
                    alt="Add to cart"
                    className="w-7 hover:scale-110 transition-transform"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Wishlist;
