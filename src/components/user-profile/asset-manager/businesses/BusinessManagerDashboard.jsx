import { useEffect, useState } from "react";
import GeneralButton from "../../../general/buttons/GeneralButton";
import apiClient from "../../../../api/apiClient";
import NewBusinessForm from "./NewBusinessForm";

function BusinessManagerDashboard() {

    const [businesses, setBusinesses] = useState([]);
    const [uiState, setUiState] = useState({
        isAddingBusiness: false,
        isLoading: true,
    })
    const toggleAddBusiness = () => {
        setUiState((prev) => ({ ...prev, isAddingBusiness: !prev.isAddingBusiness }))
    }
    
    useEffect(() => {
        const getBusinesses = async () => {
            try {
                const response = await apiClient.get("/businesses");
                if (response.data?.data && Array.isArray(response.data.data)) {
                    setBusinesses(response.data.data);
                    setUiState((prev) => ({ ...prev, isLoading: false} ))
                }
            } catch (error) {
                console.log(error.response?.data?.message);
            }
        }
        getBusinesses();
    }, [])

    if (uiState.isLoading) return <p>Loading...</p>
    const businessList = <ul>{businesses.map(business => <li key={business.business_id}>{business.business_name}</li>)}</ul>
    return (
        <>
            {!uiState.isAddingBusiness && businessList}
            {uiState.isAddingBusiness && <NewBusinessForm />}
            {uiState.isAddingBusiness && <GeneralButton buttonType="button" buttonText="Cancel" onClick={toggleAddBusiness} />}
            {!uiState.isAddingBusiness && <GeneralButton buttonType="button" buttonText="Add New Business" onClick={toggleAddBusiness} />}
        </>
    )
}

export default BusinessManagerDashboard