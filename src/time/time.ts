//Time related utilities

const ms2Unix = (msTime: number): number => msTime / 1000;

const dateStamp = (n: number): string => (n < 10 ? "0" : "") + n;

const stringifyDate = (n: number) => {
    const date = new Date(n),
        day = dateStamp(date.getDate()), 
        year = date.getFullYear(),
        month = dateStamp(date.getMonth() + 1);

    return year + "-" + month + "-" + day;
}

export { ms2Unix, stringifyDate }