const express = require('express')
const TypeController = require('../controllers/typeController')

const router = express.Router()

router.get('/types', TypeController.getAllTypes)

module.exports = router
