import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useCart } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

const ProductCard = () => {
  const categories = [
    "All",
    "Biriyani",
    "Parotta",
    "Pizza",
    "Chicken Curry",
    "Burger",
    "Fried Rice",
  ];

  const navigate = useNavigate(); 

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const { cart, addToCart, increaseQty, decreaseQty } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/items`);
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  const getQuantity = (productId) => {
    const item = cart.find((p) => p.productId._id === productId);
    return item ? item.quantity : 0;
  };

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          (p) => p.category?.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <>
      <Navbar />
      <div className="flex">
        {/* Categories */}
        <div className="w-48 bg-gray-100 p-4 min-h-screen">
          <h2 className="text-lg font-bold mb-4">Categories</h2>
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition ${
                    selectedCategory === cat
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Products */}
        <div className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4">
            {selectedCategory} Products
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((item) => (
              <div
                key={item._id}
                className="bg-white border rounded-lg shadow-lg overflow-hidden hover:-translate-y-1 transition"
              >
                {item.images?.[0] && (
                  <img
                    src={`${API_BASE}/${item.images[0]}`}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4 text-sm">
                  <p className="text-green-600 font-bold">₹{item.price}</p>
                  <p className="text-slate-800 text-lg font-medium">
                    {item.name}
                  </p>
                  <p className="text-slate-500">{item.description}</p>

                  <div className="grid grid-cols-2 gap-2 mt-3">
                    {getQuantity(item._id) === 0 ? (
                      <button
                        onClick={() => addToCart(item)}
                        className="bg-indigo-500 text-white py-1 rounded"
                      >
                        Add
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 bg-indigo-100 px-2 py-1 rounded">
                        <button onClick={() => decreaseQty(item._id)}>-</button>
                        <span>{getQuantity(item._id)}</span>
                        <button onClick={() => increaseQty(item._id)}>+</button>
                      </div>
                    )}

                    <button
                      onClick={() =>
                        navigate("/payment", { state: { product: item } })
                      }
                      className="bg-gray-900 text-white py-1 rounded"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductCard;
