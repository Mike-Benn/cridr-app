import PropTypes from "prop-types";
import apiClient from "../../api/apiClient";
import { useEffect, useState } from "react";
import { processCardPointTransactions, createCardPointListItems } from "../../utils/card-points/utils";

function AnnualCardPointsReport({ yearSelected }) {
    const [processedData, setProcessedData] = useState({});

    useEffect(() => {
        const getTransactionsByUserId = async () => {
            if (yearSelected === "all") {
                const response = await apiClient.get("/card-points-transaction");
                if (response.status === 200 && Array.isArray(response.data.data)) {
                    setProcessedData(processCardPointTransactions(response.data.data))
                }
            } else {
                const response = await apiClient.get(`/card-points-transaction/?year=${yearSelected}`);
                if (response.status === 200 && Array.isArray(response.data.data)) {
                    setProcessedData(processCardPointTransactions(response.data.data))
                }
            }
        }
        getTransactionsByUserId();
        
    }, [yearSelected])
    const cardPointListItems = createCardPointListItems(processedData.processedData);
    return (
        <>
            <h1>Total Card Points Earned: {processedData.totalCardPoints}</h1>
            <ul>
                {cardPointListItems}
            </ul>
        </>
    )
    
}

AnnualCardPointsReport.propTypes = {
    yearSelected: PropTypes.string,
}

export default AnnualCardPointsReport