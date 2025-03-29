import PropTypes from "prop-types"
import { createIncentiveListItems } from "../../utils/incentives/utils"

function UserIncentiveTransactionSummary({ preparedTransactionData }) {
    
    const incentiveListItems = createIncentiveListItems(preparedTransactionData);


    return (
        <>
            <ul>
                {incentiveListItems}
            </ul>
        </>
    )
}

UserIncentiveTransactionSummary.propTypes = {
    preparedTransactionData: PropTypes.object,
}

export default UserIncentiveTransactionSummary