import * as React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './LoginForm.css'
import axios from 'axios'
import { useAuthContext } from '../../../../contexts/auth'

export default function LoginForm(){
    const {setUser} = useAuthContext()
    const navigate = useNavigate()
    const [loginForm, setLoginForm] = React.useState({email : "", password : ""})
    const [loginLoading, setLoginLoading] = React.useState(false)
    const [loginError, setLoginError] = React.useState()
    const [improperEmail, setImproperEmail] = React.useState(false)

    const handleOnChange = (event) => {
        const value = event.target.value
        const field = event.target.name

        if(field == 'email'){
            if(!value.includes('@')) setImproperEmail(true)
            else setImproperEmail(false)
        }
        
        
        setLoginForm({...loginForm, [field] : value})
    }

    const handleLoginOnSubmit = async (event) =>{
        event.preventDefault()
        setLoginLoading(true)

        if(!loginForm.email ){
            setLoginError("Missing Email")
            setLoginLoading(false)
            return
        }

        if(!loginForm.password){
            setLoginError("Missing password")
            setLoginLoading(false)
            return
        }

        try{
            const result = await axios.post('http://localhost:3001/auth/login',
            loginForm)

            if (result?.data?.user) {
                setUser(result.data.user)
                setLoginLoading(false)
                navigate("/activity")
              } else {
                setLoginError("Something wrong with login")
                setLoginLoading(false)
              }
        }
        catch(err){
            setLoginLoading(false)
            console.log(err)
            setLoginError(err?.response?.data?.error?.message)
        }
    }
    
    return(
        <div className="login-form">
            <div className="input-window">
                <div className="tops">
                    <h1 className="register"> Login </h1>
                    {loginError ? <p className='error'>{loginError}</p> : <></>}
                </div>
                <div className="card">
                    <div className="email">
                        <label htmlFor="email">Email</label>
                        <input type="text" className="form-input" name='email' value={loginForm.email} onChange={handleOnChange} placeholder="jane@doe.com"/>
                        {improperEmail ? <p className='error'> Invalid email </p> : <></>}
                    </div>

                    <div className="password">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-input" name='password'value={loginForm.password} onChange={handleOnChange} placeholder="Password"/>
                    </div>
                
                    <div className="register-btn">
                        <button className='signin' onClick={handleLoginOnSubmit}> Login </button>
                    </div>
                </div> 
                <div className="redirect">
                    <p className="signin">Don't have an account? <Link to='/register' className='restore'>SignUp</Link> </p>
                </div>
            </div>
        </div>
    )
}