import { useEffect } from "react";
import { Link } from "react-router-dom";
import GeneralButton from "../general/buttons/GeneralButton"
import UserCardPointTransactionSummary from "./UserCardPointTransactionSummary";



function CardPointsPanel() {

    useEffect(() => {
        document.title = "Credit Card Points | Cridr";
        
    }, []);

    return (
        <section>
            <Link to="new"><GeneralButton buttonType="button" buttonText="Add Card Points" /></Link>
            <UserCardPointTransactionSummary />
        </section>
    )
}

export default CardPointsPanel