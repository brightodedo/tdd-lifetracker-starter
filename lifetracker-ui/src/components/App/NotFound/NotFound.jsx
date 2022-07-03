import * as React from 'react'
import './NotFound.css'
import imgSrc from '../../../assets/tomioka.png'


export default function NotFound(){
    return(
        <div className="notfound">
                <img src={imgSrc} alt="" />
            <div className="not-found">
                <h1> 404 </h1>
                <h1> NOT FOUND </h1>
                <h3> The page doesn't exist so here is a background image of Tomioka Giyu</h3>
            </div>
        </div>
    )
}