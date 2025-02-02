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
                setProcessedData(processCardPointTransactions(response.data.data))
                console.log(response.data.data)
            } else {
                const response = await apiClient.get(`/card-points-transaction/?year=${yearSelected}`);
                setProcessedData(processCardPointTransactions(response.data.data))
                console.log(response.data.data)
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