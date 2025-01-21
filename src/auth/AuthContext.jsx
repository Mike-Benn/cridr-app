import { createContext } from "react"


const AuthContext = createContext({
    isAuthenticated: false,
    login: () => {},
    logout: () => {},
    checkAuthenticationStatus: () => {},
})

export default AuthContext