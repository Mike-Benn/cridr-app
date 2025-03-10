import { createContext } from "react"


const AuthContext = createContext({
    isAuthenticated: false,
    isLoading: false,
    login: () => {},
    logout: () => {},
    checkAuthenticationStatus: () => {},
    setIsAuthenticated: () => {},
})

export default AuthContext