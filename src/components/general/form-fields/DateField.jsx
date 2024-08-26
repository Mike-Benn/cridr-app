import PropTypes from 'prop-types'

function DateField({ fieldName , onChange , value  }) {
    let forVal = fieldName.split(' ').join('');
    return (
        <div>
            <label htmlFor={forVal}>{fieldName}</label>
            <input type="date" 
                   name={forVal} 
                   id={forVal}
                   value={value}
                   onChange={onChange} />
        </div>
    )
}

DateField.propTypes = {
    fieldName: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
}

export default DateField