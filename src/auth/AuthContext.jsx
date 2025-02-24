import { createContext } from "react"


const AuthContext = createContext({
    isAuthenticated: false,
    isLoading: false,
    login: () => {},
    logout: () => {},
    checkAuthenticationStatus: () => {},
})

export default AuthContext