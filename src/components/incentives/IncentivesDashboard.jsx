import { useEffect, useState } from "react"
import apiClient from "../../api/apiClient";
import NewIncentiveForm from "./NewIncentiveForm";
import IncentivesDisplay from "./IncentivesDisplay"
import Button from "@mui/material/Button"

function IncentivesDashboard() {

    const [uiState, setUiState] = useState({
        viewMode: "loading",
        businessList: [],
        incentiveTransactionList: [],
    })


    useEffect(() => {
        const getData = async () => {
            try {
                const [businessesResponse, incentivesResponse] = await Promise.all([
                    apiClient.get("/businesses", { params: { featureNames: "Incentives" }}),
                    apiClient.get("/incentives", { params: { order: "DESC", limit: 5 }})
                ])
                setUiState((prev) => ({
                    ...prev,
                    businessList: businessesResponse.data.data,
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

    if (uiState.viewMode === "loading") return <p>Loading...</p>

    const handlers = {
        toggleViewMode,
        setUiState,
    }

    const stateData = {
        incentiveTransactionList: uiState.incentiveTransactionList,
    }
    return (
        <>
            {uiState.viewMode === "viewing" && <IncentivesDisplay incentiveTransactionList={uiState.incentiveTransactionList} handlers={handlers} />}
            {uiState.viewMode === "editing" && <NewIncentiveForm businessList={uiState.businessList} handlers={handlers} stateData={stateData}/> }
        </>
    )
}

export default IncentivesDashboard