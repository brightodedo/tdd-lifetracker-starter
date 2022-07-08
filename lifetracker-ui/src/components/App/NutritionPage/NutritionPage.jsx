import * as React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { NutritionContextProvider, useNutritionContext } from '../../../../contexts/nutrition'
import NotFound from '../NotFound/NotFound'
import NutritionDetail from '../NutritionDetail/NutritionDetail'
import NutritionNew from '../NutritionNew/NutritionNew'
import NutritionOverview from '../NutritionOverview/NutritionOverview'
import { useAuthContext } from '../../../../contexts/auth'
import ApiClient from '../../../directory/apiClient'
import './NutritionPage.css'

export default function(){
    return(
        <NutritionContextProvider>
            <NutritionPage  />
        </NutritionContextProvider>
    )
}

function NutritionPage(){
    const {nutritions, setNutritions, isLoading, setInitialized, setIsLoading, setError} = useNutritionContext()
    const {user, handleNavlinksOnClick} = useAuthContext()
    const navigate = useNavigate()
    React.useEffect(async() => {
        if(!user){
            handleNavlinksOnClick("link-login")
            navigate("/login")
        }   
    }, [user]) 

    return(
        <div className="nutrition-page">
            <div className="nutrition-header">
                <p >Nutrition</p>
            </div>
            <Routes>
                <Route path='/' element={<NutritionOverview />}></Route>
                <Route path='/create' element={<NutritionNew />}></Route>
                <Route path='/:nutritionId' element={<NutritionDetail />}></Route>
                <Route path='/*' element={<NotFound />}></Route>
            </Routes>
        </div>
    )
}