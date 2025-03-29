import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GeneralButton from "../general/buttons/GeneralButton"
import UserCardPointsTransactionSummary from "./UserCardPointsTransactionSummary";
import { SelectField } from "../general/form-fields/InputFields";
import apiClient from "../../api/apiClient";
import { processCardPointTransactions } from "../../utils/card-points/utils";

function CardPointsDashboard() {
    const defaultYearOption = [<option key="all" value="all">All</option>];
    const [selectedYearId, setSelectedYearId] = useState("all");
    const [transactionYears, setTransactionYears] = useState([]);
    const [preparedTransactionData, setPreparedTransactionData] = useState({});
    const [loadingStates, setLoadingStates] = useState({
        mountLoading: true,
        dependencyLoading: true,
    })

    useEffect(() => {
        document.title = "Credit Card Points | Cridr";
        const getUniqueTransactionYearsById = async () => {
                    try {
                        const response = await apiClient.get("/card-points-transaction/unique-years");
                        if (response.status === 200 && Array.isArray(response.data.data)) {
                            setTransactionYears(response.data.data)
                            setLoadingStates((prev) => ({ ...prev, mountLoading: false }))
                        }
                    } catch (error) {
                        console.log(error.response?.data?.message);
                        setLoadingStates((prev) => ({ ...prev, mountLoading: false }))
                    }
                }
                getUniqueTransactionYearsById();
        
    }, []);

    useEffect(() => {
        setLoadingStates((prev) => ({ ...prev, dependencyLoading: true }));
        const getCardPointTransactionData = async () => {
            if (selectedYearId === "all") {
                const response = await apiClient.get("/card-points-transaction");
                if (response.status === 200 && Array.isArray(response.data.data)) {
                    setPreparedTransactionData(processCardPointTransactions(response.data.data))
                    setLoadingStates((prev) => ({ ...prev, dependencyLoading: false }));
                }
            } else {
                const response = await apiClient.get(`/card-points-transaction/?year=${selectedYearId}`);
                if (response.status === 200 && Array.isArray(response.data.data)) {
                    setPreparedTransactionData(processCardPointTransactions(response.data.data))
                    setLoadingStates((prev) => ({ ...prev, dependencyLoading: false }));
                }
            }
        }
        getCardPointTransactionData();
    }, [selectedYearId])

    const handleYearIdChange = (e) => {
        setSelectedYearId(e.target.value)
    }

    if (loadingStates.mountLoading || loadingStates.dependencyLoading) return <p>Loading...</p>

    return (
        <section>
            <Link to="new"><GeneralButton buttonType="button" buttonText="Add Card Points" /></Link>
            <SelectField fieldId="card-points-transaction-summary-year-select" labelText="Select Transaction Year" optionList={transactionYears} onChange={handleYearIdChange} value={selectedYearId} optionTextAccessor="unique_year" optionIdAccessor="unique_year" defaultOptions={defaultYearOption} />
            <UserCardPointsTransactionSummary preparedTransactionData={preparedTransactionData} />
        </section>
    )
}

export default CardPointsDashboard