export { getPathName , capitalizeFirstLetter , getReadableDate , calculateFuelPointSavings , calculateCardPoints};

function capitalizeFirstLetter(word) {
    const firstLetter = word.charAt(0).toUpperCase();
    return firstLetter.concat(word.slice(1));

}

function getPathName(pathName) {
    if (pathName === "/") {
        return "Home";
    } else {
        let path = pathName.split("/")[1];
        return capitalizeFirstLetter(path);
    }
    
}

function getReadableDate(date) {
    date = new Date(date);
    let currentDate = new Date();
    let timeLeft = ((date - currentDate) / (1000 * 60 * 60 * 24));

    if (timeLeft > 1) {
        return `${Math.ceil(timeLeft)}d left`;
    } else {
        return `${(timeLeft / 1) * 24}d left`;

    }

}

function calculateFuelPointSavings(fuelPointsTransactions) {
    if (fuelPointsTransactions.length < 1) {
        return 0;
    } else {
        let total = 0;
        let gallons = 0
        let pointsRedeemed = 0;
        for (let i = 0; i < fuelPointsTransactions.length; i++) {
            gallons = fuelPointsTransactions[i].gallons;
            pointsRedeemed = Number((fuelPointsTransactions[i].points_redeemed / 1000).toFixed(2));
            total += gallons * pointsRedeemed;
        }
        return total;
    }
}

function calculateCardPoints(cardPointsTransactions) {
    if (cardPointsTransactions.length < 1) {
        return 0;
    } else {
        let total = 0;
        for (let i = 0; i < cardPointsTransactions.length; i++) {
            total += cardPointsTransactions[i].amount;
        }
        return total;
    }
}

