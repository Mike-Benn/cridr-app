import { useEffect, useState } from "react";
import ExpensesDisplay from "./ExpensesDisplay";
import apiClient from "../../api/apiClient";
function ExpensesDashboard() {
    
    const [uiState, setUiState] = useState({
        viewMode: "loading",
        expenseTransactionList: [],

    })

    useEffect(() => {
        document.title = "Expenses | Cridr";
        const getData = async () => {
            try {
                const [expensesResponse] = await Promise.all([
                    apiClient.get("/expenses", { params: { order: "DESC", limit: 5 }})
                ])
                setUiState((prev) => ({
                    ...prev,
                    expenseTransactionList: expensesResponse.data.data,
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

    console.log(uiState.expenseTransactionList)

    return (
        <>
            {uiState.viewMode === "viewing" && <ExpensesDisplay expenseTransactionList={uiState.expenseTransactionList} handlers={handlers}/>}
        </>
    )
}

export default ExpensesDashboard
