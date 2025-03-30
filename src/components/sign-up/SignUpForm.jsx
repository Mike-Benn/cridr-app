import { GeneralInputField } from "../general/form-fields/InputFields";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/apiClient";
import GeneralButton from "../general/buttons/GeneralButton";

function SignUpForm() {
    const navigate = useNavigate();
    const [userCredentials, setUserCredentials] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    })

    const handleCredentialsChange = (e) => {
        const { name, value } = e.target;
        setUserCredentials((prev) => ({ ...prev, [name]: value }))
    }

    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
    /*    try {
            const response = await apiClient.post("/auth/signup", userCredentials);
            if (response.status === 201) {
                console.log(response.data?.message);
                navigate("/log-in");
            }
        } catch (error) {
            console.log(error.response?.data?.message);
            alert("There was an error signing up, please try again.");
        }
    */
    }

    return (
        <form action="" onSubmit={handleSignUpSubmit}>
            <fieldset>
                <legend>New User</legend>
                <GeneralInputField inputType="email" labelText="Email" onChange={handleCredentialsChange} value={userCredentials.email} name="email" />
                <GeneralInputField inputType="password" labelText="Password" onChange={handleCredentialsChange} value={userCredentials.password} name="password" />
                <GeneralInputField inputType="password" labelText="Confirm Password" onChange={handleCredentialsChange} value={userCredentials.confirmPassword} name="confirmPassword" />
                <GeneralButton buttonType="submit" buttonText="Create account" />
            </fieldset>
        </form>
    )
}

export default SignUpForm