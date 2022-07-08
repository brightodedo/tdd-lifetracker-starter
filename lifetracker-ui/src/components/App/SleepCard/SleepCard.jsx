import * as React from 'react'
import './SleepCard.css'
import moment from 'moment'

export default function SleepCard({sleep}){
    console.log(sleep)

    const startDateToCardFormat = ({start_date}) => {
        const monthToMon = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]
        const dayToDay = ["st", "nd", "rd", "th"]
        const fullDate = start_date.split("T")[0]
        var [year, month, day]  = (fullDate.split("-"))
        month = parseInt(month)
        day = parseInt(day) 
        const rday = day % 10

        console.log(year,monthToMon[month],day, rday)
        return month
    }

    return(
        <div className="sleep-card">
            <div className="card-top">
                <p className="sleep-name">{startDateToCardFormat(sleep)}</p>
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
                    <p>num_of_hours{moment(new Date(sleep.end_date)).calendar()}</p>
                </div>
            </div>

        </div>
    )
}