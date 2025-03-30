function processRetailerSavingsData(transactionList) {
    let processedData = {};
    let totalRetailSavings = 0;
    for (let i = 0; i < transactionList.length; i++) {
        const transaction = transactionList[i];
        totalRetailSavings += transaction.retailer_savings_amount;
        let businessName = transactionList[i].business_name;
        processedData[businessName] = {
            businessId: transaction.business_id,
            retailerSavingsAmount: (processedData[businessName]?.retailerSavingsAmount ?? 0) + transaction.retailer_savings_amount,
        }
    }
    return { processedData, totalRetailSavings};
}

function createRetailerSavingsListItems(preparedData) {
    if (preparedData) {
        const listItems = Object.entries(preparedData).map(([businessName, transactionData]) =>
            <li key={transactionData.businessId}>{businessName}: {transactionData.retailerSavingsAmount}</li>
        )
        return listItems;
    }
    return;
}

export {
    processRetailerSavingsData,
    createRetailerSavingsListItems,
}