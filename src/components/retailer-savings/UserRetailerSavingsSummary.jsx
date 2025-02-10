import { useEffect, useState } from "react"
import { SelectField } from "../general/form-fields/InputFields";
import apiClient from "../../api/apiClient";
import AnnualRetailerSavingsReport from "./AnnualRetailerSavingsReport";

function UserRetailerSavingsSummary() {
    const defaultYearOption = [<option key="all" value="all">All</option>];
    const [selectedYearId, setSelectedYearId] = useState("all");
    const [uniqueYearsList, setUniqueYearsList] = useState([]);
    
    useEffect(() => {
        const getUniqueTransactionYears = async () => {
            try {
                const response = await apiClient.get("/retail-savings-transaction/unique-years");
                if (response.data) {
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
            <SelectField fieldId="incentive-transaction-summary-year-select" labelText="Select Transaction Year" optionList={uniqueYearsList} onChange={handleYearIdChange} value={selectedYearId} optionTextAccessor="unique_year" optionIdAccessor="unique_year" defaultOptions={defaultYearOption} />
            <AnnualRetailerSavingsReport yearSelected={selectedYearId} />
        </>
    )
}

export default UserRetailerSavingsSummary