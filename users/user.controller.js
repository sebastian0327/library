const argon2 = require('argon2')
const {createUser} = require('./createUser.action');
const {updateUser} = require('./updateUser.action');
const {getUser,getUserSoftDeleted} = require('./readUser.actions');
const {softDeleteUser} = require('./deleteUser.action');
const { createToken, tokenVerification } = require('../utils/auth')

async function signUp(userData) {
    const { name, lastname, password, email, updateAllowed, deletedAllowed, softDelete } = userData;
    
    if(!name || !lastname || !password || !email) {
        return { value: { error: "Incomplete data" }, code: 400 }
    }
    
    if (await getUser(email, "email")) {
        return { value: { error: "Email already exists" }, code: 409 }
    }

    if (await getUserSoftDeleted(email, "email")) {
        return { value: { error: "Email has been banned" }, code: 409 }
    }

    const hashedPassword = await argon2.hash(userData.password)
    userData.password = hashedPassword
    const newUser = await createUser(userData)
    const token = await createToken({ userId: newUser._id })
    return { value: {  authorization: token , message: 'User created successfully'}, code: 200 }
}

async function login(req) {
    const { email, password } = req.body

    if (!email || !password) {
        return { value: { error: "Incomplete data" }, code: 400 }
    }

    const userData = await getUser(email, "email")

    if (!userData) {
        return { value: { error: "User not found" }, code: 404 }
    }

    if (await argon2.verify(userData.password, password)) {
        const token = await createToken({ userId: userData._id })
        return { value: { authorization: token ,message: 'User login successfully'}, code: 200 }
    } else {
        return { value: { error: "Incorrect password" }, code: 401 }
    }
}


async function updateUserData(req) {

    const { name, lastname, email, password, id } = req.body
    const updateData = { name, lastname, email, password }
    const hashedPassword = await argon2.hash(updateData.password)
    updateData.password = hashedPassword
    const user =  await getUser(tokenVerification(req).userId, "id")

    if(!id){
        return { value: { error: "No id provided" }, code: 400}
    }

    if (!email && !password && !name && !lastname ) {
        return { value: { error: "No data provided for modification" }, code: 400 }
    }

    if(!user && await getUserSoftDeleted(tokenVerification(req).userId, "id")){
        return { value: { error: "User is banned" }, code: 403}
    }

    
    if (req.body.id !== user.id && !user.updateAllowed) {
        return { value: { error: "You are not authorized to modify this user" }, code: 401 }
    }

    if (await updateUser(req.body.id, updateData)){
        return { value: {message: 'User updated successfully'}, code: 200 }
    }else{
        return { value: { error: 'User does not exist'}, code: 404 }
    }
}

async function deleteUser(req) {
    
    const  userId  = req.query.userId
    
    const user =  await getUser(tokenVerification(req).userId, "id")
    if(!userId){
        return { value: { error: "No id provided" }, code: 400}
    }

    
    if (userId !== user.id && !user.deletedAllowed) {
        return { value: { error: "You are not authorized to delete this user" }, code: 401 }
    }

    if (await softDeleteUser(userId)){
        return { value: {message: 'User deleted successfully'}, code: 200 }
    }else{
        return { value: {error: 'User does not exist'}, code: 404 }
    }
}

async function getUserData(req) {
    const { password, ...userData } = (await getUser(req.query.userId, "id"))._doc
    if (userData) {
        return { value: { userData: userData }, code: 200 }
    } else {
        return { value: { error: 'User does not exist' }, code: 404 }
    }
}


module.exports = {
    signUp,
    updateUserData,
    getUserData,
    login, 
    deleteUser
}