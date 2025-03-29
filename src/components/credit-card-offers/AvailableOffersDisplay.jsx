import { useContext, useEffect, useState } from "react"
import apiClient from "../../api/apiClient"
import { OfferListItem } from "../../utils/offers/utils";
import { filterOutAndReturnById } from "../../utils/general/utils";
import AuthContext from "../../auth/AuthContext";
import { Link } from "react-router-dom";
import GeneralButton from "../general/buttons/GeneralButton";


function AvailableOffersDisplay() {
    const { setIsAuthenticated } = useContext(AuthContext);
    const [offers, setOffers] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
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
    }, [setIsAuthenticated]);

    const handleDeleteOffer = async (offerId) => {
        const offerAndUpdatedList = filterOutAndReturnById(offerId, offers, "available_offer_id");
        const previousOffers = [...offers];
        setOffers(offerAndUpdatedList.newArray);
        try {
            await apiClient.delete(`/credit-card-offers/available?available_offer_id=${offerAndUpdatedList.filteredItem.available_offer_id}`)
        } catch (error) {
            setOffers(previousOffers);
            console.error("Unable to delete offer.", error);
        }

    }

    if (isLoading) return <p>Loading...</p>

    const offerListItems = offers.map(offer => 
        <OfferListItem key={offer.available_offer_id} offer={offer} onDelete={handleDeleteOffer} />
    );
    return (
        <>
            <Link to="new"><GeneralButton buttonType="button" buttonText="New Offer" /></Link>
            <h1>Available Offers</h1>
            <ul>
                {offerListItems}
            </ul>
        </>

    )
}

export default AvailableOffersDisplay