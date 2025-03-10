import { useEffect, useState, useContext } from "react";
import GeneralButton from "../../general/buttons/GeneralButton"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import apiClient from "../../../api/apiClient";
import UserFuelTransactionSummary from "./UserFuelTransactionSummary";
import AuthContext from "../../../auth/AuthContext";


function FuelTransactionDashboard() {
    const { setIsAuthenticated } = useContext(AuthContext);
    const [transactionYears, setTransactionYears] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Fuel Points | Cridr";
        const getUniqueYearsByUserId = async () => {
            try {
                const response = await apiClient.get("/fuel-transaction/unique-years");
                if (response.status === 200 && Array.isArray(response.data.data)) {
                    setTransactionYears(response.data.data);
                    setIsLoading(false)
                }
            } catch (error) {
                if (error.response.status === 401) {
                    console.error("Unauthorized", error);
                    localStorage.removeItem("accessToken");
                    setIsAuthenticated(false);
                    navigate("/log-in")
                } else {
                    console.error("Unable to get user data.", error);
                    setIsLoading(false);
                }
            }
        }
        getUniqueYearsByUserId();
    }, [navigate, setIsAuthenticated]);

    if (isLoading) return <div>Loading...</div>;
    
    return (
        <section>
            <Link to="new-vehicle"><GeneralButton buttonType="button" buttonText="Add Vehicle" /></Link>
            <Link to="new"><GeneralButton buttonType="button" buttonText="Add Fuel Transaction" /></Link>
            <UserFuelTransactionSummary transactionYears={transactionYears} />
        </section>
    )


}

export default FuelTransactionDashboard