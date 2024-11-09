const mongoose = require('mongoose')

const reservationSchema = new mongoose.Schema({
    bookId : { type: String, required: true },
    userId: { type: String, required: true },
    status: { type: String, required: true, default: 'pending' },
    startDate: { type: Date, required: true, default: Date.now },
    endDate: { type: Date,  default: null },
}, { versionKey: false })


const reservationModel = mongoose.model('reservation', reservationSchema, 'reservations')
module.exports = reservationModel
