function readableDate(timezoneDate) {
    const date = new Date(timezoneDate);
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    })
}

export {
    readableDate,
}