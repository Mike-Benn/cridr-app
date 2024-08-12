import PropTypes from 'prop-types'


function SelectField({ values }) {
    
    let options = values.map(option =>
        <option key={option.id} value={option.value}>{option.text}</option>
    )

    return (
        <select>{options}</select>
    )
}

SelectField.propTypes = {
    values: PropTypes.arrayOf(PropTypes.object),
}


export default SelectField;