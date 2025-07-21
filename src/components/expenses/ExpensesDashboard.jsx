import { useEffect, useState } from "react";
import ExpensesDisplay from "./ExpensesDisplay";
import apiClient from "../../api/apiClient";
import NewExpenseForm from "./NewExpenseForm";
import { format } from "date-fns"
function ExpensesDashboard() {
    
    const [uiState, setUiState] = useState({
        viewMode: "loading",
        expenseTransactionList: [],
        mainCategoryList: [],
        subcategoryMap: {},
        businessList: [],
        creditCardList: [],
        businessMap: {},
        expenseSum: 0,
        uniqueMonthList: [],
        selectedMonth: format(new Date(), 'yyyy-MM'),

    })

    useEffect(() => {
        document.title = "Expenses | Cridr";
        const getData = async () => {
            try {
                const [uniqueMonthsResponse, categoriesResponse, businessesResponse, creditCardsResponse] = await Promise.all([
                    apiClient.get("/expenses/months"),
                    apiClient.get("/categories", { params: { type: "all" }}),
                    apiClient.get("/businesses", { params: { featureNames: "Expenses", includeMap: "true" }}),
                    apiClient.get("/credit-cards"),
                ])
                setUiState((prev) => ({
                    ...prev,
                    uniqueMonthList: uniqueMonthsResponse.data.data,
                    mainCategoryList: categoriesResponse.data.data.mainCategoriesData,
                    subcategoryMap: categoriesResponse.data.data.subcategoriesData,
                    businessList: businessesResponse.data.data.businessList,
                    businessMap: businessesResponse.data.data.businessMap,
                    creditCardList: creditCardsResponse.data.data,
                    viewMode: "viewing"
                }))
            } catch (error) {
                console.log(error);
            }
        }
        getData();
        
    }, [])

    useEffect(() => {
        const getExpenses = async () => {
            try {
                const expensesResponse = await apiClient.get("/expenses", { params: { order: "DESC", month: uiState.selectedMonth }})
                setUiState(prev => ({
                    ...prev,
                    expenseTransactionList: expensesResponse.data.data,
                }))
            } catch (error) {
                console.log(error);
            }
        }
        getExpenses();
    }, [uiState.selectedMonth])

    const toggleViewMode = () => {
        setUiState((prev) => ({ ...prev, viewMode: uiState.viewMode === "viewing" ? "editing" : "viewing" } ))
    }

    if (uiState.viewMode === "loading") return <p>Loading...</p>

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUiState(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    const handlers = {
        toggleViewMode,
        setUiState,
        handleChange,
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
            {uiState.viewMode === "viewing" && <ExpensesDisplay uiState={uiState} handlers={handlers} />}
            {uiState.viewMode === "editing" && <NewExpenseForm stateData={stateData} formUiData={formUiData} handlers={handlers} />}
        </>
    )
}

export default ExpensesDashboard
