import { useEffect, useState } from "react"
import { SelectField } from "../../general/form-fields/InputFields"
import apiClient from "../../../api/apiClient"
import AnnualFuelReport from "./stats/AnnualFuelReport";

function UserFuelTransactionSummary() {
    const defaultYearOption = [<option key="all" value="all">All</option>];
    const [selectedYearId, setSelectedYearId] = useState("all");
    const [uniqueYearsList, setUniqueYearsList] = useState([]);
    
    
    
    useEffect(() => {
        const getUniqueYearsByUserId = async () => {
            try {
                const response = await apiClient.get("/fuel-transaction/unique-years");
                if (response.status === 200 && Array.isArray(response.data.data)) {
                    setUniqueYearsList(response.data.data)
                }
            } catch (error) {
                console.error("Unable to retrieve unique transaction years for user.", error)
            }
        }
        getUniqueYearsByUserId();
    }, [])


    const handleYearIdChange = (e) => {
        setSelectedYearId(e.target.value)
    }

    return (
        <>
            <SelectField fieldId="fuel-transaction-summary-year-select" labelText="Select Transaction Year" optionList={uniqueYearsList} onChange={handleYearIdChange} value={selectedYearId} optionTextAccessor="unique_year" optionIdAccessor="unique_year" defaultOptions={defaultYearOption} />
            <h1></h1>
            <AnnualFuelReport yearSelected={selectedYearId} />
        </>
    )
}

export default UserFuelTransactionSummary