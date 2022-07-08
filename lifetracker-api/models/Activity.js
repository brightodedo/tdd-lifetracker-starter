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
}