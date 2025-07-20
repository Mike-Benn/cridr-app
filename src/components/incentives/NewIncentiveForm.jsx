import { useForm, Controller } from "react-hook-form"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import Typography from "@mui/material/Typography"
import styles from "./NewIncentiveForm.module.css"
import apiClient from "../../api/apiClient"
import { insertByDate } from "../../utils/incentives/utils"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"

function NewIncentiveForm({ businessList, handlers, stateData }) {

    const { handleSubmit, control, reset, formState: { isSubmitting } } = useForm({
        defaultValues: {
            businessId: "",
            description: "",
            amount: "",
            transactionDate: "",
        }
    });

    const submitForm = async (data, e) => {
        const submitAction = e.nativeEvent.submitter.value;
        const newIncentiveTransaction = {
            business_id: data.businessId,
            incentive_description: data.description,
            incentive_amount: data.amount,
            transaction_date: data.transactionDate,
        }
        const incentiveTransactionList = stateData.incentiveTransactionList;
        try {
            const response = await apiClient.post("/incentives", newIncentiveTransaction);
            newIncentiveTransaction["transaction_incentive_id"] = response.data.data.transaction_incentive_id;
            const { newArray: newIncentiveTransactionList, inserted } = insertByDate(incentiveTransactionList, newIncentiveTransaction);
            if (inserted) {
                handlers.setUiState((prev) => ({
                    ...prev,
                    incentiveTransactionList: newIncentiveTransactionList,
                }))
            }
            if (submitAction === "submit") handlers.toggleViewMode();
            reset();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={styles.formContainer}> 
            <form className={styles.form} onSubmit={handleSubmit(submitForm)} >
                <Typography variant="h6" sx={{ alignSelf: "center", fontWeight: "bold" }}>New Incentive</Typography>
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
                                    {businessList.map(biz => (
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
                                margin="none"
                            />
                        )}
                    />
                    <Controller
                        name="amount"
                        control={control}
                        rules={{
                            required: "Amount is required",
                            min: {
                            value: 0,
                            message: "Amount must be at least 0",
                            },
                            validate: (value) => {
                            const parsed = parseFloat(value);
                            if (isNaN(parsed)) return "Must be a number";
                            if (!/^\d+(\.\d{1,2})?$/.test(value)) return "Max 2 decimal places";
                            return true;
                            },
                        }}
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                            {...field}
                            type="number"
                            label="Incentive Amount"
                            variant="outlined"
                            error={!!error}
                            helperText={error ? error.message : null}
                            fullWidth
                            margin="none"
                            slotProps={{
                                input: {
                                step: "0.01",
                                min: 0,
                                },
                            }}
                            />
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
                                margin="none"
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

export default NewIncentiveForm