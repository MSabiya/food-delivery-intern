import React, { useState } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function UploadPrd() {
  const [formData, setFormData] = useState({
    files: [],      // actual File objects
    previews: [],   // preview URLs
    name: "",
    description: "",
    category: "",
    price: "",
    offerPrice: "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  // Handle text input changes
  const onChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setMsg("");
  };

  // Handle image selection
  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    const newFiles = [...formData.files];
    const newPreviews = [...formData.previews];
    newFiles[index] = file;
    newPreviews[index] = URL.createObjectURL(file);
    setFormData((prev) => ({ ...prev, files: newFiles, previews: newPreviews }));
  };

  // Submit form
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return setMsg("Name is required");
    if (formData.price === "" || isNaN(Number(formData.price)))
      return setMsg("Price must be a number");

    try {
      setLoading(true);
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("price", formData.price);
      data.append("offerPrice", formData.offerPrice);

      formData.files.forEach((file) => {
        if (file) data.append("images", file); // backend should accept "images"
      });

      const res = await axios.post(`${API_BASE}/api/items`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMsg(`✅ Created item (id: ${res.data._id})`);
      setFormData({
        files: [],
        previews: [],
        name: "",
        description: "",
        category: "",
        price: "",
        offerPrice: "",
      });
    } catch (err) {
      setMsg("❌ " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="p-6 max-w-lg space-y-4 bg-white rounded shadow">
      {msg && <p className="text-sm">{msg}</p>}

      {/* Image Upload */}
      <div className="flex gap-2">
        {Array(1)
          .fill("")
          .map((_, i) => (
            <label key={i} className="cursor-pointer">
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => handleImageChange(e, i)}
              />
              <img
                src={
                  formData.previews[i] ||
                  "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/uploadArea.png"
                }
                alt="preview"
                className="w-32 h-32 border rounded object-cover"
              />
            </label>
          ))}
      </div>

      <input
        id="name"
        value={formData.name}
        onChange={onChange}
        placeholder="Name"
        className="border p-2 w-full"
      />

      <textarea
        id="description"
        value={formData.description}
        onChange={onChange}
        placeholder="Description"
        className="border p-2 w-full"
      />

      <select
        id="category"
        value={formData.category}
        onChange={onChange}
        className="border p-2 w-full"
      >
        <option value="">Select Category</option>
        {["Biriyani", "Chicken Curry", "Parotta", "Fried Rice", "Burger", "Pizza"].map(
          (c) => (
            <option key={c} value={c}>
              {c}
            </option>
          )
        )}
      </select>

      <div className="flex gap-2">
        <input
          id="price"
          type="number"
          value={formData.price}
          onChange={onChange}
          placeholder="Price"
          className="border p-2 w-full"
        />
        <input
          id="offerPrice"
          type="number"
          value={formData.offerPrice}
          onChange={onChange}
          placeholder="Offer Price (optional)"
          className="border p-2 w-full"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 rounded text-white ${loading ? "bg-gray-400" : "bg-indigo-600"}`}
      >
        {loading ? "Creating…" : "Create"}
      </button>
    </form>
  );
}
