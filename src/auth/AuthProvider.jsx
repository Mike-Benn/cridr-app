import { useState } from "react";
import apiClient from "../api/apiClient";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";


const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [isAuthenticated , setIsAuthenticated] = useState(false)

    const login = async (credentials) => {
        try {
            const response = await apiClient.post("/auth/log-in" , credentials);
            if (response.data.isAuthenticated) {
                setIsAuthenticated(true);
                navigate("/")

            }
        } catch (error) {
            console.error(error, "Unnable to log you in.");
        }
    }
    
    const logout = async () => {
        try {
            const response = await apiClient.post("/log-out");
            if (response.status === 200) {
                setIsAuthenticated(false);
                navigate("/log-in");
            }
        } catch (error) {
            console.error(error , "There was an issue communicating with the server.");
        }
    }

    

    return (
        <AuthContext.Provider value={ { login , logout , isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthProvider
