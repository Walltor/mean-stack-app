const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique:true },
    email: {type: String, required: true, unique:true},
    password: { type: String, required: true },
    created_at: {type: Date},
    updated_at: {type: Date}
})

userSchema.pre('save', async function(next) {
    const user = this
    if (!user.isModified('password')) return next()

    try {
        const hash = await bcrypt.hash(user.password, 10)
        user.password = hash
        next()
    } catch (err) {
        return next(err)
    }
})

// Add a method to compare passwords during authentication
userSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password)
    } catch (err) {
        throw err
    }
}

const User = mongoose.model('User', userSchema)

module.exports = User