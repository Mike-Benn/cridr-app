import SignUpForm from "./SignUpForm";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../auth/AuthContext";
import { useState, useEffect, useContext } from "react";
import Typography from "@mui/material/Typography";
import styles from "./SignUpPage.module.css"


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
        <main>
            <SignUpForm />
            <Typography variant="body1">Already have an account? <Link className={styles.signInLink} to="/log-in">Log in</Link></Typography>
        </main>
    )

}

export default SignUpPage