import { useEffect, useState } from "react";
import ExpensesDisplay from "./ExpensesDisplay";
import apiClient from "../../api/apiClient";
import NewExpenseForm from "./NewExpenseForm";
function ExpensesDashboard() {
    const [loadingCount, setLoadingCount] = useState(0);
    const isLoading = loadingCount > 0;
    const startLoad = () => setLoadingCount(count => count + 1);
    const endLoad = () => setLoadingCount(count => count - 1);

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
    useEffect(() => {
        document.title = "Expenses | Cridr";
        const getData = async () => {
            try {
                startLoad();
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
        const getExpenses = async () => {
            startLoad();
            try {
                const expensesResponse = await apiClient.get("/expenses", { params: { order: "DESC", month: uiState.selectedMonth }})
                setUiState(prev => ({
                    ...prev,
                    expenseTransactionList: expensesResponse.data.data,
                }))
            } catch (error) {
                console.log(error);
            }
            endLoad();
        }
        getExpenses();
    }, [uiState.selectedMonth])

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
            {!isLoading && uiState.viewMode === "viewing" && <ExpensesDisplay uiState={uiState} handlers={handlers} />}
            {!isLoading && uiState.viewMode === "editing" && <NewExpenseForm stateData={stateData} formUiData={formUiData} handlers={handlers} />}
        </>
    )
}

export default ExpensesDashboard
