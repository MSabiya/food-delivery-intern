const express = require('express');
const router = express.Router();
const itemController = require('../controller/itemController');
const multer = require('multer');
const path = require('path');

// storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // folder to save files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Create item with image(s)
router.post('/', upload.array('images', 4), itemController.createItem);


// READ ALL
router.get('/', itemController.getItems);

// READ ONE
router.get('/:id', itemController.getItemById);

// UPDATE
router.put('/:id', itemController.updateItem);

// DELETE
router.delete('/:id', itemController.deleteItem);

module.exports = router;


// CRUD routes
// router.post('/', itemController.createItem);      // Create
// router.get('/', itemController.getItems);         // Read all
// router.get('/:id', itemController.getItemById);   // Read one
// router.put('/:id', itemController.updateItem);    // Update
// router.delete('/:id', itemController.deleteItem); // Delete



