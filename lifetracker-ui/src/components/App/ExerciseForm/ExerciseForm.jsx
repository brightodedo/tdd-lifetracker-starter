import * as React from 'react'
import './ExerciseForm.css'
import ApiClient from '../../../directory/apiClient'
import { useNavigate } from 'react-router-dom'
import {useExcerciseContext} from '../../../../contexts/exercise'


export default function ExerciseForm(){
    const navigate = useNavigate()
    const {setIsLoading, isLoading, error, setError} = useExcerciseContext()
    const [exerciseForm, setExerciseForm] = React.useState({
        name : "",
        category : "",
        intensity : 0,
        duration : 0
})

    const handleEExerciseOnChange = (event) => {
        const field = event.target.name
        const value = event.target.value

        setExerciseForm({...exerciseForm, [field] : value})
    } 

    const handleExerciseOnSubmit = async() => {
        setIsLoading(true)
        if(exerciseForm.intensity < 0 || exerciseForm.intensity > 10){
            setError("Intensity must be between 0 & 10 ")
            setIsLoading(false)
            return
        }

        if(!Number.isInteger(Number(exerciseForm.intensity))){
            setError("Intensity must be an integer")
            setIsLoading(false)
            return
        }

        if(exerciseForm.category == ""){
            setError("Please select a category")
            setIsLoading(false)
            return
        }

        if(exerciseForm.name == ""){
            setError("Please give product a name")
            setIsLoading(false)
            return
        }

        if(exerciseForm.duration < 0 ){
            setError("Duration must be greater than zero")
            setIsLoading(false)
            return
        }

        if(!Number.isInteger(Number(exerciseForm.duration))){
            setError("Duration must be an integer")
            setIsLoading(false)
            return
        }
        
        const rapport = await ApiClient.createExercise(exerciseForm) 
        const data = rapport.data
        const serverError = rapport.error
        if(serverError) {
            setError(serverError)
        }
        if(data){
            setError(null)
            setExerciseForm({
                name : "",
                category : "",
                duration : 0,
                intensity : 0
})
            setIsLoading(false)
            navigate('/exercise')
        }
        setError(null)
        setIsLoading(false)
        return
    }

    return(
        <div className="exercise-form">
            <div className="exerci-redner">
                <div className="tops">
                    <h1 className='record-exercise'>Record Exercise</h1>
                    {error ? <p className='error'>{error}</p> : <></>}
                </div>
                <div className="card">
                    <div className="exerciseform-name">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" className='form-input'  value={exerciseForm.name} onChange={handleEExerciseOnChange} placeholder="bench press"/>
                    </div>
                    <div className="exerciseform-name">
                        <label htmlFor="category">category</label>
                        <input type="text" name="category" className='form-input' value={exerciseForm.category} onChange={handleEExerciseOnChange} placeholder="anaerobic"/>
                    </div>

                    <div className='exerciseform-omega'>
                        <div className="exerciseform-name">
                            <label htmlFor="duration">Duration (min)</label>
                            <input type="number" name="duration" min="0" step="10" max="3500" className='form-input' value={exerciseForm.duration} onChange={handleEExerciseOnChange} placeholder="1"/>
                        </div>
                        <div className="exerciseform-name">
                            <label htmlFor="intensity">Intensity (1-10)</label>
                            <input type="number" name="intensity" className='form-input' min="0" step="1" max="10" value={exerciseForm.intensity} onChange={handleEExerciseOnChange} placeholder="1"/>
                        </div>
                    </div>
                    <div className="submit-exercise">
                        <button onClick={handleExerciseOnSubmit}>{isLoading ? "saving" : "save" }</button>
                    </div>
                </div>
            </div>
        </div>
    )
}