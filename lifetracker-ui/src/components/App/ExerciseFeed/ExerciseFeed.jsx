import * as React from 'react'
import { useExcerciseContext } from '../../../../contexts/exercise'
import ApiClient from '../../../directory/apiClient'
import './ExerciseFeed.css'
import ExerciseCard from '../ExerciseCard/ExerciseCard'


export default function ExerciseFeed(){
    const {exercises, setExercises,
        initialized, setInitialized,
        isLoading, setIsLoading, setError} = useExcerciseContext()

        React.useEffect( async() => {
            setInitialized(true)
            const {data, error} = await ApiClient.exercise()
                if(error) setError(error)
                if(data) setExercises(data.exercises)
                setIsLoading(false)
                setInitialized(true)
        }, [])

    return(
        <div className="exercise-feed">
        {exercises.length == 0 ? <h1 className='empty-message'> Nothing here yet </h1>
        : exercises.map((exercise, idx) => {
            return <ExerciseCard key={idx} exercise={exercise}/>
        })} 
        </div>
    )
}