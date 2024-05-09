const express = require('express')
const UtilityController = require('../controllers/utilityController')

const router = express.Router()

router.get('/utilities', UtilityController.getAllUtilities)

module.exports = router
