import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GeneralButton from "../general/buttons/GeneralButton"
import AvailableOffersDisplay from "./AvailableOffersDisplay";
import apiClient from "../../api/apiClient";

function AvailableOffersDashboard() {  
    const [isLoading, setIsLoading] = useState(true);  
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        document.title = "Coupons | Cridr";
        const getOffersByUserId = async () => {
            try {
                const response = await apiClient.get("/credit-card-offers/available");
                if (response.status === 200 && Array.isArray(response.data.data)) {
                    setOffers([...response.data.data]);
                    setIsLoading(false);
                }
            } catch (error) {
                console.log(error.response?.data?.message);
                setIsLoading(false);
                
            }
        }
        getOffersByUserId();
    }, []);
    
    if (isLoading) return <p>Loading...</p>

    return (
    <section>
        <Link to="new"><GeneralButton buttonType="button" buttonText="Add New Offer" /></Link>
        <AvailableOffersDisplay offers={offers} setOffers={setOffers} />
    </section>
    )
}

export default AvailableOffersDashboard