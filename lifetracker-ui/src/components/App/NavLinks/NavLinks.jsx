import * as React from 'react'
import './NavLinks.css'
import { Link, useNavigate } from 'react-router-dom'

export default function NavLinks({setAppState, appState}){
    const navigate = useNavigate()
    const handleLogoutOnClick = (event) => {
        event.preventDefault()
        setAppState(null)
        navigate('/')
    }
    return (
        <div className="nav-links">
            <ul className='links'>
            <li><Link to='/activity'>Activity</Link></li>
            <li><Link to='/nutrition/*'>Nutrition</Link></li>
            <li><Link to='/'>Exercise</Link></li>
            <li><Link to='/'>sleep</Link></li>
            {appState ? <></> : <li><Link to='/login'>login</Link></li>}
            {appState ? <></>  : <li><Link to='register'>signup</Link></li>}
            {!appState ? <></> : <li><Link to='/login' onClick={handleLogoutOnClick}>Logout</Link></li>}
            </ul>
        </div>
    )
}