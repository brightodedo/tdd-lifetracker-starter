import * as React from 'react'
import './ExerciseCard.css'
import moment from 'moment'

export default function ExerciseCard({exercise}){
    return(
        <div className="exercise-card">
        <div className="card-top">
            <p className="exercise-name">{exercise.name}</p>
        </div>
        <div className="card-middle">
            <div className="card-middle-omega">
                <h6 className='exercise-duration'>Duration</h6>
                <p>{exercise.duration}</p>
            </div>
            <div className="card-middle-beta">
                <h6 className='exercise-intensity'> Intensity </h6>
                <p>{exercise.intensity}</p>
            </div>
        </div>
        <div className="card-bottom">
            <div className="exercise-date">
                <p>{moment(new Date(exercise.created_at)).calendar()}</p>
            </div>
            <div className="exercise-category">
                <p>{exercise.category}</p>
            </div>
        </div>

        </div>
    )
}