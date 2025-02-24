import { useEffect , useContext } from "react";
import AuthContext from "./AuthContext";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useContext(AuthContext);
    const navigate = useNavigate();    
    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            navigate("/log-in")
        }
    }, [isAuthenticated, isLoading, navigate])

    if (isLoading) return null;

    return isAuthenticated ? children : null;
    
}

export default ProtectedRoute


