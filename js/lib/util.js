let ethers = require('./lib/ethers.min.js');
let BN = require("./bignumber.min.js");

export function numberToDecimals(n, decimals) {
    return new BN(n).shiftedBy(1 * decimals).toFixed();
}

export function numberFromDecimals(n, decimals) {
    return ethers.BigNumber.from(n).div(ethers.BigNumber.from(10).pow(decimals)).toString();
}
