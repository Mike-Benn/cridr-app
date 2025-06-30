import { useForm, Controller } from "react-hook-form"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import styles from "./NewExpenseForm.module.css"
import Typography from "@mui/material/Typography"
// Select Expense Category
// Select Expense Subcategory


function NewExpenseForm({ formUiData, handlers }) {
    const { handleSubmit, control, watch, reset, formState: { isSubmitting } } = useForm({
        defaultValues: {
            mainCategoryId: "",
            subCategoryId: "",

        }
    });



    return (
        <div className={styles.formContainer}>
            <form className={styles.form}>
                <div className={styles.formFields}>
                    <Controller
                        name="mainCategoryId"
                        control={control}
                        rules={{ required: "You must select a main category" }}
                        render={({ field, fieldState: { error } }) => (
                            <>
                                <Select
                                    {...field}
                                    displayEmpty
                                    fullWidth
                                    error={!!error}
                                >
                                    <MenuItem value="">
                                        <Typography variant="body2">Select expense category</Typography>
                                    </MenuItem>
                                    {formUiData.mainCategoryList.map(cat => (
                                        <MenuItem key={cat.expense_main_category_id} value={cat.expense_main_category_id}>
                                            {cat.expense_main_category_name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {error && (
                                    <p style={{ color: "red", marginTop: "0.25rem" }}>{error.message}</p>
                                )}
                            </>
                        )}
                    />

                </div>
                <div className={styles.buttonContainer}>
                    <Button type="submit" variant="contained" value="submit" disabled={isSubmitting}>Submit</Button>
                    <Button type="submit" variant="contained" value="submitAnother" disabled={isSubmitting}>Add another</Button>
                    <Button variant="contained" onClick={handlers.toggleViewMode}>Cancel</Button>
                </div>


            </form>
        </div>
    )

}

export default NewExpenseForm