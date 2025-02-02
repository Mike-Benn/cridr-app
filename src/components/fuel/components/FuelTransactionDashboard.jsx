import { useEffect , useState } from "react";
import apiClient from "../../../api/apiClient"
import GeneralButton from "../../general/buttons/GeneralButton"
import { Link } from "react-router-dom";
import UserFuelTransactionSummary from "./UserFuelTransactionSummary";



function FuelTransactionDashboard() {
    
    useEffect(() => {
        
        document.title = "Fuel Points | Cridr";
        /*
        const fetchFuelPoints = async () => {
            try {
                const response = await axios.get(`${apiUrl}/fuel-points/all`);
                if (response.status === 200 && response.data) {
                    setFuelPointTransactions(response.data.data);
                } 
            } catch (error) {
                console.error("Failed to get fuel points", error);
            }
        }
        */
        
    }, []);


    
    
    return (
        <section>
            <Link to="new-vehicle"><GeneralButton buttonType="button" buttonText="Add Vehicle" /></Link>
            <Link to="new"><GeneralButton buttonType="button" buttonText="Add Fuel Transaction" /></Link>
            <div><UserFuelTransactionSummary /></div>
        </section>
    )


}

export default FuelTransactionDashboard