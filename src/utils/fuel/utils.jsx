
function prepareFuelTransactionData (transactionList) {
    let grossSpentOnGas = 0;
    let savedOnFuelPoints = 0;
    let fuelPointsRedeemed = 0;
    let netSpentOnGas = 0;

    for (let i = 0; i < transactionList.length; i++) {
        const transaction = transactionList[i];
        grossSpentOnGas += transaction.price_per_gallon * transaction.gallons_filled;
        fuelPointsRedeemed += transaction.fuel_points_redeemed;
        savedOnFuelPoints += transaction.gallons_filled * (transaction.fuel_points_redeemed / 1000);
        netSpentOnGas = grossSpentOnGas - savedOnFuelPoints;
        
    }

    return {
        grossSpentOnGas: grossSpentOnGas.toFixed(2),
        fuelPointsRedeemed,
        savedOnFuelPoints: savedOnFuelPoints.toFixed(2),
        netSpentOnGas: netSpentOnGas.toFixed(2),
    }
    
}

export { prepareFuelTransactionData };