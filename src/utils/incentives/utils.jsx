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

function insertByDate(arr, incentive) {
    const newArray = [];
    let index = 0;
    let inserted = false;
    while (newArray.length < 5 && arr[index]) {
        const currIncentive = arr[index];
        if (!inserted && incentive.transaction_date >= currIncentive.transaction_date) {
            newArray.push(incentive);
            inserted = true;
            if (newArray.length < 5) {
                newArray.push(currIncentive);
            } else {
                break;
            }
        } else {
            newArray.push(currIncentive);
        }
        index++;
    }
    if (newArray.length < 5 && !inserted) {
        newArray.push(incentive)
    }

    return { newArray, inserted }
}


export {
    prepareIncentiveTransactionData,
    createIncentiveListItems,
    insertByDate,
}