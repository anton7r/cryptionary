const trillion = 1E12;
const billion = 1E9;
const million = 1E6;

const printLargeNumber = (n: number) => {
    if (n > trillion) {
        return (n / trillion).toFixed(2) + " trillion";
    } else if (n > billion) {
        return (n / billion).toFixed(2) + " billion";
    } else if(n > million) {
        return (n / million).toFixed(2) + " million";
    }
}

export { printLargeNumber }