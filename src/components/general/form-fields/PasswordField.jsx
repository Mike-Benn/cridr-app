import PropTypes from 'prop-types'

function PasswordField({ fieldClass , fieldId , labelText , onChange , value }) {

    return (
        <div className={fieldClass}>
            <label htmlFor={fieldId}>{labelText}</label>
            <input type="password" id={fieldId} value={value} onChange={onChange}></input>
        </div>
    )       
}

PasswordField.propTypes = {
   fieldClass: PropTypes.string,
   fieldId: PropTypes.string,
   labelText: PropTypes.string,
   onChange: PropTypes.func,
   value: PropTypes.string,
}


export default PasswordField;