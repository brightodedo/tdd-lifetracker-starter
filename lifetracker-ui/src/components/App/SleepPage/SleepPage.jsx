import * as React from 'react'
import './SleepPage.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import {SleepContextProvider, useSleepContext} from '../../../../contexts/sleep'
import NotFound from '../NotFound/NotFound'
import { useAuthContext } from '../../../../contexts/auth'
import ApiClient from '../../../directory/apiClient'
import SleepOverview from '../SleepOverview/SleepOverview'
import SleepNew from '../SleepNew/SleepNew'
import SleepDetail from '../SleepDetail/SleepDetail'

export default function(){
    return(
        <SleepContextProvider>
            <SleepPage />
        </SleepContextProvider>
    )
}

function SleepPage(){
    const {user, handleNavlinksOnClick} = useAuthContext()
    const navigate = useNavigate()
    const {sleeps, setSleeps,
        initialized, setInitialized,
        isLoading, setIsLoading,
        error, setError} = useSleepContext()

    React.useEffect(async () => {
        if(!user){
            handleNavlinksOnClick("link-login")
            navigate("/login")
        }
    }, [user])

    return(
        <div className='sleep-page'>
        <div className="sleep-header">
            <p >Sleep</p>
        </div>
        <Routes>
            <Route path='/' element={<SleepOverview />}></Route>
            <Route path='/create' element={<SleepNew />}></Route>
            <Route path='/:sleepId' element={<SleepDetail />}></Route>
            <Route path='/*' element={<NotFound />}></Route>
        </Routes>
    </div>
)
}