import SignInForm from "./SignInForm";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../auth/AuthContext";
import { useContext, useEffect, useState } from "react";
import styles from "./SignInPage.module.css"
import Typography from "@mui/material/Typography";

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
        <main>
            <SignInForm />
            <Typography variant="body1">Don&apos;t have an account? <Link className={styles.signUpLink} to="/signup">Sign up</Link></Typography>
        </main>
    )
}

export default SignInPage