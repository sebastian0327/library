const express = require('express')
const { tokenVerificationMiddleware } = require('../utils/auth')
const { createNewReservation, closeReservation, getReservationRecordUser } = require('./reservation.controller')
const router = express.Router()

const createReservation = async (req, res) => { 
    try {
        const outValue = await createNewReservation(req) 
        res.status(outValue.code).json(outValue.value)
    } catch (error) {
        res.status(500).json({ error: 'Error creating reservation' })
    }
}

const returnBook = async (req, res) => {
    try {
        const outValue = await closeReservation(req)
        res.status(outValue.code).json(outValue.value)
    } catch (error) {
        res.status(500).json({ error: 'Error returning book' })
    }
}

const getReservationRecord = async (req, res) => { 
    try {
      const outValue = await getReservationRecordUser(req, "userId") 
     
      res.status(outValue.code).json(outValue.value)
    } catch (error) {
        console.log(error)
      res.status(500).json({ error: 'Error record' })
    }
  }

  const getReservationRecordBook = async (req, res) => { 
    try {
      const outValue = await getReservationRecordUser(req, "bookId") 
     
      res.status(outValue.code).json(outValue.value)
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Error records ' })
    }
  }

router.post("/", tokenVerificationMiddleware, createReservation)
router.patch("/", tokenVerificationMiddleware, returnBook)
router.get("/usuario/", tokenVerificationMiddleware, getReservationRecord)
router.get("/libro/", tokenVerificationMiddleware, getReservationRecordBook)


module.exports = router