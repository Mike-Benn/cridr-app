import { useEffect, useState } from "react";
import ExpensesDisplay from "./ExpensesDisplay";
import apiClient from "../../api/apiClient";
import NewExpenseForm from "./NewExpenseForm";
function ExpensesDashboard() {
    
    const [uiState, setUiState] = useState({
        viewMode: "loading",
        expenseTransactionList: [],
        mainCategoryList: [],
        subcategoryMap: {},
        businessList: [],
        creditCardList: [],
        businessMap: {},

    })

    useEffect(() => {
        document.title = "Expenses | Cridr";
        const getData = async () => {
            try {
                const [expensesResponse, categoriesResponse, businessesResponse, creditCardsResponse] = await Promise.all([
                    apiClient.get("/expenses", { params: { order: "DESC", limit: 5 }}),
                    apiClient.get("/categories", { params: { type: "all" }}),
                    apiClient.get("/businesses", { params: { featureNames: "Expenses", includeMap: "true" }}),
                    apiClient.get("/credit-cards")
                ])
                setUiState((prev) => ({
                    ...prev,
                    expenseTransactionList: expensesResponse.data.data,
                    mainCategoryList: categoriesResponse.data.data.mainCategoriesData,
                    subcategoryMap: categoriesResponse.data.data.subcategoriesData,
                    businessList: businessesResponse.data.data.businessList,
                    businessMap: businessesResponse.data.data.businessMap,
                    creditCardList: creditCardsResponse.data.data,
                    viewMode: "viewing"
                }))
            } catch (error) {
                console.log(error.response?.data?.message);
            }
        }
        getData();
        
    }, [])

    const toggleViewMode = () => {
        setUiState((prev) => ({ ...prev, viewMode: uiState.viewMode === "viewing" ? "editing" : "viewing" } ))
    }

    if (uiState.viewMode === "loading") return <p>Loading...</p>

    const handlers = {
        toggleViewMode,
        setUiState,
    }

    const formUiData = {
        mainCategoryList: uiState.mainCategoryList,
        subcategoryMap: uiState.subcategoryMap,
        businessList: uiState.businessList,
        creditCardList: uiState.creditCardList,
        businessMap: uiState.businessMap,
    }

    const stateData = {
        expenseTransactionList: uiState.expenseTransactionList,
        

    }
    return (
        <>
            {uiState.viewMode === "viewing" && <ExpensesDisplay expenseTransactionList={uiState.expenseTransactionList} handlers={handlers}/>}
            {uiState.viewMode === "editing" && <NewExpenseForm stateData={stateData} formUiData={formUiData} handlers={handlers} />}
        </>
    )
}

export default ExpensesDashboard
