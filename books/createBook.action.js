const Book = require("./book.model")

async function createBookAction(book) {
    try {
        const newBook = new Book(book)
        await newBook.save()
        return newBook
    } catch (error) {
        return null
    }
}

module.exports = { createBookAction }
