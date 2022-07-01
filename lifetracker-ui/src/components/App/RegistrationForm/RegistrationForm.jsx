import axios from 'axios'
import * as React from 'react'
import { Link, useNavigate} from 'react-router-dom'
import './RegistrationForm.css'
import { useAuthContext } from '../../../../contexts/auth'


export default function RegistrationForm(){
    const {setUser} = useAuthContext()
    const navigate = useNavigate()
    const [registerForm, setRegisterForm] = React.useState({email : "", 
                                                            username: "",
                                                                first_name : "",
                                                            last_name : "", 
                                                            password : "",
                                                            passwordConfirm : ""})
    const [registerError, setRegisterError] = React.useState({
        "email" : false,
        "password" : false,
        "register" : ""
    })
    const [registerLoading, setRegisterLoading] = React.useState(false)
    const handleRegisterOnChange = (event) => {
        let value = event.target.value
        let field = event.target.name

        if(field == "email"){
            if(!value.includes('@')){
                setRegisterError({...registerError, [field] : true})
            }
            else{
                setRegisterError({...registerError, [field] : false})
            }
        }

        if(field == "password"){
            if(registerForm.passwordConfirm != value){
                setRegisterError({...registerError, [field] : true})
            }
            else{
                setRegisterError({...registerError, [field] : false})
            }
        }

        if(field =="passwordConfirm"){
            if(registerForm.password != value){
                setRegisterError({...registerError, "password" : true})
            }
            else{
                setRegisterError({...registerError, "password" : false})
            }
        }

        setRegisterForm({...registerForm, [field] : value})
    }

    const handleRegisterOnSubmit = async (event) => {
        event.preventDefault()
        setRegisterLoading(true)


        if(registerError.email){
            setRegisterError({...registerError, "register" : "Invalid Email"})
            return
        }

        if(registerError.password){
            setRegisterError({...registerError, "register" : "Passwords do not match"})
            return
        }

        if(!registerForm.password || !registerForm.first_name || !registerForm.last_name || !registerForm.username){
            setRegisterError({...registerError, "register" : "complete all fields"})
            setRegisterLoading(false)
            return
        }
        
        try{
            const result = await axios.post('http://localhost:3001/auth/register',{
                "username" : registerForm.username,
	            "password" : registerForm.password,
                "first_name" : registerForm.first_name,
                "last_name" : registerForm.last_name,
                "email"  :  registerForm.email
            })
            
            if(result?.data?.user){
                setRegisterLoading(false)
                setUser(result.data)
                navigate("/activity")
            }
            else{
                setRegisterError({...registerError, "register" : err?.response?.data?.error?.message})
                setRegisterLoading(false)
            }
        }
        catch(err){
            console.log(err?.response?.data?.error?.message)
            setRegisterLoading(false)
            setRegisterError({...registerError, "register" : err?.response?.data?.error?.message})
        }
    }

    return(
        <div className="registration-form">
            <div className="redner">
                <div className="tops">
                <h1 className="register">Sign Up</h1>
                {registerError.register ? <p className='error'>{registerError.register}</p> : <></>}
                </div>
                <div className="card">
                    <div className="email">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" className="form-input" value={registerForm.email} onChange={handleRegisterOnChange} placeholder="jane@doe.com"/>
                        {registerError.email ? <p className='error'>Invalid email</p> : <></>}
                    </div>
                    <div className="username">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" className="form-input" value={registerForm.username} onChange={handleRegisterOnChange} placeholder="JaneFever4Ever"/>
                    </div>
                    <div className="names">
                        <div className="name">
                            <label htmlFor="first_name">First Name</label>
                            <input type="text" name="first_name" className="form-input" value={registerForm.first_name} onChange={handleRegisterOnChange} placeholder="Jane"/>
                        </div>
                        <div className="name">
                            <label htmlFor="last_name">Last Name</label>
                            <input type="text" name="last_name" className="form-input" value={registerForm.last_name} onChange={handleRegisterOnChange} placeholder="Doe"/>
                        </div>
                    </div>
                    <div className="password">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" className="form-input" value={registerForm.password} onChange={handleRegisterOnChange} placeholder="password"/>
                        {registerError.password ? <p className='error'>passwords don't match</p> : <></>}
                    </div>
                    <div className="password">
                        <label htmlFor="passwordConfirm">Confirm Password</label>
                        <input type="password" name="passwordConfirm" className="form-input" value={registerForm.passwordConfirm} onChange={handleRegisterOnChange} placeholder="password"/>
                    </div>
                    <div className="register-btn">
                        <button onClick={handleRegisterOnSubmit}>SignUp</button>
                    </div>
                </div>
                <div className="redirect">
                    <p className='signin'> Have An Account? <Link to='/login' className='restore'>Login</Link></p>
                </div>
            </div>
        </div>
    )
}