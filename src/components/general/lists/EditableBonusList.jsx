import PropTypes from 'prop-types';
import EditableBonusListItem from './EditableBonusListItem';


function EditableBonusList({ bonusList , bonusListeners }) {
    if (bonusList.length) {
        const bonusListItems = bonusList.map(item =>
            <EditableBonusListItem key={item.id} bonusData={item} onDelete={bonusListeners.handleBonusDelete} onEdit={bonusListeners.handleBonusEdit} />
        );

        return (
            <ul>{bonusListItems}</ul>
        )
    } else {
        return null;
    }

}

EditableBonusList.propTypes = {
    bonusList: PropTypes.arrayOf(PropTypes.object),
    bonusListeners: PropTypes.object,
}

export default EditableBonusList;