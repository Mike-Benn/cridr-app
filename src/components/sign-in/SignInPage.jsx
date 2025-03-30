import SignInForm from "./SignInForm";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../auth/AuthContext";
import { useContext, useEffect, useState } from "react";


function SignInPage() {
    const navigate = useNavigate();
    const { isAuthenticated } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        document.title = "Sign In | Cridr";
        if (isAuthenticated) navigate("/");
        setIsLoading(false);
    }, [navigate, isAuthenticated])

    if (isLoading) return null;

    return (
        <div>
            <SignInForm />
            <p>Don&apos;t have an account? <Link to="/signup">Sign Up</Link></p>
        </div>
    )
}

export default SignInPage