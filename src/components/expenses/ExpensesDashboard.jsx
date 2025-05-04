import { useEffect } from "react";
import NewExpenseTransaction from "./NewExpenseTransaction";
function ExpensesDashboard() {
    
    useEffect(() => {
        document.title = "Expenses | Cridr";

    }, [])

    //if (uiState.viewMode === "loading") return <p>Loading...</p>
    //const businessList = <ul>{businesses.map(business => <li key={business.business_id}>{business.business_name}</li>)}</ul>
    return (
        <>
            <NewExpenseTransaction />
        </>
    )
}

export default ExpensesDashboard

/*
        const getBusinesses = async () => {
            try {
                const params = new URLSearchParams();
                params.append("featureNames", "Expenses");
                const response = await apiClient.get("/businesses", { params: params });
                if (response.data?.data && Array.isArray(response.data.data)) {
                    setBusinesses(response.data.data);
                    setUiState((prev) => ({ ...prev, viewMode: "viewing" }));
                }
            } catch (error) {
                console.log(error.response?.data?.message);
            }
        }
        getBusinesses();
        */
        /*const getUniqueExpensesYearsByUserId = async () => {
            try {
                const response = await apiClient.get("/expenses/unique-years");
                if (response.status === 200 && Array.isArray(response.data.data)) {
                    setUiState((prev) => ({ 
                        ...prev, 
                        transactionYears: response.data.data, 
                        viewMode: "viewing",    
                    }));
                }
            } catch (error) {
                console.error("Unable to retrieve unique transaction years for user.", error)
                setUiState((prev) => ({ ...prev, viewMode: "viewing" }));
            }
        }
        getUniqueExpensesYearsByUserId();*/