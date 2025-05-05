import { useEffect, useState } from "react"
import GeneralButton from "../general/buttons/GeneralButton"
import apiClient from "../../api/apiClient";
import NewIncentiveForm from "./NewIncentiveForm";


function IncentivesDashboard() {

    const [uiState, setUiState] = useState({
        viewMode: "viewing",
        businessList: [],
    })

    const [incentiveFormData, setIncentiveFormData] = useState({
        selectedBusinessId: "",
        incentiveDescription: "",
        incentiveAmount: "",
        transactionDate: "",
    })

    const incentiveFormTemplate = {
        selectedBusinessId: "",
        incentiveDescription: "",
        incentiveAmount: "",
        transactionDate: "",
    }

    useEffect(() => {
        const getBusinesses = async () => {
            const params = new URLSearchParams();
            params.append("featureNames", "Incentives");
            try {
                const [businessesResponse] = await Promise.all([
                    apiClient.get("/businesses", { params: params })
                ])
                setUiState((prev) => ({ ...prev, businessList: businessesResponse.data.data }))
            } catch (error) {
                console.log(error.response?.data?.message)
            }
        }
        getBusinesses();
    })

    const handleIncentiveFormChange = (e) => {
        const { name, value } = e.target;
        setIncentiveFormData((prev) => ({ 
            ...prev,
            [name]: value,
        })) 
    }

    const handleIncentiveFormSubmit = async (e) => {
        e.preventDefault();
        const submitAction = e.nativeEvent.submitter.value;
        const newIncentiveTransaction = {
            business_id: incentiveFormData.selectedBusinessId,
            incentive_description: incentiveFormData.incentiveDescription,
            incentive_amount: incentiveFormData.incentiveAmount,
            transaction_date: incentiveFormData.transactionDate,
        }
        try {
            const response = apiClient.post("/incentives", newIncentiveTransaction);
            console.log(response.data?.message);
            setIncentiveFormData(incentiveFormTemplate);
            if (submitAction === "submit") setUiState((prev) => ({ ...prev, viewMode: "viewing" }));
            
        } catch (error) {
            console.log(error.response?.data?.message);
        }
    }

    const incentiveFormHandlers = {
        handleIncentiveFormChange,
        handleIncentiveFormSubmit,
    }

    const toggleViewMode = () => {
        setUiState((prev) => ({ ...prev, viewMode: prev.viewMode === "editing" ? "viewing" : "editing" }));
    }

    return (
        <>
            {uiState.viewMode === "viewing" && <GeneralButton buttonType="button" buttonText="Add Incentive" onClick={toggleViewMode} />}
            {uiState.viewMode === "editing" && <GeneralButton buttonType="button" buttonText="Cancel" onClick={toggleViewMode} />}
            {uiState.viewMode === "editing" && <NewIncentiveForm incentiveFormData={incentiveFormData} handlers={incentiveFormHandlers} uiState={uiState} />}
        </>
    )

    
}

export default IncentivesDashboard