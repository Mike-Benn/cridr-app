export { getItemWithId , calculatePaycheck }


function getItemWithId(id , arr) {
    let arrCopy = [...arr];
    for (let i = 0; i < arrCopy.length; i++) {
        if (arr[i].id === id) {
            let item = arr[i];
            arr.splice(i , 1);
            return {item , arr};
        }
    }
}

function calculateBonus(bonusList) {
    let sum = 0;
    bonusList.map(bonus => 
        sum += Number(bonus.amount) * Number(bonus.quantity)
    )
    return sum;
}

function calculatePaycheck(id , paycheckValues , rates) {
    let userRates = rates[id];
    let basePay = (paycheckValues.regularHours ? Number(paycheckValues.regularHours) * userRates.baseRate : 0);
    let overtimePay = (paycheckValues.overtimeHours ? Number(paycheckValues.overtimeHours) * userRates.overtimeRate : 0);
    let weekendPay = (paycheckValues.weekendHours ? Number(paycheckValues.weekendHours) * userRates.weekendDifferential : 0);
    let nightShiftPay = (paycheckValues.nightShiftHours ? Number(paycheckValues.nightShiftHours) * userRates.nightShiftDifferential : 0);
    let bonusTotal = (paycheckValues.bonusList.length > 0 ? calculateBonus(paycheckValues.bonusList) : 0);

    let currGrossPay = Math.round((basePay + overtimePay + weekendPay + nightShiftPay + bonusTotal) * 100 ) / 100;
    let currNetPay = Math.round((currGrossPay * userRates.taxRate) * 100) / 100;

    return {currGrossPay , currNetPay};
}