import * as React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import {ExerciseContextProvider, useExcerciseContext} from '../../../../contexts/exercise'
import NotFound from '../NotFound/NotFound'
import ExerciseOverview from '../ExerciseOverview/ExerciseOverview'
import ExerciseNew from '../ExerciseNew/ExerciseNew'
import ExerciseDetail from '../ExerciseDetail/ExerciseDetail'
import { useAuthContext } from '../../../../contexts/auth'
import ApiClient from '../../../directory/apiClient'
import './ExercisePage.css'

export default function(){
    return(
        <ExerciseContextProvider>
            <ExercisePage />
        </ExerciseContextProvider>
    )
}


function ExercisePage(){
    const {user, handleNavlinksOnClick} = useAuthContext()
    const navigate = useNavigate()
    const {exercises, setExercises,
        initialized, setInitialized,
        isLoading, setIsLoading,
        error, setError} = useExcerciseContext()

    React.useEffect(async() => {
        if(!user){
            handleNavlinksOnClick("link-login")
            navigate("/login")
        }
    }, [user])

    return(
        <div className="exercise-page">
            <div className="exercise-header">
                <p >Exercise</p>
            </div>
            <Routes>
                <Route path='/' element={<ExerciseOverview />}></Route>
                <Route path='/create' element={<ExerciseNew />}></Route>
                <Route path='/:exerciseId' element={<ExerciseDetail />}></Route>
                <Route path='/*' element={<NotFound />}></Route>
            </Routes>
        </div>
    )
}