import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Hardcoded userId for testing
  const userId = "64f7b9c123abc456def78901";

  // Fetch cart from backend
  const fetchCart = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/cart/${userId}`);
      setCart(res.data);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Add to cart
  const addToCart = async (product) => {
    try {
      const existing = cart.find((p) => p.productId._id === product._id);

      if (existing) {
        await axios.patch(`${API_BASE}/api/cart/${product._id}`, {
          userId,
          quantity: existing.quantity + 1,
        });
      } else {
        await axios.post(`${API_BASE}/api/cart`, {
          userId,
          productId: product._id,
          quantity: 1,
        });
      }

      fetchCart();
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  const increaseQty = async (productId) => {
    try {
      const item = cart.find((p) => p.productId._id === productId);
      if (item) {
        await axios.patch(`${API_BASE}/api/cart/${productId}`, {
          userId,
          quantity: item.quantity + 1,
        });
        fetchCart();
      }
    } catch (err) {
      console.error("Error increasing quantity:", err);
    }
  };

  const decreaseQty = async (productId) => {
    try {
      const item = cart.find((p) => p.productId._id === productId);
      if (!item) return;

      if (item.quantity > 1) {
        await axios.patch(`${API_BASE}/api/cart/${productId}`, {
          userId,
          quantity: item.quantity - 1,
        });
      } else {
        await axios.delete(`${API_BASE}/api/cart/${productId}`, {
          data: { userId },
        });
      }
      fetchCart();
    } catch (err) {
      console.error("Error decreasing quantity:", err);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`${API_BASE}/api/cart/${productId}`, {
        data: { userId },
      });
      fetchCart();
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, increaseQty, decreaseQty, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
