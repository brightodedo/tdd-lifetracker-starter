import * as React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { NutritionContextProvider, useNutritionContext } from '../../../../contexts/nutrition'
import NotFound from '../NotFound/NotFound'
import NutritionDetail from '../NutritionDetail/NutritionDetail'
import NutritionNew from '../NutritionNew/NutritionNew'
import NutritionOverview from '../NutritionOverview/NutritionOverview'
import { useAuthContext } from '../../../../contexts/auth'
import './NutritionPage.css'

export default function(){
    return(
        <NutritionContextProvider>
            <NutritionPage  />
        </NutritionContextProvider>
    )
}

function NutritionPage(){
    const {nutritions, setNutritions, isLoading} = useNutritionContext()
    const {user, handleNavlinksOnClick} = useAuthContext()
    const navigate = useNavigate()
    React.useEffect(async() => {
        if(!user){
            handleNavlinksOnClick("link-login")
            navigate("/login")
        }
    }, [user, nutritions, setNutritions, isLoading ]) 

    return(
        <div className="nutrition-page">
            <div className="nutrition-header">
                <p >Nutrition</p>
            </div>
            <Routes>
                <Route path='/' element={<NutritionOverview />}></Route>
                <Route path='/create' element={<NutritionNew />}></Route>
                <Route path='/id:nutritionId' element={<NutritionDetail />}></Route>
                <Route path='/*' element={<NotFound />}></Route>
            </Routes>
        </div>
    )
}