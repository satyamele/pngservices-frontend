export const capitalize = name =>`
    ${[...name][0].toUpperCase()}${name.slice(1)}
`.trim();

export const formatMoney = num =>
    num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");

export const createErrorStack = errorObject => {
    let ErrorMessage = ``;
    Object.entries(errorObject).forEach((entry) => {
        ErrorMessage += `${entry[0]} - ${entry[1]} \n`
    });
    return ErrorMessage.trim();
}

export const calcPercentage = (value, base) =>
    (value/base) * 100;

export const formatDate = date => {
    const monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
};

export const compareMonth = date => {
    const inputMonth =  new Date(date).getMonth();
    const thisMonth = new Date().getMonth();
    return Boolean(inputMonth === thisMonth);
}