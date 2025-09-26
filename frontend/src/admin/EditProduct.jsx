import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    offerPrice: "",
    inStock: true,
  });

  // ✅ Fetch product details
  useEffect(() => {
    axios
      .get(`${API_BASE}/api/items/${id}`)
      .then((res) => setForm(res.data))
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  // ✅ Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_BASE}/api/items/${id}`, form);
      alert("Product updated successfully!");
      navigate("/"); // go back to admin page
    } catch (err) {
      console.error("Error updating product:", err);
      alert("Failed to update product.");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={form.name || ""}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="category"
          value={form.category || ""}
          onChange={handleChange}
          placeholder="Category"
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          name="price"
          value={form.price || ""}
          onChange={handleChange}
          placeholder="Price"
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          name="offerPrice"
          value={form.offerPrice || ""}
          onChange={handleChange}
          placeholder="Offer Price"
          className="w-full border p-2 rounded"
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="inStock"
            checked={!!form.inStock} // force boolean
            onChange={handleChange}
          />
          In Stock
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}
