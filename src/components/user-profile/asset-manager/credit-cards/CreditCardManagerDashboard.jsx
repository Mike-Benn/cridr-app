import { useEffect } from "react";
import NewCreditCardForm from "./NewCreditCardForm";

function CreditCardManagerDashboard() {

    useEffect(() => {
        document.title = "My credit cards | Cridr";
    })

    return (
        <NewCreditCardForm />
    )
}

export default CreditCardManagerDashboard