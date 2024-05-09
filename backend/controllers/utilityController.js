const UtilityModel = require('../models/utility.js')
const express = require('express')

class UtilityController {

    static async getAllUtilities(req, res) {
        try {
            const utilities = await UtilityModel.find()
            res.status(200).json(utilities)
        } catch (error) {
            console.error('Error fetching utilities', error)
            res.status(500).json({ error: 'Internal Server Error' })
        }
    }
}   

module.exports = UtilityController
