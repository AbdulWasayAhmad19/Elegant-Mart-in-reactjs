import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import HomePage from "./Homepage";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Login from "./Login";
import Signup from "./Signup";
import ProductPage from "./ProductPage";
import AllProducts from "./All-products";
import Wishlist from "./Wishlist";
import CategoryPage from "./CategoryPage";
import AdminPortal from "./AdminPortal";
import OrderManagement from "./OrderManagement";
import AnalyticsReports from "./AnalyticsReports";
import CustomerManagement from "./CustomerManagement";
import TransactionManagement from "./TransactionManagement";
import Notifications from "./Notifications";
import ProductsInventory from "./ProductsInventory";

function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      {/* Only show Navbar/Footer if NOT on admin pages */}
      {!isAdminPage && <Navbar />}

      <Routes>
        {/* Normal pages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/all-products" element={<AllProducts />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />

        {/* Admin pages */}
        <Route path="/admin" element={<AdminPortal />} />
        <Route path="/admin/orders" element={<OrderManagement />} />
        <Route path="/admin/analytics" element={<AnalyticsReports />} />
        <Route path="/admin/customers" element={<CustomerManagement />} />
        <Route path="/admin/payments" element={<TransactionManagement />} />
        <Route path="/admin/notifications" element={<Notifications />} />
        <Route path="/admin/products" element={<ProductsInventory />} />
      </Routes>

      {!isAdminPage && <Footer />}
    </>
  );
}

export default App;
