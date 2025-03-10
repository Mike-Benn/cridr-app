import { useEffect, useState, useContext } from "react"
import { SelectField } from "../../general/form-fields/InputFields"
import apiClient from "../../../api/apiClient"
import { useNavigate } from "react-router-dom"
import { prepareFuelTransactionData } from "../../../utils/fuel/utils"
import PropTypes from "prop-types"
import AuthContext from "../../../auth/AuthContext"

function UserFuelTransactionSummary({ transactionYears }) {
    const defaultYearOption = [<option key="all" value="all">All</option>];
    const [selectedYear, setSelectedYear] = useState("all");
    const [preparedTransactionData, setPreparedTransactionData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const { setIsAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        setIsLoading(true);
        const getTransactionDataByYear = async () => {
            try {
                if (selectedYear === "all") {
                    const response = await apiClient.get("/fuel-transaction");
                    if (response.status === 200 && Array.isArray(response.data.data)) {
                        setPreparedTransactionData(prepareFuelTransactionData(response.data.data));
                        setIsLoading(false);
                    }
                } else {
                    const response = await apiClient.get(`/fuel-transaction/?year=${selectedYear}`);
                    if (response.status === 200 && Array.isArray(response.data.data)) {
                        setPreparedTransactionData(prepareFuelTransactionData(response.data.data));
                        setIsLoading(false);
                    }
                }
            } catch (error) {
                if (error.response.status === 401) {
                    console.error("Unauthorized", error);
                    localStorage.removeItem("accessToken");
                    setIsAuthenticated(false);
                    navigate("/log-in")
                } else {
                    console.error("Unable to get user data.", error);
                    setIsLoading(false);
                }
            }
        }
        getTransactionDataByYear();

    }, [transactionYears, selectedYear, navigate, setIsAuthenticated])

    const handleYearIdChange = (e) => {
        setSelectedYear(e.target.value)
    }

    if (isLoading) return <div>Loading...</div>;

    return (
        <>
            <SelectField fieldId="fuel-transaction-summary-year-select" labelText="Select Transaction Year" optionList={transactionYears} onChange={handleYearIdChange} value={selectedYear} optionTextAccessor="unique_year" optionIdAccessor="unique_year" defaultOptions={defaultYearOption} />
            <ul>
                <li>Gross Gas Expenditure: {preparedTransactionData.grossSpentOnGas}</li>
                <li>Fuel Points Redeemed: {preparedTransactionData.fuelPointsRedeemed}</li>
                <li>Amount Saved From Fuel Points: {preparedTransactionData.savedOnFuelPoints}</li>
                <li>Net Gas Expenditure: {preparedTransactionData.netSpentOnGas}</li>
            </ul>
        </>
    )
}

UserFuelTransactionSummary.propTypes = {
    transactionYears: PropTypes.arrayOf(PropTypes.string),
}

export default UserFuelTransactionSummary