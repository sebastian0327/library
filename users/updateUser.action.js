
const User = require("./user.model")

async function updateUser(id, updatedUser) {
    try {
        const user = await User.findOneAndUpdate({ _id: id, softDelete: false }, updatedUser, { new: true }).select('-softDelete')
        if (!user) {
            return null
        }

        return user
    } catch (error) {
        return null
    }
}

module.exports = {updateUser}