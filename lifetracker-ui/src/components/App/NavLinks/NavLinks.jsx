import * as React from 'react'
import './NavLinks.css'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../../../contexts/auth'

export default function NavLinks(){
    const {user, setUser,navs, handleNavlinksOnClick} = useAuthContext()
    const navigate = useNavigate()
    const handleLogoutOnClick = (event) => {
        event.preventDefault()
        setUser(null)
        handleNavlinksOnClick(null)
        navigate('/')
    }
    return (
        <div className="nav-links">
            <ul className='links'>
            <li className={navs['link-activity']}  onClick={() => {handleNavlinksOnClick('link-activity')}}><Link to='/activity'>Activity</Link></li>
            <li className={navs['link-nutrition']}  onClick={()=>{handleNavlinksOnClick('link-nutrition')}}><Link to='/nutrition'>Nutrition</Link></li>
            <li className={navs['link-exercise']}  onClick={()=>{handleNavlinksOnClick('link-exercise')}}><Link to='/'>Exercise</Link></li>
            <li className={navs['link-sleep']} onClick={()=>{handleNavlinksOnClick('link-sleep')}}><Link to='/'>sleep</Link></li>
            {user ? <></> : <li className={navs['link-login']} onClick={()=>{handleNavlinksOnClick('link-login')}}><Link to='/login'>login</Link></li>}
            {user ? <></>  : <li className={navs['link-register']}onClick={()=>{handleNavlinksOnClick('link-register')}}><Link to='register'>signup</Link></li>}
            {!user ? <></> : <li><Link to='/login' onClick={handleLogoutOnClick}>Logout</Link></li>}
            </ul>
        </div>
    )
}