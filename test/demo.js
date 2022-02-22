import walletManage from '../src/WalletManage.js';
import ChainManage from '../src/ChainManage.js';
import ERC20Token from '../src/model/ERC20Token.js';
import Asleep from '../src/asleep.js';
import secrets from '../src/lib/secrets.js'

let usdt = "0x033c348873a71903F284750D2E0406cc3d5c3647";

let wallet = null;
wallet = walletManage.newWallet();
walletManage.show();

wallet = walletManage.fromMnemonic('peace mouse scrap chase order guess volume unit riot save reopen nation');
walletManage.show();

wallet = walletManage.fromPrivateKey("0x073b7d744984b23f8de6930de70d9555cc73f3196bfeba193e1bf4f6adea9464");
walletManage.show();

let chain = new ChainManage('https://http-testnet.hecochain.com');
chain.getBalance(wallet.address);
chain.setWallet(wallet);
console.log('provider account:', chain.account);

let asleep = new Asleep();
async function testToken() {
    let res;
    let usdtToken = new ERC20Token(chain, usdt);
    usdtToken.connect();
    // usdtToken.info();
    res = await usdtToken.balanceOf();
    console.log('balanceOf before:', res);
    await usdtToken.allowance(wallet.address, chain.ZERO_ADDR);
    res = await usdtToken.transfer(chain.ZERO_ADDR, 2);
    console.log('transfer:', res.hash);
    await res.wait();
    res = await usdtToken.tokenBalanceOf();
    console.log('balanceOf after:', res);
}

function sssShare(seedWords) {
    const s = secrets.str2hex(seedWords);
    return secrets.share(s, 3, 2);
}

function sssCombine(sharedA, sharedB) {
    const comb = secrets.combine([sharedA, sharedB])
    return secrets.hex2str(comb)
}

function sssNewShare(id, shares=[]) {
    return secrets.newShare(id, shares);
}

function testSSS() {
    const share = sssShare("0x073b7d744984b23f8de6930de70d9555cc73f3196bfeba193e1bf4f6adea9464");
    console.log('sssShare:', share);

    let res = sssCombine(share[0], share[1]);
    console.log('sssCombine:', res);
    res = sssCombine(share[0], share[2]);
    console.log('sssCombine:', res);
    res = sssCombine(share[1], share[2]);
    console.log('sssCombine:', res);
    let sp = sssNewShare(1, [share[1], share[2]]);
    console.log('sssNewShare:', sp);
    res = sssCombine(share[1], sp);
    console.log('sssCombine:', res);
    sp = sssNewShare(2, [share[0], share[2]]);
    console.log('sssNewShare:', sp);
    res = sssCombine(share[2], sp);
    console.log('sssCombine:', res);
}

testSSS();

