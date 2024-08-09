import PropTypes from 'PropTypes';

function TextField({ fieldName , fieldClass , placeHolder , inputClass , labelClass }) {
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
}

export default TextField;