const express = require('express')
const router = express.Router()
const security = require('../middleware/security')
const Sleep = require('../models/sleep')

router.get('/', security.requireAuthenticatedUser, async (req,res, next) => {
    try{
        const {user_id} = res.locals.user
        const sleeps = await Sleep.listSleepForUser(user_id)
    
        return res.status(200).json({sleeps})
    }
    catch(err){
        next(err)
    }
})

router.post('/', security.requireAuthenticatedUser, async (req, res, next) => {
    try{
        const {user_id} = res.locals.user
        const sleep = await Sleep.createSleep(req.body, user_id)
        
        return res.status(201).json({sleep})
    }
    catch(err){
        next(err)
    }
})

router.get('/:sleepId', async (req, res, next) => {
    try{
        const {sleepId} = req.params
        const sleep  = await Sleep.fetchSleepById(sleepId)

        return res.status(200).json({sleep})
    }
    catch(err){
        next(err)
    }
})

module.exports = router