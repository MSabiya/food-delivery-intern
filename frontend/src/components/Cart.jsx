import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useCart } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, increaseQty, decreaseQty, removeFromCart } = useCart();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [selectedItems, setSelectedItems] = useState([]); // store checked products

  // Toggle checkbox selection
  const handleCheckboxChange = (productId) => {
    setSelectedItems((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId) // remove if already selected
        : [...prev, productId] // add if not selected
    );
  };

  // Filter cart items that are selected
  const selectedCartItems = cart.filter((item) =>
    selectedItems.includes(item.productId._id)
  );

  // Calculate total only for selected items
  const totalPrice = selectedCartItems.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );

  const handlePlaceOrder = () => {
    if (selectedCartItems.length === 0) {
      alert("Please select at least one product to place an order!");
      return;
    }

    navigate("/payment", {
      state: { cart: selectedCartItems, totalPrice, paymentMethod },
    });
  };

  return (
    <>
      <Navbar />
      <div className="p-6 min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex items-center bg-white p-4 rounded-lg shadow"
              >
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.productId._id)}
                  onChange={() => handleCheckboxChange(item.productId._id)}
                  className="mr-3"
                />

                {/* Product Image */}
                {item.productId.images?.[0] && (
                  <img
                    src={`http://localhost:8000/${item.productId.images[0]}`}
                    alt={item.productId.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                )}

                {/* Product Info */}
                <div className="flex-1 ml-4">
                  <p className="text-lg font-medium">{item.productId.name}</p>
                  <p className="text-green-600 font-bold">
                    ₹{item.productId.price}
                  </p>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => decreaseQty(item.productId._id)}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => increaseQty(item.productId._id)}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>

                    <button
                      onClick={() => removeFromCart(item.productId._id)}
                      className="ml-4 px-3 py-1 bg-red-500 text-white rounded"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <p className="font-bold">
                  ₹{item.productId.price * item.quantity}
                </p>
              </div>
            ))}

            {/* Total for selected items */}
            <div className="text-right mt-4">
              <p className="text-xl font-bold">
                Total: ₹{totalPrice}{" "}
                <span className="text-gray-500 text-sm">
                  (only selected items)
                </span>
              </p>
            </div>

            {/* Payment Options */}
            <div className="mt-6">
              <h2 className="font-semibold mb-2">Choose Payment Method:</h2>
              <div className="flex gap-4">
                <label>
                  <input
                    type="radio"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Cash on Delivery
                </label>
                <label>
                  <input
                    type="radio"
                    value="online"
                    checked={paymentMethod === "online"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Online Payment
                </label>
              </div>
            </div>

            {/* Place Order Button */}
            <div className="text-right mt-6">
              <button
                onClick={handlePlaceOrder}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
              >
                Place Order
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
