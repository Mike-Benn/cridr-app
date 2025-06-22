import { useEffect } from "react"
import  Button  from "@mui/material/Button";
import { Link } from "react-router-dom";


function OffersDashboard() {
    
    useEffect(() => {
        document.title = "Offers Dashboard | Cridr";
    }, []);

    
    return (
        <>
            <Button variant="outlined" component={Link} to="available">Available Offers</Button>
            <Button variant="outlined" component={Link} to="redeemed">Redeemed Offers</Button>
        </>

    )
}

export default OffersDashboard