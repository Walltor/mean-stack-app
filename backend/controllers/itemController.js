const mongoose = require('mongoose')
const ItemModel = require('../models/item.js')
const TypeModel = require('../models/type.js')
const express = require('express')
const Router = express.Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '..', 'uploads')

    fs.access(uploadDir, (err) => {
      if (err) {
        fs.mkdir(uploadDir, {recursive: true}, err => {
          if(err) {
            return cb(err)
          }
          cb(null, uploadDir)
        }) 
      } else {
        cb(null, uploadDir)
      }
    })
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ storage: storage })

class ItemController {
  
  // Get all items
  static async getAllItems(req, res) {
    try {
      const items = await ItemModel.find({}).populate('type', 'name')
      res.status(200).json(items)
    } catch (error) {
      console.error('Error:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  // Get a specific item by ID
  static async getItemById(req, res) {
    const itemId = req.params.id

    try {
      const item = await ItemModel.findById(itemId)

      if (!item) {
        return res.status(404).json({ error: 'Item not found' })
      }

      res.status(200).json(item)
    } catch (error) {
      console.error('Error:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  //Main page search by type, state, min and max price
  static async searchItem(req, res) {
    try {
      const { title, type, city, bedrooms, bathrooms, garages, minPrice, maxPrice, minSize, maxSize, minArea, maxArea } = req.query
      
      const query = {}

      if (title) {
        query.title = title
      }
      
      if (type) {
        query.type = type
      }

      if (city) {
        query['address.city'] = city
      }

      if (bedrooms) {
        query.bedrooms = parseInt(bedrooms, 10)
      }

      if (bathrooms) {
        query.bathrooms = parseInt(bathrooms, 10)
      }

      if (garages) {
        query.garages = parseInt(garages, 10)
      }

      if (minPrice || maxPrice) {
        query.price = {}
        if (minPrice) {
          query.price.$gte = parseInt(minPrice, 10)
        }
        if (maxPrice) {
          query.price.$lte = parseInt(maxPrice, 10)
        }
      }

      if (minSize || maxSize) {
        query.size = {}
        if (minSize) {
          query.size.$gte = parseInt(minSize, 10)
        }
        if (maxSize) {
          query.size.$lte = parseInt(maxSize, 10)
        }
      }

      if (minArea || maxArea) {
        query.area = {}
        if (minArea) {
          query.area.$gte = parseInt(minArea, 10)
        }
        if (maxArea) {
          query.area.$lte = parseInt(maxArea, 10)
        }
      }

      const items = await ItemModel.find(query)
      console.log(items)

      res.status(200).json(items)
    } catch (error) {
      console.error('Error retrieving items:', error)
      res.status(500).json({ error: 'Internal Server Error' })    
    }
  }

  // Create a new item
  static async createItem(req, res) {
    const { title, type, address, bedrooms, bathrooms, garages, price, size, area, forsale, featured, images } = req.body

    try {
      const newItem = new ItemModel({ title, type, address, bedrooms, bathrooms, garages, price, size, area, forsale, featured, images })
      const savedItem = await newItem.save()

      res.status(201).json(savedItem)
    } catch (error) {
      console.error('Error:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

    // Controller method for handling image uploads
    static async upload(req, res) {
      upload.array('images', 5)(req, res, (err) => {
        if (err) {
          return res.status(400).json({ message: 'Error uploading files', error: err })
        }
        const files = req.files
        if (!files) {
          return res.status(400).json({ message: 'Please choose files' })
        }
        // If files are uploaded successfully, send a success response
        res.status(200).json({ message: 'Files uploaded successfully', files: files })
      })
    }
  

  // Update an item by ID
  static async updateItemById(req, res) {
    const itemId = req.params.id
    const { title, type, address, bedrooms, bathrooms, garages, price, size, area, forsale, featured } = req.body

    try {
      const updatedItem = await ItemModel.findByIdAndUpdate(
        itemId,
        { title, type, address, bedrooms, bathrooms, garages, price, size, area, forsale, featured }
      )

      if (!updatedItem) {
        return res.status(404).json({ error: 'Item not found' })
      }

      res.status(200).json(updatedItem)
    } catch (error) {
      console.error('Error:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  // Delete an item by ID
  static async deleteItemById(req, res) {
    const itemId = req.params.id

    try {
      const deletedItem = await ItemModel.findByIdAndDelete(itemId)

      if (!deletedItem) {
        return res.status(404).json({ error: 'Item not found' })
      }

      res.status(204).json() // No content in the response for a successful deletion
    } catch (error) {
      console.error('Error:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}

module.exports = ItemController
