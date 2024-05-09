const express = require('express')
const ItemController = require('../controllers/itemController')
const { authenticateToken, requireAdmin } = require('../middleware/authMiddleware')

const router = express.Router()

router.get('/items', ItemController.getAllItems)
router.get('/items/search', ItemController.searchItem)
router.get('/featured', ItemController.getFeatured)
router.get('/items/:_id', ItemController.getItemById)
router.post('/items', ItemController.createItem)
router.post('/upload', ItemController.upload)
router.put('/items/:id', ItemController.updateItemById)
router.delete('/items/:id', ItemController.deleteItemById)

module.exports = router
