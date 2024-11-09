
const Book = require("./book.model")

async function updateBook(id, updatedBook) {
    try {
        
        const book = await Book.findOneAndUpdate({ _id: id, softDelete: false }, updatedBook, { new: true }).select('-softDelete')

        if (!book) {
            return null
        }

        return book
    } catch (error) {
        
        return null
    } 
}

module.exports = {updateBook}