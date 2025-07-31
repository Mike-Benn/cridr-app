import { useForm, Controller } from "react-hook-form"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import Typography from "@mui/material/Typography"
import styles from "./NewIncentiveForm.module.css"
import apiClient from "../../api/apiClient"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import { parse, isSameMonth } from "date-fns"

function NewIncentiveForm({ uiState, handlers }) {
    const { handleSubmit, control, reset, formState: { isSubmitting } } = useForm({
        defaultValues: {
            businessId: "",
            description: "",
            amount: "",
            transactionDate: "",
        }
    });

    const submitForm = async (data, e) => {
        if (data.amount === "." || data.amount === "") return;
        const submitAction = e.nativeEvent.submitter.value;
        const parsedIncentiveAmount = Math.round(parseFloat(data.incentiveAmount) * 100);
        const newIncentive = {
            business_id: data.businessId,
            incentive_description: data.description,
            incentive_amount: parsedIncentiveAmount,
            transaction_date: data.transactionDate,
        }
        try {
            const response = await apiClient.post("/incentives", newIncentive);
            const currentMonth = parse(uiState.selectedMonth, "yyyy-MM", new Date());
            const incentiveMonth = new Date(newIncentive.transaction_date);
            if (isSameMonth(currentMonth, incentiveMonth)) {
                handlers.setUiFlags(prev => {
                    if (prev.needsRefreshed) return prev;
                    return {
                        ...prev,
                        needsRefreshed: true,
                    }
                })
            }            
            if (submitAction === "submit") {
                handlers.toggleViewMode();
            } else {
                reset();
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit(submitForm)} >
            <Typography variant="h6" sx={{ alignSelf: "center", fontWeight: "bold" }}>New Incentive</Typography>
            <div className={styles.formBody}>
                <div className={styles.incentiveDetails}>
                    <div className={styles.formFields}>
                        <Controller
                            name="businessId"
                            control={control}
                            rules={{ required: "You must select a business" }}
                            render={({ field, fieldState: { error } }) => (
                                <FormControl fullWidth error={!!error}>
                                    <InputLabel id="select-business-new-incentive-label">Business</InputLabel>
                                    <Select
                                        {...field}
                                        labelId="select-business-new-incentive-label"
                                        label="Business"
                                    >
                                        {uiState.businessList.map(biz => (
                                            <MenuItem key={biz.business_id} value={biz.business_id}>
                                                {biz.business_name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                        />
                        <Controller
                            name="description"
                            control={control}
                            rules={{ required: "Description is required" }}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    label="Description"
                                    error={!!error}
                                    helperText={error ? error.message : null}
                                    fullWidth
                                    variant="outlined"
                                />
                            )}
                        />
                        <Controller
                            name="amount"
                            control={control}
                            rules={{ required: "Amount is required" }}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    label="Amount"
                                    variant="outlined"
                                    error={!!error}
                                    helperText={error ? error.message : null}
                                    fullWidth
                                    onChange={e => {
                                        const value = e.target.value;
                                        if (value === "" || /^\d+(\.\d{0,2})?$/.test(value)) {
                                            field.onChange(value);
                                        }
                                    }}
                                />
                            )}
                        />
                        <Controller 
                            name="transactionDate"
                            control={control}
                            rules={{ required: "Transaction date is required" }}
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
                    </div>
                </div>
            </div>
            <div className={styles.buttonContainer}>
                <Button type="submit" variant="contained" value="submit" disabled={isSubmitting}>Submit</Button>
                <Button type="submit" variant="contained" value="submitAnother" disabled={isSubmitting}>Add another</Button>
                <Button variant="contained" onClick={handlers.toggleViewMode}>Cancel</Button>
            </div>
            
        </form>
        
    )

}

export default NewIncentiveForm