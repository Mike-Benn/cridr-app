export { getPathName , capitalizeFirstLetter };

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



