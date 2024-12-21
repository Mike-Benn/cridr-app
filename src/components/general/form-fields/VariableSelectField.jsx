import PropTypes from 'prop-types'
import { v4 as uuidv4 } from '../../../../node_modules/uuid'


function VariableSelectField({ fieldClass , fieldId , labelText , optionList , onChange , value , optionTextAccessor , optionIdAccessor }) {
    
    let options = optionList.map(option =>
        <option key={uuidv4()} value={option[optionIdAccessor]}>{option[optionTextAccessor]}</option>
    )

    return (
        <div className={fieldClass}>
            <label htmlFor={fieldId}>{labelText}</label>
            <select id={fieldId} value={value} onChange={onChange}>{options}</select>
        </div>
    )       
}

VariableSelectField.propTypes = {
    fieldClass: PropTypes.string,
    fieldId: PropTypes.string,
    labelText: PropTypes.string,
    optionList: PropTypes.arrayOf(PropTypes.object),
    onChange: PropTypes.func,
    value: PropTypes.string,
    optionTextAccessor: PropTypes.string,
    optionIdAccessor: PropTypes.string,
    
}


export default VariableSelectField;