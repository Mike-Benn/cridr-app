import PropTypes from "prop-types";
import apiClient from "../../api/apiClient";
import { useEffect, useState } from "react";
import { processRetailerSavingsData, createRetailerSavingsListItems } from "../../utils/retailer-savings/utils";

function AnnualRetailerSavingsReport({ yearSelected }) {
    const [formattedData, setFormattedData] = useState({});

    useEffect(() => {
        const getTransactionsByUserId = async () => {
            if (yearSelected === "all") {
                const response = await apiClient.get("/retail-savings-transaction");
                if (response.status === 200 && Array.isArray(response.data.data)) {
                    setFormattedData(processRetailerSavingsData(response.data.data));
                }
            } else {
                const response = await apiClient.get(`/retail-savings-transaction/?year=${yearSelected}`);
                if (response.status === 200 && Array.isArray(response.data.data)) {
                    setFormattedData(processRetailerSavingsData(response.data.data));
                }
            }
        }
        getTransactionsByUserId();
        
    }, [yearSelected])
    const retaileSavingsListItems = createRetailerSavingsListItems(formattedData.processedData);

    return (
        <>
            <h1>Total Retail Savings Earned: {formattedData.totalRetailSavings}</h1>
            <ul>
                {retaileSavingsListItems}
            </ul>
        </>
    )
    
}

AnnualRetailerSavingsReport.propTypes = {
    yearSelected: PropTypes.string,
}

export default AnnualRetailerSavingsReport