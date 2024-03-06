const UserModel = require('../models/user.js') // Assume you have a user model

class UserController {
  // Get all users
  static async getAllUsers(req, res) {
    try {
      const users = await UserModel.find()
      res.status(200).json(users)
    } catch (error) {
      console.error('Error:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  // Get a specific user by ID
  static async getUserById(req, res) {
    const userId = req.params.id

    try {
      const user = await UserModel.findById(userId)
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' })
      }

      res.status(200).json(user)
    } catch (error) {
      console.error('Error:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  // Create a new user
  static async createUser(req, res) {
    const { username, email, password } = req.body

    try {
      const newUser = new UserModel({ username, email, password })
      const savedUser = await newUser.save()

      res.status(201).json(savedUser)
    } catch (error) {
      console.error('Error:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  // Update a user by ID
  static async updateUserById(req, res) {
    const userId = req.params.id
    const { username, email, password } = req.body

    try {
      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { username, email, password },
        { new: true }
      )

      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' })
      }

      res.status(200).json(updatedUser)
    } catch (error) {
      console.error('Error:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  // Delete a user by ID
  static async deleteUserById(req, res) {
    const userId = req.params.id

    try {
      const deletedUser = await UserModel.findByIdAndDelete(userId)

      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' })
      }

      res.status(204).json() // No content in the response for a successful deletion
    } catch (error) {
      console.error('Error:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}

module.exports = UserController
