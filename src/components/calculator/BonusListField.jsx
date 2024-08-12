import PropTypes from 'prop-types';
import NumberField from '../general/form-fields/NumberField';
import SubmitFormButton from '../general/buttons/SubmitFormButton';
import EditableBonusList from './EditableBonusList';



function BonusListField({ bonusList , bonusListeners , currValues  }) {

    const enterPressed = (e) => {
        if (e.key === 'Enter') {
            bonusListeners.handleBonusSubmit();
        }
    }

    return (
        <div>
            <EditableBonusList bonusList={bonusList} bonusListeners={bonusListeners} />
            <NumberField fieldName="Bonus Amount" value={currValues.bonus} onChange={bonusListeners.handleBonusHoursChange}/>
            <NumberField fieldName="Times Earned" value={currValues.quantity} onChange={bonusListeners.handleTimesEarnedChange} onKeyDown={enterPressed} />
            <SubmitFormButton buttonText='Submit Bonus' onClick={bonusListeners.handleBonusSubmit}/>
        </div>
    )
}


BonusListField.propTypes = {
    bonusList: PropTypes.arrayOf(PropTypes.object),
    bonusListeners: PropTypes.object,
    currValues: PropTypes.object,
    

}

export default BonusListField;