import SignUpForm from "./SignUpForm";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../auth/AuthContext";
import { useState, useEffect, useContext } from "react";


function SignUpPage() {
    const navigate = useNavigate();
    const { isAuthenticated } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        document.title = "Sign up | Cridr";
        if (isAuthenticated) navigate("/");
        setIsLoading(false);

    }, [navigate, isAuthenticated])

    if (isLoading) return null;

    return (
        <div>
            <SignUpForm />
            <p>Already have an account? <Link to="/log-in">Log in</Link></p>
        </div>
    )
}

export default SignUpPage