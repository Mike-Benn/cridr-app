import PropTypes from 'prop-types';

function NumberField({ fieldName , fieldClass , placeHolder , inputClass , labelClass , value , onChange , onKeyDown , readOnly , name }) {
    let forVal = fieldName.split(' ').join('');
    
    return (
        <div className={fieldClass}>
            <label htmlFor={forVal} className={labelClass}>{fieldName}</label>
            <input 
                type="number"
                className={inputClass}
                id={forVal}
                name={name}
                placeholder={placeHolder}
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
                readOnly={readOnly}
                />
        </div>
    )   
}

NumberField.propTypes = {
    fieldName: PropTypes.string,
    fieldClass: PropTypes.string,
    placeHolder: PropTypes.string,
    inputClass: PropTypes.string,
    labelClass: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    readOnly: PropTypes.bool,
    name: PropTypes.name,

}

export default NumberField;