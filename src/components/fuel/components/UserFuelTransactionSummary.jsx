import PropTypes from "prop-types"

function UserFuelTransactionSummary({ preparedTransactionData }) {

    return (
        <>
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
    preparedTransactionData: PropTypes.object,
}

export default UserFuelTransactionSummary