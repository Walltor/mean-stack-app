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
}

module.exports = UserController
