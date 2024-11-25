export { getPathName , capitalizeFirstLetter , getReadableDate};

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


