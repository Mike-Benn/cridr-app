import OfferActions from "./OfferActions"

function OfferListItem({ offer, handlers }) {
    return <li>{offer.credit_card_name} | {offer.business_name} | {offer.offer_description} | Expires: {new Date(offer.expiration_date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} <OfferActions offer={offer} handlers={handlers} /> </li>
}

export default OfferListItem