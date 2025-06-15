import { useEffect } from "react"

import GeneralButton from "../general/buttons/GeneralButton"
import { Link } from "react-router-dom";


function OffersDashboard() {
    
    useEffect(() => {
        document.title = "Offers Dashboard | Cridr";
    }, []);

    
    return (
        <>
            <Link to="available"><GeneralButton buttonType="button" buttonText="Available Offers" /></Link>
            <Link to="redeemed"><GeneralButton buttonType="button" buttonText="Redeemed Offers" /></Link>
        </>

    )
}

export default OffersDashboard