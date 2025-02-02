import PropTypes from "prop-types";
import apiClient from "../../api/apiClient";
import { useEffect, useState } from "react";
import { prepareIncentiveTransactionData, createIncentiveListItems } from "../../utils/incentives/utils";

function AnnualIncentiveReport({ yearSelected }) {
    const [formattedData, setFormattedData] = useState({});

    useEffect(() => {
        const getTransactionsByUserId = async () => {
            if (yearSelected === "all") {
                const response = await apiClient.get("/incentive-transaction");
                setFormattedData(prepareIncentiveTransactionData(response.data.data));
                console.log(response.data.data)
            } else {
                const response = await apiClient.get(`/incentive-transaction/?year=${yearSelected}`);
                setFormattedData(prepareIncentiveTransactionData(response.data.data));
                console.log(response.data.data)
            }
        }
        getTransactionsByUserId();
        
    }, [yearSelected])
    const incentiveListItems = createIncentiveListItems(formattedData);
    return (
        <ul>
            {incentiveListItems}
        </ul>
    )
    
}

AnnualIncentiveReport.propTypes = {
    yearSelected: PropTypes.string,
}

export default AnnualIncentiveReport