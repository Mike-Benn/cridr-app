import { useEffect } from "react";
import { Link } from "react-router-dom";
import GeneralButton from "../general/buttons/GeneralButton"
import AvailableOffersDisplay from "./AvailableOffersDisplay";

function CreditCardOffersDashboard() {    
    useEffect(() => {
        document.title = "Coupons | Cridr";

    }, []);
    

    return (
    <section>
        <Link to="new"><GeneralButton buttonType="button" buttonText="Add New Offer" /></Link>
        <AvailableOffersDisplay />
    </section>
    )
}

export default CreditCardOffersDashboard