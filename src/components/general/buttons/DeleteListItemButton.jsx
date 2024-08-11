import PropTypes from 'prop-types';
import x from '../../../images/x.png';

function DeleteListItemButton({ id , onDelete }) {
    const handleClose = () => {
        onDelete(id);
    }

    return (
        <button type='button' onClick={handleClose}><img src={x} alt="Delete (X button)" /></button>
    )
}

DeleteListItemButton.propTypes = {
    id: PropTypes.string,
    onDelete: PropTypes.func,

}

export default DeleteListItemButton;