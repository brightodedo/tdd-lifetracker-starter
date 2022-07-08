import * as React from 'react'
import './SleepCard.css'
import moment from 'moment'

export default function SleepCard({sleep}){
    console.log(sleep)
    return(
        <div className="sleep-card">
            <div className="card-top">
                <p className="sleep-name">{sleep.start_time}</p>
            </div>
            <div className="card-middle">
                <div className="card-middle-omega">
                    <h6 className='sleep-duration'>Start Time</h6>
                    <p>PlaceHOlder</p>
                </div>
                <div className="card-middle-beta">
                    <h6 className='sleep-intensity'> End Time </h6>
                    <p>{ sleep.end_time}</p>
                </div>
            </div>
            <div className="card-bottom">
                <div className="sleep-date">
                    <p>num_of_hours{moment(new Date(sleep.created_at)).calendar()}</p>
                </div>
            </div>

        </div>
    )
}