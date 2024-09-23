import PropTypes from 'prop-types'

function AddItemButton({ buttonText = "Add" , onClick }) {
    return (
        <button type='button' onClick={onClick}>{buttonText}</button>
    )
}

AddItemButton.propTypes = {
    buttonText: PropTypes.string,
    onClick: PropTypes.func,

}

export default AddItemButton