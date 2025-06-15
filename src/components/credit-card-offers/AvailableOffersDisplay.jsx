import apiClient from "../../api/apiClient"
import OfferListItem from "./OfferListItem";
import { filterOutAndReturnById } from "../../utils/general/utils";
import PropTypes from "prop-types";


function AvailableOffersDisplay({ offersList, handlers }) {
    
    const handleDeleteOffer = async (offerId) => {
        const offerAndUpdatedList = filterOutAndReturnById(offerId, offersList, "offers_id"); // newArray, filteredItem
        const previousOffers = [...offersList];
        handlers.setUiState((prev) => ({ ...prev, offersList: offerAndUpdatedList.newArray }));
        try {
            const params = new URLSearchParams();
            params.append("offerId", offerAndUpdatedList.filteredItem.offers_id)
            await apiClient.delete("/offers", { params })
        } catch (error) {
            handlers.setUiState((prev) => ({ ...prev, offersList: previousOffers }));
            alert("There was an error deleting offer, please try again.")
            console.error("Unable to delete offer.", error);
        }
    }

    const handleRedeemOffer = async (offer) => {
        const redeemedOffer = {
            offers_id: offer.offers_id,
            amount_saved: offer.amount_saved,
            redeemed_date: new Date(),
        }
        const offerAndUpdatedList = filterOutAndReturnById(offer.offers_id, offersList, "offers_id");
        const previousOffers = [...offersList];
        handlers.setUiState((prev) => ({ ...prev, offersList: offerAndUpdatedList.newArray }))
        try {
            const response = await apiClient.post("/offers/redeemed", redeemedOffer);
            console.log(response.data.message);
        } catch (error) {
            handlers.setUiState((prev) => ({ ...prev, offersList: previousOffers }));
            alert("There was an error completing your offer, please try again.");
            console.log(error.response.data.message);

        }
    }

    const offerActionsHandlers = {
        handleRedeemOffer,
        handleDeleteOffer,
    }

    const offerListItems = offersList.map(offer => 
        <OfferListItem key={offer.offers_id} offer={offer} handlers={offerActionsHandlers}/>
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