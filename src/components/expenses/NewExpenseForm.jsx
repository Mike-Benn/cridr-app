import { useForm, Controller } from "react-hook-form"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import styles from "./NewExpenseForm.module.css"
import Typography from "@mui/material/Typography"
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel";
import { useEffect } from "react";
import apiClient from "../../api/apiClient";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

export default function NewExpenseForm({ uiState, handlers }) {
    const { handleSubmit, control, watch, reset, resetField, formState: { isSubmitting } } = useForm({
        defaultValues: {
            mainCategoryId: "",
            subcategoryId: "",
            transactionDate: "",
            businessId: "",
            creditCardId: "",
            description: "",
            expenseAmount: "",
            redeemingFuelPoints: false,
            earnedCreditCardPoints: false,
            cardPointsAmount: "",
            fuelPointsAmount: "",
            gallons: "",

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
    const isRedeemingFuelPoints = watch("redeemingFuelPoints");
    const didEarnCardPoints = watch("earnedCreditCardPoints")

    useEffect(() => {
        resetField("subcategoryId", { defaultValue: "" });
        resetField("redeemingFuelPoints", { defaultValue: false })
        resetField("earnedCreditCardPoints", { defaultValue: false })
        resetField("transactionDate", { defaultValue: "" });
        resetField("businessId", { defaultValue: "" });
        resetField("expenseAmount", { defaultValue: "" });
        resetField("description", { defaultValue: "" });
        resetField("creditCardId", { defaultValue: "" });
        resetField("cardPointsAmount", { defaultValue: "" });
        resetField("gallons", { defaultValue: "" });
        resetField("fuelPointsAmount", { defaultValue: "" });
    }, [selectedMainCategoryId])

    let selectedSubcategory;
    if ( selectedMainCategoryId && selectedSubcategoryId) {
        selectedSubcategory = getSubcategory(uiState.subcategoryMap[selectedMainCategoryId], selectedSubcategoryId)
    }

    const submitForm = async (data, e) => {
        if (data.expenseAmount === "." || data.expenseAmount === "") return;
        const parsedExpenseAmount = Math.round(parseFloat(data.expenseAmount) * 100);
        const submitAction = e.nativeEvent.submitter.value;
        const requests = [];
        const newExpense = {
            business_id: data.businessId,
            transaction_expense_notes: data.description,
            expense_amount: parsedExpenseAmount,
            expense_main_category_id: data.mainCategoryId,
            expense_sub_category_id: data.subcategoryId,
            expense_transaction_date: data.transactionDate,
        };
        requests.push(apiClient.post("/expenses", newExpense));

        if (isRedeemingFuelPoints) {
            const newFuelPointRedemption = {
                gallons_filled: data.gallons,
                fuel_points_redeemed: data.fuelPointsAmount,
                transaction_date: data.transactionDate,
            }
            requests.push(apiClient.post("/fuel-points", newFuelPointRedemption))
        }

        if (didEarnCardPoints) {
            const newCardPoints = {
                credit_card_id: data.creditCardId,
                business_id: data.businessId,
                card_points_amount: data.cardPointsAmount,
                transaction_date: data.transactionDate,
            }
            requests.push(apiClient.post("/card-points", newCardPoints))
        }
        
        try {
            const [expenseResponse] = await Promise.all(requests);
            const transactionList = uiState.expenseTransactionList;
            const oldestExpense = transactionList.length > 0 ? transactionList[transactionList.length - 1] : undefined;
            if (!oldestExpense || new Date(newExpense.expense_transaction_date) > new Date(oldestExpense.expense_transaction_date)) {
                handlers.setUiFlags(prev => {
                    if (prev.needsRefreshed) return prev;
                    return {
                        ...prev,
                        needsRefreshed: true,
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
        <form className={styles.form} onSubmit={handleSubmit(submitForm)}>
            <Typography variant="h6" sx={{ alignSelf: "center", fontWeight: "bold" }}>New Expense</Typography>
            <div className={styles.formBody}>
                <section className={styles.expenseDetails}>
                    <Typography variant="body1" sx={{ fontSize: "1.1rem" }}>Expense Details</Typography>
                    <div className={styles.formFields}>
                        <Controller
                            name="mainCategoryId"
                            control={control}
                            rules={{ required: "You must select a main category" }}
                            render={({ field, fieldState: { error } }) => (
                                <FormControl fullWidth error={!!error}>
                                    <InputLabel id="select-expense-main-category-label">Main expense category</InputLabel>
                                    <Select
                                        {...field}
                                        labelId="select-expense-main-category-label"
                                        label="Main expense category"
                                    >
                                        {uiState.mainCategoryList.map(cat => (
                                            <MenuItem key={cat.expense_main_category_id} value={cat.expense_main_category_id}>
                                                {cat.expense_main_category_name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                        />
                        <Controller
                            name="subcategoryId"
                            control={control}
                            rules={{ required: "You must select a subcategory" }}
                            render={({ field, fieldState: { error } }) => {
                                const safeSubcategoryId = selectedMainCategoryId && uiState.subcategoryMap[selectedMainCategoryId].some(subcat => subcat.expense_sub_category_id === field.value)
                                    ? field.value
                                    : "";
                                return (
                                    <FormControl fullWidth error={!!error}>
                                        <InputLabel id="select-expense-subcategory-label">Secondary expense category</InputLabel>
                                        <Select
                                            {...field}
                                            labelId="select-expense-subcategory-label"
                                            label="Secondary expense category"
                                            disabled={!selectedMainCategoryId}
                                            value={safeSubcategoryId}
                                        >
                                            {selectedMainCategoryId && uiState.subcategoryMap[selectedMainCategoryId].map(subcat => (
                                                <MenuItem key={subcat.expense_sub_category_id} value={subcat.expense_sub_category_id}>
                                                    {subcat.expense_sub_category_name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                )
                            }}
                        />
                        { selectedMainCategoryId && selectedSubcategoryId && (
                            <>  
                                <section className={styles.checkboxFields}>
                                    <Controller
                                        name="earnedCreditCardPoints"
                                        control={control}
                                        render={({ field }) => (
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        {...field}
                                                        checked={field.value}
                                                    />
                                                }
                                                label="Earned credit card points"
                                            />
                                        )}
                                    />
                                    { selectedSubcategory && selectedSubcategory.expense_sub_category_name === "car fuel" && <Controller
                                        name="redeemingFuelPoints"
                                        control={control}
                                        render={({ field }) => (
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        {...field}
                                                        checked={field.value}
                                                    />
                                                }
                                                label="Redeemed fuel points"  
                                            />
                                        )}
                                    />}  
                                </section>   
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
                                <Controller
                                    name="businessId"
                                    control={control}
                                    rules={{ required: "You must select a business" }}
                                    render={({ field, fieldState: { error } }) => (
                                        <FormControl fullWidth error={!!error}>
                                            <InputLabel id="select-business-label">Business</InputLabel>
                                            <Select
                                                {...field}
                                                labelId="select-business-label"
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
                                    render={({ field, fieldState: { error } }) => (
                                        <TextField
                                            {...field}
                                            label="Description (Optional)"
                                            error={!!error}
                                            helperText={error ? error.message : null}
                                            fullWidth
                                            variant="outlined"
                                            
                                        />
                                    )}
                                />
                                
                                <Controller
                                    name="expenseAmount"
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
                                            label="Expense amount"
                                            variant="outlined"
                                            error={!!error}
                                            helperText={error ? error.message : null}
                                            fullWidth
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (value === '' || /^\d+(\.\d{0,2})?$/.test(value)) {
                                                    field.onChange(value);
                                                }
                                            }}
                                        />
                                    )}
                                />
                            </>
                        )}
                    </div>
                </section>
                { selectedMainCategoryId && selectedSubcategoryId && didEarnCardPoints && 
                    <section className={styles.cardPoints}>
                        <Typography variant="body1" sx={{ fontSize: "1.1rem" }}>Credit Card Points</Typography>
                        <div className={styles.formFields}>
                            <Controller
                                name="creditCardId"
                                control={control}
                                rules={{ required: "You must select a credit card" }}
                                render={({ field, fieldState: { error } }) => (
                                    <FormControl fullWidth error={!!error}>
                                        <InputLabel id="select-credit-card-label">Credit card</InputLabel>
                                        <Select
                                            {...field}
                                            labelId="select-credit-card-label"
                                            label="Credit card"
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
                                name="cardPointsAmount"
                                control={control}
                                rules={{
                                    required: "Please enter a value",
                                    min: { value: 1, message: "Must be an integer greater than zero" },
                                    validate: (value) => {
                                        const num = Number(value);
                                        if (isNaN(num) || !Number.isInteger(num)) return "Must be an integer greater than zero";
                                        return true;
                                    }
                                }}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        {...field}
                                        type="number"
                                        label="Card points earned"
                                        variant="outlined"
                                        error={!!error}
                                        helperText={error ? error.message : null}
                                        fullWidth
                                        slotProps={{
                                            input: {
                                                step: "1",
                                                min: "1",
                                            }
                                        }}
                                    />
                                )}
                            />
                        </div>
                    </section>
                }
                { selectedMainCategoryId && selectedSubcategoryId && isRedeemingFuelPoints &&
                    <div className={styles.fuelPoints}>
                        <Typography variant="body1" sx={{ fontSize: "1.1rem" }}>Fuel Points Redemption</Typography>
                        <div className={styles.formFields}>
                            <Controller
                                name="gallons"
                                control={control}
                                rules={{
                                    required: "Please enter a value",
                                    min: { value: "0.001", message: "Value must be greater than 0"},
                                    validate: (value) => {
                                        const num = Number(value);
                                        if (isNaN(num)) return "Value must be a number";
                                        if (!/^\d+(\.\d{1,3})?$/.test(value)) return "Value can have up to 3 decimal places";
                                        return true;
                                    }
                                }}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        {...field}
                                        type="number"
                                        label="Gallons dispensed"
                                        variant="outlined"
                                        error={!!error}
                                        helperText={error ? error.message : null}
                                        fullWidth
                                        slotProps={{
                                            input: {
                                                step: "0.001",
                                                min: "0.001",
                                            }
                                        }}
                                    />
                                )}
                            />
                            <Controller
                                name="fuelPointsAmount"
                                control={control}
                                rules={{
                                    required: "Please enter a value",
                                    min: { value: 100, message: "Must be an integer multiple of 100" },
                                    validate: (value) => {
                                        const num = Number(value);
                                        if (isNaN(num) || !Number.isInteger(num) || num % 100 !== 0) return "Must be an integer multiple of 100";
                                        return true;
                                    }
                                }}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        {...field}
                                        type="number"
                                        label="Fuel points redeemed"
                                        variant="outlined"
                                        error={!!error}
                                        helperText={error ? error.message : null}
                                        fullWidth
                                        slotProps={{
                                            input: {
                                                step: "100",
                                                min: 0,
                                            }
                                        }}  
                                    />
                                )}
                            />
                        </div>
                    </div>
                }
            </div>
            <div className={styles.buttonContainer}>
                <Button type="submit" variant="contained" value="submit" disabled={isSubmitting}>Submit</Button>
                <Button type="submit" variant="contained" value="submitAnother" disabled={isSubmitting}>Add another</Button>
                <Button variant="contained" onClick={handlers.toggleView}>Cancel</Button>
            </div>
        </form>
    
    )
}
