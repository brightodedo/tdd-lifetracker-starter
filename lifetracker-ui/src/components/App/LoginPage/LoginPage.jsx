import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../LoginForm/LoginForm'
import './LoginPage.css'
import { useAuthContext } from '../../../../contexts/auth'


export default function LoginPage(){
    const {user} = useAuthContext()
    const navigate = useNavigate()
    React.useEffect(() => {
        if(user){
            navigate("/activity")
        }
    }, [user]) 

    return(
        <div className="login-page">
            <LoginForm />
        </div>
    )
}