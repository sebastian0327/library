const User = require("./user.model")

async function createUser(user) {
    try {

        const newUser = new User(user)

        await newUser.save()

        return newUser
    } catch (error) {
        return null
    }
}

module.exports = {createUser}