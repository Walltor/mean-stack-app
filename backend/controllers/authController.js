const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config/jwtSecret')
const User = require('../models/user')

class AuthController {
    static async register(req, res) {
        try {
            const { username, password } = req.body
            const hashedPassword = await bcrypt.hash(password, 10)
            const user = new User({ username, password: hashedPassword })
            await user.save()
            res.status(201).json({ message: 'User registered successfully' })
        } catch (error) {
            res.status(500).json({ message: 'Failed to register user', error })
        }
    }
    
    static async login(req, res) {
        try {
            const { username, password } = req.body
            const user = await User.findOne({ username })
            if (!user) {
                return res.status(404).json({ message: 'User not found' })
            }
            const isValidPassword = await bcrypt.compare(password, user.password)
            if (!isValidPassword) {
                return res.status(401).json({ message: 'Invalid password' })
            }
            const token = jwt.sign({ username: user.username }, config.jwtSecret)
            res.json({ token })
        } catch (error) {
            res.status(500).json({ message: 'Failed to log in', error })
        }
    }
}

module.exports = AuthController
