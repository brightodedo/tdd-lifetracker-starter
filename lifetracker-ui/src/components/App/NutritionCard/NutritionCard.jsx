import * as React from 'react'
import './NutritionCard.css'


export default function NutritionCard({nutrition}){
    const date = nutrition.created_at.split("T")[0].split("-")
    return(
        <div className="nutrition-card">
            <div className="card-top">
                <img src={nutrition.image_url} alt={nutrition.name} className="nutrition-images" />
                <p className="nutrition-name">{nutrition.name}</p>
            </div>
            <div className="card-middle">
                <h6 className='nutrition-calories'>Calories</h6>
                <p>{nutrition.calories}</p>
            </div>
            <div className="card-bottom">
                <div className="nutrition-date">
                    <p>{`${date[2]}/${date[1]}/${date[0]}`}</p>
                </div>
                <div className="nutrition-category">
                    <p>{nutrition.category}</p>
                </div>
            </div>
        </div>
    )
}