import express from "express";
import Cart from "../model/Cart.js"; // Make sure Cart model is correct and has userId & productId as ObjectId

const router = express.Router();

// ✅ Get all cart items for a user
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ error: "userId is required" });

    const cart = await Cart.find({ userId }).populate("productId");
    res.json(cart);
  } catch (err) {
    console.error("GET /cart error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Add to cart
router.post("/", async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({ error: "userId and productId are required" });
    }

    const qty = Number(quantity) || 1;

    let cartItem = await Cart.findOne({ userId, productId });

    if (cartItem) {
      cartItem.quantity += qty;
      await cartItem.save();
    } else {
      cartItem = await Cart.create({ userId, productId, quantity: qty });
    }

    const updatedCart = await Cart.find({ userId }).populate("productId");
    res.json(updatedCart);
  } catch (err) {
    console.error("POST /cart error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update quantity
router.patch("/:productId", async (req, res) => {
  try {
    const { userId, quantity } = req.body;
    const { productId } = req.params;

    if (!userId || !productId || quantity === undefined) {
      return res.status(400).json({ error: "userId, productId, and quantity are required" });
    }

    await Cart.updateOne({ userId, productId }, { quantity });

    const updatedCart = await Cart.find({ userId }).populate("productId");
    res.json(updatedCart);
  } catch (err) {
    console.error("PATCH /cart error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Remove item
router.delete("/:productId", async (req, res) => {
  try {
    const { userId } = req.body;
    const { productId } = req.params;

    if (!userId || !productId) {
      return res.status(400).json({ error: "userId and productId are required" });
    }

    await Cart.deleteOne({ userId, productId });

    const updatedCart = await Cart.find({ userId }).populate("productId");
    res.json(updatedCart);
  } catch (err) {
    console.error("DELETE /cart error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
