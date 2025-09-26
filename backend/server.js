import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";   // 👈 make sure file extension `.js`
import itemsRouter from "./routes/itemRoutes.js";  // 👈 add `.js`
import cartRoutes from "./routes/cart.js";  // 👈 already fine
import Cart from "./model/Cart.js";        // 👈 you forgot to import this model
import orderRoutes from "./routes/orders.js";


dotenv.config();

const app = express();
app.use(express.json());
app.use("/uploads", express.static("uploads")); // serve images
app.use(cors());

// connect DB
connectDB();

// Routes
app.use("/api/items", itemsRouter);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// POST: Add to cart
app.post("/api/cart", async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    const cartItem = await Cart.findOne({ userId, productId });

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      await Cart.create({ userId, productId, quantity });
    }

    res.status(200).json({ message: "Item added to cart" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH: Update quantity
app.patch("/api/cart/:productId", async (req, res) => {
  try {
    const { userId, quantity } = req.body;
    await Cart.updateOne(
      { userId, productId: req.params.productId },
      { quantity }
    );
    res.status(200).json({ message: "Quantity updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE: Remove item
app.delete("/api/cart/:productId", async (req, res) => {
  try {
    const { userId } = req.body;
    await Cart.deleteOne({ userId, productId: req.params.productId });
    res.status(200).json({ message: "Item removed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 8000; // 👈 match frontend (not 5000)
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
