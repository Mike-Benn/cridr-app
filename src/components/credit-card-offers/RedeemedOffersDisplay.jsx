import RedeemedOfferListItem from "./RedeemedOfferListItem"

function RedeemedOffersDisplay({ offersList }) {
    console.log(offersList)
    const redeemedOfferItems = offersList.map(offer => 
        <RedeemedOfferListItem key={offer.offers_id} offer={offer} />
    )
    return (
        <ul>
            {redeemedOfferItems}
        </ul>
    )
}

export default RedeemedOffersDisplay