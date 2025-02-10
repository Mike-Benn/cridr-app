import { useEffect } from "react"
import { Link } from "react-router-dom"
import GeneralButton from "../general/buttons/GeneralButton"



function RootPanel() {
    useEffect(() => {
      document.title = "Home | Cridr";
    }, []);

    return (
      <>
        <ul>
            <li><Link to='/credit-card-offers'><GeneralButton buttonType="button" buttonText="Offers" /></Link></li>
            <li><Link to='/fuel-transaction'><GeneralButton buttonType="button" buttonText="Fuel Transaction" /></Link></li>
            <li><Link to='/card-points'><GeneralButton buttonType="button" buttonText="Card Points" /></Link></li>
            <li><Link to='/retailer-savings'><GeneralButton buttonType="button" buttonText="Retail Savings" /></Link></li>
            <li><Link to='/incentives'><GeneralButton buttonType="button" buttonText="Incentives" /></Link></li>
        </ul>
      </>
    )
}

export default RootPanel
