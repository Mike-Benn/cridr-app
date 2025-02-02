import { prepareFuelTransactionData } from "../../../../utils/fuel/utils"
import PropTypes from "prop-types";
import apiClient from "../../../../api/apiClient";
import { useEffect, useState } from "react";

function AnnualFuelReport({ yearSelected }) {
    const [preparedTransactionData, setPreparedTransactionData] = useState({});

    useEffect(() => {
        const getTransactionsByUserId = async () => {
            if (yearSelected === "all") {
                const response = await apiClient.get("/fuel-transaction");
                setPreparedTransactionData(prepareFuelTransactionData(response.data.data));
            } else {
                const response = await apiClient.get(`/fuel-transaction/?year=${yearSelected}`);
                setPreparedTransactionData(prepareFuelTransactionData(response.data.data));
            }
        }
        getTransactionsByUserId();
        
    }, [yearSelected])
    
    return (
        <ul>
            <li>Total Gas Expenditure: ${preparedTransactionData.spentOnGas}</li>
            <li>Fuel Points Redeemed: {preparedTransactionData.fuelPointsRedeemed}</li>
            <li>Amount Saved from Points: ${preparedTransactionData.savedOnFuelPoints}</li>
        </ul>
    )
    
}

AnnualFuelReport.propTypes = {
    yearSelected: PropTypes.string,
}

export default AnnualFuelReport