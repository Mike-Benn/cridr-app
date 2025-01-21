import PropTypes from 'prop-types';
import edit from '../../../images/edit.png';

function EditListItemButton({ id , onClick }) {
    const handleEdit = () => {
        onClick(id);
    }

    return (
        <button type='button' onClick={handleEdit}><img src={edit} alt="Edit Item" /></button>
    )
}

EditListItemButton.propTypes = {
    id: PropTypes.string,
    onClick: PropTypes.func,

}

export default EditListItemButton;