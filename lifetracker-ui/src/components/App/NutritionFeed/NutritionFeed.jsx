import * as React from 'react'
import './NutritionFeed.css'
import {useNutritionContext} from '../../../../contexts/nutrition'
import NutritionCard from '../NutritionCard/NutritionCard'
import ApiClient from '../../../directory/apiClient'


export default function NutritionFeed(){
    const {nutritions, setNutritions, setInitialized, setIsLoading} = useNutritionContext()

    React.useEffect( async() => {
        const {data, error} = await ApiClient.nutrition()
            if(error) setError(error)
            if(data) setNutritions(data.nutritions)
            setIsLoading(false)
            setInitialized(true)
    }, [])

    return(
        <div className="nutrition-feed">
            {nutritions.length == 0 ? <h1 className='empty-message'> Nothing here yet </h1>
            : nutritions.map((nutrition, idx) => {
                return <NutritionCard key={idx} nutrition={nutrition}/>
            })} 
        </div>
    )
}