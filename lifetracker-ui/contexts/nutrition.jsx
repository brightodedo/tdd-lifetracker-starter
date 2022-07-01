import * as React from 'react'
import { useAuthContext } from './auth'
import axios from 'axios'


const NutritionContext = React.createContext(null)

export const NutritionContextProvider = ({children}) => {
    const [nutritions, setNutritions] = React.useState([])
    const [initialized, setInitialized] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState(null)

    const {user} = useAuthContext()

    React.useEffect(async () => {
        if(user){
            setIsLoading(true)
            await axios.get('http://localhost:3001/nutrition')
            .then((response) => {
                setNutritions(response.data)
            })
            .catch((err) => {
                console.log(err)
                setError(err)
            })
            .then(() => {
                setIsLoading(false)
                setInitialized(true)
            })
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