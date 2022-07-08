import * as React from 'react'
import { useAuthContext } from './auth'

const SleepContext = React.createContext(null)

export const SleepContextProvider = ({children}) => {
    const [sleeps, setSleeps] = React.useState([])
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

    const sleepValue = {sleeps, setSleeps,
        initialized, setInitialized,
        isLoading, setIsLoading,
        error, setError}

    return (
        <SleepContext.Provider value={sleepValue}>
            <>{children}</>
        </SleepContext.Provider>
    )
}

export const useSleepContext = () => React.useContext(SleepContext)