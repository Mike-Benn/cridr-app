import PropTypes from "prop-types";

function DeleteListItemButton({ id , onClick }) {

    const handleDelete = () => {
        onClick(id);
    }

    return (
        <>
            <button key={id} type="button" onClick={handleDelete}>Delete</button>
        </>
    )
}

DeleteListItemButton.propTypes = {
    id: PropTypes.string,
    onClick: PropTypes.func,

}


export default DeleteListItemButton