import PropTypes from 'prop-types'

function CouponListItem({ data }) {
    return (
        <li>
            <p>{data.card_name} x {data.business_name}</p>
        </li>
    )
}

CouponListItem.propTypes = {
    data: PropTypes.object,

}

export default CouponListItem