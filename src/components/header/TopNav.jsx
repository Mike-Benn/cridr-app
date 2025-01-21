import { useLocation } from "react-router-dom"
import { getPathName } from "../../utils/general/utils"
import GeneralButton from "../general/buttons/GeneralButton"
import { useContext } from "react";
import AuthContext from "../../auth/AuthContext";


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
            <p>Top Navbar</p>
            <GeneralButton buttonType="button" buttonText="Log Out" onClick={handleUserLogOut} />
        </header>
    )
}

export default TopNav