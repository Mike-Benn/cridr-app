function prepareIncentiveTransactionData(transactionList) {
    let preparedData = {};
    for (let i = 0; i < transactionList.length; i++) {
        let businessName = transactionList[i].business_name;
        if (preparedData[businessName]) {
            preparedData[businessName].incentiveAmount += transactionList[i].incentive_amount;
        } else {
            preparedData[businessName] = { 
                businessId: transactionList[i].business_id, 
                incentiveAmount: transactionList[i].incentive_amount
            };
        }
    }
    return preparedData;
}

function createIncentiveListItems(preparedData) {
    if (preparedData) {
        const listItems = Object.entries(preparedData).map(([businessName, transactionData]) => 
            <li key={transactionData.businessId}>{businessName}: {transactionData.incentiveAmount}</li>
        )
        return listItems;
    }
    return;
    
}

export {
    prepareIncentiveTransactionData,
    createIncentiveListItems,
}