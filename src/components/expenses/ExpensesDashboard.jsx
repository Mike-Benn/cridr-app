import { useState, useEffect } from "react";
import styles from "./ExpensesDashboard.module.css"
import apiClient from "../../api/apiClient";
import { format } from "date-fns";
import ExpensesView from "./ExpensesView";
import NewExpenseForm from "./NewExpenseForm";

export default function IncentivesDashboard() {
    
    const [uiState, setUiState] = useState({
        view: "summary",
        expenseTransactionList: [],
        expenseSum: 0,
        businessList: [],
        creditCardList: [],
        mainCategoryList: [],
        subcategoryMap: {},
    })
    const [uiFlags, setUiFlags] = useState({
        loadingCount: 1,
        needsRefreshed: false,
    })

    const startLoad = () => setUiFlags(prev => ({
        ...prev,
        loadingCount: prev.loadingCount + 1,
    }))

    const endLoad = () => setUiFlags(prev => ({
        ...prev, 
        loadingCount: prev.loadingCount - 1,
    }))

    const getExpenses = async () => {
        startLoad();
        const currentMonth = format(new Date(), "MM");
        const currentYear = format(new Date(), "yyyy");
        try {
            const [expensesResponse, statsResponse] = await Promise.all([
                apiClient.get("/expenses", { params: { order: "DESC", limit: 5 }}),
                apiClient.get("/expenses/stats", { params: { month: currentMonth, year: currentYear }})
            ])
            console.log(statsResponse)
            setUiState(prev => ({
                ...prev,
                expenseTransactionList: expensesResponse.data.data,
                expenseSum: statsResponse.data.data[0].total,
            }))
        } catch (error) {
            console.log(error)
        }
        endLoad();
    }
    useEffect(() => {
        document.title = "Expenses | Cridr"
        const getData = async () => {
            try {
                const [businessesResponse, categoriesResponse, creditCardsResponse] = await Promise.all([
                    apiClient.get("/businesses", { params: { featureNames: "Expenses" }}),
                    apiClient.get("/categories", { params: { type: "all" }}),
                    apiClient.get("/credit-cards")
                ])
                setUiState(prev => ({
                    ...prev,
                    businessList: businessesResponse.data.data,
                    creditCardList: creditCardsResponse.data.data,
                    mainCategoryList: categoriesResponse.data.data.mainCategoriesData,
                    subcategoryMap: categoriesResponse.data.data.subcategoriesData,
                }))
            } catch (error) {
                console.log(error)
            }
            endLoad();
            
        }
        getData();
        getExpenses();
    }, [])

    useEffect(() => {
        if (!uiFlags.needsRefreshed || uiState.view !== "summary") return;
        getExpenses();
        setUiFlags(prev => ({ ...prev, needsRefreshed: false }));
    }, [uiFlags.needsRefreshed, uiState.view])
    

    const toggleView = () => {
        setUiState(prev => ({
            ...prev,
            view: prev.view === "summary" ? "adding" : "summary",
        }))
    }

    const summaryHandlers = {
        toggleView,
    }

    const formHandlers = {
        setUiFlags,
        toggleView,
    }

    const isLoading = uiFlags.loadingCount > 0;

    return (
        <main>
            {!isLoading && uiState.view === "summary" && <ExpensesView uiState={uiState} handlers={summaryHandlers} />}
            {!isLoading && uiState.view === "adding" && <NewExpenseForm uiState={uiState} handlers={formHandlers} />}
        </main>
    )
}