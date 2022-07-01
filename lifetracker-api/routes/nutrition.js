const express = require('express')
const router = express.Router()
const Nutrition  = require('../models/nutrition')

router.get('/', async (req,res, next) => {
    try{
        const {user_id} = res.locals.user
        const nutritions = await Nutrition.listNutritionForUser(user_id)
    
        return res.status(200).json({nutritions})
    }
    catch(err){
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    try{
        const {user_id} = res.locals.user
        const nutrition = await Nutrition.createNutrition(req.body, user_id)
        
        return res.status(201).json({nutrition})
    }
    catch(err){
        next(err)
    }
})

router.get('/:nutritionId', async (req, res, next) => {
    try{
        const {nutritionId} = req.params
        const nutrition  = await Nutrition.fetchNutritionById(nutritionId)

        return res.status(200).json({nutrition})
    }
    catch(err){
        next(err)
    }
})

module.exports = router