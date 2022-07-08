import * as React from 'react'
import {useExcerciseContext} from '../../../../contexts/exercise'
import Loading from '../Loading/Loading'
import ExerciseFeed from '../ExerciseFeed/ExerciseFeed'
import { Link } from 'react-router-dom'
import './ExerciseOverview.css'


export default function ExerciseOverview(){
    const {exercises, setExercises,
        initialized, setInitialized,
        isLoading, setIsLoading,
        error, setError} = useExcerciseContext()
    return(
        <div className="exercise-overview">
            <div className="overview-header">
                <div className='overview-text'>
                    <h1>Overview</h1>
                </div>
                <div className='overview-button'>
                    <Link to='/exercise/create'><button>Record Exercise</button></Link>
                </div>
            </div>
            {error ? <p className="error">{error}</p> :
            isLoading ? <Loading /> :
            <ExerciseFeed />
            }
        </div>
    )
}