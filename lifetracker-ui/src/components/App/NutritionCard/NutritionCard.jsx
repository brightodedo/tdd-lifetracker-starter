import * as React from 'react'
import './NutritionCard.css'


export default function NutritionCard({nutrition}){
    return(
        <div className="nutrition-card">
            <div>{nutrition}</div>
        </div>
    )
}