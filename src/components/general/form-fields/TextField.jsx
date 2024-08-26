import PropTypes from 'prop-types';

function TextField({ fieldName , fieldClass , placeHolder , inputClass , labelClass , onChange , value}) {
    let forVal = fieldName.split(' ').join('');
    
    return (
        <div className={fieldClass}>
            <label htmlFor={forVal} className={labelClass}>{fieldName}</label>
            <input 
                type="text"
                className={inputClass}
                id={forVal}
                name={forVal}
                placeholder={placeHolder}
                onChange={onChange}
                value={value}
                />
        </div>
    )   
}

TextField.propTypes = {
    fieldName: PropTypes.string,
    fieldClass: PropTypes.string,
    placeHolder: PropTypes.string,
    inputClass: PropTypes.string,
    labelClass: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
}

export default TextField;