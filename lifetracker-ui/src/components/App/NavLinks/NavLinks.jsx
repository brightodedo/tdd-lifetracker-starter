import * as React from 'react'
import './NavLinks.css'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../../../contexts/auth'

export default function NavLinks({navs, handleNavlinksOnClick}){

    const {user, setUser} = useAuthContext()
    const navigate = useNavigate()
    const handleLogoutOnClick = (event) => {
        event.preventDefault()
        setUser(null)
        navigate('/')
    }
    return (
        <div className="nav-links">
            <ul className='links'>
            <li className={navs['link-activity']} id="link-activity" onClick={handleNavlinksOnClick}><Link to='/activity'>Activity</Link></li>
            <li className={navs['link-nutrition']} id="link-nutrition" onClick={handleNavlinksOnClick}><Link to='/nutrition'>Nutrition</Link></li>
            <li className={navs['link-exercise']} id="link-exercise" onClick={handleNavlinksOnClick}><Link to='/'>Exercise</Link></li>
            <li className={navs['link-sleep']} id="link-sleep" onClick={handleNavlinksOnClick}><Link to='/'>sleep</Link></li>
            {user ? <></> : <li className={navs['link-login']} id="link-login" onClick={handleNavlinksOnClick}><Link to='/login'>login</Link></li>}
            {user ? <></>  : <li className={navs['link-register']} id="link-register" onClick={handleNavlinksOnClick}><Link to='register'>signup</Link></li>}
            {!user ? <></> : <li><Link to='/login' onClick={handleLogoutOnClick}>Logout</Link></li>}
            </ul>
        </div>
    )
}