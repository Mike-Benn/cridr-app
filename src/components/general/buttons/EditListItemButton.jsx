import PropTypes from 'prop-types';
import edit from '../../../images/edit.png';

function EditListItemButton({ id , onEdit }) {
    const handleEdit = () => {
        onEdit(id);
    }

    return (
        <button type='button' onClick={handleEdit}><img src={edit} alt="Edit Item" /></button>
    )
}

EditListItemButton.propTypes = {
    id: PropTypes.string,
    onEdit: PropTypes.func,

}

export default EditListItemButton;