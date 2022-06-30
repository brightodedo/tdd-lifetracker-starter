import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import RegistrationForm from '../RegistrationForm/RegistrationForm'
import './RegistrationPage.css'


export default function RegistrationPage({setAppState, appState}){
    const navigate = useNavigate()
    React.useEffect(() => {
        if(appState)
        navigate('/activity')
    }, [appState])

    return(
        <div className="registration-page">
            <RegistrationForm setAppState={setAppState}/>
        </div>
    )
}