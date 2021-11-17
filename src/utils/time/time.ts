//Time related utilities

const ms2Unix = (msTime: number): number => msTime / 1000;

const unix2ms = (unix: number): number => unix * 1000;

//Print day and month number as ISO compliant
const dateStamp = (n: number): string => (n < 10 ? "0" : "") + n;

const stringifyDate = (n: number) => {
    const date = new Date(n),
        day = dateStamp(date.getUTCDate()), 
        year = date.getUTCFullYear(),
        month = dateStamp(date.getUTCMonth() + 1);

    return year + "-" + month + "-" + day;
}

const stringifyDateTime = (n: number) => {
    const date = new Date(n),
        day = dateStamp(date.getUTCDate()), 
        year = date.getUTCFullYear(),
        month = dateStamp(date.getUTCMonth() + 1),
        hour = dateStamp(date.getUTCHours()),
        minute = dateStamp(date.getUTCMinutes());

    return year + "-" + month + "-" + day + " " + hour + ":" + minute;
}

//0 indexed
const ordinalMonth = (n: number): string => {
    switch (n) {
        case 0:
            return "January";
        case 1:
            return "February";
        case 2:
            return "March";
        case 3:
            return "April";
        case 4:
            return "May";
        case 5:
            return "June";
        case 6:
            return "July";
        case 7:
            return "August";
        case 8:
            return "September";
        case 9:
            return "October";
        case 10:
            return "November";
        case 11:
            return "December";
        default:
            return "Undefined month";
    }
}

const ordinalNumber = (n: number) => {
    if(n % 1 != 0) {
        return n;
    }

    let ending = "th";

    if(n < 4 || n > 20) {
        const rem = n % 10;
        if(rem == 1) {
            ending = "st";
        } else if (rem == 2) {
            ending = "nd";
        } else if (rem == 3) {
            ending = "rd";
        }
    }

    return n + ending;
} 

const hour = 60 * 60 * 1000;

const day = 24 * hour;

const week = 7 * day;

export { ms2Unix, unix2ms, stringifyDate, stringifyDateTime, ordinalMonth, ordinalNumber, hour, day, week }