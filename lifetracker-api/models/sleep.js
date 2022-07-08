const db = require('../db');
const {BadRequestError, NotFoundError} = require('../utils/errors')
class Sleep{
    static async createSleep(credentials, user_id){
        const requiredFields = ["start_time", "end_time"]

        requiredFields.forEach(field => {
            if(!credentials.hasOwnProperty(field)){
                throw new BadRequestError(`Missing ${field} field in request to createSleep method`)
            }
        });
        if(!user_id){
            throw new BadRequestError("User Id is missing")
        }
        
        const result = await db.query(`
        INSERT INTO sleep (
            start_time,
            end_time,
            user_id
        )
        VALUES (
            $1,
            $2,
            $3
        ) 
        RETURNING start_time, end_time;
        `, [credentials.start_time, credentials.end_time, user_id])

    return result.rows[0]
    }
    static async fetchSleepById(sleep_id){
        if(!sleep_id){
            throw new BadRequestError("Missing id in the fetchSleepById method")
        }

        const result = await db.query(`
        SELECT 
        start_time,
        end_time,
        user_id,
        created_at
        FROM sleep
        WHERE id=$1;
        `, [sleep_id])

        if(!result) throw new NotFoundError(`No sleep found with id: ${sleep_id}`)
        return result.rows[0]
    }
    static async listSleepForUser(user_id ){
        if(!user_id)
        throw new BadRequestError("User Id field missing in listSleepForUser")

        const result = await db.query(`
        SELECT 
        start_time::date AS start_date, 
        end_time::date AS end_date, 
        start_time::time AS start_time, 
        end_time::time AS end_time,
        end_time-start_time AS day_interval
        FROM sleep
        WHERE user_id =$1;
        `, [user_id])

        return result.rows
    }
}

module.exports = Sleep