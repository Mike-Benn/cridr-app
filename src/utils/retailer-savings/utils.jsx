function processRetailerSavingsData(transactionList) {
    let processedData = {};
    let totalRetailSavings = 0;
    for (let i = 0; i < transactionList.length; i++) {
        let businessName = transactionList[i].business_name;
        if (processedData[businessName]) {
            processedData[businessName].retailer_savings_amount += transactionList[i].retailer_savings_amount;
            totalRetailSavings += transactionList[i].retailer_savings_amount;
        } else {
            processedData[businessName] = {
                businessId: transactionList[i].business_id,
                retailerSavingsAmount: transactionList[i].retailer_savings_amount,
            }
            totalRetailSavings += transactionList[i].retailer_savings_amount;
        }
    }
    return { processedData, totalRetailSavings };
}

function createRetailerSavingsListItems(preparedData) {
    if (preparedData) {
        const listItems = Object.entries(preparedData).map(([businessName, transactionData]) => 
            <li key={transactionData.businessId}>{businessName}: {transactionData.retailerSavingsAmount}</li>
        )
        return listItems
    }
    return;
}

export {
    processRetailerSavingsData,
    createRetailerSavingsListItems,
}