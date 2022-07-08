import * as React from 'react'
import { useAuthContext } from './auth'

const ExerciseContext = React.createContext(null)

export const ExerciseContextProvider = ({children}) => {
    const [exercises, setExercises] = React.useState([])
    const [initialized, setInitialized] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState(null)

    const {user} = useAuthContext()

    React.useEffect(async () => {
        if(user){
            setIsLoading(false)
            setInitialized(true)
        }
    }, [user])

    const exerciseValue = {exercises, setExercises,
        initialized, setInitialized,
        isLoading, setIsLoading,
        error, setError}

    return (
        <ExerciseContext.Provider value={exerciseValue}>
            <>{children}</>
        </ExerciseContext.Provider>
    )
}

export const useExcerciseContext = () => React.useContext(ExerciseContext)