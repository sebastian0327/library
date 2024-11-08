const jwt = require('jsonwebtoken')
require('dotenv').config()

const keyJWT = process.env.JWT_KEY

const tokenVerificationMiddleware = async (req, res, next) => {

    const authorization = req.headers["authorization"]
    const token = authorization && authorization.split(' ')[1]

    if (!token) {
        return res.status(401).json({ error: 'Without authentication' })
    }

    
    try {
        decodedToken = jwt.verify(token, keyJWT)
        next()
    } catch (error) {
        res.status(403).json({ error: 'Invalid authentication token' })
    }

}

const tokenVerification =  (req) => {
    const authorization = req.headers["authorization"]
    const token = authorization && authorization.split(' ')[1]
    try {
        decodedToken = jwt.verify(token, keyJWT)
        return decodedToken
    } catch (error) {
        return null
    }
}

const createToken = async (tokenData) => {
    return jwt.sign(tokenData, keyJWT, {expiresIn: '30d'})
}

module.exports = {
    tokenVerificationMiddleware,
    createToken,
    tokenVerification
}