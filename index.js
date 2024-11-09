const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose') 
const routesUsers = require('./users/user.route')
const routesReservs = require('./reservationRecord/reservation.route')
const routesBooks = require('./books/book.route')
require('dotenv').config()

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD


const app = express()
app.use(express.json())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.q47pq.mongodb.net/Cluster0`,{
    dbName: 'library' 
}).then(() => {
    console.log("Conexión a la base de datos exitosa")
}).catch((err) => {
    console.log("Error de conexión a la base de datos", err)
})



app.use('/users', routesUsers)
app.use('/reservs', routesReservs)
app.use('/books', routesBooks)

app.listen(8080, () => {
    console.log("Cule vaina que sirve en el puerto 8080")
})