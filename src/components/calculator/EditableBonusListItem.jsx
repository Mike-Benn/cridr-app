import PropTypes from 'prop-types';
import EditListItemButton from '../general/buttons/EditListItemButton';
import DeleteListItemButton from '../general/buttons/DeleteListItemButton';

function EditableBonusListItem({ bonusData , onDelete , onEdit }) {
    return (
        <li>
            <p>{bonusData.amount} x {bonusData.quantity}</p>
            <div>
                <EditListItemButton id={bonusData.id} onEdit={onEdit} />
                <DeleteListItemButton id={bonusData.id} onDelete={onDelete} />
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