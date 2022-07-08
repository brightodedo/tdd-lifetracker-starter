import * as React from 'react'
import SleepCard from '../SleepCard/SleepCard'
import ApiClient from '../../../directory/apiClient'
import './SleepFeed.css'
import { useSleepContext } from '../../../../contexts/sleep'

export default function SleepFeed(){
    const {sleeps, setSleeps,
        initialized, setInitialized,
        isLoading, setIsLoading, setError} = useSleepContext()
    
        
        React.useEffect( async() => {
            // setInitialized(true)
            const {data, error} = await ApiClient.sleep()
                if(error) setError(error)
                if(data) setSleeps(data.sleeps)
                setIsLoading(false)
                setInitialized(true)
        }, [])

    return(
        <div className="sleep-feed">
        {sleeps.length == 0 ? <h1 className='empty-message'> Nothing here yet </h1>
        : sleeps.map((sleep, idx) => {
            return <SleepCard key={idx} sleep={sleep}/>
        })} 
        </div>
    )
}