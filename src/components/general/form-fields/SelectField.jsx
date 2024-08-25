import PropTypes from 'prop-types'


function SelectField({ options , initValue }) {
    
    let optionList = options.map(option =>
        <option key={option.id} value={option.value}>{option.text}</option>
    )

    return (
        <select value={initValue}>{optionList}</select>
    )
}

SelectField.propTypes = {
    options: PropTypes.arrayOf(PropTypes.object),
    initValue: PropTypes.string,
}


export default SelectField;