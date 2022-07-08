const jwt = require('jsonwebtoken')
const {SECRET_KEY} = require('../config')
const { UnauthorizedError } = require('../utils/errors')

//extract JWT from request header
const jwtFrom = ({headers}) => {
    if(headers?.authorization){
        const [scheme, token] = headers.authorization.split(" ")
        if(scheme.trim() === "Bearer"){
            return token
        }
    }
    return undefined
}

//verifies the user {whether good or bad} and attaches the return object after verification to the res.locals.user object
const extractUserFromJwt = (req, res, next) => {
    try{
        const token = jwtFrom(req)
        if (token){
            res.locals.user = jwt.verify(token, SECRET_KEY)
        }
        return next()
    }
    catch(err){
        if(err instanceof jwt.TokenExpiredError) {
            if(req?.headers?.authorization) {
                return next()
            }
        }
        return next(err)
    }
}


//verify user exists
const requireAuthenticatedUser = (req, res, next) => {
    try{
        const { user } = res.locals
        if(!user?.email){
            throw new UnauthorizedError()
        }
        return next()
    }
    catch(err){
        return next(err)
    }
}

module.exports = {
    requireAuthenticatedUser,
    extractUserFromJwt,
    jwtFrom,
}