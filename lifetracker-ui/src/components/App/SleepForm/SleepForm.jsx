import * as React from 'react'
import './SleepForm.css'
import ApiClient from '../../../directory/apiClient'
import { useNavigate } from 'react-router-dom'
import {useSleepContext} from '../../../../contexts/sleep'

export default function SleepForm(){
    const navigate = useNavigate()
    const {setIsLoading, isLoading, error, setError} = useSleepContext()
    const [sleepForm, setSleepForm] = React.useState({
        start_time : "",
        end_time : ""
})

const handleSleepOnChange = (event) => {
    const field = event.target.name
    const value = event.target.value

    setSleepForm({...sleepForm, [field] : value})
} 

const handleSleepOnSubmit = async () => {
    setIsLoading(true)

    if(sleepForm.start_time == ''){
        setError("complete the start time form with appropriate values")
        setIsLoading(false)
        return
    }

    if(sleepForm.end_time == ''){
        setError("complete the end time form with appropriate values")
        setIsLoading(false)
        return
    }

    if(sleepForm.end_time < sleepForm.start_time){
        setError("start time cannot be after end time")
        setIsLoading(false)
        return
    }

    if(sleepForm.end_time == sleepForm.start_time){
        setError("start time cannot be the same as endtime")
        setIsLoading(false)
        return
    }


    const rapport = await ApiClient.createSleep(sleepForm) 
        const data = rapport.data
        const serverError = rapport.error
        if(serverError) {
            setError(serverError)
        }
        if(data){
            setError(null)
            setSleepForm({
                start_time : "",
                end_time : ""
        })
            setIsLoading(false)
            navigate('/sleep')
        }
        setError(null)
        setIsLoading(false)
        return
    }


    return(
        <div className='sleep-form'>
        <div className="sleep-redner">
            <div className="tops">
                <h1 className='record-sleep'>Record Sleep</h1>
                {error ? <p className='error'>{error}</p> : <></>}
            </div>
            <div className="card">
                <div className="sleepform-name">
                    <label htmlFor="start_time">Start Time</label>
                    <input type="datetime-local" name="start_time" className='form-input' placeholder="bench press" value={sleepForm.start_time} onChange={handleSleepOnChange}/>
                </div>
                <div className="sleepform-name">
                    <label htmlFor="end_time">End Time</label>
                    <input type="datetime-local" name="end_time" className='form-input'  placeholder="anaerobic" value={sleepForm.end_time} onChange={handleSleepOnChange}/>
                </div> 

                <div className="submit-sleep">
                    <button onClick={handleSleepOnSubmit}>{isLoading ? "saving" : "save" }</button>
                </div>
            </div>
        </div>
    </div>
)
}