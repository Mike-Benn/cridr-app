import { useForm, Controller } from "react-hook-form";
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import styles from "./NewOfferForm.module.css"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import apiClient from "../../api/apiClient";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel"
import { startOfToday } from "date-fns"


function NewOfferForm({ uiState, handlers }) {
    const { handleSubmit, control, reset, formState: { isSubmitting } } = useForm({
        defaultValues: {
            creditCardId: "",
            businessId: "",
            description: "",
            expirationDate: "",
        }
    });
    
    const submitForm = async (data, e) => {
        const submitAction = e.nativeEvent.submitter.value;
        const newOffer = {
            credit_card_id: data.creditCardId,
            business_id: data.businessId,
            offer_description: data.description,
            expiration_date: data.expirationDate,
        }
        try {
            const response = await apiClient.post("/offers", newOffer);
            if (uiState.selectedCardId === newOffer.credit_card_id) {
                handlers.setUiFlags(prev => {
                    if (prev.needsRefreshed) return prev;
                    return {
                        ...prev,
                        needsRefreshed: true,
                    }
                })
            }
            if (submitAction === "submit") {
                handlers.toggleViewMode()
            } else {
                reset();
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit(submitForm)}>
            <Typography variant="h6" sx={{ alignSelf: "center", fontWeight: "bold" }} >Offer Details</Typography>
            <div className={styles.formBody}>
                <div className={styles.offerDetails}>
                    <div className={styles.formFields}>
                        <Controller
                            name="creditCardId"
                            control={control}
                            rules={{ 
                                validate: value => {
                                    if (!value) return "Credit card is required";
                                    const cardIds = uiState.creditCardList.map(card => Number(card.credit_card_id));
                                    if (!cardIds.includes(Number(value))) return "Invalid credit card selected"
                                    return true;
                                }

                            }}
                            render={({ field, fieldState: { error } }) => (
                                <FormControl fullWidth error={!!error} >
                                    <InputLabel id="select-card-new-offer-label">Card Account</InputLabel>
                                    <Select
                                        {...field}
                                        labelId="select-card-new-offer-label"
                                        label="Card Account"
                                    >
                                        {uiState.creditCardList.map(card => (
                                            <MenuItem key={card.credit_card_id} value={card.credit_card_id}>
                                                {card.credit_card_name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                        />
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
                                    <InputLabel id="select-business-new-offer-label">Business</InputLabel>
                                    <Select
                                        {...field}
                                        labelId="select-business-new-offer-label"
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
                                    const trimmedValue = value.trim();
                                    if (!trimmedValue) return "Description is required";
                                    if (trimmedValue.length > 50) return "Maximum length is 50 characters";
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
                            name="expirationDate"
                            control={control}
                            rules={{
                                validate: value => {
                                    if (!value) return "Expiration date is required";
                                    const expirationDate = new Date(value);
                                    if (isNaN(expirationDate.getTime())) return "Invalid date format"
                                    const today = startOfToday();
                                    if (expirationDate < today) return "Expiration date has passed"
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
                <Button variant="contained" onClick={handlers.toggleViewMode}>Cancel</Button>
            </div>

        </form>
    )

}

export default NewOfferForm