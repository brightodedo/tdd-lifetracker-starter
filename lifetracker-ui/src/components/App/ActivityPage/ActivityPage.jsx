import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import ActivityFeed from '../ActivityFeed/ActivityFeed'
import './ActivityPage.css'


export default function ActivityPage({appState}){
    const navigate = useNavigate()
    React.useEffect(() => {
        if(!appState){
            navigate("/login")
        }
    }, [appState]) 

    return(
        <div className="activity-page">
            <ActivityFeed />
        </div>
    )
}