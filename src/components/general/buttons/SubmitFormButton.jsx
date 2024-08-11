import PropTypes from 'prop-types'



function SubmitFormButton({ buttonText = "Submit" , onClick }) {
    return (
        <button type='Submit' onClick={onClick}>{buttonText}</button>
    )
}

SubmitFormButton.propTypes = {
    buttonText: PropTypes.string,
    onClick: PropTypes.func,
}

export default SubmitFormButton;