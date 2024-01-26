const express = require('express');
const ItemController = require('../controllers/itemController');

const router = express.Router();

router.get('/items', ItemController.getAllItems);
router.get('/items/search', ItemController.searchItem);
router.get('/items/:id', ItemController.getItemById);
router.post('/items', ItemController.createItem);
router.put('/items/:id', ItemController.updateItemById);
router.delete('/items/:id', ItemController.deleteItemById);

module.exports = router;
