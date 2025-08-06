import { useForm, Controller } from "react-hook-form"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import { useNavigate } from "react-router-dom"
import styles from "./SignUpForm.module.css"

export default function SignUpForm() {
    const { handleSubmit, control, watch, reset, resetField, formState: { isSubmitting } } = useForm({
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        }
    })
    const navigate = useNavigate();

    const handleSignUp = async (data, e) => {
        /*
        const credentials = {
            email: data.email,
            password: data.password,
            confirmPassword: data.confirmPassword,
        }
        try {
            const response = await apiClient.post("/auth/signup", credentials);
            navigate("/log-in")
        } catch (error) {
            console.log(error)
            alert("There was an error signing up, please try again.");
        }*/
       return;
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit(handleSignUp)}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>New user</Typography>
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
                                    type="password"
                                    label="Password"
                                    error={!!error}
                                    helperText={error ? error.message : null}
                                    fullWidth
                                    variant="outlined"
                                />
                            )}
                        />
                        
                        <Controller
                            name="confirmPassword"
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    type="password"
                                    label="Confirm password"
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
            <div className={styles.buttonContainer}>
                <Button type="submit" variant="contained" disabled={isSubmitting}>Sign up</Button>
            </div>
        </form>
    )


}