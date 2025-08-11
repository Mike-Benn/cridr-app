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

export default function NewIncentiveForm({ uiState, handlers }) {
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
        const parsedIncentiveAmount = Math.round(parseFloat(data.amount) * 100);
        const newIncentive = {
            business_id: data.businessId,
            incentive_description: data.description,
            incentive_amount: parsedIncentiveAmount,
            transaction_date: data.transactionDate,
        }
        try {
            const response = await apiClient.post("/incentives", newIncentive);
            const transactionList = uiState.incentiveTransactionList;
            const oldestIncentive = transactionList.length > 0 ? transactionList[transactionList.length - 1] : undefined;
            if (!oldestIncentive || new Date(newIncentive.transaction_date) > new Date(oldestIncentive.transaction_date)) {
                handlers.setUiFlags(prev => {
                    if (prev.needsRefreshed) return prev;
                    return {
                        ...prev,
                        needsRefreshed: true
                    }
                })
            }
            if (submitAction === "submit") {
                handlers.toggleView();
            } else {
                reset();
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form onSubmit={handleSubmit(submitForm)} >
            <Typography variant="h6" sx={{ alignSelf: "center", fontWeight: "bold" }}>New Incentive</Typography>
            <div className={styles.formBody}>
                <div className={styles.incentiveDetails}>
                    <div className={styles.formFields}>
                        <Controller
                            name="businessId"
                            control={control}
                            rules={{
                                validate: value => {
                                    if (!value) return "Business is required";
                                    const businessIds = uiState.businessList.map(biz => Number(biz.business_id));
                                    if (!businessIds.includes(Number(value))) return "Invalid business selected"
                                    return true;
                                }
                            }}
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
                            rules={{
                                validate: value => {
                                    const trimmed = value.trim();
                                    if (!trimmed) return "Description is required"
                                    if (trimmed.length > 50) return "Maximum length is 50 characters"
                                    return true;
                                }
                            }}
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
                            rules={{
                                validate: value => {
                                    if (!value) return "Amount is required";
                                    if (value === ".") return "Invalid number format"
                                    if (!/^(0|[1-9]\d*)?(\.\d{0,2})?$/.test(value)) return "Invalid number format"
                                    return true;
                                }
                            }}
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
                                        if (value === "" || /^(0|[1-9]\d*)?(\.\d{0,2})?$/.test(value)) {
                                            field.onChange(value);
                                        }
                                    }}
                                />
                            )}
                        />
                        <Controller 
                            name="transactionDate"
                            control={control}
                            rules={{
                                validate: value => {
                                    if (!value) return "Transaction date is required";
                                    const transactionDate = new Date(value);
                                    if (isNaN(transactionDate.getTime())) return "Invalid date format";
                                    return true;
                                }
                            }}
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
                <Button variant="contained" onClick={handlers.toggleView}>Cancel</Button>
            </div>
            
        </form>
        
    )

}