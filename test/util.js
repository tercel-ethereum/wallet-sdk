import ethers from 'ethers'

function stringToHex(str) {
    return ethers.utils.hexlify(ethers.utils.toUtf8Bytes(str));
}

function hexToString(str) {
    return ethers.utils.toUtf8String(str);
}

let res;
res = stringToHex("Seaport");
console.log(res);

res = Number("Seaport".length).toString(16);
console.log(res);

res = hexToString("0x536561706f7274");
console.log(res);