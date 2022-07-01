import * as React from 'react'
import './NutritionFeed.css'
import {useNutritionContext} from '../../../../contexts/nutrition'
import NutritionCard from '../NutritionCard/NutritionCard'


export default function NutritionFeed(){
    const {nutritions} = useNutritionContext()

    return(
        <div className="nutrition-feed">
            {nutritions.length == 0 ? <h1 className='empty-message'> Nothing here yet </h1>
            : nutritions.map((nutrition, idx) => {
                return <NutritionCard key={idx} nutrition={nutrition}/>
            })} 
        </div>
    )
}