import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import ActivityFeed from '../ActivityFeed/ActivityFeed'
import './ActivityPage.css'
import { useAuthContext } from '../../../../contexts/auth'


export default function ActivityPage(){
    const {user, handleNavlinksOnClick} = useAuthContext()
    const navigate = useNavigate()
    React.useEffect(() => {
        if(!user){
            handleNavlinksOnClick("link-login")
            navigate("/login")
        }
    }, [user]) 

    return(
        <div className="activity-page">
            <ActivityFeed />
        </div>
    )
}