import { useEffect } from "react";
import GeneralButton from "../../general/buttons/GeneralButton"
import { Link } from "react-router-dom";
import UserFuelTransactionSummary from "./UserFuelTransactionSummary";



function FuelTransactionDashboard() {
    
    useEffect(() => {
        document.title = "Fuel Points | Cridr";
    }, []);


    
    
    return (
        <section>
            <Link to="new-vehicle"><GeneralButton buttonType="button" buttonText="Add Vehicle" /></Link>
            <Link to="new"><GeneralButton buttonType="button" buttonText="Add Fuel Transaction" /></Link>
            <div><UserFuelTransactionSummary /></div>
        </section>
    )


}

export default FuelTransactionDashboard