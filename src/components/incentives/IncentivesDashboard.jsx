import { useEffect, useState } from "react"
import apiClient from "../../api/apiClient";
import NewIncentiveForm from "./NewIncentiveForm";
import IncentivesDisplay from "./IncentivesDisplay"

function IncentivesDashboard() {

    const [uiState, setUiState] = useState({
        viewMode: "loading",
        businessList: [],
        businessMap: {},
        incentiveTransactionList: [],
    })


    useEffect(() => {
        document.title = "Incentives | Cridr"
        const getData = async () => {
            try {
                const [businessesResponse, incentivesResponse] = await Promise.all([
                    apiClient.get("/businesses", { params: { featureNames: "Incentives", includeMap: "true" }}),
                    apiClient.get("/incentives", { params: { order: "DESC" }})
                ])
                setUiState((prev) => ({
                    ...prev,
                    businessList: businessesResponse.data.data.businessList,
                    businessMap: businessesResponse.data.data.businessMap,
                    incentiveTransactionList: incentivesResponse.data.data,
                    viewMode: "viewing",

                }))
            } catch (error) {
                console.log(error.response?.data?.message)
            }
        }
        getData();
    }, [])

    const toggleViewMode = () => {
        setUiState((prev) => ({ ...prev, viewMode: prev.viewMode === "editing" ? "viewing" : "editing" }));
    }

    const handlers = {
        toggleViewMode,
        setUiState,
    }

    const stateData = {
        incentiveTransactionList: uiState.incentiveTransactionList,
    }
    return (
        <>
            {uiState.viewMode === "viewing" && <IncentivesDisplay uiState={uiState} handlers={handlers} />}
            {uiState.viewMode === "editing" && <NewIncentiveForm businessList={uiState.businessList} handlers={handlers} stateData={stateData}/> }
        </>
    )
}

export default IncentivesDashboard