import { useLocation } from "react-router-dom"
import { getPathName } from "../../utils/general/utils"

function TopNav() {

    let path = useLocation();
    path = getPathName(path.pathname);
    
    
    // Home, prof picture
    return (
        <header>
            <h2>{path}</h2>
            <p>Top Navbar</p>
        </header>
    )
}

export default TopNav