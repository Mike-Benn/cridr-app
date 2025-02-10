import { useEffect } from "react"
import { Link } from "react-router-dom"



function RootPanel() {
    useEffect(() => {
      document.title = "Home | Cridr";
    }, []);

    return (
      <>
        <ul>
            <li><Link to='/credit-card-offers'><button type='button'>Offers</button></Link></li>
            <li><Link to='/fuel-transaction'><button type='button'>Fuel Transaction</button></Link></li>
            <li><Link to='/card-points'><button type='button'>Card Points</button></Link></li>
            <li><Link to='/retailer-savings'><button type='button'>Retail Savings</button></Link></li>
            <li><Link to='/incentives'><button type='button'>Incentives</button></Link></li>
        </ul>
      </>
    )
}

export default RootPanel
