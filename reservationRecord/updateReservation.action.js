
const Reservation = require("./reservation.model")

async function updateReservation(id, updatedReservation) {
    try {
        const reservation = await Reservation.findOneAndUpdate({ _id: id }, updatedReservation, { new: true })

        if (!reservation) {
            return null
        }
        
        return reservation
    } catch (error) {
        console.log(error)
        return null
    } 
}

module.exports = {updateReservation}