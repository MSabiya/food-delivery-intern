import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, default: 1 },
      },
    ],
    totalAmount: { type: Number, required: true },
    billingInfo: {
      name: String,
      email: String,
      address: String,
      cardNumber: String,
      expiry: String,
      cvv: String,
    },
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
