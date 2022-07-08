import * as React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./App.css"
import Navbar from "./Navbar/Navbar"
import Landing from "./Landing/Landing"
import LoginPage from "./LoginPage/LoginPage"
import RegistrationPage from "./RegistrationPage/RegistrationPage"
import ActivityPage from "./ActivityPage/ActivityPage"
import NutritionPage from "./NutritionPage/NutritionPage"
import ExercisePage from "./ExercisePage/ExercisePage"
import NotFound from "./NotFound/NotFound"
import SleepPage from "./SleepPage/SleepPage"
import ApiClient from '../../directory/apiClient'
import {AuthContextProvider ,useAuthContext} from '../../../contexts/auth'

export default function AppContainer(){
  return(
    <AuthContextProvider >
      <App />
    </AuthContextProvider>
  )
}

function App() {
  const {user, setUser, setError, setIsProcessing, isProcessing} = useAuthContext()

  React.useEffect(() => {
    setIsProcessing(true)
    const fetchUser = async () => {
      const {data, error} = await ApiClient.fetchUserFromToken()
      if(data) setUser(data.user)
      if(error) setError(error)
    }

    const token = localStorage.getItem("lifetracker_token")
    if(token){
      ApiClient.setToken(token)
      fetchUser()
    }
    setIsProcessing(false)
  }, [])
  return (
    <div className="app">
      <React.Fragment>
        <BrowserRouter>
        <Navbar />
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegistrationPage />} /> 
            <Route path='/activity' element={<ActivityPage />} />  
            {/* AccessForbidden component with conditional statement */}
            <Route path='/nutrition/*' element={<NutritionPage />}/>
            <Route path='/exercise/*' element={<ExercisePage />}/>
            <Route path='/sleep/*' element={<SleepPage />}/>
            <Route path='*' element={<NotFound />}/>
          </Routes>
        </BrowserRouter>
        
      </React.Fragment>
    </div>
  )
}
