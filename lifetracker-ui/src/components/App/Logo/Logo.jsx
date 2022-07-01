import * as React from 'react'
import './Logo.css'
import { Link } from 'react-router-dom'
import imgSrc from '../../../assets/Logo.svg'
import { useAuthContext } from '../../../../contexts/auth'


export default function Logo(){
    const {handleNavlinksOnClick} = useAuthContext()
    return(
        <div className='logo'>
            <div onClick={() => handleNavlinksOnClick(null)}>
                <Link to='/'><img src={imgSrc} alt="" /></Link>
            </div>
        </div>
    )
}