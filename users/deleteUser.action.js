const User = require("./user.model")

async function softDeleteUser(id) {
    try {

        const user = await User.findOneAndUpdate({ _id: id, softDelete: false }, { softDelete: true }, { new: true }).select('-softDelete')

        if (!user) {
            return null
        }

        return user
    } catch (error) {
        return null
    }
}

module.exports = {softDeleteUser}