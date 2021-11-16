const apiBaseUrl = "https://api.coingecko.com/api/v3/";

const get = async (path: string) => 
    (await fetch(apiBaseUrl + path)).json()

export { get }