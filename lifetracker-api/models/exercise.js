const db = require('../db');
const {BadRequestError, NotFoundError} = require('../utils/errors')
class Exercise{
    static async createExercise(credentials, user_id){
        const requiredFields = ["name", "category", "intensity", "duration"]

        requiredFields.forEach(field => {
            if(!credentials.hasOwnProperty(field)){
                throw new BadRequestError(`Missing ${field} field in request to createExercise method`)
            }
        });
        if(!user_id){
            throw new BadRequestError("User Id is missing")
        }
        
        const result = await db.query(`
        INSERT INTO exercise (
            name,
            category,
            intensity,
            duration,
            user_id
        )
        VALUES (
            $1,
            $2,
            $3,
            $4,
            $5
        ) 
        RETURNING name, category, intensity, duration;
        `, [credentials.name.trim().toLowerCase(), credentials.category.trim().toLowerCase(), credentials.intensity, credentials.duration, user_id])

    return result.rows[0]
    }
    static async fetchExerciseById(exercise_id){
        if(!exercise_id){
            throw new BadRequestError("Missing id in the fetchExerciseById method")
        }

        const result = await db.query(`
        SELECT name,
        category,
        intensity,
        duration,
        user_id,
        created_at
        FROM exercise
        WHERE id=$1;
        `, [exercise_id])

        if(!result) throw new NotFoundError(`No exercise found with id: ${exercise_id}`)
        return result.rows[0]
    }
    static async listExerciseForUser(user_id ){
        if(!user_id)
        throw new BadRequestError("User Id field missing in listExerciseForUser")

        const result = await db.query(`
        SELECT * 
        FROM exercise 
        WHERE user_id= $1;
        `, [user_id])

        return result.rows
    }
}

module.exports = Exercise