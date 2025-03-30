import PropTypes from "prop-types";
import { createRetailerSavingsListItems } from "../../utils/retailer-savings/utils";

function UserRetailerSavingsSummary({ preparedTransactionData }) {
    const retaileSavingsListItems = createRetailerSavingsListItems(preparedTransactionData.processedData);
    return (
        <>
            <h1>Total Retail Savings Earned: {preparedTransactionData.totalRetailSavings}</h1>
            <ul>
                {retaileSavingsListItems}
            </ul>
        </>
    )
}

UserRetailerSavingsSummary.propTypes = {
    preparedTransactionData: PropTypes.object,
}

export default UserRetailerSavingsSummary