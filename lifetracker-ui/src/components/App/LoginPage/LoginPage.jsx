import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../LoginForm/LoginForm'
import './LoginPage.css'


export default function LoginPage({setAppState, appState}){
    const navigate = useNavigate()
    React.useEffect(() => {
        if(appState){
            navigate("/activity")
        }
    }, [appState]) 

    return(
        <div className="login-page">
            <LoginForm setAppState={setAppState}/>
        </div>
    )
}