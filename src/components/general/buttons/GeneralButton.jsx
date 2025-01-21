import PropTypes from "prop-types";

function GeneralButton ({  buttonType , buttonText , onClick }) {
    return (
        <button type={buttonType} onClick={onClick}>{buttonText}</button>
    )
}

GeneralButton.propTypes = {
    buttonType: PropTypes.string,
    buttonText: PropTypes.string,
    onClick: PropTypes.func,
}

export default GeneralButton