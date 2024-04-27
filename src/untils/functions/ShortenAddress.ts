export const shortenAddress = (address: string) => { //This function is used to shorten the address (show only 6 first and 4 last characters)
    return address.slice(0, 6) + '...' + address.slice(-4);
}