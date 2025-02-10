import { useEffect } from "react"
import { Link } from "react-router-dom"
import GeneralButton from "../general/buttons/GeneralButton"
import UserIncentiveTransactionSummary from "./UserIncentiveTransactionSummary";

function IncentivesDashboard() {

    useEffect(() => {
        document.title = "Incentives | Cridr";
    }, []);
    return (
        <>
            <Link to="new"><GeneralButton buttonType="button" buttonText="Add New Incentive!" /></Link>
            <UserIncentiveTransactionSummary />
        </>
    )
}

export default IncentivesDashboard