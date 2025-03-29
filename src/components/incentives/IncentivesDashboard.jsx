import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import GeneralButton from "../general/buttons/GeneralButton"
import UserIncentiveTransactionSummary from "./UserIncentiveTransactionSummary";
import apiClient from "../../api/apiClient";
import { SelectField } from "../general/form-fields/InputFields";
import { prepareIncentiveTransactionData } from "../../utils/incentives/utils";

function IncentivesDashboard() {
    const defaultYearOption = [<option key="all" value="all">All</option>];
    const [selectedYearId, setSelectedYearId] = useState("all");
    const [transactionYears, setTransactionYears] = useState([]);
    const [preparedTransactionData, setPreparedTransactionData] = useState({});
    const [loadingStates, setLoadingStates] = useState({
        mountLoading: true,
        dependencyLoading: true,
    })
        
    useEffect(() => {
        document.title = "Incentives | Cridr";
        const getUniqueYearsByUserId = async () => {
            try {
                const response = await apiClient.get("/incentive-transaction/unique-years");
                if (response.status === 200 && Array.isArray(response.data.data)) {
                    setTransactionYears(response.data.data);
                    setLoadingStates((prev) => ({ ...prev, mountLoading: false }));
                }
            } catch (error) {
                console.error("Unable to retrieve unique transaction years for user.", error)
                setLoadingStates((prev) => ({ ...prev, mountLoading: false }));
            }
        }
        getUniqueYearsByUserId();
    }, []);
    

    useEffect(() => {
        setLoadingStates((prev) => ({ ...prev, dependencyLoading: true }));
        const getIncentiveTransactionData = async () => {
            try {
                if (selectedYearId === "all") {
                    const response = await apiClient.get("/incentive-transaction");
                    if (response.status === 200 && Array.isArray(response.data.data)) {
                        setPreparedTransactionData(prepareIncentiveTransactionData(response.data.data));
                        setLoadingStates((prev) => ({ ...prev, dependencyLoading: false }))
                    }
                } else {
                    const response = await apiClient.get(`/incentive-transaction/?year=${selectedYearId}`);
                    if (response.status === 200 && Array.isArray(response.data.data)) {
                        setPreparedTransactionData(prepareIncentiveTransactionData(response.data.data));
                        setLoadingStates((prev) => ({ ...prev, dependencyLoading: false }))
                    }
                }
            } catch (error) {
                console.log(error.response?.data?.message);
                setLoadingStates((prev) => ({ ...prev, dependencyLoading: false }));
            }
        }
        getIncentiveTransactionData();

    }, [selectedYearId])

    const handleYearIdChange = (e) => {
        setSelectedYearId(e.target.value)
    }

    if (loadingStates.mountLoading || loadingStates.dependencyLoading) return <p>Loading...</p>

    return (
        <>
            <Link to="new"><GeneralButton buttonType="button" buttonText="Add New Incentive" /></Link>
            <SelectField fieldId="incentive-transaction-summary-year-select" labelText="Select Transaction Year" optionList={transactionYears} onChange={handleYearIdChange} value={selectedYearId} optionTextAccessor="unique_year" optionIdAccessor="unique_year" defaultOptions={defaultYearOption} />
            <UserIncentiveTransactionSummary preparedTransactionData={preparedTransactionData}/>
        </>
    )
}

export default IncentivesDashboard