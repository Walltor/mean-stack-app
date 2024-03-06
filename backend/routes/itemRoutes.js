const express = require('express')
const ItemController = require('../controllers/itemController')
const { authenticateToken, requireAdmin } = require('../middleware/authMiddleware')

const router = express.Router()

router.get('/items', authenticateToken, requireAdmin, ItemController.getAllItems)
router.get('/items/search', ItemController.searchItem)
router.get('/items/:id', authenticateToken, requireAdmin, ItemController.getItemById)
router.post('/items', authenticateToken, requireAdmin, ItemController.createItem)
router.post('/upload', authenticateToken, requireAdmin, ItemController.upload)
router.put('/items/:id', authenticateToken, requireAdmin, ItemController.updateItemById)
router.delete('/items/:id', authenticateToken, requireAdmin, ItemController.deleteItemById)

module.exports = router
