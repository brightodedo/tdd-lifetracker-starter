import * as React from 'react'


const AuthContext = React.createContext(null)

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = React.useState(null)
    const [navs, setNavs] = React.useState({
        "link-activity" : "inactive",
        "link-nutrition" : "inactive",
        "link-exercise" : "inactive",
        "link-sleep" : "inactive",
        "link-login" : "inactive",
        "link-register" : "inactive",
    })

    const handleNavlinksOnClick = (name) => {
        if(name != null){
            setNavs({
                "link-activity" : "inactive",
                "link-nutrition" : "inactive",
                "link-exercise" : "inactive",
                "link-sleep" : "inactive",
                "link-login" : "inactive",
                "link-register" : "inactive",
                [name] : "active"
            })
        }
        else{
            setNavs({
                "link-activity" : "inactive",
                "link-nutrition" : "inactive",
                "link-exercise" : "inactive",
                "link-sleep" : "inactive",
                "link-login" : "inactive",
                "link-register" : "inactive"
            })
        }
    }

    const [initialized, setInitialized] = React.useState(false)
    const [isProcessing , setIsProcessing] = React.useState(false)
    const [error, setError] = React.useState("")
    const authValue = {user, setUser, navs, handleNavlinksOnClick, error, setError, setIsProcessing, isProcessing}


    React.useEffect(() => {

    })
    return(
        <AuthContext.Provider value={authValue}>
            <>{children}</>
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => React.useContext(AuthContext)