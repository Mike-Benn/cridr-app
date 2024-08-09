import PropTypes from 'prop-types';
import NumberField from './NumberField';




function BulletListField({ listeners , fieldClass ,  }) {

    const enterPressed = (e) => {
        if (e.key === 'Enter') {
            listeners.handleSubmitBonus();
        }
    }

    return (
        <div className={fieldClass}>
            <NumberField />
            <NumberField />
        </div>
    )
}