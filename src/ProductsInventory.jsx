import React, { useState } from "react";

const ProductsInventory = () => {
    const [showCategoryForm, setShowCategoryForm] = useState(false);
    const [showProductForm, setShowProductForm] = useState(false);

    const toggleCategoryForm = () => setShowCategoryForm(!showCategoryForm);
    const toggleProductForm = () => setShowProductForm(!showProductForm);

    return (
        <div className="bg-gray-100 min-h-screen font-sans">
            {/* Header */}
            <header className="bg-[#dc3545] text-white p-4 flex justify-between items-center shadow">
                <h1 className="text-xl font-bold">Products & Inventory Management</h1>
                <div className="flex items-center space-x-4">
                    <span className="text-sm">Welcome, Admin</span>
                    <img
                        src="Images/Profile icon.jpg"
                        alt="Profile"
                        className="w-10 h-10 rounded-full border"
                    />
                </div>
            </header>

            {/* Main Content */}
            <main className="p-6 space-y-12">
                {/* Stats Overview */}
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[
                        { title: "Total Sales", value: "Rs 1,200,000" },
                        { title: "Orders", value: "2,340" },
                        { title: "Customers", value: "1,120" },
                        { title: "Products", value: "340" },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white p-6 rounded-lg shadow text-center">
                            <h3 className="text-sm text-gray-500">{stat.title}</h3>
                            <p className="text-2xl font-bold text-[#dc3545]">{stat.value}</p>
                        </div>
                    ))}
                </section>

                {/* ================= CATEGORY MANAGEMENT ================= */}
                <section>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Manage Categories</h2>
                        <button
                            onClick={toggleCategoryForm}
                            className="bg-[#dc3545] text-white px-4 py-2 rounded-lg shadow hover:bg-red-600"
                        >
                            + Add Category
                        </button>
                    </div>

                    {/* Category Form */}
                    {showCategoryForm && (
                        <div className="bg-white p-6 rounded-lg shadow mb-6">
                            <h3 className="text-md font-bold mb-3">Create / Edit Category</h3>
                            <form className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Category Name"
                                    className="w-full px-4 py-2 border rounded-lg"
                                    required
                                />
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="w-full px-4 py-2 border rounded-lg"
                                    required
                                />
                                <div className="flex space-x-3">
                                    <button
                                        type="submit"
                                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                                    >
                                        Save
                                    </button>
                                    <button
                                        type="button"
                                        onClick={toggleCategoryForm}
                                        className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Category Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {[
                            { name: "Fruits", img: "Images/fruits.jpg" },
                            { name: "Vegetables", img: "Images/vegetables.jpg" },
                        ].map((cat, i) => (
                            <div key={i} className="bg-white p-4 rounded-lg shadow text-center">
                                <img
                                    src={cat.img}
                                    alt={cat.name}
                                    className="h-24 w-full object-cover rounded-md mb-2"
                                />
                                <h3 className="font-bold mb-2">{cat.name}</h3>
                                <div className="flex justify-center space-x-3">
                                    <button className="text-blue-500 hover:underline">Edit</button>
                                    <button className="text-red-500 hover:underline">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ================= PRODUCT MANAGEMENT ================= */}
                <section>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Manage Products</h2>
                        <button
                            onClick={toggleProductForm}
                            className="bg-[#dc3545] text-white px-4 py-2 rounded-lg shadow hover:bg-red-600"
                        >
                            + Add Product
                        </button>
                    </div>

                    {/* Product Form */}
                    {showProductForm && (
                        <div className="bg-white p-6 rounded-lg shadow mb-6">
                            <h3 className="text-md font-bold mb-3">Add / Edit Product</h3>
                            <form className="space-y-4">
                                <select className="w-full px-4 py-2 border rounded-lg" required>
                                    <option value="">Select Category</option>
                                    <option value="fruits">Fruits</option>
                                    <option value="vegetables">Vegetables</option>
                                    <option value="dairy">Dairy</option>
                                </select>
                                <input
                                    type="text"
                                    placeholder="Product Name"
                                    className="w-full px-4 py-2 border rounded-lg"
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Product Type (e.g., Organic, Frozen)"
                                    className="w-full px-4 py-2 border rounded-lg"
                                    required
                                />
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="w-full px-4 py-2 border rounded-lg"
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Available Sizes (e.g., 1kg, 500g)"
                                    className="w-full px-4 py-2 border rounded-lg"
                                    required
                                />

                                <div className="flex space-x-3">
                                    <button
                                        type="submit"
                                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                                    >
                                        Save Product
                                    </button>
                                    <button
                                        type="button"
                                        onClick={toggleProductForm}
                                        className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Products Table */}
                    <div className="bg-white rounded-lg shadow overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-3 border">Image</th>
                                    <th className="p-3 border">Name</th>
                                    <th className="p-3 border">Category</th>
                                    <th className="p-3 border">Type</th>
                                    <th className="p-3 border">Sizes</th>
                                    <th className="p-3 border">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    {
                                        img: "Images/apple.jpg",
                                        name: "Apple",
                                        cat: "Fruits",
                                        type: "Organic",
                                        size: "1kg, 500g",
                                    },
                                    {
                                        img: "Images/milk.jpg",
                                        name: "Milk",
                                        cat: "Dairy",
                                        type: "Fresh",
                                        size: "1L, 500ml",
                                    },
                                ].map((p, i) => (
                                    <tr key={i} className="hover:bg-gray-50">
                                        <td className="p-3 border">
                                            <img
                                                src={p.img}
                                                alt={p.name}
                                                className="w-12 h-12 rounded-md"
                                            />
                                        </td>
                                        <td className="p-3 border">{p.name}</td>
                                        <td className="p-3 border">{p.cat}</td>
                                        <td className="p-3 border">{p.type}</td>
                                        <td className="p-3 border">{p.size}</td>
                                        <td className="p-3 border">
                                            <button className="text-blue-500 hover:underline">
                                                Edit
                                            </button>{" "}
                                            |
                                            <button className="text-red-500 hover:underline">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default ProductsInventory;
