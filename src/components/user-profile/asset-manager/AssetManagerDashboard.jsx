import GeneralButton from "../../general/buttons/GeneralButton";
import { Link } from "react-router-dom";

function AssetManagerDashboard() {
    return (
        <>
            <Link to="credit-cards"><GeneralButton buttonType="button" buttonText="Manage Credit Cards" /></Link>
            <Link to="businesses"><GeneralButton buttonType="button" buttonText="Manage Businesses" /></Link>
            <Link to="vehicles"><GeneralButton buttonType="button" buttonText="Manage Vehicles" /></Link>
        </>
    )
}

export default AssetManagerDashboard