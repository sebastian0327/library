const Reservation = require("./reservation.model")


async function getReservation(filterData) {
    try {
        
        const reservation = await Reservation.find({ ...filterData })
        if (!reservation) {
            return null
        }

        return reservation
    } catch (error) {
        return null
    }
}

module.exports = {getReservation}