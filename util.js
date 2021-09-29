import { BigNumber } from 'ethers'
import BN from "bignumber.js";

export function numberToDecimals(n, decimals) {
    return new BN(n).shiftedBy(1 * decimals).toFixed();
}

export function numberFromDecimals(n, decimals) {
    return BigNumber.from(n).div(BigNumber.from(10).pow(decimals)).toString();
}
