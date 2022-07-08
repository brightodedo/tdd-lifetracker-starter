const db = require('../db');
const {UnauthorizedError, BadRequestError, NotFoundError} = require('../utils/errors')
class Activity{
    static async calculateDailyCaloriesSummaryStats(credentials){

        const result = await db.query(`
        SELECT users.username, 
        users.email as email, 
        DATE(nutrition.created_at) as day, 
        SUM(nutrition.calories) as average_calorie_per_day 
        FROM nutrition RIGHT JOIN users ON nutrition.user_id=users.id 
        GROUP BY (day, users.email, users.username) 
        HAVING users.username='jenny'  
        ORDER BY email,day ASC;
        `)
    }   
    
    static async calculatePerCategoryCaloriesSummaryStats(credentials){
        
        db.query(`
        SELECT category, 
        ROUND(AVG(calories)) as average_calorie, 
        COUNT(category) as number_in_category, 
        nutrition.user_id as id 
        FROM nutrition RIGHT JOIN users ON nutrition.user_id=users.id 
        GROUP BY (nutrition.user_id, category) 
        HAVING user_id=8;
        `)
    }

    static async totalExerciseMinutes(user_id){
        if(!user_id){
            throw new BadRequestError("User Id is missing")
        }

        const result = await db.query(`
        SELECT SUM(duration)
        FROM exercise 
        WHERE user_id=$1;
        `, [user_id])

        return result.rows[0]
    }

    static async averageSleepHours(user_id){
        if(!user_id){
            throw new BadRequestError("User Id is missing")
        }

        const result = await db.query(`
        SELECT AVG(end_time-start_time) 
        FROM sleep 
        WHERE user_id=$1;
        `, [user_id])

        return result.rows[0]
    }

    static async averageDailyCalories(user_id){
        if(!user_id){
            throw new BadRequestError("User Id is missing")
        }

        const result = await db.query(`
        SELECT AVG(camp) 
        FROM (
            SELECT SUM(calories) as camp 
            FROM nutrition 
            WHERE user_id=$1 
            GROUP BY created_at::DATE) x;
        `, [user_id])

        return result.rows[0]
    }

    static async averageExerciseIntensity(user_id){
        if(!user_id){
            throw new BadRequestError("User Id is missing")
        }

        const result = await db.query(`
        SELECT AVG(intensity) 
        FROM exercise 
        WHERE user_id =$1
        `, [user_id])

        return result.rows[0]
    }

    static async totalSleepHours(user_id){
        if(!user_id){
            throw new BadRequestError("User Id is missing")
        }

        const result = await db.query(`
        SELECT sum(end_time-start_time)
        FROM sleep 
        WHERE user_id=$1;
        `, [user_id])

        return result.rows[0]
    }

    static async callMe(user_id){

        const result = {
            totalexemin : await this.totalExerciseMinutes(user_id),
            avgsleehours : await this.averageSleepHours(user_id),
            avgdaily : await this.averageDailyCalories(user_id),
            avgexeintens : await this.averageExerciseIntensity(user_id),
            totalsleephours : await this.totalSleepHours(user_id)
        }

        return result
    }
}

module.exports = Activity