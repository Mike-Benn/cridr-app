import { useState } from "react";
import { payRates } from "../../utils/calculator/rates";
import NumberField from "../general/form-fields/NumberField";
import TextField from "../general/form-fields/TextField";




function CalculatorPanel() {

    const [regular , setRegular] = useState("");
    const [overtime , setOvertime] = useState("");
    const [nightShift , setNightShift] = useState("");
    const [weekend , setWeekend] = useState("");
    const [bonus , setBonus] = useState("");
    const [timesEarned, setTimesEarned] = useState("");
    
    //   Regular Hours   //

    const handleRegularChange = (e) => {
        setRegular(e.target.value);
    }

    //   Overtime Hours   //

    const handleOvertimeChange = (e) => {
        setOvertime(e.target.value);
    }

    //   Nightshift Hours   //

    const handleNightShiftChange = (e) => {
        setNightShift(e.target.value);
    }

    //   Weekend Hours   //

    const handleWeekendChange = (e) => {
        setWeekend(e.target.value);
    }

    //   Bonus Hours   //

    const handleBonusHoursChange = (e) => {
        setBonus(e.target.value);
    }

    //   Times earned   //

    const handleTimesEarnedChange = (e) => {
        setTimesEarned(e.target.value);
    }


    return (
        <form action="" className="calculator">
            <fieldset>
                <legend>Hourly Pay</legend>
                <NumberField fieldName="Regular Hours" value={regular} onChange={handleRegularChange}/>
                <NumberField fieldName="Overtime Hours" value={overtime} onChange={handleOvertimeChange}/>
                <NumberField fieldName="Night Shift Hours" value={nightShift} onChange={handleNightShiftChange}/>
                <NumberField fieldName="Weekend Hours" value={weekend} onChange={handleWeekendChange} />
            </fieldset>
            <fieldset>
                <legend>Bonuses</legend>

            </fieldset>
            


        </form>
    )
}
export default CalculatorPanel;