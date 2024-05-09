const TypeModel = require('../models/type.js') 
const express = require('express')

class TypeController {
  
  static async getAllTypes(req, res) {
    try {
      const types = await TypeModel.find()
      res.status(200).json(types)
    } catch (error) {
      console.error('Error:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}

module.exports = TypeController
