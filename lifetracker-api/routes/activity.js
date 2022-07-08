const express = require('express')
const router = express.Router()
const security = require('../middleware/security')
const Activity  = require('../models/Activity')

router.get('/', security.requireAuthenticatedUser, async (req,res, next) => {
    try{
        const {user_id} = res.locals.user
        const summary = await Activity.callMe(user_id)
        return res.status(200).json({summary})
    }
    catch(err){
        next(err)
    }
})

module.exports = router