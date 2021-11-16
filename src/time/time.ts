//Time related utilities

const ms2Unix = (msTime: number): number => msTime / 1000;

const unix2ms = (unix: number): number => unix * 1000;

//Print day and month number as ISO compliant
const dateStamp = (n: number): string => (n < 10 ? "0" : "") + n;

const stringifyDate = (n: number) => {
    const date = new Date(n),
        day = dateStamp(date.getDate()), 
        year = date.getFullYear(),
        month = dateStamp(date.getMonth() + 1);

    return year + "-" + month + "-" + day;
}

const hour = 60 * 60 * 1000;

const day = 24 * hour;

const week = 7 * day;

export { ms2Unix, unix2ms, stringifyDate, hour, day, week }