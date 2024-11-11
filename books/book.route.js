const express = require("express")
const router = express.Router()
const { tokenVerificationMiddleware } = require("../utils/auth")
const { createBook, getBooksListByFilter, getBookById, deleteBook, updateBookData, } = require("./book.controller")

const PostBook = async (req, res) => {
  try {
    const outValue = await createBook(req)
    res.status(outValue.code).json(outValue.value)
  } catch (error) {
    res.status(500).json({ error: "Error creating book" })
  }
}

const GetBook = async (req, res) => { 
  try {
    const outValue = await getBookById(req) 
    res.status(outValue.code).json(outValue.value)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error fetching book' })
  }
}

const GetBooks = async (req, res) => { 
  try {
    const outValue = await getBooksListByFilter(req) 
   
    res.status(outValue.code).json(outValue.value)
  } catch (error) {
    
    res.status(500).json({ error: 'Error fetching books' })
  }
}

const PatchBook = async (req, res) => { 
  try {
    const outValue = await updateBookData(req) 
    res.status(outValue.code).json(outValue.value)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error updating book' })
  }
}

const DeleteBook = async (req, res) => { 
  try {
    const outValue = await deleteBook(req) 
    res.status(outValue.code).json(outValue.value)
  } catch (error) {
    res.status(500).json({ error: 'Error deleting book' })
  }
}


router.post("/", tokenVerificationMiddleware, PostBook)
router.patch("/", tokenVerificationMiddleware, PatchBook)
router.delete("/", tokenVerificationMiddleware, DeleteBook)
router.get("/", GetBook)
router.get("/filter", GetBooks)

module.exports = router
