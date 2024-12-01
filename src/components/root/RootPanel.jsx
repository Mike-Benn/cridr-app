import { useEffect } from "react"
import { Link } from "react-router-dom"
function RootPanel() {
  
  useEffect(() => {
    document.title = "Home | Cridr";
  }, []);

  return (
    <ul>
        <li><Link to='/coupon'><button type='button'>Coupons</button></Link></li>
        <li><Link to='/calculator'><button type='button'>Calculator</button></Link></li>
        <li><Link to='/fuel-points'><button type='button'>Fuel Points</button></Link></li>
    </ul>
  )
}

export default RootPanel
