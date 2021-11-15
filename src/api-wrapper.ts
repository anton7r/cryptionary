const apiBaseUrl = "https://api.coingecko.com/api/v3";

const get = (path: string) => {
    return fetch(apiBaseUrl + path)    
}

export { get }