import { PasswordField , TextField } from "../general/form-fields/InputFields"
import SubmitFormButton from "../general/buttons/SubmitFormButton";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../auth/AuthContext";


function SignInUpPanel() {
    const { login } = useContext(AuthContext);
    const [signInUsername , setSignInUsername] = useState("");
    const [signInPassword , setSignInPassword] = useState("");

    const [signUpUsername , setSignUpUsername] = useState("");
    const [signUpPassword , setSignUpPassword] = useState("");

    useEffect(() => {
        document.title = "Sign In | Cridr"
    }, []);

    const handleSignInUsernameChange = (e) => {
        setSignInUsername(e.target.value);
    }

    const handleSignInPasswordChange = (e) => {
        setSignInPassword(e.target.value)
    }

    const handleSignUpUsernameChange = (e) => {
        setSignUpUsername(e.target.value);
    }

    const handleSignUpPasswordChange = (e) => {
        setSignUpPassword(e.target.value);
    }

    const resetSignInUpForm = () => {
        setSignInUsername("");
        setSignInPassword("");
        setSignUpUsername("");
        setSignUpPassword("");

    }

    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        /*const newUser = {
            username: signUpUsername,
            password: signUpPassword,
        }
        try {
            const response = await axios.post(`${apiUrl}/users` , newUser);

            if (response.status === 201) {
                resetSignInUpForm();
                navigate("/");
            }
        } catch (error) {
            console.error(error , "Unable to add new user.");
        }*/
        
    }

    const handleSignInSubmit = async (e) => {
        e.preventDefault();
        const credentials = {
            username: signInUsername,
            password: signInPassword,
        }
        try {
            await login(credentials);
        } catch (error) {
            console.error(error, "Unable to login.")
        }
    }

    return (
    <>
        <form action="" onSubmit={handleSignInSubmit} >
            <fieldset>
                <legend>Sign In!</legend>
                <TextField fieldId="sign-in-username" labelText="Username" onChange={handleSignInUsernameChange} value={signInUsername} />
                <PasswordField fieldId="sign-in-password" labelText="Password" onChange={handleSignInPasswordChange} value={signInPassword} />
                <SubmitFormButton buttonText="Sign In" />
            </fieldset>
        </form>
        <form action="" onSubmit={handleSignUpSubmit}>
            <fieldset>
                <legend>New here? Sign Up!</legend>
                <TextField fieldId="sign-up-username" labelText="Username" onChange={handleSignUpUsernameChange} value={signUpUsername} />
                <PasswordField fieldId="sign-up-password" labelText="Password" onChange={handleSignUpPasswordChange} value={signUpPassword} />
                <SubmitFormButton buttonText="Sign Up" />
            </fieldset>
        </form>
    </>
    )
}

export default SignInUpPanel