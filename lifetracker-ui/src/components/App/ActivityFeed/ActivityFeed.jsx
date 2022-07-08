import * as React from 'react'
import './ActivityFeed.css'
import { Link } from 'react-router-dom'
import ApiClient from '../../../directory/apiClient'
import { useAuthContext } from '../../../../contexts/auth'



export default function ActivityFeed(){
    const [lerror, setLerror] = React.useState(null)
    const [summary, setSummary] = React.useState({})
    const [avgsleephours, setAvgSleepHours] = React.useState(0)
    const [totalsleephours, settotalSleepHours] = React.useState(0)

    const {handleNavlinksOnClick} = useAuthContext()

    React.useEffect(async () => {
        const {data, error} = await ApiClient.activity()
        if(error){
            setLerror(error)
            return
        }
        if(data){
             setSummary(data.summary)
             if(data?.summary?.avgsleehours?.avg){
                const fem = await dateToHours(data?.summary?.avgsleehours?.avg)
                setAvgSleepHours(fem)
            }
            if(data?.summary?.totalsleephours?.sum){
                const doug = await dateToHours(data?.summary?.totalsleephours?.sum)
                settotalSleepHours(doug)
            }
        }
    }, [])

    const dateToHours = async (day) => {
        if (!day){
            return 0
        }
        var hours = 0 
        const key = Object.keys(day)
        key.map(period => {
            if(period == 'days'){
                hours += (day[period] * 24)
            }
            if(period == 'hours'){
                hours += day[period]
            }
            if(period == 'minutes'){
                hours += (day[period] / 60)
            }
            if(period == 'seconds'){
                hours += (day[period] / 3600)
            }
        })
        return hours.toFixed(2)
    }
    
    return(
        <div className="activity-feed">
            <div className="working-area">
                <div className='handy'>
                    <h1>Activity Feed</h1>
                </div>
                <div className="randy">
                    <Link to='/exercise/create'><button onClick={() => {handleNavlinksOnClick('link-exercise')}}>Add Exercise</button></Link>
                    <Link to='/sleep/create'><button onClick={() => {handleNavlinksOnClick('link-sleep')}}>Log Sleep</button></Link>
                    <Link to='/nutrition/create'><button onClick={() => {handleNavlinksOnClick('link-nutrition')}}> Record Nutrition </button></Link>
                </div>
            </div>
            {lerror ? <p className="error">{lerror}</p> : <></>}
            <div className="below-banner">
                    <div className="first-banner">
                        <div className="total-exercise">
                            <div className="top-word">
                                <h4>Total Exercise Minutes</h4>
                            </div>
                            <div className="bottom-word">
                                <p>{summary?.totalexemin?.sum  ? summary.totalexemin.sum : 0}</p>
                            </div>
                        </div>
                        <div className="avg-sleep">
                            <div className="top-word">
                                <h4>Avg Sleep Hours</h4>
                                </div>
                                <div className="bottom-word">
                                    <p>{avgsleephours }</p>
                                </div>
                            </div>
                        <div className="avg-calories">
                            <div className="top-word">
                                <h4>Avg Daily Calories</h4>
                            </div>
                            <div className="bottom-word">
                                <p>{summary?.avgdaily?.avg ? Number(summary.avgdaily.avg).toFixed(2) : 0}</p>
                            </div>
                        </div>
                    </div>
                    <div className="second-label">
                        <h3>More Stats</h3>
                    </div>
                    <div className="second-banner">
                        <div className="max-cal">
                            <div className="top-word">
                                <h4>Maximum Hourly Calories</h4>
                            </div>
                            <div className="bottom-word">
                                <p>350</p>
                            </div>
                        </div>
                        <div className="avg-exercise">
                            <div className="top-word">
                                <h4>Avg Exercise Intensity</h4>
                            </div>
                            <div className="bottom-word">
                                <p>{summary?.avgexeintens?.avg ? Number(summary.avgexeintens.avg).toFixed(2) : 0}</p>
                            </div>
                        </div>
                        <div className="total-sleep">
                            <div className="top-word">
                                <h4>Total hours Slept</h4>
                            </div>
                           <div className="bottom-word">
                                <p>{totalsleephours}</p>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}