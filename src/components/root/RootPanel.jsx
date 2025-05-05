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
            <li><Link to='/incentives'><GeneralButton buttonType="button" buttonText="Incentives" /></Link></li>
            <li><Link to='/retailer-savings'><GeneralButton buttonType="button" buttonText="Retail Savings" /></Link></li>
            <li><Link to="/expenses"><GeneralButton buttonType="button" buttonText="Expenses" /></Link></li>
            <li><Link to="/savings-summary"><GeneralButton buttonType="button" buttonText="Savings Summary" /></Link></li>
        </ul>
      </>
    )
}

export default RootPanel
