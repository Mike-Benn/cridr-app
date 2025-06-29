import BottomNavigation from "@mui/material/BottomNavigation"
import BottomNavigationAction  from "@mui/material/BottomNavigationAction"
import { useState } from "react";
import OffersIcon from "@mui/icons-material/LocalOffer";
import IncentivesIcon from "@mui/icons-material/AttachMoney";
import ExpensesIcon from "@mui/icons-material/Payment";
import HomeIcon from "@mui/icons-material/HomeFilled";
import SummaryIcon from "@mui/icons-material/BarChart"
import { Link, useLocation } from "react-router-dom";

function BottomNav() {
    // coupons , incentives , expenses , summary , profile
    const [tabIndex, setTabIndex] = useState(0);

    const getCurrPath = (str) => {
        if (str === "/") return "/";
        return "/" + str.split("/")[1]
    }
    const { pathname } = useLocation();
    const currPath = getCurrPath(pathname);



    return (
        <>
            <BottomNavigation
                showLabels
                value={currPath}
                onChange={(event, newTabIndex) => {
                    setTabIndex(newTabIndex);
                }}
                sx={{
                    position: "fixed",
                    left: 0,
                    right: 0,
                    bottom: 0,
                }}
            >
                <BottomNavigationAction label="Home" icon={<HomeIcon />} component={Link} to="/" value="/" />
                <BottomNavigationAction label="Offers" icon={<OffersIcon />} component={Link} to="/offers" value="/offers" />
                <BottomNavigationAction label="Incentives" icon={<IncentivesIcon />} component={Link} to="/incentives" value="/incentives" />
                <BottomNavigationAction label="Expenses" icon={<ExpensesIcon />} component={Link} to="/expenses" value="/expenses" />
                <BottomNavigationAction label="Summary" icon={<SummaryIcon />} component={Link} to="/summary" value="/summary" />
            </BottomNavigation>
            <BottomNavigation />
        </>
    )
}

export default BottomNav