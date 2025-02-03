function processCardPointTransactions(transactionList) {
    let processedData = {};
    let totalCardPoints = 0;
    for (let i = 0; i < transactionList.length; i++) {
        let cardName = transactionList[i].credit_card_name;
        if (processedData[cardName]) {
            processedData[cardName].cardPointsAmount += transactionList[i].card_points_amount;
            totalCardPoints += transactionList[i].card_points_amount;
        } else {
            processedData[cardName] = {
                cardId: transactionList[i].credit_card_id,
                cardPointsAmount: transactionList[i].card_points_amount,
            }
            totalCardPoints += transactionList[i].card_points_amount;
        }
    }
    
    return { processedData, totalCardPoints }
}

function createCardPointListItems(processedData) {
    if (processedData) {
        const listItems = Object.entries(processedData).map(([cardName, transactionData]) =>
            <li key={transactionData.cardId}>{cardName}: {transactionData.cardPointsAmount}</li>
        )
        return listItems;
    }
    return;
}

export {
    processCardPointTransactions,
    createCardPointListItems,
}