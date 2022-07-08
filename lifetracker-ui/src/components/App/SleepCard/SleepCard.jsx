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
        var rday = day % 10
        if(rday > 3){
            rday = dayToDay[3]
        }
        else{
            rday = dayToDay[rday-1]
        }
        return `${monthToMon[month]} ${day}${rday}, ${year}`
    }

    const timeToCardFormat = (time) =>{
        const mytime = time.split(".")[0]
        
        var [hour, min, sec] = mytime.split(":") 
        var amPm = "AM";
        if(parseInt(hour)  > 12){
            hour = parseInt(hour) - 12
            amPm = "PM"
        }
        return `${hour}:${min} ${amPm}`
    }

    const intervalToCardFormat = ({day_interval}) => {
        var keys = Object.keys(day_interval)
        var result = ''
        keys.map((key) => {
            result = result + `${day_interval[key]} ${key} `
        })
        return result
    }
    return(
        <div className="sleep-card">
            <div className="card-top">
                <p className="sleep-name">{startDateToCardFormat(sleep)}</p>
            </div>
            <div className="card-middle">
                <div className="card-middle-omega">
                    <h6 className='sleep-duration'>Start Time</h6>
                    <p>{timeToCardFormat(sleep.start_time)}</p>
                </div>
                <div className="card-middle-beta">
                    <h6 className='sleep-intensity'> End Time </h6>
                    <p>{timeToCardFormat(sleep.end_time)}</p>
                </div>
            </div>
            <div className="card-bottom">
                <div className="sleep-date">
                    <p>{intervalToCardFormat(sleep)}</p>
                </div>
            </div>

        </div>
    )
}