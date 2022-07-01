import * as React from 'react'
import './NutritionForm.css'


export default function NutritionForm(){
    return(
        <div className="nutrition-form">
            <div className="nutri-redner">
                <div className="tops">
                    <h1 className='record-nutrition'>Record Nutrition</h1>
                </div>
                <div className="card">
                    <div className="nutrition-name">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" />
                    </div>
                    <div className="nutrition-category">
                        <label htmlFor="category">category</label>
                        <input type="text" name="category" />
                    </div>
                    <div className="nutrition-calories">
                        <label htmlFor="calories">Calories</label>
                        <input type="number" name="calories" min="1" step="10" max="3500"/>
                    </div>
                    <div className="nutrition-img">
                        <label htmlFor="imageUrl">Image URL</label>
                        <input type="text" name="imageUrl" />
                    </div>
                </div>
            </div>
        </div>
    )
}