const Item = require('../model/ItemModel');

// CREATE
exports.createItem = async (req, res) => {
  try {
    const { name, description, price, category, offerPrice } = req.body;

    if (!name || price === undefined) {
      return res.status(400).json({ message: 'name and price are required' });
    }

    const imagePaths = req.files ? req.files.map(f => f.path) : [];

    const item = new Item({
      name,
      description,
      category,
      price: Number(price),
      offerPrice: Number(offerPrice) || 0,
      images: imagePaths
    });

    const saved = await item.save();
    return res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// READ ALL
exports.getItems = async (req, res) => {
  try {
    const items = await Item.find();
    return res.json(items);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// READ ONE
exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    return res.json(item);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};




// UPDATE
exports.updateItem = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    if (price !== undefined && (isNaN(Number(price)) || Number(price) < 0)) {
      return res.status(400).json({ message: 'price must be a non-negative number' });
    }

    const updated = await Item.findByIdAndUpdate(
      req.params.id,
      { name, description, price },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ message: 'Item not found' });

    return res.json(updated);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// DELETE
exports.deleteItem = async (req, res) => {
  try {
    const deleted = await Item.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Item not found' });
    return res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};
