const express = require('express')
const User = require('../models/user')
const { createUserJwt } = require('../utils/tokens')
const security = require('../middleware/security')
const router = express.Router()


router.get('/me', security.requireAuthenticatedUser, async (req, res, next) => {
    try{
        const {email} = res.locals.user
        console.log(email)
        console.log(res.locals)
        const user = await User.fetchUserByEmail(email)
        return res.status(200).json({user})
    }
    catch(err){
        next(err)
    }
})

router.post('/login', async (req, res, next) => {
    try{
    const user = await User.login(req.body)
    const token = createUserJwt(user)
    res.status(200).json({user, token})
    }
    catch(err){
        next(err)
    }
})

router.post('/register', async (req, res, next) => {
    try {
        const user = await User.register(req.body)
        const token = createUserJwt(user)
        console.log(token)
        return res.status(201).json({user, token})
    }catch(err){
        next(err)
    }
    
})

module.exports = router