
function prepareFuelTransactionData (transactionList) {
    let spentOnGas = 0;
    let savedOnFuelPoints = 0;
    let fuelPointsRedeemed = 0;

    for (let i = 0; i < transactionList.length; i++) {
        const transaction = transactionList[i];
        spentOnGas += transaction.price_per_gallon * transaction.gallons_filled;
        fuelPointsRedeemed += transaction.fuel_points_redeemed;
        savedOnFuelPoints += transaction.gallons_filled * (transaction.fuel_points_redeemed / 1000);
    }

    return {
        spentOnGas: spentOnGas.toFixed(2),
        fuelPointsRedeemed,
        savedOnFuelPoints: savedOnFuelPoints.toFixed(2),
    }
    
}

export { prepareFuelTransactionData };