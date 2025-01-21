import PropTypes from 'prop-types'
import CardOfferListItem from './cardOfferListItem';

function CardOfferList({ offerList }) {

    if (offerList.length) {
        const coupons = offerList.map(coupon =>
            <CardOfferListItem key={coupon.id} data={coupon}/>
        );
        
        return (
            <ul>{coupons}</ul>
        )
    } else {
        return null;
    }

}

CardOfferList.propTypes = {
    offerList: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.arrayOf(PropTypes.object)
    ]),

}



export default CardOfferList