const jwt = require('jsonwebtoken')
const config = require('../config/jwtSecret')
const express = require('express')
const path = require('path')
const app = express()

function authenticateToken(req, res, next) {
    const authHeader  = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    jwt.verify(token, config.jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' })
        }
        req.user = decoded
        next()
    })
}

function requireAdmin(req, res, next) {
    if(!req.user ||  req.user.username !== 'admin') {
        return res.status(403).json({ message: 'Access denied' })
    }
    next()
}

//app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

module.exports = { authenticateToken, requireAdmin }