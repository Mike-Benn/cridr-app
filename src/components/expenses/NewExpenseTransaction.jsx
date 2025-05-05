import { useState, useEffect } from "react"
import { SelectField } from "../general/form-fields/InputFields"
import apiClient from "../../api/apiClient";
import GeneralButton from "../general/buttons/GeneralButton";
import GeneralExpenseForm from "./expense-forms/GeneralExpenseForm";
import FuelExpenseForm from "./expense-forms/FuelExpenseForm";

function NewExpenseTransaction() {
    const defaultMainCategoryOption = [<option key="default" value="" disabled selected>Select Main Category</option>];
    const defaultSubCategoryOption = [<option key="default" value="" disabled selected>Select Subcategory</option>];
    
    const [expenseFormData, setExpenseFormData] = useState({
        commonFields: {
            selectedMainCategoryId: "",
            selectedSubCategoryId: "",
            selectedBusinessId: "",
            selectedCreditCardId: "",
            transactionNotes: "",
            transactionAmount: "",
            cardPointsEarned: "",
            transactionDate: "",
        },
        fuelFields: {
            gallonsFilled: "",
            fuelPointsRedeemed: "",
            selectedVehicleId: "",
        }
    })

    const blankExpenseFormData = {
        commonFields: {
            selectedMainCategoryId: "",
            selectedSubCategoryId: "",
            selectedBusinessId: "",
            selectedCreditCardId: "",
            transactionNotes: "",
            transactionAmount: "",
            cardPointsEarned: "",
            transactionDate: "",
        },
        fuelFields: {
            gallonsFilled: "",
            fuelPointsRedeemed: "",
            selectedVehicleId: "",
        }
    }

    const [uiState, setUiState] = useState({
        viewMode: "loading",
        mainCategoryList: [],
        subCategoryList: [],
        businessList: [],
        creditCardList: [],
        redeemingFuelPoints: false,
        earnedCardPoints: false,

    })
    useEffect(() => {
        const getData = async () => {
            const params = new URLSearchParams();
            params.append("featureNames", "Expenses");
            try {
                const [mainCategoriesResponse, subCategoriesResponse, businessesResponse, creditCardsResponse] = await Promise.all([
                    apiClient.get("/expenses/categories/main"),
                    apiClient.get("/expenses/categories/sub"),
                    apiClient.get("/businesses", { params: params }),
                    apiClient.get("/credit-cards"),
                    
                ])
                setUiState((prev) => ({ 
                    ...prev, 
                    viewMode: "viewing",
                    mainCategoryList: mainCategoriesResponse.data.data,
                    subCategoryList: subCategoriesResponse.data.data,
                    businessList: businessesResponse.data.data,
                    creditCardList: creditCardsResponse.data.data,
                }))

            } catch (error) {
                console.log(error.response?.data?.message);
            }
        }
        getData();
        
    }, [])

    const toggleViewMode = () => {
        setUiState((prev) => ({ 
            ...prev, 
            viewMode: prev.viewMode === "editing" ? "viewing" : "editing",
            redeemingFuelPoints: false,
        }))
        setExpenseFormData(blankExpenseFormData);
    }

    const toggleRedeemingFuelPoints = () => {
        setUiState((prev) => ({ ...prev, redeemingFuelPoints: !prev.redeemingFuelPoints }))
    }

    const toggleEarnedCardPoints = () => {
        setUiState((prev) => ({ ...prev, earnedCardPoints: !prev.earnedCardPoints }))
    }

    const handleFuelFieldChange = (e) => {
        const { name, value } = e.target;
        setExpenseFormData((prev) => ({ 
            ...prev, 
            fuelFields: {
                ...prev.fuelFields,
                [name]: value,
            }}))
    }

    const handleMainCategoryChange = (e) => {
        const { name, value } = e.target;
        setExpenseFormData((prev) => ({
            ...prev,
            commonFields: {
                ...prev.commonFields,
                [name]: value,
                selectedSubCategoryId: "",
            }
        }))
    }

    const handleCommonFieldChange = (e) => {
        const { name, value } = e.target;
        setExpenseFormData((prev) => ({ 
            ...prev, 
            commonFields: {
                ...prev.commonFields,
                [name]: value,
            }}))
    }

    const handleExpenseSubmit = async (e) => {
        e.preventDefault();
        const submitAction = e.nativeEvent.submitter.value;
        const newExpenseTransaction = {
            business_id: expenseFormData.commonFields.selectedBusinessId,
            transaction_expense_notes: expenseFormData.commonFields.transactionNotes,
            expense_amount: expenseFormData.commonFields.transactionAmount,
            expense_main_category_id: expenseFormData.commonFields.selectedMainCategoryId,
            expense_sub_category_id: expenseFormData.commonFields.selectedSubCategoryId,
            expense_transaction_date: expenseFormData.commonFields.transactionDate,
        };

        try {

            const requests = [apiClient.post("/expenses", newExpenseTransaction)];

            if (uiState.redeemingFuelPoints) {
                const fuelPointsTransaction = {
                    gallons_filled: expenseFormData.fuelFields.gallonsFilled,
                    fuel_points_redeemed: expenseFormData.fuelFields.fuelPointsRedeemed,
                    transaction_date: expenseFormData.fuelFields.transactionDate,
                }
                requests.push(apiClient.post("/fuel-points", fuelPointsTransaction));
            }

            if (uiState.earnedCardPoints) {
                const cardPointsTransaction = {
                    credit_card_id: expenseFormData.commonFields.selectedCreditCardId,
                    business_id: expenseFormData.commonFields.selectedBusinessId,
                    card_points_amount: expenseFormData.commonFields.cardPointsEarned,
                    transaction_date: expenseFormData.commonFields.transactionDate,
                }
                requests.push(apiClient.post("/card-points", cardPointsTransaction));
            }
            const responseList = await Promise.all(requests);
            for (let i = 0; i < responseList.length; i++) {
                console.log(responseList[i].data?.message);
            }

            if (submitAction === "submit") {
                setExpenseFormData(blankExpenseFormData);
                setUiState((prev) => ({ 
                    ...prev, 
                    viewMode: "viewing",
                    redeemingFuelPoints: false, 
                    earnedCardPoints: false,
                }));
            } else {
                setExpenseFormData(blankExpenseFormData);
                setUiState((prev) => ({
                    ...prev,
                    redeemingFuelPoints: false,
                    earnedCardPoints: false,
                }))
            }
        } catch (error) {
            console.log(error.response?.data?.messsage);
        } 
    }
    
    const expenseHandlers = {
        handleCommonFieldChange,
        handleExpenseSubmit,
        handleFuelFieldChange,
        toggleRedeemingFuelPoints,
        toggleEarnedCardPoints,
    }
    
    const generateFormToRender = () => {
        if (uiState.viewMode !== "editing" || !expenseFormData.commonFields.selectedMainCategoryId || !expenseFormData.commonFields.selectedSubCategoryId) return null;
        let formToRender;
        const subCategoryList = uiState.subCategoryList[expenseFormData.commonFields.selectedMainCategoryId];
        const selectedSubCategory = subCategoryList.find((category) => category.expense_sub_category_id === Number(expenseFormData.commonFields.selectedSubCategoryId));
        selectedSubCategory.expense_sub_category_name === "car fuel" ? 
        formToRender = <FuelExpenseForm expenseFormData={expenseFormData} uiState={uiState} handlers={expenseHandlers} /> :
        formToRender = <GeneralExpenseForm expenseFormData={expenseFormData} uiState={uiState} handlers={expenseHandlers} />;
        return formToRender;
    }


    if (uiState.viewMode === "loading") return <p>Loading...</p>
    const formToRender = generateFormToRender();


    return (
        <>
        {uiState.viewMode === "viewing" && <GeneralButton buttonType="button" buttonText="Add expense" onClick={toggleViewMode} />}
        {uiState.viewMode === "editing" && <GeneralButton buttonType="button" buttonText="Cancel" onClick={toggleViewMode} />}
        {uiState.viewMode === "editing" && <SelectField fieldId="new-expense-select-main-category" labelText="Select Expense Category" optionList={uiState.mainCategoryList} onChange={handleMainCategoryChange} value={expenseFormData.commonFields.selectedMainCategoryId} optionIdAccessor="expense_main_category_id" optionTextAccessor="expense_main_category_name" name="selectedMainCategoryId" defaultOptions={defaultMainCategoryOption}/> }
        {uiState.viewMode === "editing" && expenseFormData.commonFields.selectedMainCategoryId !== "" && <SelectField fieldId="new-expense-select-sub-category" labelText="Select Subcategory" optionList={uiState.subCategoryList[expenseFormData.commonFields.selectedMainCategoryId]} onChange={handleCommonFieldChange} value={expenseFormData.commonFields.selectedSubCategoryId} optionIdAccessor="expense_sub_category_id" optionTextAccessor="expense_sub_category_name" name="selectedSubCategoryId" defaultOptions={defaultSubCategoryOption} />}
        {formToRender}
        </>
    )
}

export default NewExpenseTransaction