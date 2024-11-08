const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    updateAllowed: { type: Boolean, default: false},
    deletedAllowed: { type: Boolean, default: false},
    softDelete: { type: Boolean, default: false }
}, { versionKey: false })


const UserModel = mongoose.model('User', userSchema, 'users')
module.exports = UserModel
