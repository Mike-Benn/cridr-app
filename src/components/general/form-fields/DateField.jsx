import PropTypes from 'prop-types'

function DateField({ fieldName , onChange , value , name }) {
    let forVal = fieldName.split(' ').join('');
    return (
        <div>
            <label htmlFor={forVal}>{fieldName}</label>
            <input type="date" 
                   name={name} 
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
    name: PropTypes.name,
}

export default DateField