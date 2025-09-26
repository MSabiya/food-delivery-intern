import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

const AdminPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const sidebarLinks = [
     { name: "All Products", path: "" },
    { name: "Create", path: "/upload" },
    
   
  ];

  // ✅ Fetch products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/items`);
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`${API_BASE}/api/items/${id}`);
      setProducts(products.filter((p) => p._id !== id)); // remove from UI
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete product.");
    }
  };

  // ✅ Edit product (navigate to edit page)
  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Navbar */}
      {/* <div className="flex items-center justify-between px-6 py-3 border-b bg-white">
        <img
          className="h-9"
          src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/dummyLogo/dummyLogoColored.svg"
          alt="dummyLogoColored"
        />
        <div className="flex items-center gap-5 text-gray-500">
          <p>Hi! Admin</p>
          <button className="border rounded-full text-sm px-4 py-1">
            Logout
          </button>
        </div>
      </div> */}
      <Navbar/>

      {/* Main Layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="md:w-64 w-16 border-r border-gray-300 pt-4 flex flex-col">
          {sidebarLinks.map((item, index) => (
            <Link
              to={item.path}
              key={index}
              className={`flex items-center py-3 px-4 gap-3 ${
                location.pathname === item.path
                  ? "border-r-4 border-indigo-500 bg-indigo-50 text-indigo-600"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <p className="hidden md:block">{item.name}</p>
            </Link>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 py-10 flex flex-col justify-between">
          <div className="w-full md:p-10 p-4">
            <h2 className="pb-4 text-lg font-medium">All Products</h2>

            {/* Add button */}
            {/* <div className="flex flex-wrap mx-190">
              <Link
                to="/upload"
                type="button"
                className="px-6 py-2 active:scale-95 transition bg-blue-500 rounded text-white shadow-lg shadow-blue-500/30 text-sm font-medium"
              >
                Add
              </Link>
            </div> */}

            <div className="flex flex-col items-center max-w-5xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20 mt-6">
              <table className="md:table-auto table-fixed w-full overflow-hidden">
                <thead className="text-gray-900 text-sm text-left">
                  <tr>
                    <th className="px-4 py-3 font-semibold truncate">Product</th>
                    <th className="px-4 py-3 font-semibold truncate">Category</th>
                    <th className="px-4 py-3 font-semibold truncate hidden md:block">
                      Selling Price
                    </th>
                    <th className="px-4 py-3 font-semibold truncate">In Stock</th>
                    <th className="px-4 py-3 font-semibold truncate">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-500">
                  {products.map((product, index) => (
                    <tr key={index} className="border-t border-gray-500/20">
                      <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                        <div className="border border-gray-300 rounded overflow-hidden">
                          {product.images?.[0] && (
                            <img
                              src={`${API_BASE}/${product.images[0]}`}
                              alt="Product"
                              className="w-16 h-16 object-cover"
                            />
                          )}
                        </div>
                        <span className="truncate max-sm:hidden w-full">
                          {product.name}
                        </span>
                      </td>
                      <td className="px-4 py-3">{product.category}</td>
                      <td className="px-4 py-3 max-sm:hidden">
                        ₹{product.offerPrice > 0 ? product.offerPrice : product.price}
                      </td>
                      <td className="px-4 py-3">
                        <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            defaultChecked={product.inStock}
                          />
                          <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200"></div>
                          <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                        </label>
                      </td>
                      {/* ✅ Edit & Delete Buttons */}
                      <td className="px-4 py-3 space-x-2">
                        <button
                          onClick={() => handleEdit(product._id)}
                          className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 active:scale-95 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 active:scale-95 transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {products.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center py-6 text-gray-400">
                        No products found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
