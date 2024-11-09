const Reservation = require("./reservation.model")

async function createReservation(reservation) {
    try {
        const newReservation = new Reservation(reservation)
        await newReservation.save()
        return newReservation
    } catch (error) {
        console.log(error)
        return null
    }
}

module.exports = {createReservation}