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



function NewExpenseForm({ stateData, formUiData, handlers }) {
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
    }, [selectedMainCategoryId])

    let selectedSubcategory;
    if ( selectedMainCategoryId && selectedSubcategoryId) {
        selectedSubcategory = getSubcategory( formUiData.subcategoryMap[selectedMainCategoryId], selectedSubcategoryId)
    }

    const insertByDate = (arr, elementToInsert) => {

        const newArray = [];
        let index = 0;
        let inserted = false;
        while (newArray.length < 5 && arr[index]) {
            const currElement = arr[index];
            if (!inserted && elementToInsert.expense_transaction_date >= currElement.expense_transaction_date) {
                newArray.push(elementToInsert);
                inserted = true;
                if (newArray.length < 5) {
                    newArray.push(currElement);
                } else {
                    break;
                }
            } else {
                newArray.push(currElement)
            }
            index++;
        }
        if (newArray.length < 5 && !inserted) {
            newArray.push(elementToInsert)
        }
        return { newArray, inserted }
    }

    const submitForm = async (data, e) => {
        const submitAction = e.nativeEvent.submitter.value;
        const requests = [];
        const newExpense = {
            business_id: data.businessId,
            transaction_expense_notes: data.description,
            expense_amount: data.expenseAmount,
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
            const expenseTransactionList = stateData.expenseTransactionList;
            const businessName = formUiData.businessMap[newExpense.business_id].business_name;
            newExpense["transaction_expense_id"] = expenseResponse.data.data[0].transaction_expense_id;
            newExpense["business_name"] = businessName;
            const { newArray: newExpenseTransactionList, inserted } = insertByDate(expenseTransactionList, newExpense);
            if (inserted) {
                handlers.setUiState((prev) => ({
                    ...prev,
                    expenseTransactionList: newExpenseTransactionList,
                }))
            }
            if (submitAction === "submit") handlers.toggleViewMode();
            reset();

        } catch (error) {
            console.log(error.response?.data?.message)
            console.log(error)
        }
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit(submitForm)}>
            <div className={styles.formBody}>
                <div className={styles.expenseDetailsSection}>
                    <Typography variant="h6">Expense Details</Typography>
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
                                            <span className={styles.defaultOption}>Select main expense category</span>
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
                                            <span className={styles.defaultOption}>Select secondary expense category</span>
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
                        { selectedMainCategoryId && selectedSubcategoryId && (
                            <>  
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
                                />
                                }       

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
                                        <>
                                            <Select
                                                {...field}
                                                displayEmpty
                                                fullWidth
                                                error={!!error}
                                            >
                                                <MenuItem value="">
                                                    <span className={styles.defaultOption}>Select a business</span>
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
                            </>
                        )}
                    </div>
                </div>
                { selectedMainCategoryId && selectedSubcategoryId && didEarnCardPoints && 
                    <div className={styles.creditCardSection}>
                        <Typography variant="h6">
                            Credit Card Points
                        </Typography>
                        <div className={styles.formFields}>
                            <Controller
                                name="creditCardId"
                                control={control}
                                rules={{ required: "You must select a credit card" }}
                                render={({ field, fieldState: { error } }) => (
                                    <>
                                        <Select
                                            {...field}
                                            displayEmpty
                                            fullWidth
                                            error={!!error}
                                        >
                                            <MenuItem value="">
                                                <span className={styles.defaultOption}>Select a credit card</span>
                                            </MenuItem>
                                            {formUiData.creditCardList.map(card => (
                                                <MenuItem key={card.credit_card_id} value={card.credit_card_id}>
                                                    {card.credit_card_name}
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

                    </div>
                }
                { selectedMainCategoryId && selectedSubcategoryId && isRedeemingFuelPoints &&
                    <div className={styles.fuelPointSection}>
                        <Typography variant="h6">
                            Fuel Points Redemption
                        </Typography>
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

            { selectedMainCategoryId && selectedSubcategoryId && 
                <div className={styles.buttonContainer}>
                    <Button type="submit" variant="contained" value="submit" disabled={isSubmitting}>Submit</Button>
                    <Button type="submit" variant="contained" value="submitAnother" disabled={isSubmitting}>Add another</Button>
                    <Button variant="contained" onClick={handlers.toggleViewMode}>Cancel</Button>
                </div>
            }
            
        </form>
    )

}

export default NewExpenseForm