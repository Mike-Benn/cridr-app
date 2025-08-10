import { useState, useEffect } from "react";
import styles from "./IncentivesDashboard.module.css"
import IncentivesView from "./IncentivesView";
import apiClient from "../../api/apiClient";
import NewIncentiveForm from "./NewIncentiveForm";

export default function IncentivesDashboard() {
    

    const [uiState, setUiState] = useState({
        view: "summary",
        incentiveTransactionList: [],
        incentiveSum: 0,
        businessList: [],
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

    const getIncentives = async () => {
        startLoad();
        try {
            const [incentivesResponse, statsResponse] = await Promise.all([
                apiClient.get("/incentives", { params: { order: "DESC", limit: 5 }}),
                apiClient.get("/incentives/stats")
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
        const getBusinesses = async () => {
            try {
                const businessesResponse = await apiClient.get("/businesses", { params: { featureNames: "Incentives" }})
                setUiState(prev => ({
                    ...prev,
                    businessList: businessesResponse.data.data,
                }))
            } catch (error) {
                console.log(error)
            }
            endLoad();
            
        }
        getBusinesses();
        getIncentives();
    }, [])

    useEffect(() => {
        if (!uiFlags.needsRefreshed || uiState.view !== "summary") return;
        getIncentives();
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
            {!isLoading && uiState.view === "summary" && <IncentivesView uiState={uiState} handlers={summaryHandlers} />}
            {!isLoading && uiState.view === "adding" && <NewIncentiveForm uiState={uiState} handlers={formHandlers} />}
        </main>
    )
}