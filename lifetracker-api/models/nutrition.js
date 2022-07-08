const db = require('../db');
const {UnauthorizedError, BadRequestError, NotFoundError} = require('../utils/errors')
class Nutrition{
    static async createNutrition(credentials, user_id){
        const requiredFields = ["name", "category", "calories", "imageUrl"]

        requiredFields.forEach(field => {
            if(!credentials.hasOwnProperty(field)){
                throw new BadRequestError(`Missing ${field} field in request to createNutrition method`)
            }
        });
        if(!user_id){
            throw new BadRequestError("User Id is missing")
        }
        
        const result = await db.query(`
        INSERT INTO nutrition (
            name,
            category,
            calories,
            image_url,
            user_id
        )
        VALUES (
            $1,
            $2,
            $3,
            $4,
            $5
        ) 
        RETURNING name, category, calories, image_url;
        `, [credentials.name.trim().toLowerCase(), credentials.category.trim().toLowerCase(), credentials.calories, credentials.imageUrl, user_id])

    return result.rows[0]
    }
    static async fetchNutritionById(nutrition_id){
        if(!nutrition_id){
            throw new BadRequestError("Missing id in the fetchNutritionById method")
        }

        const result = await db.query(`
        SELECT name,
        category,
        calories,
        image_url,
        user_id,
        created_at
        FROM nutrition
        WHERE id= $1;
        `, [nutrition_id])

        if(!result) throw new NotFoundError(`No nutrition found with id: ${nutrition_id}`)
        return result.rows[0]
    }
    static async listNutritionForUser(user_id ){
        if(!user_id)
        throw new BadRequestError("User Id field missing in listNutritionForUser")

        const result = await db.query(`
        SELECT * 
        FROM nutrition 
        WHERE user_id= $1;
        `, [user_id])

        return result.rows
    }
}

module.exports = Nutrition