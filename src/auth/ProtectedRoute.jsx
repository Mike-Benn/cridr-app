import { useEffect , useContext } from "react";
import AuthContext from "./AuthContext";
import { useNavigate } from "react-router-dom";


const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/log-in");
        }
    }, [isAuthenticated , navigate])

    return isAuthenticated ? children : null;
}

export default ProtectedRoute


