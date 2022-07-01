import * as React from 'react'
import Logo from '../Logo/Logo'
import NavLinks from '../NavLinks/NavLinks'
import './Navbar.css'
import { useAuthContext } from '../../../../contexts/auth'


export default function Navbar(){
    const [navs, setNavs] = React.useState({
        "link-activity" : "inactive",
        "link-nutrition" : "inactive",
        "link-exercise" : "inactive",
        "link-sleep" : "inactive",
        "link-login" : "inactive",
        "link-register" : "inactive",
    })

    const handleNavlinksOnClick = (event) => {
        event.preventDefault()
        const att = event.target.parentElement.id

        setNavs({
            "link-activity" : "inactive",
        "link-nutrition" : "inactive",
        "link-exercise" : "inactive",
        "link-sleep" : "inactive",
        "link-login" : "inactive",
        "link-register" : "inactive",
        [att] : "active"
        })
    }

    return(
        <div className='Navbar'>
            <div className="content">
                <Logo handleNavlinksOnClick={handleNavlinksOnClick}/>
                <NavLinks navs={navs} handleNavlinksOnClick={handleNavlinksOnClick}/>
            </div> 
        </div>
    )
}