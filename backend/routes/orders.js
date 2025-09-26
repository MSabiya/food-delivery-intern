import express from "express";
import Order from "../model/Order.js";

const router = express.Router();

// Create new order
router.post("/", async (req, res) => {
  try {
    const { userId, products, totalAmount, billingInfo } = req.body;

    if (!userId || !products || products.length === 0) {
      return res.status(400).json({ error: "userId and products are required" });
    }

    const order = await Order.create({
      userId,
      products,
      totalAmount,
      billingInfo,
      status: "Paid",
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
