const User = require("./user.model")

async function getUser(identifier, type) {
    try {
        
        let query = {}

        if (type === 'email' ) {
            query = { email: identifier, softDelete: false }
        } else if (type === 'id') {
            query = { _id: identifier, softDelete: false }
        }

        const user = await User.findOne(query).select('-softDelete')

        if (!user) {
            return null
        }

        return user
    } catch (error) {
        return null
    }
}

async function getUserSoftDeleted(identifier, type) {
    try {
        
        let query = {}

        if (type === 'email' ) {
            query = { email: identifier, softDelete: true }
        } else if (type === 'id') {
            query = { _id: identifier, softDelete: true }
        }

        const user = await User.findOne(query).select('-softDelete')

        if (!user) {
            return null
        }

        return user
    } catch (error) {
        return null
    }
}


module.exports = {getUser, getUserSoftDeleted}