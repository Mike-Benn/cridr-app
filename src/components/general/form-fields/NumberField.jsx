import PropTypes from 'PropTypes';

function NumberField({ fieldName , fieldClass , placeHolder , inputClass , labelClass , value , onChange , onKeyDown }) {
    let forVal = fieldName.split(' ').join('');
    
    return (
        <div className={fieldClass}>
            <label htmlFor={forVal} className={labelClass}>{fieldName}</label>
            <input 
                type="number"
                className={inputClass}
                id={forVal}
                name={forVal}
                placeholder={placeHolder}
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
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
    value: PropTypes.string,
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
}

export default NumberField;