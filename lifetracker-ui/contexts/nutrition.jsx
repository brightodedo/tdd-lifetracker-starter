import * as React from 'react'
import { useAuthContext } from './auth'
import axios from 'axios'
import ApiClient from '../src/directory/apiClient'

const NutritionContext = React.createContext(null)

export const NutritionContextProvider =  ({children}) => {
    const [nutritions, setNutritions] = React.useState([])
    const [initialized, setInitialized] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState(null)

    const {user} = useAuthContext()

    React.useEffect(async () => {
        if(user){
            setIsLoading(true)
            const {data, error} = await ApiClient.nutrition()
            if(error) setError(error)
            if(data) setNutritions(data.nutritions)
            setIsLoading(false)
            setInitialized(true)
        }
    },[user])

    const nutritionValue = {nutritions, setNutritions,
        initialized, setInitialized,
        isLoading, setIsLoading,
        error, setError}

    return (
        <NutritionContext.Provider value={nutritionValue}>
            <>{children}</>
        </NutritionContext.Provider>
    )

}

export const useNutritionContext = () => React.useContext(NutritionContext)