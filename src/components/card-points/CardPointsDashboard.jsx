import { useEffect } from "react";
import { Link } from "react-router-dom";
import GeneralButton from "../general/buttons/GeneralButton"
import UserCardPointsTransactionSummary from "./UserCardPointsTransactionSummary";



function CardPointsDashboard() {

    useEffect(() => {
        document.title = "Credit Card Points | Cridr";
        
    }, []);

    return (
        <section>
            <Link to="new"><GeneralButton buttonType="button" buttonText="Add Card Points" /></Link>
            <UserCardPointsTransactionSummary />
        </section>
    )
}

export default CardPointsDashboard