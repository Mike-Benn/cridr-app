import PropTypes from 'prop-types'
import { getReadableDate } from '../../utils/general/utils';

function CouponListItem({ data }) {
    let expirationDate = getReadableDate(data.expiration_date);

    return (
        <li>
            <p>{data.card_name} - {data.business_name} - {expirationDate}</p>
        </li>
    )
}

CouponListItem.propTypes = {
    data: PropTypes.object,

}

export default CouponListItem