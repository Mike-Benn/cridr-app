import { useLocation } from "react-router-dom"
import { getPathName } from "../../utils/general/utils"
import GeneralButton from "../general/buttons/GeneralButton"
import { useContext } from "react";
import AuthContext from "../../auth/AuthContext";
import { Link } from "react-router-dom";


function TopNav() {
    const { logout } = useContext(AuthContext);
    let path = useLocation();
    path = getPathName(path.pathname);
    
    const handleUserLogOut = async () => {
        try {
            await logout();
        } catch (error) {
            console.error(error , "There was an issue communicating with the server.");
        }
    }
    // Home, prof picture
    return (
        <header>
            <h2>{path}</h2>
            <ul>
                <Link to="/"><li>Home</li></Link>
                <Link to="/credit-card-offers"><li>Offers</li></Link>
                <Link to="/fuel-transaction"><li>Fuel Transaction</li></Link>
                <Link to="/card-points"><li>Card Points</li></Link>
                <Link to="/incentives"><li>Incentives</li></Link>
                <Link to="/retailer-savings"><li>Retailer Savings</li></Link>
            </ul>
            <GeneralButton buttonType="button" buttonText="Log Out" onClick={handleUserLogOut} />
            <Link to="/profile"><GeneralButton buttonType="button" buttonText="Edit Profile" /></Link>
        </header>
    )
}

export default TopNav