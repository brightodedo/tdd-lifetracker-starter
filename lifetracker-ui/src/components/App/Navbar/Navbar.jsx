import * as React from 'react'
import Logo from '../Logo/Logo'
import NavLinks from '../NavLinks/NavLinks'
import './Navbar.css'


export default function Navbar({setAppState, appState}){
    return(
        <div className='Navbar'>
            <div className="content">
                <Logo />
                <NavLinks setAppState={setAppState} appState={appState}/>
            </div> 
        </div>
    )
}