import PropTypes from 'prop-types'
import CouponListItem from "./CouponListItem"

function CouponList({ couponList }) {

    if (couponList.length) {
        const coupons = couponList.map(coupon =>
            <CouponListItem key={coupon.id} data={coupon}/>
        );
        
        return (
            <ul>{coupons}</ul>
        )
    } else {
        return null;
    }

}

CouponList.propTypes = {
    couponList: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.arrayOf(PropTypes.object)
    ]),

}



export default CouponList