import * as React from 'react'
import './Logo.css'
import { Link } from 'react-router-dom'
import imgSrc from '../../../assets/Logo.svg'


export default function Logo({handleNavlinksOnClick}){
    return(
        <div className='logo'>
            <div onClick={handleNavlinksOnClick}>
                <Link to='/'><img src={imgSrc} alt="" /></Link>
            </div>
        </div>
    )
}