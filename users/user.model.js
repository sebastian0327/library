const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    password: { type: String, required: true },
    updateAllowed: { type: Boolean, default: true},
    deletedAllowed: { type: Boolean, default: true},
    softDelete: { type: Boolean, default: false }
}, { versionKey: false })


const UserModel = mongoose.model('User', userSchema, 'users')
module.exports = UserModel
