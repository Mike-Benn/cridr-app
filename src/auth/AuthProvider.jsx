import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";


const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [isAuthenticated , setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    }, [])
    
    const login = async (credentials) => {
        try {
            const response = await apiClient.post("/auth/login", credentials);
            if (response.data?.data) {
                localStorage.setItem("accessToken", response.data.data);
                setIsAuthenticated(true);
                navigate("/")
            }

        } catch (error) {
            console.error("Unable to login", error);
            setIsAuthenticated(false);
        }
    }

    const logout = async () => {
        try {
            await apiClient.post("/auth/logout");
            localStorage.removeItem("accessToken");
            window.location.href = "/log-in";
        } catch (error) {
            alert("There was an error logging you out, please try again.")
        }
    }

    
    

    return (
        <AuthContext.Provider value={ { login , logout , isAuthenticated, isLoading, setIsAuthenticated }}>
            {isLoading ? null : children}
        </AuthContext.Provider>
    )

}

export default AuthProvider
