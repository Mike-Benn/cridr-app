import PropTypes from 'prop-types'

function VariableTextField({ fieldClass , fieldId , labelText , onChange , value }) {

    return (
        <div className={fieldClass}>
            <label htmlFor={fieldId}>{labelText}</label>
            <input type="text" id={fieldId} value={value} onChange={onChange}></input>
        </div>
    )       
}

VariableTextField.propTypes = {
   fieldClass: PropTypes.string,
   fieldId: PropTypes.string,
   labelText: PropTypes.string,
   onChange: PropTypes.func,
   value: PropTypes.string,
}


export default VariableTextField;