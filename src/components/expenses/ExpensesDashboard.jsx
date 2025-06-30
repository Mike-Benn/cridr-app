import { useEffect, useState } from "react";
import ExpensesDisplay from "./ExpensesDisplay";
import apiClient from "../../api/apiClient";
import NewExpenseForm from "./NewExpenseForm";
function ExpensesDashboard() {
    
    const [uiState, setUiState] = useState({
        viewMode: "loading",
        expenseTransactionList: [],
        mainCategoryList: [],
        subcategoryList: [],

    })

    useEffect(() => {
        document.title = "Expenses | Cridr";
        const getData = async () => {
            try {
                const [expensesResponse, mainCategoriesResponse, subcategoriesResponse] = await Promise.all([
                    apiClient.get("/expenses", { params: { order: "DESC", limit: 5 }}),
                    apiClient.get("/main-categories"),
                    apiClient.get("/subcategories"),
                ])
                setUiState((prev) => ({
                    ...prev,
                    expenseTransactionList: expensesResponse.data.data,
                    mainCategoryList: mainCategoriesResponse.data.data,
                    subcategoryList: subcategoriesResponse.data.data,
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
    }

    const formUiData = {
        mainCategoryList: uiState.mainCategoryList,
        subcategoryList: uiState.subcategoryList,
    }


    return (
        <>
            {uiState.viewMode === "viewing" && <ExpensesDisplay expenseTransactionList={uiState.expenseTransactionList} handlers={handlers}/>}
            {uiState.viewMode === "editing" && <NewExpenseForm formUiData={formUiData} handlers={handlers} />}
        </>
    )
}

export default ExpensesDashboard
