import PropTypes from 'prop-types'
import { getReadableDate } from '../../utils/general/utils';
import DeleteListItemButton from '../general/buttons/DeleteListItemButton';

function CardOfferListItem({ data , deleteCoupon }) {
    let expirationDate = getReadableDate(data.expiration_date);
    return (
        <li>
            <p>{data.card_name} - {data.business_name} - {expirationDate}<DeleteListItemButton id={data.id} onClick={deleteCoupon} /></p>
        </li>
    )
}

CardOfferListItem.propTypes = {
    data: PropTypes.object,
    deleteCoupon: PropTypes.func,

}

export default CardOfferListItem