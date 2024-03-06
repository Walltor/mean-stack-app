const express = require('express')
const TypeController = require('../controllers/typeController')

const router = express.Router()

router.get('/types', TypeController.getAllTypes)
router.get('/types/:id', TypeController.getTypeById)
router.post('/types', TypeController.createType)
router.put('/types/:id', TypeController.updateTypeById)
router.delete('/types/:id', TypeController.deleteTypeById)

module.exports = router
