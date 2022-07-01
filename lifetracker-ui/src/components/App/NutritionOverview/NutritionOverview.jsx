import * as React from 'react'
import './NutritionOverview.css'
import {useNutritionContext} from '../../../../contexts/nutrition'
import Loading from '../Loading/Loading'
import NutritionFeed from '../NutritionFeed/NutritionFeed'
import { Link } from 'react-router-dom'


export default function NutritionOverview(){
    const {nutritions, setNutritions,
        initialized, setInitialized,
        isLoading, setIsLoading,
        error, setError} = useNutritionContext()

    return(
        <div className="nutrition-overview">
            <div className="overview-header">
                <div className='overview-text'>
                    <h1>Overview</h1>
                </div>
                <div className='overview-button'>
                    <Link to='/nutrition/create'><button>Record Nutrition</button></Link>
                </div>
            </div>
            {error ? <p className="error">{error}</p> :
            isLoading ? <Loading /> :
            <NutritionFeed />
            }
        </div>
    )
}