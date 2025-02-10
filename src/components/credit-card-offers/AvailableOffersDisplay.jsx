import { useEffect, useState } from "react"
import apiClient from "../../api/apiClient"
import { OfferListItem } from "../../utils/offers/utils";
import { filterOutAndReturnById } from "../../utils/general/utils";


function AvailableOffersDisplay() {
    
    const [offers, setOffers] = useState([])

    useEffect(() => {
        const getOffersByUserId = async () => {
            try {
                const response = await apiClient.get("/credit-card-offers/available");
                if (response.status === 200 && Array.isArray(response.data.data)) {
                    setOffers([...response.data.data])
                }
            } catch (error) {
                console.error("Unable to retrieve credit card offers.", error)
            }
        }
        getOffersByUserId();
    }, []);

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

    const offerListItems = offers.map(offer => 
        <OfferListItem key={offer.available_offer_id} offer={offer} onDelete={handleDeleteOffer} />
    );
    return (
        <>
            <h1>Available Offers</h1>
            <ul>
                {offerListItems}
            </ul>
        </>

    )
}

export default AvailableOffersDisplay