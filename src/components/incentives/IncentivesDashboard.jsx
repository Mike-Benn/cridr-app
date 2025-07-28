import { useEffect, useState } from "react"
import apiClient from "../../api/apiClient";
import NewIncentiveForm from "./NewIncentiveForm";
import IncentivesDisplay from "./IncentivesDisplay";


function IncentivesDashboard() {

    const [uiState, setUiState] = useState({
        viewMode: "viewing",
        businessList: [],
        businessMap: {},
        incentiveTransactionList: [],
        incentiveSum: 1,
        uniqueMonthList: [],
        selectedMonth: "",
    })
    const [uiFlags, setUiFlags] = useState({
        loadingCount: 1,
        needsRefreshed: false,
    })

    const startLoad = () => setUiFlags(prev => ({
        ...prev,
        loadingCount: prev.loadingCount + 1
    }))

    const endLoad = () => setUiFlags(prev => ({
        ...prev,
        loadingCount: prev.loadingCount - 1
    }))

    const getIncentives = async () => {
        startLoad();
        try {
            const [incentivesResponse, statsResponse] = await Promise.all([
                apiClient.get("/incentives", { params: { order: "DESC", month: uiState.selectedMonth }}),
                apiClient.get("/incentives/stats", { params: { month: uiState.selectedMonth }})
            ])
            setUiState(prev => ({
                ...prev,
                incentiveTransactionList: incentivesResponse.data.data,
                incentiveSum: statsResponse.data.data[0].total,
            }))
        } catch (error) {
            console.log(error)
        }
        endLoad();
    }

    useEffect(() => {
        document.title = "Incentives | Cridr"
        const getData = async () => {
            try {
                const [businessesResponse, uniqueMonthsResponse] = await Promise.all([
                    apiClient.get("/businesses", { params: { featureNames: "Incentives", includeMap: "true" }}),
                    apiClient.get("/incentives/months")
                ])
                const firstMonth = uniqueMonthsResponse.data.data[0].month ?? "";
                setUiState((prev) => ({
                    ...prev,
                    businessList: businessesResponse.data.data.businessList,
                    businessMap: businessesResponse.data.data.businessMap,
                    uniqueMonthList: uniqueMonthsResponse.data.data,
                    selectedMonth: firstMonth,
                }))
            } catch (error) {
                console.log(error.response?.data?.message)
            }
            endLoad();

        }
        getData();
    }, [])

    useEffect(() => {
        if (uiState.selectedMonth === "") return;
        getIncentives();
    }, [uiState.selectedMonth])

    useEffect(() => {
        if (!uiFlags.needsRefreshed || uiState.viewMode !== "viewing") return;
        getIncentives();

        setUiFlags(prev => ({ ...prev, needsRefreshed: false }))
    }, [uiFlags.needsRefreshed, uiState.viewMode])

    const toggleViewMode = () => {
        setUiState((prev) => ({ ...prev, viewMode: prev.viewMode === "editing" ? "viewing" : "editing" }));
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
    const isLoading = uiFlags.loadingCount > 0;

    return (
        <>
            {!isLoading && uiState.viewMode === "viewing" && <IncentivesDisplay uiState={uiState} handlers={handlers} />}
            {!isLoading && uiState.viewMode === "editing" && <NewIncentiveForm uiState={uiState} handlers={handlers} /> }
        </>
    )
}

export default IncentivesDashboard