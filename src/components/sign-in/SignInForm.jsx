import { GeneralInputField } from "../general/form-fields/InputFields"
import SubmitFormButton from "../general/buttons/SubmitFormButton";
import { useContext, useState } from "react";
import AuthContext from "../../auth/AuthContext";

function SignInForm() {
    
    const { login } = useContext(AuthContext);

    const [userCredentials, setUserCredentials] = useState({
        email: "",
        password: "",
    })

    const handleCredentialsChange =  (e) => {
        const { name, value } = e.target;
        setUserCredentials((prev) => ({ ...prev, [name]: value }));
    }

    const handleSignInSubmit = async (e) => {
        e.preventDefault();
        const credentials = {
            email: userCredentials.email,
            password: userCredentials.password,
        }
        try {
            await login(credentials);
        } catch (error) {
            console.log(error.response?.data?.message);
            alert("Login failed, please verify email and password values and try again.");
        }
    }

    return (
    <>
        <form action="" onSubmit={handleSignInSubmit} >
            <fieldset>
                <legend>Sign In</legend>
                <GeneralInputField inputType="email" labelText="Email" onChange={handleCredentialsChange} value={userCredentials.email} name="email" />
                <GeneralInputField  inputType="password" labelText="Password" onChange={handleCredentialsChange} value={userCredentials.password} name="password" />
                <SubmitFormButton buttonText="Sign In" />
            </fieldset>
        </form>
    </>
    )
}

export default SignInForm