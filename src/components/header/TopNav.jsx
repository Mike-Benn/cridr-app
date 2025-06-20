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
                <Link to="/offers"><li>Offers</li></Link>
                <Link to="/incentives"><li>Incentives</li></Link>
                <Link to="/expenses"><li>Expenses</li></Link>
                <Link to="/savings-summary"><li>Savings Summary</li></Link>
            </ul>
            <GeneralButton buttonType="button" buttonText="Log Out" onClick={handleUserLogOut} />
            <Link to="/profile"><GeneralButton buttonType="button" buttonText="Edit Profile" /></Link>
        </header>
    )
}

export default TopNav