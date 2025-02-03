
import { useEffect } from "react";
import { Link } from "react-router-dom";
import GeneralButton from "../general/buttons/GeneralButton";
import UserRetailerSavingsSummary from "./UserRetailerSavingsSummary";


function RetailerSavingsPanel() {

    useEffect(() => {
        document.title = "Retailer Savings | Cridr";
    }, []);

    

    return (
        <>
            <Link to="new"><GeneralButton buttonType="button" buttonText="Add Savings Transaction" /></Link>
            <UserRetailerSavingsSummary />
        </>
    )
}

export default RetailerSavingsPanel