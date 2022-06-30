import * as React from 'react'


const AuthContext = React.createContext(null)

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = React.useState({})

    const authValue = {user, setUser}

    return(
        <AuthContext.Provider value={authValue}>
            <>{children}</>
        </AuthContext.Provider>
    )
}