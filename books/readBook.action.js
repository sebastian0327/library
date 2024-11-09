const Book = require("./book.model")


async function getBook(id) {
    try {
        
        const book = await Book.findOne({ _id: id, softDelete: false }).select('-softDelete')

        if (!book) {
            return null
        }

        return book
    } catch (error) {
        return null
    }
}

async function getBooks(filterData) {
    try {
       

        const books = await Book.find({ ...filterData, softDelete: false }).select('-softDelete')

        if (books.length === 0) {
            return null
        }

        return books
    } catch (error) {
        
        return null
    } 
}



module.exports = {getBook, getBooks}

