import PropTypes from 'prop-types'


function SelectField({ options , onChange , value}) {
    
    let optionList = options.map(option =>
        <option key={option.id} value={option.value}>{option.text}</option>
    )

    return (
        <select value={value} onChange={onChange}>{optionList}</select>
    )
}

SelectField.propTypes = {
    options: PropTypes.arrayOf(PropTypes.object),
    onChange: PropTypes.func,
    value: PropTypes.string,
}


export default SelectField;