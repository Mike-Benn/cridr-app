import { useEffect, useState } from "react"
import { CategorySelect } from "../general/form-fields/InputFields";
import apiClient from "../../api/apiClient";
import AnnualCardPointsReport from "./AnnualCardPointsReport";

function UserCardPointTransactionSummary() {
    const defaultYearOption = [<option key="all" value="all">All</option>];
    const [selectedYearId, setSelectedYearId] = useState("all");
    const [uniqueYearsList, setUniqueYearsList] = useState([]);
    
    useEffect(() => {
        const getUniqueTransactionYears = async () => {
            try {
                const response = await apiClient.get("/card-points-transaction/unique-years");
                if (response.status === 200) {
                    const uniqueYearsList = [...response.data.data];
                    setUniqueYearsList(uniqueYearsList)
                }
            } catch (error) {
                console.error("Unable to retrieve unique transaction years for user.", error)
            }
        }
        getUniqueTransactionYears();
    }, [])


    const handleYearIdChange = (e) => {
        setSelectedYearId(e.target.value)
    }

    return (
        <>
            <CategorySelect fieldId="card-points-transaction-summary-year-select" labelText="Select Transaction Year" optionList={uniqueYearsList} onChange={handleYearIdChange} value={selectedYearId} optionTextAccessor="unique_year" optionIdAccessor="unique_year" defaultOptions={defaultYearOption} />
            <h1></h1>
            <AnnualCardPointsReport yearSelected={selectedYearId} />
        </>
    )
}

export default UserCardPointTransactionSummary