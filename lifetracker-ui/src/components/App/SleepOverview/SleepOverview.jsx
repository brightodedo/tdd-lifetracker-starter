import * as React from 'react'
import {useSleepContext} from '../../../../contexts/sleep'
import Loading from '../Loading/Loading'
import { Link } from 'react-router-dom'
import './SleepOverview.css'
import SleepFeed from '../SleepFeed/SleepFeed'

export default function SleepOverview(){
    const {sleeps, setSleeps,
        initialized, setInitialized,
        isLoading, setIsLoading,
        error, setError} = useSleepContext()

    React.useEffect(async() =>{
        setIsLoading(false)
    })
    return(
        <div className='sleep-overview'>
        <div className="overview-header">
            <div className='overview-text'>
                <h1>Overview</h1>
            </div>
            <div className='overview-button'>
                <Link to='/sleep/create'><button>Record Sleep</button></Link>
            </div>
        </div>
        {error ? <p className="error">{error}</p> :
        isLoading ? <Loading /> :
        <SleepFeed />
        }
    </div>
)
}