import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get products & total from Cart page
  const cartItems = location.state?.cart || [];
  const totalPrice = location.state?.totalPrice || 0;
  const paymentMethod = location.state?.paymentMethod || "cod";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handlePayment = async (e) => {
  //   e.preventDefault();

  //   try {
  //     // Send all selected products to backend
  //     await axios.post("http://localhost:8000/api/orders", {
  //       userId: "USER_ID_HERE", // replace with logged-in user
  //       items: cartItems.map((item) => ({
  //         productId: item.productId._id,
  //         quantity: item.quantity,
  //       })),
  //       totalAmount: totalPrice,
  //       billingInfo: formData,
  //       paymentMethod,
  //     });

  //     alert("Payment Successful & Order Placed!");
  //     navigate("/thank-you");
  //   } catch (err) {
  //     console.error("Error placing order:", err);
  //     alert("Payment failed. Try again!");
  //   }
  // };

// const handlePayment = async (e) => {
//   e.preventDefault();

//   try {
//     const products = selectedItems.map((item) => ({
//       productId: item.productId._id || item.productId,
//       quantity: item.quantity,
//     }));

//     const totalAmount = selectedItems.reduce(
//       (sum, item) => sum + item.productId.price * item.quantity,
//       0
//     );

//     const payload = {
//       userId: "123", // replace with logged-in user
//       products,
//       totalAmount,
//       billingInfo,
//     };

//     console.log("Payload being sent:", payload); // 👈 check this in console

//     await axios.post("http://localhost:8000/api/orders", payload);

//     navigate("/thank-you");
//   } catch (err) {
//     console.error("Error placing order:", err.response?.data || err.message);
//   }
// };


  // const handlePayment = async (e) => {
  //   e.preventDefault();

  //   if (selectedItems.length === 0) {
  //     alert("No items to place order!");
  //     return;
  //   }

  //   try {
  //     const products = selectedItems.map((item) => ({
  //       productId: item.productId._id || item.productId,
  //       quantity: item.quantity,
  //     }));

  //     const totalAmount = selectedItems.reduce(
  //       (sum, item) => sum + item.productId.price * item.quantity,
  //       0
  //     );

  //     const payload = {
  //       userId: "123", // replace later
  //       products,
  //       totalAmount,
  //       billingInfo,
  //     };

  //     console.log("Payload being sent:", payload);

  //     await axios.post("http://localhost:8000/api/orders", payload);

  //     navigate("/thank-you");
  //   } catch (err) {
  //     console.error("Error placing order:", err.response?.data || err.message);
  //   }
  // };


const handlePayment = async (e) => {
  e.preventDefault();

  if (cartItems.length === 0) {
    alert("No items to place order!");
    return;
  }

  try {
    const products = cartItems.map((item) => ({
      productId: item.productId._id,
      quantity: item.quantity,
    }));

    const payload = {
      userId: "123", // replace later with real logged-in user
      products,
      totalAmount: totalPrice,
      billingInfo: formData,
      paymentMethod,
    };

    console.log("Payload being sent:", payload);

    await axios.post("http://localhost:8000/api/orders", payload);

    alert("Payment Successful & Order Placed!");
    navigate("/thank-you");
  } catch (err) {
    console.error("Error placing order:", err.response?.data || err.message);
    alert("Payment failed. Try again!");
  }
};



  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Payment</h1>

      {/* Show order summary */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
        {cartItems.map((item) => (
          <div
            key={item.productId._id}
            className="flex justify-between border-b py-2"
          >
            <span>
              {item.productId.name} (x{item.quantity})
            </span>
            <span>₹{item.productId.price * item.quantity}</span>
          </div>
        ))}
        <p className="text-right font-bold mt-3">Total: ₹{totalPrice}</p>
        <p className="text-sm text-gray-600 mt-1">
          Payment Method: <b>{paymentMethod}</b>
        </p>
      </div>

      {/* Payment form */}
      <form
        onSubmit={handlePayment}
        className="bg-white p-6 rounded-lg shadow space-y-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="address"
          placeholder="Shipping Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        {/* Only show card fields if online payment */}
        {paymentMethod === "online" && (
          <>
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              value={formData.cardNumber}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
            <div className="flex gap-2">
              <input
                type="text"
                name="expiry"
                placeholder="MM/YY"
                value={formData.expiry}
                onChange={handleChange}
                className="w-1/2 border p-2 rounded"
                required
              />
              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                value={formData.cvv}
                onChange={handleChange}
                className="w-1/2 border p-2 rounded"
                required
              />
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Confirm & Pay
        </button>
      </form>
    </div>
  );
};

export default Payment;
