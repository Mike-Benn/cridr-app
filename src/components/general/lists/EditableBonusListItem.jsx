import PropTypes from 'prop-types';
import EditListItemButton from '../buttons/EditListItemButton';
import DeleteListItemButton from '../buttons/DeleteListItemButton';

function EditableBonusListItem({ bonusData , onDelete , onEdit }) {
    return (
        <li>
            <p>{bonusData.amount} x {bonusData.quantity}</p>
            <div>
                <EditListItemButton onEdit={onEdit} />
                <DeleteListItemButton onDelete={onDelete} />
            </div>
        </li>
    )
}

EditableBonusListItem.propTypes = {
    bonusData: PropTypes.object,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,

}

export default EditableBonusListItem;