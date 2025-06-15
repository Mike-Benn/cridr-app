function RedeemedOfferListItem({ offer }) {
    return <li>${offer.amount_saved} | {offer.credit_card_name} | {offer.business_name} | {offer.offer_description} | Redemption Date: {new Date(offer.redeemed_date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</li>
}

export default RedeemedOfferListItem