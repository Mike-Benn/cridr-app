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
    insertByDate,
}