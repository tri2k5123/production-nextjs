export const sizes = ["S", "M", "L", "XL"]

export function divideIntoArray(items) {
    return items.split(',');
}
export function figureOutInitialPrice(price, percentPrice) {
    const basePercent = 100 - percentPrice
    const initialPrice = price * 100 / basePercent
    return initialPrice.toString();
}
export function addDotToPrice(price) {
    const stringPrice = price.toString();
    const arrPrice = stringPrice.split("");
    const reversePrice = arrPrice.reverse();
    for(let i = 3; i < reversePrice.length; i += 4) {
        reversePrice.splice(i, 0, ".");
    }
    return reversePrice.reverse().join('');
}
export function dbTimeForHuman(str) {

    return str.replace('T', ' ').substring(0, 16);
}