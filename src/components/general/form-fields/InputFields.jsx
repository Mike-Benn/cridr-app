import PropTypes from 'prop-types'
import { v4 as uuidv4 } from "../../../../node_modules/uuid"

function DateField({ fieldClass , fieldId , labelText , onChange , value , name}) {
    return (
        <div className={fieldClass}>
            <label htmlFor={fieldId}>{labelText}</label>
            <input type="date" id={fieldId} value={value} onChange={onChange} name={name}></input>
        </div>
    )
}

function NumberField({ fieldClass , fieldId , labelText , onChange , value , name }) {
    return (
        <div className={fieldClass}>
            <label htmlFor={fieldId}>{labelText}</label>
            <input type="number" id={fieldId} value={value} onChange={onChange} name={name} />
        </div>
    )
}

function SelectField({ fieldClass , fieldId , labelText , optionList , onChange , value , optionTextAccessor , optionIdAccessor , name }) {
    
    let options = optionList.map(option =>
        <option key={uuidv4()} value={option[optionIdAccessor]}>{option[optionTextAccessor]}</option>
    )

    return (
        <div className={fieldClass}>
            <label htmlFor={fieldId}>{labelText}</label>
            <select id={fieldId} value={value} onChange={onChange} name={name}>{options}</select>
        </div>
    )       
}

function TextField({ fieldClass , fieldId , labelText , onChange , value , name }) {

    return (
        <div className={fieldClass}>
            <label htmlFor={fieldId}>{labelText}</label>
            <input type="text" id={fieldId} value={value} onChange={onChange} name={name}></input>
        </div>
    )       
}

TextField.propTypes = {
   fieldClass: PropTypes.string,
   fieldId: PropTypes.string,
   labelText: PropTypes.string,
   onChange: PropTypes.func,
   value: PropTypes.string,
   name: PropTypes.string,
}
SelectField.propTypes = {
    fieldClass: PropTypes.string,
    fieldId: PropTypes.string,
    labelText: PropTypes.string,
    optionList: PropTypes.arrayOf(PropTypes.object),
    onChange: PropTypes.func,
    value: PropTypes.string,
    optionTextAccessor: PropTypes.string,
    optionIdAccessor: PropTypes.string,
    name: PropTypes.string,
    
}
DateField.propTypes = {
    fieldClass: PropTypes.string,
    fieldId: PropTypes.string,
    labelText: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    name: PropTypes.string,
}

NumberField.propTypes = {
    fieldClass: PropTypes.string,
    fieldId: PropTypes.string,
    labelText: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    name: PropTypes.string,
}

export { 
    TextField, 
    SelectField, 
    DateField, 
    NumberField,
}