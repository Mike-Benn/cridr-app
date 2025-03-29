import PropTypes from "prop-types";
import { createCardPointListItems } from "../../utils/card-points/utils";

function UserCardPointsTransactionSummary({ preparedTransactionData }) {
    
    const cardPointListItems = createCardPointListItems(preparedTransactionData.processedData);

    return (
        <>
            <h1>Total Card Points Earned: {preparedTransactionData.totalCardPoints}</h1>
            <ul>
                {cardPointListItems}
            </ul>
        </>
    )
}

UserCardPointsTransactionSummary.propTypes = {
    preparedTransactionData: PropTypes.object,
}

export default UserCardPointsTransactionSummary