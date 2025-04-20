import { useEffect, useState } from "react";
import GeneralButton from "../../general/buttons/GeneralButton"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import apiClient from "../../../api/apiClient";
import UserFuelTransactionSummary from "./UserFuelTransactionSummary";
import { SelectField } from "../../general/form-fields/InputFields";
import { prepareFuelTransactionData } from "../../../utils/fuel/utils";

function FuelTransactionDashboard() {
    const defaultYearOption = [<option key="all" value="all">All</option>];
    const [transactionYears, setTransactionYears] = useState([]);
    const [selectedYearId, setSelectedYearId] = useState("all");
    const [preparedTransactionData, setPreparedTransactionData] = useState({});
    const [loadingStates, setLoadingStates] = useState({
        mountLoading: true,
        dependencyLoading: true,
    })

    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Fuel Points | Cridr";
        const getUniqueYearsByUserId = async () => {
            try {
                const response = await apiClient.get("/fuel-transaction/unique-years");
                if (response.status === 200 && Array.isArray(response.data.data)) {
                    setTransactionYears(response.data.data);
                    setLoadingStates((prev) => ({ ...prev, mountLoading: false }))
                }
            } catch (error) {
                console.log(error.response?.data?.message);
                setLoadingStates((prev) => ({ ...prev, mountLoading: false }))
            }
        }
        
        getUniqueYearsByUserId();
    }, [navigate]);

    useEffect(() => {
        setLoadingStates((prev) => ({ ...prev, dependencyLoading: true }));
        const getFuelTransactionData = async () => {
            try {
                if (selectedYearId === "all") {
                    const response = await apiClient.get("/fuel-transaction");
                    if (response.status === 200 && Array.isArray(response.data.data)) {
                        setPreparedTransactionData(prepareFuelTransactionData(response.data.data));
                        setLoadingStates((prev) => ({ ...prev, dependencyLoading: false }))
                    }
                } else {
                    const response = await apiClient.get(`/fuel-transaction/?year=${selectedYearId}`);
                    if (response.status === 200 && Array.isArray(response.data.data)) {
                        setPreparedTransactionData(prepareFuelTransactionData(response.data.data));
                        setLoadingStates((prev) => ({ ...prev, dependencyLoading: false }))
                    }
                }
            } catch (error) {
                console.log(error.response?.data?.message);
                
            }
        }
        getFuelTransactionData();
    }, [selectedYearId])

    const handleYearIdChange = (e) => {
        setSelectedYearId(e.target.value)
    }
    
    if (loadingStates.onMountLoading || loadingStates.dependencyLoading) return <div>Loading...</div>;
    
    return (
        <section>
            <Link to="new"><GeneralButton buttonType="button" buttonText="Add Fuel Transaction" /></Link>
            <SelectField fieldId="fuel-transaction-summary-year-select" labelText="Select Transaction Year" optionList={transactionYears} onChange={handleYearIdChange} value={selectedYearId} optionTextAccessor="unique_year" optionIdAccessor="unique_year" defaultOptions={defaultYearOption} />
            <UserFuelTransactionSummary preparedTransactionData={preparedTransactionData} />
        </section>
    )


}

export default FuelTransactionDashboard