import * as React from 'react'
import './NutritionForm.css'
import ApiClient from '../../../directory/apiClient'
import { useNavigate } from 'react-router-dom'
import { NutritionContextProvider, useNutritionContext } from '../../../../contexts/nutrition'


export default function NutritionForm(){
    const navigate = useNavigate()
    const {setIsLoading} = useNutritionContext()
    const [nutritionForm, setNutritionForm] = React.useState({
                                                            name : "",
                                                            category : "",
                                                            calories : 0,
                                                            imageUrl : ""
    })
    const [nutritionError, setNutritionError] = React.useState("")

    const handleNutritionOnChange = (event) => {
        const field = event.target.name
        const value = event.target.value

        setNutritionForm({...nutritionForm, [field] : value})

        console.log(nutritionForm)
    } 

    const handleNutritionOnSubmit = async() => {
        setIsLoading(true)
        if(nutritionForm.calories < 0){
            setNutritionError("Calories cannot be negative")
            setIsLoading(false)
            return
        }

        if(nutritionForm.category == ""){
            setNutritionError("Please select a category")
            setIsLoading(false)
            return
        }

        if(nutritionForm.name == ""){
            setNutritionError("Please give product a name")
            setIsLoading(false)
            return
        }

        if(nutritionForm.imageUrl == ""){
            setNutritionError("Please give an image url")
            setIsLoading(false)
            return
        }
        
        const {data, error} = await ApiClient.createNutrition(nutritionForm)
        if(error) {
            setNutritionError(error)
        }
        if(data){
            setNutritionError("")
            setNutritionForm({
                name : "",
                category : "",
                calories : 0,
                imageUrl : ""
})
            navigate('/nutrition')
        }

        setIsLoading(false)
        return
    }
    return(
        <div className="nutrition-form">
            <div className="nutri-redner">
                <div className="tops">
                    <h1 className='record-nutrition'>Record Nutrition</h1>
                    {nutritionError ? <p className='error'>{nutritionError}</p> : <></>}
                </div>
                <div className="card">
                    <div className="nutrition-name">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" className='form-input' value={nutritionForm.name} onChange={handleNutritionOnChange}/>
                    </div>
                    <div className="nutrition-category">
                        <label htmlFor="category">category</label>
                        <input type="text" name="category" className='form-input' value={nutritionForm.category} onChange={handleNutritionOnChange}/>
                    </div>
                    <div className="nutrition-calories">
                        <label htmlFor="calories">Calories</label>
                        <input type="number" name="calories" min="1" step="10" max="3500" className='form-input' value={nutritionForm.calories} onChange={handleNutritionOnChange}/>
                    </div>
                    <div className="nutrition-img">
                        <label htmlFor="imageUrl">Image URL</label>
                        <input type="text" name="imageUrl" className='form-input' value={nutritionForm.imageUrl} onChange={handleNutritionOnChange}/>
                    </div>
                    <div className="submit-nutrition">
                        <button onClick={handleNutritionOnSubmit}>save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}