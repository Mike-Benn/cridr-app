import { useForm, Controller } from "react-hook-form"
import Typography from "@mui/material/Typography"
import { useContext } from "react"
import AuthContext from "../../auth/AuthContext"
import Button from "@mui/material/Button"
import styles from "./SignInForm.module.css"
import TextField from "@mui/material/TextField"


export default function SignInForm() {
    const { handleSubmit, control, watch, reset, resetField, formState: { isSubmitting } } = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    })
    const { login } = useContext(AuthContext);
    
    const handleSignIn = async (data, e) => {
        const credentials = {
            email: data.email,
            password: data.password,
        }
        try {
            await login(credentials);
        } catch (error) {
            console.log(error);
            alert("Login failed, please verify email and password values and try again.")
        }
    }
    
    return (
        <form className={styles.form} onSubmit={handleSubmit(handleSignIn)}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>Sign in</Typography>
            <div className={styles.formBody}>
                <div className={styles.credentials}>
                    <div className={styles.formFields}>
                        <Controller
                            name="email"
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    label="Email"
                                    error={!!error}
                                    helperText={error ? error.message : null}
                                    fullWidth
                                    variant="outlined"
                                />
                            )}
                        />
                        <Controller
                            name="password"
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    label="Password"
                                    type="password"
                                    error={!!error}
                                    helperText={error ? error.message : null}
                                    fullWidth
                                    variant="outlined"
                                />
                            )}
                        />
                    </div>
                </div>
            </div>
            <div>
                <Button type="submit" variant="contained" disabled={isSubmitting}>Sign in</Button>
            </div>
        </form>
    )
}
