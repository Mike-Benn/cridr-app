import { useEffect, useState } from "react";
import ExpensesDisplay from "./ExpensesDisplay";
import apiClient from "../../api/apiClient";
import NewExpenseForm from "./NewExpenseForm";
function ExpensesDashboard() {
    const [uiState, setUiState] = useState({
        viewMode: "viewing",
        expenseTransactionList: [],
        mainCategoryList: [],
        subcategoryMap: {},
        businessList: [],
        creditCardList: [],
        businessMap: {},
        expenseSum: 0,
        uniqueMonthList: [],
        selectedMonth: "",
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
        try {
            const [expensesResponse, statsResponse] = await Promise.all([
                apiClient.get("/expenses", { params: { order: "DESC", month: uiState.selectedMonth }}),
                apiClient.get("/expenses/stats", { params: { month: uiState.selectedMonth }})
            ])
            setUiState(prev => ({
                ...prev,
                expenseTransactionList: expensesResponse.data.data,
                expenseSum: statsResponse.data.data[0].total,
            }))
        } catch (error) {
            console.log(error);
        }
        endLoad();
    }

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
                const firstMonth = uniqueMonthsResponse.data.data[0].month ?? "";

                setUiState((prev) => ({
                    ...prev,
                    uniqueMonthList: uniqueMonthsResponse.data.data,
                    mainCategoryList: categoriesResponse.data.data.mainCategoriesData,
                    subcategoryMap: categoriesResponse.data.data.subcategoriesData,
                    businessList: businessesResponse.data.data.businessList,
                    businessMap: businessesResponse.data.data.businessMap,
                    creditCardList: creditCardsResponse.data.data,
                    selectedMonth: firstMonth,
                }))
            } catch (error) {
                console.log(error);
            }
            endLoad();
        }
        getData();
    }, [])

    useEffect(() => {
        if (uiState.selectedMonth === "") return;
        getExpenses();
    }, [uiState.selectedMonth])

    useEffect(() => {
        if (!uiFlags.needsRefreshed || uiState.viewMode !== "viewing") return;
        getExpenses();
        setUiFlags(prev => ({ ...prev, needsRefreshed: false }))
    }, [uiFlags.needsRefreshed, uiState.viewMode])

    const toggleViewMode = () => {
        setUiState((prev) => ({ ...prev, viewMode: uiState.viewMode === "viewing" ? "editing" : "viewing" } ))
    }

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
        setUiFlags,
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
    const isLoading = uiFlags.loadingCount > 0;

    return (
        <>
            {!isLoading && !uiFlags.needsRefreshed && uiState.viewMode === "viewing" && <ExpensesDisplay uiState={uiState} handlers={handlers} loading={isLoading} />}
            {!isLoading && uiState.viewMode === "editing" && <NewExpenseForm stateData={stateData} formUiData={formUiData} handlers={handlers} uiState={uiState} />}
        </>
    )
}

export default ExpensesDashboard
