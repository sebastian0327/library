const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    name: { type: String, required: true },
    genre: { type: String, required: true },
    publicationYear: { type: Number, required: true },
    publisher: { type: String, required: true },
    author: { type: String, required: true },
    available: { type: Boolean, default: true },
    softDelete: { type: Boolean, default: false }
}, { versionKey: false })

const BookModel = mongoose.model('Book', bookSchema, 'library')

module.exports = BookModel
