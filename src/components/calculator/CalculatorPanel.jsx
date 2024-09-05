import { useEffect, useState } from "react";
import { payRates } from "../../utils/calculator/rates";
import NumberField from "../general/form-fields/NumberField";
import BonusListField from "./BonusListField";
import { v4 as uuidv4 } from "../../../node_modules/uuid"
import { calculatePaycheck, getItemWithId } from "../../utils/calculator/utils";




function CalculatorPanel() {

    const [regular , setRegular] = useState("");
    const [overtime , setOvertime] = useState("");
    const [nightShift , setNightShift] = useState("");
    const [weekend , setWeekend] = useState("");
    const [holiday , setHoliday] = useState("");
    const [bonus , setBonus] = useState("");
    const [timesEarned, setTimesEarned] = useState("");
    const [bonusList , setBonusList] = useState([]);
    const paycheckValues = {
        regularHours: regular,
        overtimeHours: overtime,
        nightShiftHours: nightShift,
        holidayHours: holiday,
        weekendHours: weekend,
        bonusList: bonusList,
    }
    const selectedId = "kermit";
    const calculatedPay = calculatePaycheck(selectedId , paycheckValues , payRates);
    
    useEffect(() => {
        document.title = "Calculator | Cridr"
    } , []);

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

    //   Holiday Hours   //

    const handleHolidayHoursChange = (e) => {
        setHoliday(e.target.value);
    }

    const handleBonusSubmit = (e) => {
        e.preventDefault();
        if (bonus && timesEarned) {
            let newBonus = {
                id: uuidv4(),
                amount: bonus,
                quantity: timesEarned,
            }
            let updatedBonusList = bonusList.concat([newBonus]);
            setBonusList(updatedBonusList);
            resetBonusForm();
        } else {
            alert("Missing information");
        }
        
    }

    const handleBonusEdit = (id) => {
        let bonusObject = getItemWithId(id , bonusList);
        let bonus = bonusObject.item;
        let updatedBonusList = bonusObject.arr;
        setBonus(bonus.amount);
        setTimesEarned(bonus.quantity);
        setBonusList(updatedBonusList);
    }

    const handleBonusDelete = (id) => {
        let updatedBonusList = bonusList.filter(bonus => 
            id !== bonus.id
        );
        setBonusList(updatedBonusList)
    }

    const resetBonusForm = () => {
        setBonus("");
        setTimesEarned("");
    }


    //   Times earned   //

    const handleTimesEarnedChange = (e) => {
        setTimesEarned(e.target.value);
    }

    //   Data to be passed as props   //

    const bonusListeners = {
        handleBonusHoursChange,
        handleTimesEarnedChange,
        handleBonusSubmit,
        handleBonusDelete,
        handleBonusEdit,
    }

    const currValues = {
        bonus: bonus,
        quantity: timesEarned,

    }
    
    return (
        <form action="" className="calculator">
            <fieldset>
                <legend>Hourly Pay</legend>
                <NumberField fieldName="Regular Hours" value={regular} onChange={handleRegularChange}/>
                <NumberField fieldName="Overtime Hours" value={overtime} onChange={handleOvertimeChange}/>
                <NumberField fieldName="Night Shift Hours" value={nightShift} onChange={handleNightShiftChange}/>
                <NumberField fieldName="Weekend Hours" value={weekend} onChange={handleWeekendChange} />
                <NumberField fieldName="Holiday Hours" value={holiday} onChange={handleHolidayHoursChange} />
            </fieldset>
            <fieldset>
                <legend>Bonuses</legend>
                <BonusListField bonusList={bonusList} bonusListeners={bonusListeners} currValues={currValues}/>
            </fieldset>
            <fieldset>
                <legend>Gross and Net Pay</legend>
                <NumberField fieldName="Gross Pay" value={calculatedPay.currGrossPay} readOnly={true} />
                <NumberField fieldName="Net Pay" value={calculatedPay.currNetPay} readOnly={true} />
            </fieldset>
        </form>
    )
}
export default CalculatorPanel;