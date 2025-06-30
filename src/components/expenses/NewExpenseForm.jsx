import { useForm, Controller } from "react-hook-form"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import styles from "./NewExpenseForm.module.css"
import Typography from "@mui/material/Typography"




function NewExpenseForm({ formUiData, handlers }) {
    const { handleSubmit, control, watch, reset, formState: { isSubmitting } } = useForm({
        defaultValues: {
            mainCategoryId: "",
            subcategoryId: "",
            transactionDate: "",
            businessId: "",
            description: "",
            amount: "",

        }
    });

    const getSubcategory = (subcategoryList, selectedSubcategoryId) => {
        for (let i = 0; i < subcategoryList.length; i++) {
            const subcategory = subcategoryList[i];
            if (subcategory.expense_sub_category_id === selectedSubcategoryId) {
                return subcategory;
            }
        }
    }

    const selectedMainCategoryId = watch("mainCategoryId")
    const selectedSubcategoryId = watch("subcategoryId");

    

    let selectedSubcategory;
    if (selectedSubcategoryId) {
        selectedSubcategory = getSubcategory( formUiData.subcategoryMap[selectedMainCategoryId], selectedSubcategoryId)
    }

    return (
        <div className={styles.formContainer}>
            <form className={styles.form}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>New Expense</Typography>
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
                    <Controller
                        name="subcategoryId"
                        control={control}
                        rules={{ required: "You must select a subcategory" }}
                        render={({ field, fieldState: { error } }) => (
                            <>
                                <Select
                                    {...field}
                                    displayEmpty
                                    fullWidth
                                    error={!!error}
                                    disabled={!selectedMainCategoryId}
                                >
                                    <MenuItem value="">
                                        <Typography variant="body2">Select expense subcategory</Typography>
                                    </MenuItem>
                                    {selectedMainCategoryId && formUiData.subcategoryMap[selectedMainCategoryId].map(subcat => (
                                        <MenuItem key={subcat.expense_sub_category_id} value={subcat.expense_sub_category_id}>
                                            {subcat.expense_sub_category_name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {error && (
                                    <p style={{ color: "red", marginTop: "0.25rem" }}>{error.message}</p>
                                )}
                            </>
                        )}
                    />
                    <Controller
                        name="transactionDate"
                        control={control}
                        rules={{ required: "Date is required" }}
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                {...field}
                                label="Transaction date"
                                type="date"
                                variant="outlined"
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    }
                                }}
                                error={!!error}
                                helperText={error ? error.message : null}
                                fullWidth
                            />
                        )}
                    />
                    <Controller
                        name="businessId"
                        control={control}
                        rules={{ required: "You must select a business" }}
                        render={({ field, fieldState: { error } }) => (
                            <>
                                <Select
                                    {...field}
                                    displayEmpty
                                    fullWidth
                                    error={!!error}
                                >
                                    <MenuItem value="">
                                        <Typography variant="body2">Select a business</Typography>
                                    </MenuItem>
                                    {formUiData.businessList.map(biz => (
                                        <MenuItem key={biz.business_id} value={biz.business_id}>
                                            {biz.business_name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {error && (
                                    <p style={{ color: red, marginTop: "0.25rem" }}>
                                        {error.message}
                                    </p>
                                )}
                            </>
                        )}
                    />
                    <Controller
                        name="amount"
                        control={control}
                        rules={{
                            required: "Amount is required",
                            min: { value: 0, message: "Amount must be at least 0"},
                            validate: (value) => {
                                const parsed = parseFloat(value);
                                if (isNaN(parsed)) return "Must be a number";
                                if (!/^\d+(\.\d{1,2})?$/.test(value)) return "Max 2 decimal places";
                                return true;
                            }
                        }}
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                {...field}
                                type="number"
                                label="Expense amount"
                                variant="outlined"
                                error={!!error}
                                helperText={error ? error.message : null}
                                fullWidth
                                slotProps={{
                                    input: {
                                        step: "0.01",
                                        min: 0,
                                    }
                                }}
                            />
                        )}
                    />

                    <Controller
                        name="description"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                {...field}
                                label="Description"
                                error={!!error}
                                helperText={error ? error.message : null}
                                fullWidth
                                variant="outlined"
                                placeholder={field.value ? "" : "Optional"}
                            />
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