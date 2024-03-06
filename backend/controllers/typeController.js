const TypeModel = require('../models/type.js') 

class TypeController {
  // Get all types
  static async getAllTypes(req, res) {
    try {
      const types = await TypeModel.find()
      res.status(200).json(types)
    } catch (error) {
      console.error('Error:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  // Get a specific type by ID
  static async getTypeById(req, res) {
    const typeId = req.params.id

    try {
      const type = await TypeModel.findById(typeId)

      if (!type) {
        return res.status(404).json({ error: 'Type not found' })
      }

      res.status(200).json(type)
    } catch (error) {
      console.error('Error:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  // Create a new type
  static async createType(req, res) {
    const { name } = req.body

    try {
      const newType = new TypeModel({ name })
      const savedType = await newType.save()

      res.status(201).json(savedType)
    } catch (error) {
      console.error('Error:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  // Update a type by ID
  static async updateTypeById(req, res) {
    const typeId = req.params.id
    const { name } = req.body

    try {
      const updatedType = await TypeModel.findByIdAndUpdate(
        typeId,
        { name },
        { new: true }
      )

      if (!updatedType) {
        return res.status(404).json({ error: 'Type not found' })
      }

      res.status(200).json(updatedType)
    } catch (error) {
      console.error('Error:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  // Delete a type by ID
  static async deleteTypeById(req, res) {
    const typeId = req.params.id

    try {
      const deletedType = await TypeModel.findByIdAndDelete(typeId)

      if (!deletedType) {
        return res.status(404).json({ error: 'Type not found' })
      }

      res.status(204).json() // No content in the response for a successful deletion
    } catch (error) {
      console.error('Error:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}

module.exports = TypeController
