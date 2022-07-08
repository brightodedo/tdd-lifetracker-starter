const express = require('express')
const router = express.Router()
const security = require('../middleware/security')
const Exercise = require('../models/exercise')

router.get('/', security.requireAuthenticatedUser, async (req,res, next) => {
    try{
        const {user_id} = res.locals.user
        const exercises = await Exercise.listExerciseForUser(user_id)
    
        return res.status(200).json({exercises})
    }
    catch(err){
        next(err)
    }
})

router.post('/', security.requireAuthenticatedUser, async (req, res, next) => {
    try{
        const {user_id} = res.locals.user
        const exercise = await Exercise.createExercise(req.body, user_id)
        
        return res.status(201).json({exercise})
    }
    catch(err){
        next(err)
    }
})

router.get('/:exerciseId', async (req, res, next) => {
    try{
        const {exerciseId} = req.params
        const exercise  = await Exercise.fetchExerciseById(exerciseId)

        return res.status(200).json({exercise})
    }
    catch(err){
        next(err)
    }
})

module.exports = router