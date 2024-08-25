import PropTypes from 'prop-types'

function DateField({ fieldName  }) {
    let forVal = fieldName.split(' ').join('');
    return (
        <div>
            <label htmlFor={forVal}>{fieldName}</label>
            <input type="date" 
                   name={forVal} 
                   id={forVal} />
        </div>
    )
}

DateField.propTypes = {
    fieldName: PropTypes.string,
}

export default DateField