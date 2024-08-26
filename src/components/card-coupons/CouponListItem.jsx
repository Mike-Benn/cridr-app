import PropTypes from 'prop-types'

function CouponListItem({ data }) {
    return (
        <li>
            <p>{data.card} x {data.businessName}</p>
        </li>
    )
}

CouponListItem.propTypes = {
    data: PropTypes.object,

}

export default CouponListItem