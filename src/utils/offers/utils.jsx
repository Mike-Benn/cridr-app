import DeleteListItemButton from "../../components/general/buttons/DeleteListItemButton";
import PropTypes from "prop-types";


function OfferListItem({ offer, onDelete }) {
    return <li>{offer.credit_card_name} - {offer.available_offer_participating_business} - {offer.cashback_rate}% - Expires: {new Date(offer.available_offer_expiration_date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} <DeleteListItemButton id={offer.offers_id} onClick={onDelete} /> </li>

}

OfferListItem.propTypes = {
    offer: PropTypes.object,
    onDelete: PropTypes.func,
}
export {
    OfferListItem,
}