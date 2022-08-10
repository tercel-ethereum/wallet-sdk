import ethers, { BigNumber } from 'ethers';
import BN from "bignumber.js";

export function numberToDecimals(n, decimals) {
    return new BN(n).shiftedBy(1 * decimals).toFixed();
}

export function numberFromDecimals(n, decimals) {
    return BigNumber.from(n).div(BigNumber.from(10).pow(decimals)).toString();
}

export function stringToHex(str) {
    return ethers.utils.hexlify(ethers.utils.toUtf8Bytes(str));
}

export function hexToString(str) {
    return ethers.utils.toUtf8String(str);
}

// eventName, include "event"
export function parseEvent(logs, eventName) {
    let iface = new ethers.utils.Interface(eventName);
    // logs.forEach((log) => {
    //     console.log(iface.parseLog(log));
    // });
    return logs.map(log=>iface.parseLog(log));
}

// eventAbi exclude "event"
export function encodeEventTopics(eventAbi) {
    return ethers.utils.keccak256(stringToHex(eventAbi));
}
