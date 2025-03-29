import apiClient from "../../api/apiClient"
import { OfferListItem } from "../../utils/offers/utils";
import { filterOutAndReturnById } from "../../utils/general/utils";
import PropTypes from "prop-types";


function AvailableOffersDisplay({ offers, setOffers }) {
    
    const handleDeleteOffer = async (offerId) => {
        const offerAndUpdatedList = filterOutAndReturnById(offerId, offers, "available_offer_id");
        const previousOffers = [...offers];
        setOffers(offerAndUpdatedList.newArray);
        try {
            await apiClient.delete(`/credit-card-offers/available?available_offer_id=${offerAndUpdatedList.filteredItem.available_offer_id}`)
        } catch (error) {
            setOffers(previousOffers);
            alert("There was an error deleting offer, please try again.")
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

AvailableOffersDisplay.propTypes = {
    offers: PropTypes.array,
    setOffers: PropTypes.func,
}

export default AvailableOffersDisplay